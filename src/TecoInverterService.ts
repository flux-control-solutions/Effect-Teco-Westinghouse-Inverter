/**
 * @fileoverview Scoped Effect service for Teco/Westinghouse A510-family inverters.
 *
 * The service uses a provided `SerialTransportService` and acquires one batching
 * client per accessed unit. It exposes typed command, monitor, and parameter
 * operations. By default, scope closure attempts to stop each acquired drive.
 * Stop failures are logged and ignored.
 *
 * ## Transaction batching
 *
 * A read window collects overlapping reads so the transport can plan register
 * spans. Sequentially awaited reads do not overlap and cannot batch. The default
 * window is zero, so reads do not wait for collection.
 *
 * @example
 * import { Effect, Layer } from "effect";
 * import { FrequencyHz, TecoInverterService } from "@flux-control/effect-teco-westinghouse-inverter";
 * import { SerialTransportService } from "@flux-control/effect-modbus-rs";
 *
 * const program = Effect.gen(function* () {
 *   const inverter = yield* TecoInverterService;
 *   const freq = yield* inverter.frequencyCommand(1).read();
 *   yield* inverter.frequencyCommand(1).update(FrequencyHz.make(50));
 * });
 *
 * const layer = Layer.provideMerge(
 *   TecoInverterService.make({ reads: { window: "5 millis" } }),
 *   SerialTransportService.fromRtu({ portPath: "/dev/ttyUSB0", baudRate: 19200 }),
 * );
 *
 * await Effect.runPromise(program.pipe(Effect.provide(layer), Effect.scoped));
 *
 * @module
 */

import {
  SerialTransportService,
  type BatchingClientOptions,
  type BatchingDebounceOptions,
  type BatchingDebounceWindows,
  type BatchingModbusClient,
  type ModbusError,
  type SlaveDeviceDefinition,
} from '@flux-control/effect-modbus-rs';
import {
  type ParamConfig,
  type ParamEntry,
  type ParamEntryOfConfig,
  ParamKind,
  fromConfig,
} from '@flux-control/modbus-schema';
import { Context, Duration, Effect, Exit, Layer, Record, Schema, ScopedCache } from 'effect';

import * as Parameters from './parameters';
import type { GroupParamOps, ParamCallableOfEntry } from './parameters/operations';
import { COMMAND_REGISTERS, MONITOR_REGISTERS } from './Registers';
import * as S from './schemas';

/**
 * Extracts the default wire-format value for a parameter config.
 *
 * For UInt16 and Enum params the default is returned as-is.
 * For Scaled and SignedScaled params the default is divided by the factor
 * and rounded, since the wire format stores domain / factor.
 */
const paramDefault = (config: ParamConfig): number => {
  const raw = Number(config.meta.default);
  if (Number.isNaN(raw)) return 0;
  switch (config.kind) {
    case ParamKind.UInt16:
    case ParamKind.Enum:
      return raw;
    case ParamKind.Scaled:
    case ParamKind.SignedScaled:
      return Math.round(raw / config.factor);
    case ParamKind.Bitfield:
    case ParamKind.Lookup:
      return raw;
  }
};

const allParamGroups = [
  Parameters.group00,
  Parameters.group01,
  Parameters.group02,
  Parameters.group03,
  Parameters.group04,
  Parameters.group05,
  Parameters.group06,
  Parameters.group07,
  Parameters.group08,
  Parameters.group09,
  Parameters.group10,
  Parameters.group11,
  Parameters.group12,
  Parameters.group13,
  Parameters.group14,
  Parameters.group15,
  Parameters.group16,
  Parameters.group17,
  Parameters.group18,
  Parameters.group19,
  Parameters.group20,
  Parameters.group21,
  Parameters.group22,
] as const;

const paramRegisterDefs: ReadonlyArray<{
  readonly address: number;
  readonly default: number;
}> = allParamGroups.flatMap((group) =>
  Object.values(group).map((config) => ({
    address: config.register,
    default: paramDefault(config),
  })),
);

/**
 * Settings for shutdown stop attempts and Modbus transaction batching.
 *
 * Windows are opt-in because useful values depend on bus timing. Read windows
 * collect overlapping reads. Write windows delay writes so nearby writes can
 * be batched.
 */
export interface TecoInverterOptions {
  /**
   * Whether scope cleanup attempts to clear the run flag on each acquired drive.
   *
   * @defaultValue `true`
   */
  readonly safeShutdown?: boolean;
  /** Read collection and span-planning settings. */
  readonly reads?: {
    /**
     * How long reads are collected before the spans are issued.
     *
     * The window starts with the first arrival. Concurrent reads can share a span.
     * Sequential reads each wait for their own window. Choose a window from measured bus timing.
     *
     * @defaultValue `0` — every read is issued on its own
     */
    readonly window?: Duration.Input;
    /**
     * Unrequested registers the planner may read to join two spans into one.
     *
     * An unsupported gap address can fail the entire span with `ILLEGAL_DATA_ADDRESS`.
     * Check the drive's supported addresses before increasing this unit-wide setting.
     *
     * @defaultValue `0` — a span holds only contiguous requested addresses
     */
    readonly maxGap?: number;
  };
  /** Write collection and cache settings. */
  readonly writes?: {
    /**
     * How long a write is held so that neighbouring writes travel with it.
     * Each arrival restarts the window.
     *
     * A write window adds latency. A pending write can be replaced by a newer
     * write for the same register, so update completion does not prove that
     * this particular value reached the drive.
     *
     * @defaultValue `0` — every write is issued on its own
     */
    readonly window?: Duration.Input;
    /**
     * Maximum hold before a flush. Bounds the delay when updates continuously restart the window.
     *
     * @defaultValue four times `window`
     */
    readonly maxHold?: Duration.Input;
    /**
     * Whether to drop a write whose value the drive is believed to already
     * hold.
     *
     * Disabled by default because keypad changes can make cached values stale.
     * Enable only when the application controls external changes and cache invalidation.
     * Shutdown invalidates the drive's cache before attempting its stop command.
     *
     * @defaultValue `false`
     */
    readonly cache?: boolean;
  };
}

const toMillis = (input: Duration.Input) => Duration.toMillis(Duration.fromInputUnsafe(input));

/**
 * Describes the effective debounce windows in milliseconds.
 *
 * Equal windows give equal text, whatever `Duration.Input` form they use. A
 * zero window gives the same text as no window, because the client does not
 * debounce in either case. An omitted `maxHold` is four times the write window,
 * which is the limit that the batching client applies.
 */
const describeDebounce = (
  options: BatchingDebounceOptions | BatchingDebounceWindows | undefined,
): string => {
  const writes = options?.writes;
  const reads = options?.reads;
  const writeText =
    writes === undefined || toMillis(writes.window) <= 0
      ? 'no write window'
      : `write window ${toMillis(writes.window)} ms, maximum hold ` +
        `${writes.maxHold === undefined ? toMillis(writes.window) * 4 : toMillis(writes.maxHold)} ms`;
  const readText =
    reads === undefined || toMillis(reads.window) <= 0
      ? 'no read window'
      : `read window ${toMillis(reads.window)} ms`;
  return `${writeText}, ${readText}`;
};

/**
 * Effect service for interacting with a Teco/Westinghouse A510 inverter over Modbus.
 *
 * Create a layer with {@link TecoInverterService.make} and provide a
 * `SerialTransportService` layer configured for RTU or ASCII transport.
 *
 * The service owns its per-unit client acquisitions and shutdown finalizers.
 * The transport layer must remain available for Modbus operations.
 */
const makeTecoInverter = Effect.fnUntraced(function* (options: TecoInverterOptions = {}) {
  const transport = yield* SerialTransportService;
  const safeShutdown = options.safeShutdown ?? true;

  /**
   * Share one configuration because the transport accepts one batching client declaration per unit.
   */
  const cacheWrites = options.writes?.cache ?? false;
  const batching: BatchingClientOptions = {
    cache: cacheWrites,
    debounce: {
      writes:
        options.writes?.window === undefined
          ? undefined
          : { window: options.writes.window, maxHold: options.writes.maxHold },
      reads: options.reads?.window === undefined ? undefined : { window: options.reads.window },
    },
    plan: { reads: { maxGap: options.reads?.maxGap ?? 0 } },
  };

  /**
   * Attempts to clear the run flag through the acquired client.
   * Preserves other modeled command flags from the immediate read.
   */
  const stopWith = (client: BatchingModbusClient, deviceId: number) =>
    Effect.gen(function* () {
      // Keypad changes can invalidate cached values. Prevent the cache from suppressing the stop.
      client.cache?.invalidate(deviceId);
      const current = yield* S.decodeCommandWord(
        yield* client.readNow(COMMAND_REGISTERS.OPERATION_COMMAND),
      );
      const stopped = S.mergeCommandWordPatch(current, new S.CommandWordPatch({ run: false }));
      yield* client.writeNow({
        address: COMMAND_REGISTERS.OPERATION_COMMAND,
        value: yield* S.encodeCommandWord(stopped),
      });
    });

  /**
   * Invalidates a reused client's cache when this service disables write caching.
   * This prevents stale keypad values from suppressing an update.
   */
  const forgetUnlessCached = (client: BatchingModbusClient, deviceId: number) =>
    Effect.sync(() => {
      if (!cacheWrites) client.cache?.invalidate(deviceId);
    });

  /**
   * Gets the batching client for a drive from the transport.
   *
   * The transport can retain a declaration from an earlier service or lookup.
   * Reuse that client because another declaration for the same unit is rejected.
   *
   * The existing client keeps the options of its declaration. The service
   * checks two of them and logs one warning that lists each difference:
   *
   * - The debounce windows must equal the windows of this service.
   * - The write cache must be present when `writes.cache` is on, and absent
   *   when it is off.
   *
   * Planner limits and retry settings are not inspectable.
   * The service uses the client even when options differ.
   * If write caching is disabled here, updates invalidate any existing client cache.
   */
  const declareClient = (deviceId: number): Effect.Effect<BatchingModbusClient, ModbusError> =>
    transport.withBatchingClient(deviceId, batching).pipe(
      Effect.catchTag('ModbusUnitAlreadyDeclaredError', () =>
        Effect.tap(transport.batchingClient(deviceId), (client) => {
          const differences: Array<string> = [];
          const requested = describeDebounce(batching.debounce);
          const existing = describeDebounce(client.debounce);
          if (existing !== requested) {
            differences.push(`Debounce: existing ${existing}; requested ${requested}.`);
          }
          if (cacheWrites && client.cache === undefined) {
            differences.push(
              'Write cache: the existing client has no write cache, so every write ' +
                'reaches the drive.',
            );
          }
          if (!cacheWrites && client.cache !== undefined) {
            differences.push(
              'Write cache: the existing client has a write cache. The service clears the ' +
                'record of the unit before each write, so each write still reaches the drive.',
            );
          }
          if (differences.length === 0) return Effect.void;
          return Effect.logWarning(
            `Unit ${deviceId} already has a batching client with different options. ` +
              `Another component probably declared this unit. The service uses the existing ` +
              `client. ${differences.join(' ')}`,
          );
        }),
      ),
    );

  /**
   * One batching client per drive, held for the life of the service.
   *
   * The cache makes every call after the first a lookup. Callers that arrive
   * together on one drive share one lookup instead of racing to declare the
   * unit.
   *
   * The transport can outlive this service. A new service over the same open
   * transport recovers each existing declaration in `declareClient`, so the
   * application does not have to recreate the transport with the service.
   */
  const clients = yield* ScopedCache.makeWith({
    // RTU unit IDs fit within this capacity, so valid active drives are not evicted.
    capacity: 247,
    // Failed acquisitions must expire so later operations can retry the declaration.
    timeToLive: (exit) => (Exit.isSuccess(exit) ? Duration.infinity : Duration.zero),
    lookup: (deviceId: number) =>
      Effect.acquireRelease(
        declareClient(deviceId),
        // Log stop failures so other acquired drives still receive a stop attempt.
        // Use the acquired client because a lookup can be interrupted during cache shutdown.
        (client) =>
          safeShutdown
            ? stopWith(client, deviceId).pipe(
                Effect.catch((err) =>
                  Effect.logWarning(
                    `Error while stopping the drive on unit ${deviceId} on exit: `,
                    err,
                  ),
                ),
              )
            : Effect.void,
      ),
  });

  /** The batching client for one drive, declared on the first call for it. */
  const clientFor = (deviceId: number): Effect.Effect<BatchingModbusClient, ModbusError> =>
    ScopedCache.get(clients, deviceId).pipe(
      // Workaround for effect 4.0.0-rc.118. After an asynchronous lookup fails,
      // `ScopedCache` resumes this fiber before it sets the zero time-to-live.
      // Without the yield, the next call for this drive gets the same failure.
      // Remove the yield when the upstream `ScopedCache` sets the expiry first.
      Effect.tapError(() => Effect.yieldNow),
    );

  const readHolding = <A, E, R>(address: number, decode: (raw: number) => Effect.Effect<A, E, R>) =>
    Effect.fnUntraced(function* (deviceId: number) {
      const client = yield* clientFor(deviceId);
      return yield* decode(yield* client.read(address));
    });

  const makeReadModifyWrite =
    <T, P, E1, R1, E2, R2>(
      address: number,
      decode: (raw: number) => Effect.Effect<T, E1, R1>,
      encode: (value: T) => Effect.Effect<number, E2, R2>,
      merge: (base: T, patch: P) => T,
    ) =>
    (deviceId: number) => {
      const read = () => readHolding(address, decode)(deviceId);
      const update = Effect.fnUntraced(function* (patch: P) {
        const client = yield* clientFor(deviceId);
        // An immediate read avoids adding collection delay to this non-atomic read-modify-write pair.
        // Concurrent patches to the same register can still overwrite each other.
        const current = yield* decode(yield* client.readNow(address));
        const merged = merge(current, patch);
        const encoded = yield* encode(merged);
        yield* forgetUnlessCached(client, deviceId);
        yield* client.write({ address, value: encoded });
      });
      return { read, update };
    };

  const makeReadWrite =
    <T, E1, R1, E2, R2>(
      address: number,
      decode: (raw: number) => Effect.Effect<T, E1, R1>,
      encode: (value: T) => Effect.Effect<number, E2, R2>,
    ) =>
    (deviceId: number) => {
      const read = () => readHolding(address, decode)(deviceId);
      const update = Effect.fnUntraced(function* (value: T) {
        const client = yield* clientFor(deviceId);
        const encoded = yield* encode(value);
        yield* forgetUnlessCached(client, deviceId);
        yield* client.write({ address, value: encoded });
      });
      return { read, update };
    };

  const makeMonitor =
    <T, E, R>(address: number, decode: (raw: number) => Effect.Effect<T, E, R>) =>
    (deviceId: number) => ({
      read: () => readHolding(address, decode)(deviceId),
    });

  /**
   * While `C` is still generic, `ParamEntryOfConfig<C>` stays a union of every
   * entry shape, so the decode/encode pair is not inferable as one value type.
   * Declaring the precise result and implementing against the plain config
   * union is what keeps that precision for callers without an assertion.
   */
  function makeParamOpsFromConfig<C extends ParamConfig>(
    config: C,
  ): ParamCallableOfEntry<ParamEntryOfConfig<C>>;
  function makeParamOpsFromConfig(config: ParamConfig) {
    // Only the codec pair is named here. `ParamEntry` also carries its own
    // schema, which makes the whole entry invariant and the union unassignable;
    // narrowing to the pair leaves an ordinary widening assignment.
    const entry: Pick<ParamEntry<Schema.Codec<any, any>>, 'decode' | 'encode'> = fromConfig(config);
    const ops = makeReadWrite(config.register, entry.decode, entry.encode);
    return Object.assign((deviceId: number) => ops(deviceId), { meta: config.meta });
  }

  const makeGroupParamOps = <C extends Record<string, ParamConfig>>(configs: C) => {
    // SAFETY: `Object.keys` types its result `string[]` because it cannot know
    // the key set. Every key here comes from `configs`.
    const entries = (Object.keys(configs) as Array<Extract<keyof C, string>>).map(
      (key) => [key, makeParamOpsFromConfig(configs[key]!)] as const,
    );

    // SAFETY: one entry per key of `C`, each built from that key's own config,
    // which is what `GroupParamOps<C>` describes.
    return Record.fromEntries(entries) as GroupParamOps<C>;
  };

  const operationCommand = makeReadModifyWrite(
    COMMAND_REGISTERS.OPERATION_COMMAND,
    S.decodeCommandWord,
    S.encodeCommandWord,
    S.mergeCommandWordPatch,
  );
  const frequencyCommand = makeReadWrite(
    COMMAND_REGISTERS.FREQUENCY_COMMAND,
    S.decodeFrequencyCommand,
    S.encodeFrequencyCommand,
  );
  const torqueCommand = makeReadWrite(
    COMMAND_REGISTERS.TORQUE_COMMAND,
    S.decodeTorqueCommand,
    S.encodeTorqueCommand,
  );
  const speedLimitCommand = makeReadWrite(
    COMMAND_REGISTERS.SPEED_LIMIT_COMMAND,
    S.decodeSpeedLimitCommand,
    S.encodeSpeedLimitCommand,
  );
  const analogOut1Command = makeReadWrite(
    COMMAND_REGISTERS.ANALOG_OUT_1_COMMAND,
    S.decodeAnalogOut1Command,
    S.encodeAnalogOut1Command,
  );
  const analogOut2Command = makeReadWrite(
    COMMAND_REGISTERS.ANALOG_OUT_2_COMMAND,
    S.decodeAnalogOut2Command,
    S.encodeAnalogOut2Command,
  );
  const digitalOutCommand = makeReadModifyWrite(
    COMMAND_REGISTERS.DIGITAL_OUT_COMMAND,
    S.decodeDigitalOutCommand,
    S.encodeDigitalOutCommand,
    S.mergeDigitalOutCommandPatch,
  );
  const stateMonitor = makeMonitor(MONITOR_REGISTERS.STATE_MONITOR, S.decodeStateMonitor);
  const errorDescriptionMonitor = makeMonitor(
    MONITOR_REGISTERS.ERROR_DESCRIPTION_MONITOR,
    S.decodeErrorDescriptionMonitor,
  );
  const digitalInStateMonitor = makeMonitor(
    MONITOR_REGISTERS.DIGITAL_IN_STATE_MONITOR,
    S.decodeDigitalInStateMonitor,
  );
  const frequencyCommandMonitor = makeMonitor(
    MONITOR_REGISTERS.FREQUENCY_COMMAND_MONITOR,
    S.decodeFrequencyCommandMonitor,
  );
  const outputFrequencyMonitor = makeMonitor(
    MONITOR_REGISTERS.OUTPUT_FREQUENCY_MONITOR,
    S.decodeOutputFrequencyMonitor,
  );
  const dcBusVoltageCommandMonitor = makeMonitor(
    MONITOR_REGISTERS.DC_VOLTAGE_COMMAND_MONITOR,
    S.decodeDCBusVoltageCommandMonitor,
  );
  const outputCurrentMonitor = makeMonitor(
    MONITOR_REGISTERS.OUTPUT_CURRENT_MONITOR,
    S.decodeOutputCurrentMonitor,
  );
  const warningDescriptionMonitor = makeMonitor(
    MONITOR_REGISTERS.WARNING_DESCRIPTION_MONITOR,
    S.decodeWarningDescriptionMonitor,
  );
  const digitalOutStateMonitor = makeMonitor(
    MONITOR_REGISTERS.DIGITAL_OUTPUT_STATE_MONITOR,
    S.decodeDigitalOutStateMonitor,
  );
  const analogOut1Monitor = makeMonitor(
    MONITOR_REGISTERS.ANALOG_OUT_1_MONITOR,
    S.decodeAnalogOut1Monitor,
  );
  const analogOut2Monitor = makeMonitor(
    MONITOR_REGISTERS.ANALOG_OUT_2_MONITOR,
    S.decodeAnalogOut2Monitor,
  );
  const analogIn1Monitor = makeMonitor(
    MONITOR_REGISTERS.ANALOG_IN_1_MONITOR,
    S.decodeAnalogIn1Monitor,
  );
  const analogIn2Monitor = makeMonitor(
    MONITOR_REGISTERS.ANALOG_IN_2_MONITOR,
    S.decodeAnalogIn2Monitor,
  );
  const a510CheckMonitor = makeMonitor(
    MONITOR_REGISTERS.A510_CHECK_MONITOR,
    S.decodeA510CheckMonitor,
  );

  return {
    /**
     * Start/stop/reverse the inverter and signal external faults.
     * Register 0x2501.
     *
     * Uses read-modify-write semantics: only the fields present in the patch
     * change. The encoded word includes all modeled flags from the immediate read.
     * Concurrent updates are not atomic.
     *
     * @example
     * // Run forward
     * yield* inverter.operationCommand(1).update({ run: true });
     * // Fault reset pulse
     * yield* inverter.operationCommand(1).update({ faultReset: true });
     * // Stop
     * yield* inverter.operationCommand(1).update({ run: false });
     */
    operationCommand,
    /**
     * Set the target output frequency in Hz.
     * Register 0x2502. Range 0.00–600.00 Hz (wire: 0–60000, 0.01 Hz/count).
     *
     * @example
     * import { FrequencyHz } from '@flux-control/effect-teco-westinghouse-inverter';
     * yield* inverter.frequencyCommand(1).update(FrequencyHz.make(50));
     * const freq = yield* inverter.frequencyCommand(1).read(); // FrequencyHz
     */
    frequencyCommand,
    /**
     * Set the torque limit or torque command as a percentage of rated torque.
     * Register 0x2503. Range –100.0–100.0%, using signed Int16 scaling with factor 1 / 81.92.
     *
     * @example
     * import { TorquePercent } from '@flux-control/effect-teco-westinghouse-inverter';
     * yield* inverter.torqueCommand(1).update(TorquePercent.make(75));
     * const torque = yield* inverter.torqueCommand(1).read(); // TorquePercent
     */
    torqueCommand,
    /**
     * Set the speed limit as a percentage of nominal speed.
     * Register 0x2504. Range –120–120%. The schema encodes signed wire values.
     *
     * @example
     * import { SpeedLimitPercent } from '@flux-control/effect-teco-westinghouse-inverter';
     * yield* inverter.speedLimitCommand(1).update(SpeedLimitPercent.make(100));
     */
    speedLimitCommand,
    /**
     * Set analog output 1 target voltage.
     * Register 0x2505. Range 0.00–10.00 V (wire: 0–1000, 0.01 V/count).
     *
     * @example
     * import { Voltage } from '@flux-control/effect-teco-westinghouse-inverter';
     * yield* inverter.analogOut1Command(1).update(Voltage.make(5));
     */
    analogOut1Command,
    /**
     * Set analog output 2 target voltage.
     * Register 0x2506. Range 0.00–10.00 V (wire: 0–1000, 0.01 V/count).
     *
     * @example
     * import { Voltage } from '@flux-control/effect-teco-westinghouse-inverter';
     * yield* inverter.analogOut2Command(1).update(Voltage.make(7.5));
     */
    analogOut2Command,
    /**
     * Control digital output terminals (RY1, RY2, pulse train).
     * Register 0x2507.
     *
     * Uses read-modify-write semantics: only the fields present in the patch
     * change. Other modeled flags keep their values from the immediate read.
     * Concurrent updates are not atomic.
     *
     * @example
     * yield* inverter.digitalOutCommand(1).update({ ry1: true, ry2: false });
     */
    digitalOutCommand,
    /**
     * Read the current inverter operating state as individual flag fields.
     * Register 0x2520. Flags include: run, reverse, fault, warning, zeroSpeed,
     * underVoltage, overTorque, and more.
     *
     * @example
     * const state = yield* inverter.stateMonitor(1).read();
     * if (state.fault) { /* handle fault *\/ }
     * if (state.run && !state.reverse) { /* running forward *\/ }
     */
    stateMonitor,
    /**
     * Read the current fault/error code and get a human-readable description.
     * Register 0x2521. Returns a string such as `"OC (Over-current)"` or `"UV (Under-voltage)"`.
     *
     * @example
     * const err = yield* inverter.errorDescriptionMonitor(1).read(); // "OC (Over-current)"
     */
    errorDescriptionMonitor,
    /**
     * Read the state of the eight digital input terminals S1–S8.
     * Register 0x2522. Each bit reflects the live logic level of one terminal.
     *
     * @example
     * const inputs = yield* inverter.digitalInStateMonitor(1).read();
     * if (inputs.s1) { /* S1 is active *\/ }
     */
    digitalInStateMonitor,
    /**
     * Read the frequency command reported by the drive.
     * Register 0x2523. Returns a FrequencyHz value.
     *
     * @example
     * const freq = yield* inverter.frequencyCommandMonitor(1).read(); // FrequencyHz
     */
    frequencyCommandMonitor,
    /**
     * Read the actual inverter output frequency.
     * Register 0x2524. Returns a FrequencyHz value.
     *
     * @example
     * const outFreq = yield* inverter.outputFrequencyMonitor(1).read(); // FrequencyHz
     */
    outputFrequencyMonitor,
    /**
     * Read the DC bus voltage in volts.
     * Register 0x2526. Range 0.0–1000.0 V (wire: 0–10000, 0.1 V/count).
     *
     * @example
     * const dcBus = yield* inverter.dcBusVoltageCommandMonitor(1).read(); // DCBusVoltage
     */
    dcBusVoltageCommandMonitor,
    /**
     * Read the inverter output current in amps.
     * Register 0x2527. Range 0.0–6553.5 A (wire: 0–65535, 0.1 A/count).
     *
     * @example
     * const current = yield* inverter.outputCurrentMonitor(1).read(); // CurrentAmps
     */
    outputCurrentMonitor,
    /**
     * Read the current warning/alarm code and get a human-readable description.
     * Register 0x2528. Returns a string such as `"OV (Overvoltage)"` or `"No alarm"`.
     *
     * @example
     * const warn = yield* inverter.warningDescriptionMonitor(1).read(); // "No alarm"
     */
    warningDescriptionMonitor,
    /**
     * Read the state of the digital output terminals (RY1, RY2, pulse).
     * Register 0x2529. Each bit reflects the live logic level of one output.
     *
     * @example
     * const outputs = yield* inverter.digitalOutStateMonitor(1).read();
     * if (outputs.ry1) { /* RY1 relay is energized *\/ }
     */
    digitalOutStateMonitor,
    /**
     * Read the actual voltage on analog output 1.
     * Register 0x252A. Range 0.00–10.00 V (wire: 0–1000, 0.01 V/count).
     *
     * @example
     * const voltage = yield* inverter.analogOut1Monitor(1).read(); // Voltage
     */
    analogOut1Monitor,
    /**
     * Read the actual voltage on analog output 2.
     * Register 0x252B. Range 0.00–10.00 V (wire: 0–1000, 0.01 V/count).
     *
     * @example
     * const voltage = yield* inverter.analogOut2Monitor(1).read(); // Voltage
     */
    analogOut2Monitor,
    /**
     * Read analog input 1 as a percentage of full scale.
     * Register 0x252C. Range 0.0–100.0% (wire: 0–1000, 0.1%/count).
     *
     * @example
     * const ai1 = yield* inverter.analogIn1Monitor(1).read(); // AnalogInputPercent
     */
    analogIn1Monitor,
    /**
     * Read analog input 2 as a percentage of full scale.
     * Register 0x252D. Range 0.0–100.0% (wire: 0–1000, 0.1%/count).
     *
     * @example
     * const ai2 = yield* inverter.analogIn2Monitor(1).read(); // AnalogInputPercent
     */
    analogIn2Monitor,
    /**
     * Read the drive series/model identification.
     * Register 0x252F. Returns a string such as `"A510(s)"`, `"E510(s)"`, `"L510(s)"`, or `"F510"`.
     *
     * @example
     * const model = yield* inverter.a510CheckMonitor(1).read(); // "A510(s)"
     */
    a510CheckMonitor,
    /**
     * Typed access to configured parameters in Groups 00–22.
     *
     * Each group is a record of parameter callables keyed by parameter code
     * (for example, `inverter.parameters.group00['00-01']`). Each callable accepts a
     * `deviceId` and returns an object with `.read()` and `.update()` operations.
     *
     * @example
     * const value = yield* inverter.parameters.group00['00-01'](1).read();
     * yield* inverter.parameters.group00['00-01'](1).update('Forward');
     *
     * @internal Excluded from generated docs: the full per-register literal
     * type here spans hundreds of parameters and renders as a multi-MB page.
     * See the example above and the `parameters/group-*.ts` source for the
     * full register list; IDE autocomplete surfaces the real type.
     */
    parameters: {
      group00: makeGroupParamOps(Parameters.group00),
      group01: makeGroupParamOps(Parameters.group01),
      group02: makeGroupParamOps(Parameters.group02),
      group03: makeGroupParamOps(Parameters.group03),
      group04: makeGroupParamOps(Parameters.group04),
      group05: makeGroupParamOps(Parameters.group05),
      group06: makeGroupParamOps(Parameters.group06),
      group07: makeGroupParamOps(Parameters.group07),
      group08: makeGroupParamOps(Parameters.group08),
      group09: makeGroupParamOps(Parameters.group09),
      group10: makeGroupParamOps(Parameters.group10),
      group11: makeGroupParamOps(Parameters.group11),
      group12: makeGroupParamOps(Parameters.group12),
      group13: makeGroupParamOps(Parameters.group13),
      group14: makeGroupParamOps(Parameters.group14),
      group15: makeGroupParamOps(Parameters.group15),
      group16: makeGroupParamOps(Parameters.group16),
      group17: makeGroupParamOps(Parameters.group17),
      group18: makeGroupParamOps(Parameters.group18),
      group19: makeGroupParamOps(Parameters.group19),
      group20: makeGroupParamOps(Parameters.group20),
      group21: makeGroupParamOps(Parameters.group21),
      group22: makeGroupParamOps(Parameters.group22),
    },
  };
});

/**
 * The service shape produced by the scoped constructor.
 *
 * Effect v4 `Context.Service` takes the shape as a type parameter rather than
 * inferring it from a constructor option, so it is derived here.
 */
export type TecoInverterApi = Effect.Success<ReturnType<typeof makeTecoInverter>>;

/**
 * The addresses declared by a numeric register enum.
 *
 * `Object.values` on a numeric enum yields its reverse mapping as well — every
 * name alongside every number — so the addresses are the entries whose key is
 * the name rather than the number.
 */
const registerAddresses = (registers: Record<string, string | number>): number[] =>
  Object.entries(registers)
    .filter(([name]) => !Number.isInteger(Number(name)))
    .map(([, address]) => Number(address));

/** Service identifier and constructors for typed A510 register access. */
export class TecoInverterService extends Context.Service<TecoInverterService, TecoInverterApi>()(
  'TecoInverterService',
) {
  /** Scoped constructor effect used by {@link TecoInverterService.make}. */
  static readonly makeScoped = makeTecoInverter;

  /**
   * Creates a {@link Layer} providing {@link TecoInverterService}.
   *
   * Requires a {@link SerialTransportService} to be provided.
   *
   * @param options Shutdown stop attempts, read and write windows, and write caching.
   * @returns A layer that provides this service and requires `SerialTransportService`.
   */
  static readonly make = (
    options: TecoInverterOptions = {},
  ): Layer.Layer<TecoInverterService, never, SerialTransportService> =>
    Layer.effect(TecoInverterService, makeTecoInverter(options));

  /**
   * Constructs a {@link SlaveDeviceDefinition} suitable for use with a mock Modbus transport.
   *
   * Registers all command and monitor addresses and all parameter registers.
   * Command and monitor registers default to zero. Parameter registers use
   * defaults derived from their metadata and wire scaling.
   *
   * @param deviceId - Modbus unit ID for the mock device.
   * @returns A device definition for a mock Modbus transport. Parameter defaults come from metadata and wire scaling.
   *
   * @example
   * import { SerialTransportService } from "@flux-control/effect-modbus-rs";
   * const mockLayer = SerialTransportService.makeMockTransport([
   *   TecoInverterService.mockDevice(1),
   * ])({ portPath: "/dev/mock", baudRate: 19200 });
   */
  static mockDevice(deviceId: number): SlaveDeviceDefinition {
    return {
      unitId: deviceId,
      coils: [],
      discreteInputs: [],
      holdingRegisters: [
        ...registerAddresses(COMMAND_REGISTERS).map((address) => ({ address, default: 0 })),
        ...registerAddresses(MONITOR_REGISTERS).map((address) => ({ address, default: 0 })),
        ...paramRegisterDefs,
      ],
      inputRegisters: [],
    };
  }
}
