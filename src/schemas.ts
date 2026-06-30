import { Brand, Effect, ParseResult, Pretty, Schema } from "effect";
import { bit } from "./utils";
import { readOnlyEncodeFailure } from "./errors";

/**
 * Branded 16-bit unsigned word for Modbus register values.
 */
export type UInt16 = number & Brand.Brand<"UInt16">;

export const UInt16 = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(0xffff),
  Schema.brand("UInt16"),
);

// NOTE: ==================================================================
//  OPERATION COMMAND (Register 0x2501)
// ========================================================================

/**
 * Human-readable command word shape.
 */
export class CommandWordFlags extends Schema.Class<CommandWordFlags>(
  "CommandWordFlags",
)({
  run: Schema.Boolean,
  reverse: Schema.Boolean,
  externalFault: Schema.Boolean,
  faultReset: Schema.Boolean,
  commS1: Schema.Boolean,
  commS2: Schema.Boolean,
  commS3: Schema.Boolean,
  commS4: Schema.Boolean,
  commS5: Schema.Boolean,
  commS6: Schema.Boolean,
  commS7: Schema.Boolean,
  commS8: Schema.Boolean,
  inverterMode: Schema.Boolean,
  torqueByComm: Schema.Boolean,
}) {
  static get empty() {
    return new CommandWordFlags({
      run: false,
      reverse: false,
      externalFault: false,
      faultReset: false,
      commS1: false,
      commS2: false,
      commS3: false,
      commS4: false,
      commS5: false,
      commS6: false,
      commS7: false,
      commS8: false,
      inverterMode: false,
      torqueByComm: false,
    });
  }

  static get runForward() {
    return new CommandWordFlags({
      ...CommandWordFlags.empty,
      run: true,
    });
  }

  static get runReverse() {
    return new CommandWordFlags({
      ...CommandWordFlags.empty,
      run: true,
      reverse: true,
    });
  }

  static get stop() {
    return CommandWordFlags.empty;
  }

  static get resetFaultPulse() {
    return new CommandWordFlags({
      ...CommandWordFlags.empty,
      faultReset: true,
    });
  }
}

/**
 * Bidirectional transformation:
 * wire format = UInt16
 * domain format = CommandWordFlags
 */
export const CommandWordSchema = UInt16.pipe(
  Schema.transformOrFail(CommandWordFlags, {
    decode: (word) =>
      ParseResult.succeed(
        new CommandWordFlags({
          run: (word & bit(0)) !== 0,
          reverse: (word & bit(1)) !== 0,
          externalFault: (word & bit(2)) !== 0,
          faultReset: (word & bit(3)) !== 0,
          commS1: (word & bit(6)) !== 0,
          commS2: (word & bit(7)) !== 0,
          commS3: (word & bit(8)) !== 0,
          commS4: (word & bit(9)) !== 0,
          commS5: (word & bit(10)) !== 0,
          commS6: (word & bit(11)) !== 0,
          commS7: (word & bit(12)) !== 0,
          commS8: (word & bit(13)) !== 0,
          inverterMode: (word & bit(14)) !== 0,
          torqueByComm: (word & bit(15)) !== 0,
        }),
      ),
    encode: (flags, _, ast) => {
      const word =
        (flags.run ? bit(0) : 0) |
        (flags.reverse ? bit(1) : 0) |
        (flags.externalFault ? bit(2) : 0) |
        (flags.faultReset ? bit(3) : 0) |
        (flags.commS1 ? bit(6) : 0) |
        (flags.commS2 ? bit(7) : 0) |
        (flags.commS3 ? bit(8) : 0) |
        (flags.commS4 ? bit(9) : 0) |
        (flags.commS5 ? bit(10) : 0) |
        (flags.commS6 ? bit(11) : 0) |
        (flags.commS7 ? bit(12) : 0) |
        (flags.commS8 ? bit(13) : 0) |
        (flags.inverterMode ? bit(14) : 0) |
        (flags.torqueByComm ? bit(15) : 0);

      return Number.isInteger(word) && word >= 0 && word <= 0xffff
        ? ParseResult.succeed(word as UInt16)
        : ParseResult.fail(
            new ParseResult.Type(
              ast,
              flags,
              "Command word is out of UInt16 range",
            ),
          );
    },
  }),
);

/**
 * Decoders / encoders
 */
export const decodeCommandWord = Schema.decodeUnknown(CommandWordSchema);
export const encodeCommandWord = Schema.encode(CommandWordSchema);
export const formattedCommandWord = Pretty.make(CommandWordSchema);

/**
 * Patch-friendly input for library ergonomics.
 */
export class CommandWordPatch extends Schema.Class<CommandWordPatch>(
  "CommandWordPatch",
)({
  run: Schema.optional(Schema.Boolean),
  reverse: Schema.optional(Schema.Boolean),
  externalFault: Schema.optional(Schema.Boolean),
  faultReset: Schema.optional(Schema.Boolean),
  commS1: Schema.optional(Schema.Boolean),
  commS2: Schema.optional(Schema.Boolean),
  commS3: Schema.optional(Schema.Boolean),
  commS4: Schema.optional(Schema.Boolean),
  commS5: Schema.optional(Schema.Boolean),
  commS6: Schema.optional(Schema.Boolean),
  commS7: Schema.optional(Schema.Boolean),
  commS8: Schema.optional(Schema.Boolean),
  inverterMode: Schema.optional(Schema.Boolean),
  torqueByComm: Schema.optional(Schema.Boolean),
}) {}

export const mergeCommandWordPatch = (
  base: CommandWordFlags,
  patch: CommandWordPatch,
): CommandWordFlags =>
  new CommandWordFlags({
    run: patch.run ?? base.run,
    reverse: patch.reverse ?? base.reverse,
    externalFault: patch.externalFault ?? base.externalFault,
    faultReset: patch.faultReset ?? base.faultReset,
    commS1: patch.commS1 ?? base.commS1,
    commS2: patch.commS2 ?? base.commS2,
    commS3: patch.commS3 ?? base.commS3,
    commS4: patch.commS4 ?? base.commS4,
    commS5: patch.commS5 ?? base.commS5,
    commS6: patch.commS6 ?? base.commS6,
    commS7: patch.commS7 ?? base.commS7,
    commS8: patch.commS8 ?? base.commS8,
    inverterMode: patch.inverterMode ?? base.inverterMode,
    torqueByComm: patch.torqueByComm ?? base.torqueByComm,
  });

/**
 * Intent-level constructors
 */
export const commandWord = {
  stop: (): CommandWordFlags => CommandWordFlags.stop,
  runForward: (): CommandWordFlags => CommandWordFlags.runForward,
  runReverse: (): CommandWordFlags => CommandWordFlags.runReverse,
  resetFaultPulse: (): CommandWordFlags => CommandWordFlags.resetFaultPulse,
  withInverterMode: (base: CommandWordFlags): CommandWordFlags =>
    new CommandWordFlags({
      ...base,
      inverterMode: true,
    }),
};

// NOTE: ==================================================================
//  FREQUENCY COMMAND (Register 0x2502)
// ========================================================================

/**
 * Frequency in Hertz (domain representation for frequency command).
 */
export type FrequencyHz = number & Brand.Brand<"FrequencyHz">;

export const FrequencyHz = Schema.Number.pipe(
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(600),
  Schema.brand("FrequencyHz"),
);

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.01 Hz per count, range 0-6000 → 0-600.00 Hz)
 * domain format = FrequencyHz
 */
export const FrequencyCommandSchema = UInt16.pipe(
  Schema.transform(FrequencyHz, {
    decode: (word) => (word * 0.01) as FrequencyHz,
    encode: (hz) => Math.round(hz * 100) as UInt16,
  }),
);

export const decodeFrequencyCommand = Schema.decodeUnknown(
  FrequencyCommandSchema,
);
export const encodeFrequencyCommand = Schema.encode(FrequencyCommandSchema);
export const formattedFrequencyCommand = Pretty.make(FrequencyCommandSchema);

// NOTE: ==================================================================
//  TORQUE COMMAND (Register 0x2503)
// ========================================================================

/**
 * Branded 16-bit signed word for Modbus register values.
 */
export type Int16 = number & Brand.Brand<"Int16">;

export const Int16 = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(-0x8000),
  Schema.lessThanOrEqualTo(0x7fff),
  Schema.brand("Int16"),
);

/**
 * Torque as a percentage of rated torque (domain representation).
 */
export type TorquePercent = number & Brand.Brand<"TorquePercent">;

export const TorquePercent = Schema.Number.pipe(
  Schema.greaterThanOrEqualTo(-100),
  Schema.lessThanOrEqualTo(100),
  Schema.brand("TorquePercent"),
);

/**
 * Bidirectional transformation:
 * wire format = Int16 (±8192 = ±100% rated torque)
 * domain format = TorquePercent
 */
export const TorqueCommandSchema = Int16.pipe(
  Schema.transform(TorquePercent, {
    decode: (word) => (word / 81.92) as TorquePercent,
    encode: (percent) => Math.round(percent * 81.92) as Int16,
  }),
);

export const decodeTorqueCommand = Schema.decodeUnknown(TorqueCommandSchema);
export const encodeTorqueCommand = Schema.encode(TorqueCommandSchema);
export const formattedTorqueCommand = Pretty.make(TorqueCommandSchema);

// NOTE: ==================================================================
//  SPEED LIMIT COMMAND (Register 0x2504)
// ========================================================================

/**
 * Speed limit as a percentage of nominal speed (domain representation).
 */
export type SpeedLimitPercent = number & Brand.Brand<"SpeedLimitPercent">;

export const SpeedLimitPercent = Schema.Number.pipe(
  Schema.greaterThanOrEqualTo(-120),
  Schema.lessThanOrEqualTo(120),
  Schema.brand("SpeedLimitPercent"),
);

/**
 * Bidirectional transformation:
 * wire format = Int16 (±120 = ±120% of nominal speed, 1:1 mapping)
 * domain format = SpeedLimitPercent
 */
export const SpeedLimitCommandSchema = Int16.pipe(
  Schema.transform(SpeedLimitPercent, {
    decode: (word) => word as unknown as SpeedLimitPercent,
    encode: (percent) => percent as unknown as Int16,
  }),
);

export const decodeSpeedLimitCommand = Schema.decodeUnknown(
  SpeedLimitCommandSchema,
);
export const encodeSpeedLimitCommand = Schema.encode(SpeedLimitCommandSchema);
export const formattedSpeedLimitCommand = Pretty.make(SpeedLimitCommandSchema);

// NOTE: ==================================================================
//  ANALOG OUTPUT COMMANDS (Registers 0x2505-0x2506)
// ========================================================================

/**
 * Voltage in volts (domain representation for analog output commands).
 */
export type Voltage = number & Brand.Brand<"Voltage">;

export const Voltage = Schema.Number.pipe(
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(10),
  Schema.brand("Voltage"),
);

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0-1000 → 0.00V-10.00V, 0.01V per count)
 * domain format = Voltage
 */
export const AnalogOut1CommandSchema = UInt16.pipe(
  Schema.transform(Voltage, {
    decode: (word) => (word / 100) as Voltage,
    encode: (volts) => Math.round(volts * 100) as UInt16,
  }),
);

export const decodeAnalogOut1Command = Schema.decodeUnknown(
  AnalogOut1CommandSchema,
);
export const encodeAnalogOut1Command = Schema.encode(AnalogOut1CommandSchema);
export const formattedAnalogOut1Command = Pretty.make(AnalogOut1CommandSchema);

export const AnalogOut2CommandSchema = UInt16.pipe(
  Schema.transform(Voltage, {
    decode: (word) => (word / 100) as Voltage,
    encode: (volts) => Math.round(volts * 100) as UInt16,
  }),
);

export const decodeAnalogOut2Command = Schema.decodeUnknown(
  AnalogOut2CommandSchema,
);
export const encodeAnalogOut2Command = Schema.encode(AnalogOut2CommandSchema);
export const formattedAnalogOut2Command = Pretty.make(AnalogOut2CommandSchema);

// NOTE: ==================================================================
//  DIGITAL OUTPUT COMMAND (Register 0x2507)
// ========================================================================

/**
 * Human-readable digital output control word shape.
 */
export class DigitalOutCommandFlags extends Schema.Class<DigitalOutCommandFlags>(
  "DigitalOutCommandFlags",
)({
  ry1: Schema.Boolean,
  ry2: Schema.Boolean,
  pulse: Schema.Boolean,
}) {
  static get empty() {
    return new DigitalOutCommandFlags({
      ry1: false,
      ry2: false,
      pulse: false,
    });
  }
}

/**
 * Bidirectional transformation:
 * wire format = UInt16
 * domain format = DigitalOutCommandFlags
 */
export const DigitalOutCommandSchema = UInt16.pipe(
  Schema.transformOrFail(DigitalOutCommandFlags, {
    decode: (word) =>
      ParseResult.succeed(
        new DigitalOutCommandFlags({
          ry1: (word & bit(0)) !== 0,
          ry2: (word & bit(1)) !== 0,
          pulse: (word & bit(2)) !== 0,
        }),
      ),
    encode: (flags, _, ast) => {
      const word =
        (flags.ry1 ? bit(0) : 0) |
        (flags.ry2 ? bit(1) : 0) |
        (flags.pulse ? bit(2) : 0);
      return Number.isInteger(word) && word >= 0 && word <= 0xffff
        ? ParseResult.succeed(word as UInt16)
        : ParseResult.fail(
            new ParseResult.Type(
              ast,
              flags,
              "Digital output word is out of UInt16 range",
            ),
          );
    },
  }),
);

export const decodeDigitalOutCommand = Schema.decodeUnknown(DigitalOutCommandSchema);
export const encodeDigitalOutCommand = Schema.encode(DigitalOutCommandSchema);
export const formattedDigitalOutCommand = Pretty.make(DigitalOutCommandSchema);

// NOTE: ==================================================================
//  STATE MONITOR (Register 0x2520)
// ========================================================================

/**
 * Human-readable state monitor word shape.
 * Maps to the A510 Operation Status register (0x2520).
 */
export class StateMonitorFlags extends Schema.Class<StateMonitorFlags>(
  "StateMonitorFlags",
)({
  operation: Schema.Boolean,
  direction: Schema.Boolean,
  inverterReady: Schema.Boolean,
  fault: Schema.Boolean,
  warning: Schema.Boolean,
  zeroSpeed: Schema.Boolean,
  is440V: Schema.Boolean,
  frequencyAgree: Schema.Boolean,
  setFrequencyAgree: Schema.Boolean,
  frequencyDetection1: Schema.Boolean,
  frequencyDetection2: Schema.Boolean,
  underVoltage: Schema.Boolean,
  baseblock: Schema.Boolean,
  freqRefNotFromComm: Schema.Boolean,
  seqNotFromComm: Schema.Boolean,
  overTorque: Schema.Boolean,
}) {
  static get empty() {
    return new StateMonitorFlags({
      operation: false,
      direction: false,
      inverterReady: false,
      fault: false,
      warning: false,
      zeroSpeed: false,
      is440V: false,
      frequencyAgree: false,
      setFrequencyAgree: false,
      frequencyDetection1: false,
      frequencyDetection2: false,
      underVoltage: false,
      baseblock: false,
      freqRefNotFromComm: false,
      seqNotFromComm: false,
      overTorque: false,
    });
  }
}

/**
 * Bidirectional transformation:
 * wire format = UInt16
 * domain format = StateMonitorFlags
 */
export const StateMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(StateMonitorFlags, {
    decode: (word) =>
      ParseResult.succeed(
        new StateMonitorFlags({
          operation: (word & bit(0)) !== 0,
          direction: (word & bit(1)) !== 0,
          inverterReady: (word & bit(2)) !== 0,
          fault: (word & bit(3)) !== 0,
          warning: (word & bit(4)) !== 0,
          zeroSpeed: (word & bit(5)) !== 0,
          is440V: (word & bit(6)) !== 0,
          frequencyAgree: (word & bit(7)) !== 0,
          setFrequencyAgree: (word & bit(8)) !== 0,
          frequencyDetection1: (word & bit(9)) !== 0,
          frequencyDetection2: (word & bit(10)) !== 0,
          underVoltage: (word & bit(11)) !== 0,
          baseblock: (word & bit(12)) !== 0,
          freqRefNotFromComm: (word & bit(13)) !== 0,
          seqNotFromComm: (word & bit(14)) !== 0,
          overTorque: (word & bit(15)) !== 0,
        }),
      ),
    encode: (flags, _, ast) =>
      readOnlyEncodeFailure("State monitor register 0x2520", flags, ast),
  }),
);

export const decodeStateMonitor = Schema.decodeUnknown(StateMonitorSchema);
export const formattedStateMonitor = Pretty.make(StateMonitorSchema);

// NOTE: ==================================================================
//  ERROR DESCRIPTION MONITOR (Register 0x2521)
// ========================================================================

/**
 * Branded string for the resolved error description text.
 */
export type ErrorDescriptionMonitor = string & Brand.Brand<"ErrorDescriptionMonitor">;

export const ErrorDescriptionMonitor = Schema.String.pipe(
  Schema.brand("ErrorDescriptionMonitor"),
);

/**
 * Human-readable labels for known A510 error codes from register 0x2521.
 */
const errorDescriptionLabels: Record<number, string> = {
  1: "UV (Under-voltage)",
  2: "OC (Over-current)",
  3: "OV (Over-voltage)",
  4: "OH1 (Overheat 1)",
  5: "OL1 (Electronic thermal overload)",
  6: "OL2 (Motor overload)",
  7: "OT (Over-torque)",
  8: "UT (Under-torque)",
  9: "SC (Short circuit)",
  10: "Ground OC (Ground fault)",
  11: "Fuse broken",
  12: "Input Phase Loss",
  13: "Output Phase Loss",
  14: "PG Overspeed",
  15: "PG Open",
  16: "PG Speed Deviation",
  17: "External Fault 01",
  18: "External Fault 02",
  19: "External Fault 03",
  20: "External Fault 04",
  21: "External Fault 05",
  22: "External Fault 06",
  23: "External Fault 07",
  24: "External Fault 08",
  25: "FB (Feedback)",
  26: "OPR (Option)",
  27: "Reserved",
  28: "CE (Communication error)",
  29: "STO (Safe torque off)",
  30: "Over Torque 2",
  38: "CF07 (Configuration error 07)",
  41: "OLDOP",
  46: "OH4 (Motor overheat)",
  47: "SS1",
  48: "CF20 (Configuration error 20)",
  49: "RUN",
};

/**
 * Bidirectional transformation:
 * wire format = UInt16 (raw fault code)
 * domain format = ErrorDescriptionMonitor (resolved description text)
 */
export const ErrorDescriptionMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(ErrorDescriptionMonitor, {
    decode: (word) =>
      Effect.succeed(
        (errorDescriptionLabels[word] ??
          `Unknown (${word})`) as ErrorDescriptionMonitor,
      ),
    encode: (value, _, ast) =>
      readOnlyEncodeFailure("Error description monitor register 0x2521", value, ast),
    strict: false,
  }),
);

export const decodeErrorDescriptionMonitor = Schema.decodeUnknown(
  ErrorDescriptionMonitorSchema,
);
export const formattedErrorDescriptionMonitor = Pretty.make(ErrorDescriptionMonitorSchema);

// NOTE: ==================================================================
//  DIGITAL INPUT STATE MONITOR (Register 0x2522)
// ========================================================================

/**
 * Human-readable digital input state word shape.
 * Maps to the A510 Digital Input State register (0x2522).
 */
export class DigitalInStateMonitorFlags extends Schema.Class<DigitalInStateMonitorFlags>(
  "DigitalInStateMonitorFlags",
)({
  s1: Schema.Boolean,
  s2: Schema.Boolean,
  s3: Schema.Boolean,
  s4: Schema.Boolean,
  s5: Schema.Boolean,
  s6: Schema.Boolean,
  s7: Schema.Boolean,
  s8: Schema.Boolean,
}) {
  static get empty() {
    return new DigitalInStateMonitorFlags({
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
      s7: false,
      s8: false,
    });
  }
}

/**
 * Bidirectional transformation:
 * wire format = UInt16
 * domain format = DigitalInStateMonitorFlags
 */
export const DigitalInStateMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(DigitalInStateMonitorFlags, {
    decode: (word) =>
      ParseResult.succeed(
        new DigitalInStateMonitorFlags({
          s1: (word & bit(0)) !== 0,
          s2: (word & bit(1)) !== 0,
          s3: (word & bit(2)) !== 0,
          s4: (word & bit(3)) !== 0,
          s5: (word & bit(4)) !== 0,
          s6: (word & bit(5)) !== 0,
          s7: (word & bit(6)) !== 0,
          s8: (word & bit(7)) !== 0,
        }),
      ),
    encode: (flags, _, ast) =>
      readOnlyEncodeFailure("Digital input state register 0x2522", flags, ast),
    strict: false,
  }),
);

export const decodeDigitalInStateMonitor = Schema.decodeUnknown(DigitalInStateMonitorSchema);
export const formattedDigitalInStateMonitor = Pretty.make(DigitalInStateMonitorSchema);

// NOTE: ==================================================================
//  FREQUENCY COMMAND MONITOR (Register 0x2523)
// ========================================================================

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.01 Hz per count)
 * domain format = FrequencyHz
 */
export const FrequencyCommandMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(FrequencyHz, {
    decode: (word) => Effect.succeed((word * 0.01) as FrequencyHz),
    encode: (hz, _, ast) =>
      readOnlyEncodeFailure("Frequency command monitor register 0x2523", hz, ast),
    strict: false,
  }),
);

export const decodeFrequencyCommandMonitor = Schema.decodeUnknown(
  FrequencyCommandMonitorSchema,
);
export const formattedFrequencyCommandMonitor = Pretty.make(
  FrequencyCommandMonitorSchema,
);

// NOTE: ==================================================================
//  OUTPUT FREQUENCY MONITOR (Register 0x2524)
// ========================================================================

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.01 Hz per count)
 * domain format = FrequencyHz
 */
export const OutputFrequencyMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(FrequencyHz, {
    decode: (word) => Effect.succeed((word * 0.01) as FrequencyHz),
    encode: (hz, _, ast) =>
      readOnlyEncodeFailure("Output frequency monitor register 0x2524", hz, ast),
    strict: false,
  }),
);

export const decodeOutputFrequencyMonitor = Schema.decodeUnknown(
  OutputFrequencyMonitorSchema,
);
export const formattedOutputFrequencyMonitor = Pretty.make(
  OutputFrequencyMonitorSchema,
);

// NOTE: ==================================================================
//  DC BUS VOLTAGE COMMAND MONITOR (Register 0x2526)
// ========================================================================

/**
 * DC bus voltage in volts (domain representation).
 */
export type DCBusVoltage = number & Brand.Brand<"DCBusVoltage">;

export const DCBusVoltage = Schema.Number.pipe(
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(1000),
  Schema.brand("DCBusVoltage"),
);

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.1V per count, range 0-10000 → 0.0V-1000.0V)
 * domain format = DCBusVoltage
 */
export const DCBusVoltageCommandMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(DCBusVoltage, {
    decode: (word) => Effect.succeed((word * 0.1) as DCBusVoltage),
    encode: (voltage, _, ast) =>
      readOnlyEncodeFailure("DC voltage command monitor register 0x2526", voltage, ast),
    strict: false,
  }),
);

export const decodeDCBusVoltageCommandMonitor = Schema.decodeUnknown(
  DCBusVoltageCommandMonitorSchema,
);
export const formattedDCBusVoltageCommandMonitor = Pretty.make(
  DCBusVoltageCommandMonitorSchema,
);

// NOTE: ==================================================================
//  OUTPUT CURRENT MONITOR (Register 0x2527)
// ========================================================================

/**
 * Current in amps (domain representation).
 */
export type CurrentAmps = number & Brand.Brand<"CurrentAmps">;

export const CurrentAmps = Schema.Number.pipe(
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(6553.5),
  Schema.brand("CurrentAmps"),
);

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.1A per count)
 * domain format = CurrentAmps
 */
export const OutputCurrentMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(CurrentAmps, {
    decode: (word) => Effect.succeed((word * 0.1) as CurrentAmps),
    encode: (current, _, ast) =>
      readOnlyEncodeFailure("Output current monitor register 0x2527", current, ast),
    strict: false,
  }),
);

export const decodeOutputCurrentMonitor = Schema.decodeUnknown(
  OutputCurrentMonitorSchema,
);
export const formattedOutputCurrentMonitor = Pretty.make(
  OutputCurrentMonitorSchema,
);

// NOTE: ==================================================================
//  WARNING DESCRIPTION MONITOR (Register 0x2528)
// ========================================================================

/**
 * Branded string for the resolved warning description text.
 */
export type WarningDescriptionMonitor = string & Brand.Brand<"WarningDescriptionMonitor">;

export const WarningDescriptionMonitor = Schema.String.pipe(
  Schema.brand("WarningDescriptionMonitor"),
);

/**
 * Human-readable labels for known A510 warning codes from register 0x2528.
 */
const warningDescriptionLabels: Record<number, string> = {
  0: "No alarm",
  1: "OV (Overvoltage)",
  2: "UV (Undervoltage)",
  3: "OL2 (Overload 2)",
  4: "OH2 (Overheat 2)",
  5: "Reserved",
  6: "OT (Over-torque)",
  7: "Reserved",
  8: "Reserved",
  9: "UT (Under-torque)",
  10: "OS (Overspeed)",
  11: "PGO (PG open)",
  12: "DEV (Speed deviation)",
  13: "CE (Communication error)",
  14: "CALL (Communication call)",
  15: "Reserved",
  16: "EF0 (External fault 0)",
  17: "EF1 (External fault 1)",
  18: "EF2 (External fault 2)",
  19: "EF3 (External fault 3)",
  20: "EF4 (External fault 4)",
  21: "EF5 (External fault 5)",
  22: "EF6 (External fault 6)",
  23: "EF7 (External fault 7)",
  24: "EF8 (External fault 8)",
  25: "Reserved",
  26: "CLB",
  27: "Reserved",
  28: "CT",
  29: "USP",
  30: "RDE",
  31: "WRE",
  32: "FB",
  33: "VRYE",
  34: "SE01",
  35: "SE02",
  36: "SE03",
  37: "Reserved",
  38: "SE05",
  39: "HPERR",
  40: "EF",
  41: "Reserved",
  42: "Reserved",
  43: "RDP",
  44: "Reserved",
  45: "OL1 (Overload 1)",
  46: "HP_ER",
  47: "SE10",
  48: "Reserved",
  49: "BB1 (Baseblock 1)",
  50: "BB2 (Baseblock 2)",
  51: "BB3 (Baseblock 3)",
  52: "BB4 (Baseblock 4)",
  53: "BB5 (Baseblock 5)",
  54: "BB6 (Baseblock 6)",
  55: "BB7 (Baseblock 7)",
  56: "BB8 (Baseblock 8)",
  57: "Reserved",
  58: "Reserved",
  59: "Reserved",
  60: "Reserved",
  61: "RETRY",
  62: "SE07",
  63: "SE08",
  64: "Reserved",
  65: "OH1 (Overheat 1)",
  66: "FIRE",
  67: "ES",
  68: "STP1",
  69: "BDERR",
  70: "EPERR",
  71: "ADCER",
  72: "Reserved",
  73: "STP0",
  74: "ENC",
  75: "STP2",
  76: "RUNER",
  77: "LOC",
  78: "PTCLS",
  79: "Sys Init",
  80: "FBLSS",
};

/**
 * Bidirectional transformation:
 * wire format = UInt16 (raw warning code)
 * domain format = WarningDescriptionMonitor (resolved description text)
 */
export const WarningDescriptionMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(WarningDescriptionMonitor, {
    decode: (word) =>
      Effect.succeed(
        (warningDescriptionLabels[word] ??
          `Unknown warning (${word})`) as WarningDescriptionMonitor,
      ),
    encode: (value, _, ast) =>
      readOnlyEncodeFailure("Warning description monitor register 0x2528", value, ast),
    strict: false,
  }),
);

export const decodeWarningDescriptionMonitor = Schema.decodeUnknown(
  WarningDescriptionMonitorSchema,
);
export const formattedWarningDescriptionMonitor = Pretty.make(
  WarningDescriptionMonitorSchema,
);

// NOTE: ==================================================================
//  DIGITAL OUTPUT STATE MONITOR (Register 0x2529)
// ========================================================================

/**
 * Human-readable digital output state word shape.
 * Maps to the A510 Digital Output State register (0x2529).
 */
export class DigitalOutStateMonitorFlags extends Schema.Class<DigitalOutStateMonitorFlags>(
  "DigitalOutStateMonitorFlags",
)({
  ry1: Schema.Boolean,
  ry2: Schema.Boolean,
  pulse: Schema.Boolean,
}) {
  static get empty() {
    return new DigitalOutStateMonitorFlags({
      ry1: false,
      ry2: false,
      pulse: false,
    });
  }
}

/**
 * Bidirectional transformation:
 * wire format = UInt16
 * domain format = DigitalOutStateMonitorFlags
 */
export const DigitalOutStateMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(DigitalOutStateMonitorFlags, {
    decode: (word) =>
      ParseResult.succeed(
        new DigitalOutStateMonitorFlags({
          ry1: (word & bit(0)) !== 0,
          ry2: (word & bit(1)) !== 0,
          pulse: (word & bit(2)) !== 0,
        }),
      ),
    encode: (flags, _, ast) =>
      readOnlyEncodeFailure("Digital output state register 0x2529", flags, ast),
    strict: false,
  }),
);

export const decodeDigitalOutStateMonitor = Schema.decodeUnknown(
  DigitalOutStateMonitorSchema,
);
export const formattedDigitalOutStateMonitor = Pretty.make(
  DigitalOutStateMonitorSchema,
);

// NOTE: ==================================================================
//  ANALOG OUT 1 MONITOR (Register 0x252A)
// ========================================================================

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0-1000 → 0.00V-10.00V, 0.01V per count)
 * domain format = Voltage
 */
export const AnalogOut1MonitorSchema = UInt16.pipe(
  Schema.transformOrFail(Voltage, {
    decode: (word) => Effect.succeed((word / 100) as Voltage),
    encode: (voltage, _, ast) =>
      readOnlyEncodeFailure("Analog out 1 monitor register 0x252A", voltage, ast),
    strict: false,
  }),
);

export const decodeAnalogOut1Monitor = Schema.decodeUnknown(
  AnalogOut1MonitorSchema,
);
export const formattedAnalogOut1Monitor = Pretty.make(
  AnalogOut1MonitorSchema,
);

// NOTE: ==================================================================
//  ANALOG OUT 2 MONITOR (Register 0x252B)
// ========================================================================

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0-1000 → 0.00V-10.00V, 0.01V per count)
 * domain format = Voltage
 */
export const AnalogOut2MonitorSchema = UInt16.pipe(
  Schema.transformOrFail(Voltage, {
    decode: (word) => Effect.succeed((word / 100) as Voltage),
    encode: (voltage, _, ast) =>
      readOnlyEncodeFailure("Analog out 2 monitor register 0x252B", voltage, ast),
    strict: false,
  }),
);

export const decodeAnalogOut2Monitor = Schema.decodeUnknown(
  AnalogOut2MonitorSchema,
);
export const formattedAnalogOut2Monitor = Pretty.make(
  AnalogOut2MonitorSchema,
);

// NOTE: ==================================================================
//  ANALOG IN 1 MONITOR (Register 0x252C)
// ========================================================================

/**
 * Analog input as a percentage (domain representation).
 * 0.1% per count, range 0-1000 → 0.0%-100.0%.
 */
export type AnalogInputPercent = number & Brand.Brand<"AnalogInputPercent">;

export const AnalogInputPercent = Schema.Number.pipe(
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(100),
  Schema.brand("AnalogInputPercent"),
);

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.1% per count)
 * domain format = AnalogInputPercent
 */
export const AnalogIn1MonitorSchema = UInt16.pipe(
  Schema.transformOrFail(AnalogInputPercent, {
    decode: (word) => Effect.succeed((word * 0.1) as AnalogInputPercent),
    encode: (percent, _, ast) =>
      readOnlyEncodeFailure("Analog in 1 monitor register 0x252C", percent, ast),
    strict: false,
  }),
);

export const decodeAnalogIn1Monitor = Schema.decodeUnknown(
  AnalogIn1MonitorSchema,
);
export const formattedAnalogIn1Monitor = Pretty.make(
  AnalogIn1MonitorSchema,
);

// NOTE: ==================================================================
//  ANALOG IN 2 MONITOR (Register 0x252D)
// ========================================================================

/**
 * Bidirectional transformation:
 * wire format = UInt16 (0.1% per count)
 * domain format = AnalogInputPercent
 */
export const AnalogIn2MonitorSchema = UInt16.pipe(
  Schema.transformOrFail(AnalogInputPercent, {
    decode: (word) => Effect.succeed((word * 0.1) as AnalogInputPercent),
    encode: (percent, _, ast) =>
      readOnlyEncodeFailure("Analog in 2 monitor register 0x252D", percent, ast),
    strict: false,
  }),
);

export const decodeAnalogIn2Monitor = Schema.decodeUnknown(
  AnalogIn2MonitorSchema,
);
export const formattedAnalogIn2Monitor = Pretty.make(
  AnalogIn2MonitorSchema,
);

// NOTE: ==================================================================
//  A510 CHECK MONITOR (Register 0x252F)
// ========================================================================

/**
 * Branded string for the resolved drive series identification.
 */
export type A510CheckMonitor = string & Brand.Brand<"A510CheckMonitor">;

export const A510CheckMonitor = Schema.String.pipe(
  Schema.brand("A510CheckMonitor"),
);

/**
 * Human-readable labels for known A510 check codes.
 */
const a510CheckLabels: Record<number, string> = {
  0x01: "L510(s)",
  0x02: "E510(s)",
  0x03: "A510(s)",
  0x04: "F510",
};

/**
 * Bidirectional transformation:
 * wire format = UInt16 (model identification code)
 * domain format = A510CheckMonitor (resolved model name)
 */
export const A510CheckMonitorSchema = UInt16.pipe(
  Schema.transformOrFail(A510CheckMonitor, {
    decode: (word) =>
      Effect.succeed(
        (a510CheckLabels[word] ?? `Unknown (0x${word.toString(16)})`) as A510CheckMonitor,
      ),
    encode: (value, _, ast) =>
      readOnlyEncodeFailure("A510 check monitor register 0x252F", value, ast),
    strict: false,
  }),
);

export const decodeA510CheckMonitor = Schema.decodeUnknown(
  A510CheckMonitorSchema,
);
export const formattedA510CheckMonitor = Pretty.make(
  A510CheckMonitorSchema,
);
