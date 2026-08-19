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
 *   TecoInverterService.make(true),
 *   SerialTransportService.fromRtu({ portPath: "/dev/ttyUSB0", baudRate: 19200 }),
 * );
 *
 * program.pipe(Effect.provide(layer), BunRuntime.runMain);
 *
 * @module
 */

import { SerialTransportService, type SlaveDeviceDefinition } from '@flux-control/effect-modbus-rs';
import {
  type ParamConfig,
  type ParamEntryOfConfig,
  ParamKind,
  fromConfig,
} from '@flux-control/modbus-schema';
import { Context, Effect, Layer, Record, Schema } from 'effect';

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
 * Effect service for interacting with a Teco/Westinghouse A510 inverter over Modbus.
 *
 * Instantiate with {@link TecoInverterService.make} and provide the appropriate
 * transport layer ({@link RtuTransportService} or {@link AsciiTransportService}).
 *
 * @see TecoInverterService.make
 */
const makeTecoInverter = Effect.fnUntraced(function* (safeShutdown: boolean = true) {
  const transport = yield* SerialTransportService;

  const deviceCache = new Set<number>();
  const cacheDevice = (device: number) => deviceCache.add(device);

  const readHolding = <A, E, R>(
    address: number,
    decode: (raw: unknown) => Effect.Effect<A, E, R>,
  ) =>
    Effect.fnUntraced(function* (deviceId: number) {
      cacheDevice(deviceId);
      const client = yield* transport.withClient(deviceId);
      const [raw] = yield* client.readHoldingRegisters({
        address,
        quantity: 1,
      });
      return yield* decode(raw);
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
        const current = yield* read();
        const merged = merge(current, patch);
        const encoded = yield* encode(merged);
        cacheDevice(deviceId);
        const client = yield* transport.withClient(deviceId);
        yield* client.writeSingleRegister({ address, value: encoded });
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
        cacheDevice(deviceId);
        const client = yield* transport.withClient(deviceId);
        const encoded = yield* encode(value);
        yield* client.writeSingleRegister({ address, value: encoded });
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

  if (safeShutdown) {
    yield* Effect.addFinalizer(() =>
      Effect.forEach(deviceCache, (deviceId) => {
        return operationCommand(deviceId)
          .update(new S.CommandWordPatch({ run: false }))
          .pipe(
            Effect.catch((err) =>
              Effect.logWarning('Error while stopping fan on exit: ', err).pipe(Effect.asVoid),
            ),
          );
      }),
    );
  }

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
   * @param safeShutdown - Whether to issue a stop command when the scope closes.
   */
  static readonly make = (
    safeShutdown: boolean = true,
  ): Layer.Layer<TecoInverterService, never, SerialTransportService> =>
    Layer.effect(TecoInverterService, makeTecoInverter(safeShutdown));

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
   * import { MockTransportService } from "@flux-control/effect-modbus-rs";
   * const mockLayer = MockTransportService.setDevices([
   *   TecoInverterService.mockDevice(1),
   * ]);
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
