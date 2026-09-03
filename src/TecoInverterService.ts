/**
 * @fileoverview Effect service for communicating with Teco/Westinghouse A510 inverters over Modbus.
 *
 * Exposes a scoped {@link TecoInverterService} that manages a Modbus client pool per device.
 * Provides typed access to:
 * - **Command registers** (write): operation, frequency, torque, speed limit, analog/digital out
 * - **Monitor registers** (read): state, errors, warnings, frequency, current, voltage
 * - **Parameter groups** (read/write): all Groups 00–22 via {@link TecoInverterService.parameters}
 *
 * Supports both RTU and ASCII transport variants. Includes an automatic safe-shutdown finalizer
 * that stops the motor on service exit.
 *
 * ## Transaction batching
 *
 * Every accessor here names one register, which on its own means one
 * transaction per register: reading all 49 parameters of Group 00 costs 49
 * round trips, and a round trip is the dominant cost on a half-duplex bus.
 *
 * The transport can decide the transactions instead. Given a read window, reads
 * that are in flight at the same moment are collected and packed into the
 * fewest spans that cover them, so the same 49 parameters cost 3 — one span per
 * contiguous run of the group. The accessors do not change shape; what changes
 * is what they cost.
 *
 * Two conditions, and both are needed:
 *
 * - **A window.** {@link TecoInverterOptions.reads}`.window` is `0` by default,
 *   which issues every read on its own. Nothing is held back until it is asked
 *   for.
 * - **Concurrency.** A window collects what overlaps it. Reads awaited one
 *   after another never overlap, whatever the window is, and each pays the
 *   window in latency. Read a group with
 *   `Effect.forEach(…, { concurrency: 'unbounded' })`.
 *
 * @example
 * import { Effect, Layer } from "effect";
 * import { TecoInverterService } from "./src/TecoInverterService";
 * import { SerialTransportService } from "@flux-control/effect-modbus-rs";
 *
 * const program = Effect.gen(function* () {
 *   const inverter = yield* TecoInverterService;
 *   const freq = yield* inverter.frequencyCommand(1).read();
 *   yield* inverter.frequencyCommand(1).update(50.0);
 * });
 *
 * const layer = Layer.provideMerge(
 *   TecoInverterService.make({ reads: { window: "5 millis" } }),
 *   SerialTransportService.fromRtu({ portPath: "/dev/ttyUSB0", baudRate: 19200 }),
 * );
 *
 * program.pipe(Effect.provide(layer), BunRuntime.runMain);
 *
 * @module
 */

import {
  SerialTransportService,
  type BatchingClientOptions,
  type BatchingModbusClient,
  type ModbusError,
  type SlaveDeviceDefinition,
} from '@flux-control/effect-modbus-rs';
import {
  type ParamConfig,
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
 * How this service uses the bus.
 *
 * Every default leaves timing as it was before batching existed: nothing is
 * held back and no write is suppressed. The windows are what turn the
 * per-register accessors into packed transactions, and they are opt-in because
 * the right value is a property of the bus rather than of the drive.
 */
export interface TecoInverterOptions {
  /**
   * Whether to stop every drive this service spoke to when the scope closes.
   *
   * @defaultValue `true`
   */
  readonly safeShutdown?: boolean;
  /** How reads reach the bus. */
  readonly reads?: {
    /**
     * How long reads are collected before the spans are issued.
     *
     * The window opens on the first arrival and expires on time, so it bounds
     * the latency a reader pays. A useful size is on the order of one
     * transaction on the bus in question: shorter than a transaction and it
     * collects nothing, much longer and every reader waits for a batch it did
     * not need. A short frame at 19200 baud is roughly 5 ms to 15 ms, but that
     * is arithmetic rather than a measurement — time one on the segment before
     * settling on a value.
     *
     * @defaultValue `0` — every read is issued on its own
     */
    readonly window?: Duration.Input;
    /**
     * Unrequested registers the planner may read to join two spans into one.
     *
     * Group 00 occupies three contiguous runs separated by gaps of 2 and 7
     * registers, so the default reads it in three transactions. A gap wide
     * enough to bridge them reads it in one.
     *
     * CAUTION: a drive may answer `ILLEGAL_DATA_ADDRESS` for a register it
     * does not implement, and the exception takes down the whole span,
     * including the addresses that would have answered. Read one span across a
     * known gap on the drive in question before raising this.
     *
     * The value covers the whole unit rather than one parameter group, because
     * one unit has one batch. Groups whose gaps differ have to settle on the
     * smallest tolerance among them.
     *
     * @defaultValue `0` — a span holds only contiguous requested addresses
     */
    readonly maxGap?: number;
  };
  /** How writes reach the bus. */
  readonly writes?: {
    /**
     * How long a write is held so that neighbouring writes travel with it.
     * Each arrival restarts the window.
     *
     * `update()` resolves once the value has reached the drive, so a window is
     * latency on every command. Worth setting only where several registers are
     * commanded together.
     *
     * @defaultValue `0` — every write is issued on its own
     */
    readonly window?: Duration.Input;
    /**
     * Ceiling on the total hold, so a register commanded faster than the
     * window still reaches the wire.
     *
     * @defaultValue four times `window`
     */
    readonly maxHold?: Duration.Input;
    /**
     * Whether to drop a write whose value the drive is believed to already
     * hold.
     *
     * Off, because an A510 has a keypad. The record covers what this process
     * wrote, and a parameter changed at the panel leaves it describing a value
     * the drive no longer holds — after which it suppresses exactly the write
     * that would restore it. Worth turning on for a drive with no local
     * operator, where it saves a write per unchanged register.
     *
     * The stop issued at shutdown is never suppressed: it clears the record
     * first.
     *
     * @defaultValue `false`
     */
    readonly cache?: boolean;
  };
}

/**
 * Effect service for interacting with a Teco/Westinghouse A510 inverter over Modbus.
 *
 * Instantiate with {@link TecoInverterService.make} and provide the appropriate
 * transport layer ({@link RtuTransportService} or {@link AsciiTransportService}).
 *
 * @see TecoInverterService.make
 */
const makeTecoInverter = Effect.fnUntraced(function* (options: TecoInverterOptions = {}) {
  const transport = yield* SerialTransportService;
  const safeShutdown = options.safeShutdown ?? true;

  /**
   * One configuration, built once and shared by every drive on this bus.
   *
   * The transport keeps one batching client per unit — two batches on one unit
   * coalesce neither — and rejects a second request for a unit that asks for
   * something else. So these options are settled here rather than assembled at
   * each call site.
   */
  const batching: BatchingClientOptions = {
    cache: options.writes?.cache ?? false,
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
   * Brings one drive to its safe state, through a client already held: the
   * motor stopped, every other bit of the command word left as it was.
   *
   * What a safe state *is* belongs to this package. That it is a drive rather
   * than some other device on the same bus is not asked at shutdown — only a
   * drive ever had a client built for it here.
   */
  const stopWith = (client: BatchingModbusClient, deviceId: number) =>
    Effect.gen(function* () {
      // A stop must reach the wire even when the write cache believes the
      // register already holds it. That belief covers what this process wrote,
      // and a drive started from its keypad holds something the record never
      // saw.
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
   * One batching client per drive, declared on first use and held for the life
   * of the service.
   *
   * A unit has one batch, so the transport takes one declaration per unit and
   * refuses a second. Declaring here rather than at each accessor is what makes
   * that true of this service: callers that arrive together on one drive await
   * the same declaration instead of racing to make their own.
   */
  const clients = yield* ScopedCache.makeWith({
    // The highest unit ID an RTU segment can address. No bus can reach this
    // capacity, so no drive is evicted — and stopped — while it is still in use.
    capacity: 247,
    // A declaration that failed describes the link at one moment, not the
    // drive. Holding that result would make a momentary drop permanent for
    // every later operation on that drive.
    timeToLive: (exit) => (Exit.isSuccess(exit) ? Duration.infinity : Duration.zero),
    lookup: (deviceId: number) =>
      Effect.acquireRelease(
        transport.withBatchingClient(deviceId, batching),
        // A stopped motor is the safe state of this device, and this runs while
        // the bus is still open. Each drive carries its own finalizer, so a
        // drive that cannot be reached costs only itself: the error is logged
        // and every other drive still gets its turn.
        //
        // The client is the one this entry holds, never a fresh lookup. A
        // lookup on a closing cache is interrupted, which would leave the motor
        // running.
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
    ScopedCache.get(clients, deviceId);

  const readHolding = <A, E, R>(
    address: number,
    decode: (raw: unknown) => Effect.Effect<A, E, R>,
  ) =>
    Effect.fnUntraced(function* (deviceId: number) {
      const client = yield* clientFor(deviceId);
      return yield* decode(yield* client.read(address));
    });

  const makeReadModifyWrite =
    <T, P, E1, R1, E2, R2>(
      address: number,
      decode: (raw: unknown) => Effect.Effect<T, E1, R1>,
      encode: (value: T) => Effect.Effect<number, E2, R2>,
      merge: (base: T, patch: P) => T,
    ) =>
    (deviceId: number) => {
      const read = () => readHolding(address, decode)(deviceId);
      const update = Effect.fnUntraced(function* (patch: P) {
        const client = yield* clientFor(deviceId);
        // `readNow` rather than the collected read. Two fibers patching one
        // register can lose an update, and the gap between the read and the
        // write is how wide that race is — a window would widen it by its own
        // length. Nothing is given up by not waiting: `readNow` still joins a
        // batch that is already open.
        const current = yield* decode(yield* client.readNow(address));
        const merged = merge(current, patch);
        const encoded = yield* encode(merged);
        yield* client.write({ address, value: encoded });
      });
      return { read, update };
    };

  const makeReadWrite =
    <T, E1, R1, E2, R2>(
      address: number,
      decode: (raw: unknown) => Effect.Effect<T, E1, R1>,
      encode: (value: T) => Effect.Effect<number, E2, R2>,
    ) =>
    (deviceId: number) => {
      const read = () => readHolding(address, decode)(deviceId);
      const update = Effect.fnUntraced(function* (value: T) {
        const client = yield* clientFor(deviceId);
        const encoded = yield* encode(value);
        yield* client.write({ address, value: encoded });
      });
      return { read, update };
    };

  const makeMonitor =
    <T, E, R>(address: number, decode: (raw: unknown) => Effect.Effect<T, E, R>) =>
    (deviceId: number) => ({
      read: () => readHolding(address, decode)(deviceId),
    });

  const makeParamOpsFromConfig = <C extends ParamConfig>(config: C) => {
    // While `C` is still generic, `ParamEntryOfConfig<C>` stays a union of
    // every entry shape, so the decode/encode pair is not inferable as one
    // `T`. Widen here; the cast below re-narrows to the precise config type.
    const { decode, encode } = fromConfig(config) as unknown as {
      decode: (raw: unknown) => Effect.Effect<unknown, Schema.SchemaError>;
      encode: (value: unknown) => Effect.Effect<number, Schema.SchemaError>;
    };
    const ops = makeReadWrite(config.register, decode, encode);
    return Object.assign((deviceId: number) => ops(deviceId), {
      meta: config.meta,
    }) as unknown as ParamCallableOfEntry<ParamEntryOfConfig<C>>;
  };

  const makeGroupParamOps = <C extends Record<string, ParamConfig>>(configs: C) => {
    const entries = (Object.keys(configs) as Array<Extract<keyof C, string>>).map(
      (key) => [key, makeParamOpsFromConfig(configs[key]!)] as const,
    );

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
     * are written back, preserving the current state of unchanged bits.
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
     * Register 0x2502. Range 0.00–599.00 Hz (wire: 0–59900, 0.01 Hz/count).
     *
     * @example
     * yield* inverter.frequencyCommand(1).update(50.0); // 50 Hz
     * const freq = yield* inverter.frequencyCommand(1).read(); // FrequencyHz
     */
    frequencyCommand,
    /**
     * Set the torque limit / torque command as a percentage of rated torque.
     * Register 0x2503. Range –100.0–100.0% (wire: UInt16 two's complement, ÷81.92).
     *
     * @example
     * yield* inverter.torqueCommand(1).update(75.0); // 75% torque
     * const torque = yield* inverter.torqueCommand(1).read(); // TorquePercent
     */
    torqueCommand,
    /**
     * Set the speed limit as a percentage of nominal speed.
     * Register 0x2504. Range –120–120% (wire: UInt16 two's complement, 1:1 mapping).
     *
     * @example
     * yield* inverter.speedLimitCommand(1).update(100); // 100% speed limit
     */
    speedLimitCommand,
    /**
     * Set analog output 1 target voltage.
     * Register 0x2505. Range 0.00–10.00 V (wire: 0–1000, 0.01 V/count).
     *
     * @example
     * yield* inverter.analogOut1Command(1).update(5.0); // 5.00 V
     */
    analogOut1Command,
    /**
     * Set analog output 2 target voltage.
     * Register 0x2506. Range 0.00–10.00 V (wire: 0–1000, 0.01 V/count).
     *
     * @example
     * yield* inverter.analogOut2Command(1).update(7.5); // 7.50 V
     */
    analogOut2Command,
    /**
     * Control digital output terminals (RY1, RY2, pulse train).
     * Register 0x2507.
     *
     * Uses read-modify-write semantics: only the fields present in the patch
     * are written back, preserving the current state of unchanged bits.
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
     * Read the frequency command currently in effect (after ramps, limits, etc.).
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
     * Typed access to all parameter groups (Groups 00–22).
     *
     * Each group is a record of parameter callables keyed by parameter code
     * (e.g. `inverter.parameters.group00.p00_01`). Each callable accepts a
     * `deviceId` and returns an object with `.read()` and `.update()` operations.
     *
     * @example
     * const value = yield* inverter.parameters.group00.p00_01(1).read();
     * yield* inverter.parameters.group00.p00_01(1).update(2);
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
 * v4's `Context.Service` takes the shape as a type parameter rather than
 * inferring it from a constructor option, so it is derived here.
 */
export type TecoInverterApi = Effect.Success<ReturnType<typeof makeTecoInverter>>;

export class TecoInverterService extends Context.Service<TecoInverterService, TecoInverterApi>()(
  'TecoInverterService',
) {
  /** Scoped constructor effect. Wrapped by {@link TecoInverterService.make}. */
  static readonly makeScoped = makeTecoInverter;

  /**
   * Creates a {@link Layer} providing {@link TecoInverterService}.
   *
   * Requires a {@link SerialTransportService} to be provided.
   *
   * @param options - Safe shutdown, and how reads and writes reach the bus.
   */
  static readonly make = (
    options: TecoInverterOptions = {},
  ): Layer.Layer<TecoInverterService, never, SerialTransportService> =>
    Layer.effect(TecoInverterService, makeTecoInverter(options));

  /**
   * Constructs a {@link SlaveDeviceDefinition} suitable for use with a mock Modbus transport.
   *
   * Registers all command registers (0x2501–0x2507), monitor registers (0x2520–0x252F),
   * and all parameter group registers (Groups 00–22) with default value `0`.
   *
   * @param deviceId - The Modbus unit/slave ID this device should respond to
   * @returns A {@link SlaveDeviceDefinition} ready to be passed to a mock transport layer
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
        ...Object.values(COMMAND_REGISTERS)
          .filter((v): v is number => typeof v === 'number')
          .map((address) => ({ address, default: 0 })),
        ...Object.values(MONITOR_REGISTERS)
          .filter((v): v is number => typeof v === 'number')
          .map((address) => ({ address, default: 0 })),
        ...paramRegisterDefs,
      ],
      inputRegisters: [],
    };
  }
}
