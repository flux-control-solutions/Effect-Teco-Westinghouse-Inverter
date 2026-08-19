/**
 * @fileoverview Bidirectional Effect schemas for A510 command and monitor register values.
 *
 * Provides {@link Schema} transformations between wire-format Modbus register values
 * (UInt16/Int16) and domain types (FrequencyHz, TorquePercent, etc.) with proper
 * scaling factors. Monitor registers are decode-only; command registers support
 * both encode and decode.
 *
 * Schema factories from {@link @flux-control/modbus-schema} are reused:
 * - **Scaled commands/monitors** → {@link makeScaledParam} / {@link makeSignedScaledParam}
 * - **Bitfield commands/monitors** → {@link makeBitfieldParam} (generated Patch + merge)
 * - **Lookup monitors** → {@link makeLookupParam} (with fallback for unknown codes)
 *
 * Key types:
 * - {@link CommandWordFlags} / {@link CommandWordSchema} – Operation command word (0x2501)
 * - {@link FrequencyHz} / {@link FrequencyCommandSchema} – Frequency command in Hz (0x2502)
 * - {@link TorquePercent} / {@link TorqueCommandSchema} – Torque command as % (0x2503)
 * - {@link StateMonitorFlags} / {@link StateMonitorSchema} – Inverter status flags (0x2520)
 * - {@link ErrorDescriptionMonitor} / {@link ErrorDescriptionMonitorSchema} – Fault code (0x2521)
 * - {@link WarningDescriptionMonitor} / {@link WarningDescriptionMonitorSchema} – Alarm code (0x2528)
 *
 * @module
 */

import {
  type RegisterMeta,
  makeBitfieldParam,
  makeLookupParam,
  makeScaledParam,
  makeSignedScaledParam,
} from '@flux-control/modbus-schema';
import { Brand, Schema } from 'effect';

// Re-export wire primitives (public surface preserved)
export { Int16, UInt16 } from '@flux-control/modbus-schema';

// ── Domain brands (device-side) ──────────────────────────

export type FrequencyHz = number & Brand.Brand<'FrequencyHz'>;
export const FrequencyHz = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(600),
).pipe(Schema.brand('FrequencyHz'));

export type TorquePercent = number & Brand.Brand<'TorquePercent'>;
export const TorquePercent = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(-100),
  Schema.isLessThanOrEqualTo(100),
).pipe(Schema.brand('TorquePercent'));

export type SpeedLimitPercent = number & Brand.Brand<'SpeedLimitPercent'>;
export const SpeedLimitPercent = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(-120),
  Schema.isLessThanOrEqualTo(120),
).pipe(Schema.brand('SpeedLimitPercent'));

export type Voltage = number & Brand.Brand<'Voltage'>;
export const Voltage = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(10),
).pipe(Schema.brand('Voltage'));

export type DCBusVoltage = number & Brand.Brand<'DCBusVoltage'>;
export const DCBusVoltage = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(1000),
).pipe(Schema.brand('DCBusVoltage'));

export type CurrentAmps = number & Brand.Brand<'CurrentAmps'>;
export const CurrentAmps = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(6553.5),
).pipe(Schema.brand('CurrentAmps'));

export type AnalogInputPercent = number & Brand.Brand<'AnalogInputPercent'>;
export const AnalogInputPercent = Schema.Number.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(100),
).pipe(Schema.brand('AnalogInputPercent'));

export type ErrorDescriptionMonitor = string & Brand.Brand<'ErrorDescriptionMonitor'>;
export const ErrorDescriptionMonitor = Schema.String.pipe(Schema.brand('ErrorDescriptionMonitor'));

export type WarningDescriptionMonitor = string & Brand.Brand<'WarningDescriptionMonitor'>;
export const WarningDescriptionMonitor = Schema.String.pipe(
  Schema.brand('WarningDescriptionMonitor'),
);

export type A510CheckMonitor = string & Brand.Brand<'A510CheckMonitor'>;
export const A510CheckMonitor = Schema.String.pipe(Schema.brand('A510CheckMonitor'));

// ── Metadata helpers ──────────────────────────────────────

const meta = (name: string, unit: string, range: string, def: string): RegisterMeta => ({
  name,
  unit,
  range,
  default: def,
});

// NOTE: ====================================================================
//  OPERATION COMMAND (Register 0x2501)
// ========================================================================

export class CommandWordFlags extends Schema.Class<CommandWordFlags>('CommandWordFlags')({
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
    return new CommandWordFlags({ ...CommandWordFlags.empty, run: true });
  }
  static get runReverse() {
    return new CommandWordFlags({ ...CommandWordFlags.empty, run: true, reverse: true });
  }
  static get stop() {
    return CommandWordFlags.empty;
  }
  static get resetFaultPulse() {
    return new CommandWordFlags({ ...CommandWordFlags.empty, faultReset: true });
  }
}

const commandWordLayout = {
  run: 0,
  reverse: 1,
  externalFault: 2,
  faultReset: 3,
  commS1: 6,
  commS2: 7,
  commS3: 8,
  commS4: 9,
  commS5: 10,
  commS6: 11,
  commS7: 12,
  commS8: 13,
  inverterMode: 14,
  torqueByComm: 15,
} as const satisfies Record<keyof CommandWordFlags, number>;

const _commandWordParam = makeBitfieldParam(
  0x2501,
  CommandWordFlags,
  commandWordLayout,
  meta('Operation Command', '-', 'bitfield', '0'),
);
export const CommandWordSchema = _commandWordParam.schema;
export const decodeCommandWord = _commandWordParam.decode;
export const encodeCommandWord = _commandWordParam.encode;
export const formattedCommandWord = _commandWordParam.formatted;
export const CommandWordPatch = _commandWordParam.patch;
export type CommandWordPatch = InstanceType<typeof CommandWordPatch>;
export const mergeCommandWordPatch = _commandWordParam.merge;

/**
 * Intent-level constructors for the operation command word.
 */
export const commandWord = {
  stop: (): CommandWordFlags => CommandWordFlags.stop,
  runForward: (): CommandWordFlags => CommandWordFlags.runForward,
  runReverse: (): CommandWordFlags => CommandWordFlags.runReverse,
  resetFaultPulse: (): CommandWordFlags => CommandWordFlags.resetFaultPulse,
  withInverterMode: (base: CommandWordFlags): CommandWordFlags =>
    new CommandWordFlags({ ...base, inverterMode: true }),
};

// NOTE: ====================================================================
//  FREQUENCY COMMAND (Register 0x2502)
// ========================================================================

const _frequencyCommandEntry = makeScaledParam(
  0x2502,
  0.01,
  meta('Frequency Command', 'Hz', '0.00–599.00', '0.00'),
  { domain: FrequencyHz },
);
export const decodeFrequencyCommand = _frequencyCommandEntry.decode;
export const encodeFrequencyCommand = _frequencyCommandEntry.encode;
export const formattedFrequencyCommand = _frequencyCommandEntry.formatted;
export const FrequencyCommandSchema = _frequencyCommandEntry.schema;

// NOTE: ====================================================================
//  TORQUE COMMAND (Register 0x2503)
// ========================================================================

const _torqueCommandEntry = makeSignedScaledParam(
  0x2503,
  1 / 81.92,
  meta('Torque Command', '%', '–100.0–100.0', '0.0'),
  { domain: TorquePercent },
);
export const decodeTorqueCommand = _torqueCommandEntry.decode;
export const encodeTorqueCommand = _torqueCommandEntry.encode;
export const formattedTorqueCommand = _torqueCommandEntry.formatted;
export const TorqueCommandSchema = _torqueCommandEntry.schema;

// NOTE: ====================================================================
//  SPEED LIMIT COMMAND (Register 0x2504)
// ========================================================================

const _speedLimitCommandEntry = makeSignedScaledParam(
  0x2504,
  1,
  meta('Speed Limit Command', '%', '–120–120', '0'),
  { domain: SpeedLimitPercent },
);
export const decodeSpeedLimitCommand = _speedLimitCommandEntry.decode;
export const encodeSpeedLimitCommand = _speedLimitCommandEntry.encode;
export const formattedSpeedLimitCommand = _speedLimitCommandEntry.formatted;
export const SpeedLimitCommandSchema = _speedLimitCommandEntry.schema;

// NOTE: ====================================================================
//  ANALOG OUTPUT COMMANDS (Registers 0x2505-0x2506)
// ========================================================================

const _analogOut1CommandEntry = makeScaledParam(
  0x2505,
  0.01,
  meta('Analog Out 1 Command', 'V', '0.00–10.00', '0.00'),
  { domain: Voltage },
);
export const decodeAnalogOut1Command = _analogOut1CommandEntry.decode;
export const encodeAnalogOut1Command = _analogOut1CommandEntry.encode;
export const formattedAnalogOut1Command = _analogOut1CommandEntry.formatted;
export const AnalogOut1CommandSchema = _analogOut1CommandEntry.schema;

const _analogOut2CommandEntry = makeScaledParam(
  0x2506,
  0.01,
  meta('Analog Out 2 Command', 'V', '0.00–10.00', '0.00'),
  { domain: Voltage },
);
export const decodeAnalogOut2Command = _analogOut2CommandEntry.decode;
export const encodeAnalogOut2Command = _analogOut2CommandEntry.encode;
export const formattedAnalogOut2Command = _analogOut2CommandEntry.formatted;
export const AnalogOut2CommandSchema = _analogOut2CommandEntry.schema;

// NOTE: ====================================================================
//  DIGITAL OUTPUT COMMAND (Register 0x2507)
// ========================================================================

export class DigitalOutCommandFlags extends Schema.Class<DigitalOutCommandFlags>(
  'DigitalOutCommandFlags',
)({
  ry1: Schema.Boolean,
  ry2: Schema.Boolean,
  pulse: Schema.Boolean,
}) {
  static get empty() {
    return new DigitalOutCommandFlags({ ry1: false, ry2: false, pulse: false });
  }
}

const digitalOutLayout = {
  ry1: 0,
  ry2: 1,
  pulse: 2,
} as const satisfies Record<keyof DigitalOutCommandFlags, number>;

const _digitalOutParam = makeBitfieldParam(
  0x2507,
  DigitalOutCommandFlags,
  digitalOutLayout,
  meta('Digital Out Command', '-', 'bitfield', '0'),
);
export const DigitalOutCommandSchema = _digitalOutParam.schema;
export const decodeDigitalOutCommand = _digitalOutParam.decode;
export const encodeDigitalOutCommand = _digitalOutParam.encode;
export const formattedDigitalOutCommand = _digitalOutParam.formatted;
export const DigitalOutCommandPatch = _digitalOutParam.patch;
export type DigitalOutCommandPatch = InstanceType<typeof DigitalOutCommandPatch>;
export const mergeDigitalOutCommandPatch = _digitalOutParam.merge;

// NOTE: ====================================================================
//  STATE MONITOR (Register 0x2520)
// ========================================================================

export class StateMonitorFlags extends Schema.Class<StateMonitorFlags>('StateMonitorFlags')({
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

const stateMonitorLayout = {
  operation: 0,
  direction: 1,
  inverterReady: 2,
  fault: 3,
  warning: 4,
  zeroSpeed: 5,
  is440V: 6,
  frequencyAgree: 7,
  setFrequencyAgree: 8,
  frequencyDetection1: 9,
  frequencyDetection2: 10,
  underVoltage: 11,
  baseblock: 12,
  freqRefNotFromComm: 13,
  seqNotFromComm: 14,
  overTorque: 15,
} as const satisfies Record<keyof StateMonitorFlags, number>;

const _stateMonitorParam = makeBitfieldParam(
  0x2520,
  StateMonitorFlags,
  stateMonitorLayout,
  meta('State Monitor', '-', 'bitfield', '0'),
  { readOnly: true },
);
export const StateMonitorSchema = _stateMonitorParam.schema;
export const decodeStateMonitor = _stateMonitorParam.decode;
export const formattedStateMonitor = _stateMonitorParam.formatted;

// NOTE: ====================================================================
//  ERROR DESCRIPTION MONITOR (Register 0x2521)
// ========================================================================

const errorDescriptionLabels: Record<number, string> = {
  1: 'UV (Under-voltage)',
  2: 'OC (Over-current)',
  3: 'OV (Over-voltage)',
  4: 'OH1 (Overheat 1)',
  5: 'OL1 (Electronic thermal overload)',
  6: 'OL2 (Motor overload)',
  7: 'OT (Over-torque)',
  8: 'UT (Under-torque)',
  9: 'SC (Short circuit)',
  10: 'Ground OC (Ground fault)',
  11: 'Fuse broken',
  12: 'Input Phase Loss',
  13: 'Output Phase Loss',
  14: 'PG Overspeed',
  15: 'PG Open',
  16: 'PG Speed Deviation',
  17: 'External Fault 01',
  18: 'External Fault 02',
  19: 'External Fault 03',
  20: 'External Fault 04',
  21: 'External Fault 05',
  22: 'External Fault 06',
  23: 'External Fault 07',
  24: 'External Fault 08',
  25: 'FB (Feedback)',
  26: 'OPR (Option)',
  27: 'Reserved',
  28: 'CE (Communication error)',
  29: 'STO (Safe torque off)',
  30: 'Over Torque 2',
  38: 'CF07 (Configuration error 07)',
  41: 'OLDOP',
  46: 'OH4 (Motor overheat)',
  47: 'SS1',
  48: 'CF20 (Configuration error 20)',
  49: 'RUN',
};

const _errorDescriptionMonitorEntry = makeLookupParam(
  0x2521,
  errorDescriptionLabels as Record<number, ErrorDescriptionMonitor>,
  (raw) => `Unknown (${raw})` as ErrorDescriptionMonitor,
  meta('Error Description Monitor', '-', '0–49', '0'),
  { domain: ErrorDescriptionMonitor },
);
export const decodeErrorDescriptionMonitor = _errorDescriptionMonitorEntry.decode;
export const formattedErrorDescriptionMonitor = _errorDescriptionMonitorEntry.formatted;
export const ErrorDescriptionMonitorSchema = _errorDescriptionMonitorEntry.schema;

// NOTE: ====================================================================
//  DIGITAL INPUT STATE MONITOR (Register 0x2522)
// ========================================================================

export class DigitalInStateMonitorFlags extends Schema.Class<DigitalInStateMonitorFlags>(
  'DigitalInStateMonitorFlags',
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

const digitalInLayout = {
  s1: 0,
  s2: 1,
  s3: 2,
  s4: 3,
  s5: 4,
  s6: 5,
  s7: 6,
  s8: 7,
} as const satisfies Record<keyof DigitalInStateMonitorFlags, number>;

const _digitalInParam = makeBitfieldParam(
  0x2522,
  DigitalInStateMonitorFlags,
  digitalInLayout,
  meta('Digital In State Monitor', '-', 'bitfield', '0'),
  { readOnly: true },
);
export const DigitalInStateMonitorSchema = _digitalInParam.schema;
export const decodeDigitalInStateMonitor = _digitalInParam.decode;
export const formattedDigitalInStateMonitor = _digitalInParam.formatted;

// NOTE: ====================================================================
//  FREQUENCY COMMAND MONITOR (Register 0x2523)
// ========================================================================

const _frequencyCommandMonitorEntry = makeScaledParam(
  0x2523,
  0.01,
  meta('Frequency Command Monitor', 'Hz', '0.00–599.00', '0.00'),
  { domain: FrequencyHz, readOnly: true },
);
export const decodeFrequencyCommandMonitor = _frequencyCommandMonitorEntry.decode;
export const formattedFrequencyCommandMonitor = _frequencyCommandMonitorEntry.formatted;
export const FrequencyCommandMonitorSchema = _frequencyCommandMonitorEntry.schema;

// NOTE: ====================================================================
//  OUTPUT FREQUENCY MONITOR (Register 0x2524)
// ========================================================================

const _outputFrequencyMonitorEntry = makeScaledParam(
  0x2524,
  0.01,
  meta('Output Frequency Monitor', 'Hz', '0.00–599.00', '0.00'),
  { domain: FrequencyHz, readOnly: true },
);
export const decodeOutputFrequencyMonitor = _outputFrequencyMonitorEntry.decode;
export const formattedOutputFrequencyMonitor = _outputFrequencyMonitorEntry.formatted;
export const OutputFrequencyMonitorSchema = _outputFrequencyMonitorEntry.schema;

// NOTE: ====================================================================
//  DC BUS VOLTAGE COMMAND MONITOR (Register 0x2526)
// ========================================================================

const _dcBusVoltageCommandMonitorEntry = makeScaledParam(
  0x2526,
  0.1,
  meta('DC Bus Voltage Monitor', 'V', '0.0–1000.0', '0.0'),
  { domain: DCBusVoltage, readOnly: true },
);
export const decodeDCBusVoltageCommandMonitor = _dcBusVoltageCommandMonitorEntry.decode;
export const formattedDCBusVoltageCommandMonitor = _dcBusVoltageCommandMonitorEntry.formatted;
export const DCBusVoltageCommandMonitorSchema = _dcBusVoltageCommandMonitorEntry.schema;

// NOTE: ====================================================================
//  OUTPUT CURRENT MONITOR (Register 0x2527)
// ========================================================================

const _outputCurrentMonitorEntry = makeScaledParam(
  0x2527,
  0.1,
  meta('Output Current Monitor', 'A', '0.0–6553.5', '0.0'),
  { domain: CurrentAmps, readOnly: true },
);
export const decodeOutputCurrentMonitor = _outputCurrentMonitorEntry.decode;
export const formattedOutputCurrentMonitor = _outputCurrentMonitorEntry.formatted;
export const OutputCurrentMonitorSchema = _outputCurrentMonitorEntry.schema;

// NOTE: ====================================================================
//  WARNING DESCRIPTION MONITOR (Register 0x2528)
// ========================================================================

const warningDescriptionLabels: Record<number, string> = {
  0: 'No alarm',
  1: 'OV (Overvoltage)',
  2: 'UV (Undervoltage)',
  3: 'OL2 (Overload 2)',
  4: 'OH2 (Overheat 2)',
  5: 'Reserved',
  6: 'OT (Over-torque)',
  7: 'Reserved',
  8: 'Reserved',
  9: 'UT (Under-torque)',
  10: 'OS (Overspeed)',
  11: 'PGO (PG open)',
  12: 'DEV (Speed deviation)',
  13: 'CE (Communication error)',
  14: 'CALL (Communication call)',
  15: 'Reserved',
  16: 'EF0 (External fault 0)',
  17: 'EF1 (External fault 1)',
  18: 'EF2 (External fault 2)',
  19: 'EF3 (External fault 3)',
  20: 'EF4 (External fault 4)',
  21: 'EF5 (External fault 5)',
  22: 'EF6 (External fault 6)',
  23: 'EF7 (External fault 7)',
  24: 'EF8 (External fault 8)',
  25: 'Reserved',
  26: 'CLB',
  27: 'Reserved',
  28: 'CT',
  29: 'USP',
  30: 'RDE',
  31: 'WRE',
  32: 'FB',
  33: 'VRYE',
  34: 'SE01',
  35: 'SE02',
  36: 'SE03',
  37: 'Reserved',
  38: 'SE05',
  39: 'HPERR',
  40: 'EF',
  41: 'Reserved',
  42: 'Reserved',
  43: 'RDP',
  44: 'Reserved',
  45: 'OL1 (Overload 1)',
  46: 'HP_ER',
  47: 'SE10',
  48: 'Reserved',
  49: 'BB1 (Baseblock 1)',
  50: 'BB2 (Baseblock 2)',
  51: 'BB3 (Baseblock 3)',
  52: 'BB4 (Baseblock 4)',
  53: 'BB5 (Baseblock 5)',
  54: 'BB6 (Baseblock 6)',
  55: 'BB7 (Baseblock 7)',
  56: 'BB8 (Baseblock 8)',
  57: 'Reserved',
  58: 'Reserved',
  59: 'Reserved',
  60: 'Reserved',
  61: 'RETRY',
  62: 'SE07',
  63: 'SE08',
  64: 'Reserved',
  65: 'OH1 (Overheat 1)',
  66: 'FIRE',
  67: 'ES',
  68: 'STP1',
  69: 'BDERR',
  70: 'EPERR',
  71: 'ADCER',
  72: 'Reserved',
  73: 'STP0',
  74: 'ENC',
  75: 'STP2',
  76: 'RUNER',
  77: 'LOC',
  78: 'PTCLS',
  79: 'Sys Init',
  80: 'FBLSS',
};

const _warningDescriptionMonitorEntry = makeLookupParam(
  0x2528,
  warningDescriptionLabels as Record<number, WarningDescriptionMonitor>,
  (raw) => `Unknown warning (${raw})` as WarningDescriptionMonitor,
  meta('Warning Description Monitor', '-', '0–80', '0'),
  { domain: WarningDescriptionMonitor },
);
export const decodeWarningDescriptionMonitor = _warningDescriptionMonitorEntry.decode;
export const formattedWarningDescriptionMonitor = _warningDescriptionMonitorEntry.formatted;
export const WarningDescriptionMonitorSchema = _warningDescriptionMonitorEntry.schema;

// NOTE: ====================================================================
//  DIGITAL OUTPUT STATE MONITOR (Register 0x2529)
// ========================================================================

export class DigitalOutStateMonitorFlags extends Schema.Class<DigitalOutStateMonitorFlags>(
  'DigitalOutStateMonitorFlags',
)({
  ry1: Schema.Boolean,
  ry2: Schema.Boolean,
  pulse: Schema.Boolean,
}) {
  static get empty() {
    return new DigitalOutStateMonitorFlags({ ry1: false, ry2: false, pulse: false });
  }
}

const _digitalOutStateParam = makeBitfieldParam(
  0x2529,
  DigitalOutStateMonitorFlags,
  digitalOutLayout,
  meta('Digital Out State Monitor', '-', 'bitfield', '0'),
  { readOnly: true },
);
export const DigitalOutStateMonitorSchema = _digitalOutStateParam.schema;
export const decodeDigitalOutStateMonitor = _digitalOutStateParam.decode;
export const formattedDigitalOutStateMonitor = _digitalOutStateParam.formatted;

// NOTE: ====================================================================
//  ANALOG OUT 1 MONITOR (Register 0x252A)
// ========================================================================

const _analogOut1MonitorEntry = makeScaledParam(
  0x252a,
  0.01,
  meta('Analog Out 1 Monitor', 'V', '0.00–10.00', '0.00'),
  { domain: Voltage, readOnly: true },
);
export const decodeAnalogOut1Monitor = _analogOut1MonitorEntry.decode;
export const formattedAnalogOut1Monitor = _analogOut1MonitorEntry.formatted;
export const AnalogOut1MonitorSchema = _analogOut1MonitorEntry.schema;

// NOTE: ====================================================================
//  ANALOG OUT 2 MONITOR (Register 0x252B)
// ========================================================================

const _analogOut2MonitorEntry = makeScaledParam(
  0x252b,
  0.01,
  meta('Analog Out 2 Monitor', 'V', '0.00–10.00', '0.00'),
  { domain: Voltage, readOnly: true },
);
export const decodeAnalogOut2Monitor = _analogOut2MonitorEntry.decode;
export const formattedAnalogOut2Monitor = _analogOut2MonitorEntry.formatted;
export const AnalogOut2MonitorSchema = _analogOut2MonitorEntry.schema;

// NOTE: ====================================================================
//  ANALOG IN 1 MONITOR (Register 0x252C)
// ========================================================================

const _analogIn1MonitorEntry = makeScaledParam(
  0x252c,
  0.1,
  meta('Analog In 1 Monitor', '%', '0.0–100.0', '0.0'),
  { domain: AnalogInputPercent, readOnly: true },
);
export const decodeAnalogIn1Monitor = _analogIn1MonitorEntry.decode;
export const formattedAnalogIn1Monitor = _analogIn1MonitorEntry.formatted;
export const AnalogIn1MonitorSchema = _analogIn1MonitorEntry.schema;

// NOTE: ====================================================================
//  ANALOG IN 2 MONITOR (Register 0x252D)
// ========================================================================

const _analogIn2MonitorEntry = makeScaledParam(
  0x252d,
  0.1,
  meta('Analog In 2 Monitor', '%', '0.0–100.0', '0.0'),
  { domain: AnalogInputPercent, readOnly: true },
);
export const decodeAnalogIn2Monitor = _analogIn2MonitorEntry.decode;
export const formattedAnalogIn2Monitor = _analogIn2MonitorEntry.formatted;
export const AnalogIn2MonitorSchema = _analogIn2MonitorEntry.schema;

// NOTE: ====================================================================
//  A510 CHECK MONITOR (Register 0x252F)
// ========================================================================

const a510CheckLabels: Record<number, string> = {
  0x01: 'L510(s)',
  0x02: 'E510(s)',
  0x03: 'A510(s)',
  0x04: 'F510',
};

const _a510CheckMonitorEntry = makeLookupParam<A510CheckMonitor>(
  0x252f,
  a510CheckLabels as Record<number, A510CheckMonitor>,
  (raw) => `Unknown (0x${raw.toString(16)})` as A510CheckMonitor,
  meta('A510 Check Monitor', '-', '0x01–0x04', '0'),
  { domain: A510CheckMonitor },
);
export const decodeA510CheckMonitor = _a510CheckMonitorEntry.decode;
export const formattedA510CheckMonitor = _a510CheckMonitorEntry.formatted;
export const A510CheckMonitorSchema = _a510CheckMonitorEntry.schema;
