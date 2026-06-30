/**
 * Group 00: Basic Parameters
 * Manual pages 4-19 to 4-22
 *
 * Parameter                       | Range            | Default | Unit  | Register
 * 00-00  Control Mode Selection   | 0-6              | 0       | -     | 0x0000
 * 00-01  Motor's Rotation Direct. | 0-1              | 0       | -     | 0x0001
 * 00-02  Main Run Cmd Source      | 0-3              | 0       | -     | 0x0002
 * 00-03  Alternative Run Cmd      | 0-3              | 2       | -     | 0x0003
 * 00-04  Language                 | 0-3              | 0       | -     | 0x0004
 * 00-05  Main Freq Cmd Source     | 0-8              | 0       | -     | 0x0005
 * 00-06  Alternative Freq Source  | 0-7              | 3       | -     | 0x0006
 * 00-07  Freq Cmd Modes           | 0-1              | 0       | -     | 0x0007
 * 00-08  Comm Freq Cmd Range      | 0.00~599.00      | 0.00    | Hz    | 0x0008
 * 00-09  Comm Freq Cmd Memory     | 0-1              | 0       | -     | 0x0009
 * 00-10  Min Freq Detection       | 0-1              | 0       | -     | 0x000A
 * 00-11  PID Lower Freq Limit     | 0-1              | 0       | -     | 0x000B
 * 00-12  Upper Limit Frequency    | 0.1~109.0        | 100.0   | %     | 0x000C
 * 00-13  Lower Limit Frequency    | 0.0~109.0        | 0.0     | %     | 0x000D
 * 00-14  Accel Time 1             | 0.1~6000.0       | *       | s     | 0x000E
 * 00-15  Decel Time 1             | 0.1~6000.0       | *       | s     | 0x000F
 * 00-16  Accel Time 2             | 0.1~6000.0       | *       | s     | 0x0010
 * 00-17  Decel Time 2             | 0.1~6000.0       | *       | s     | 0x0011
 * 00-18  Jog Frequency            | 0.00~599.00      | 6.00    | Hz    | 0x0012
 * 00-19  Jog Accel Time           | 0.1~600.0        | -       | s     | 0x0013
 * 00-20  Jog Decel Time           | 0.1~600.0        | -       | s     | 0x0014
 * 00-21  Accel Time 3             | 0.1~6000.0       | *       | s     | 0x0015
 * 00-22  Decel Time 3             | 0.1~6000.0       | *       | s     | 0x0016
 * 00-23  Accel Time 4             | 0.1~6000.0       | *       | s     | 0x0017
 * 00-24  Decel Time 4             | 0.1~6000.0       | *       | s     | 0x0018
 * 00-25  Switch-Over Freq         | 0.00~599.00      | 0.0     | Hz    | 0x0019
 * 00-26  Emergency Stop Time      | 0.1~6000.0       | 5.0     | s     | 0x001A
 * 00-27  HD/ND Mode Selection     | 0-1              | 0       | -     | 0x001B
 * 00-28  Cmd Characteristic       | 0-1              | 0       | -     | 0x001C
 * 00-29  Zero-Speed Operation     | 0-3              | 0       | -     | 0x001D
 * 00-32  Application Selection    | 0-8              | 0       | -     | 0x0020
 * 00-33  Modified Parameters      | 0-1              | 0       | -     | 0x0021
 * 00-41  User Parameter 0         | -                | 00-41   | -     | 0x0029
 * ...
 * 00-57  SV High Speed Mode       | 0-1              | 0       | -     | 0x0039
 */

import * as P from "./param-utils";
import { GROUP_00_Basic_Parameters } from "../Registers";

const group = 0 as const;
const p419 = 419 as const;
const p420 = 420 as const;
const p421 = 421 as const;
const p422 = 422 as const;

// ── Enum parameters ────────────────────────────────────────

/** @param 00-00 Control Mode Selection — Range: 0-6, Default: 0, Manual p.4-19 */
export const Param_00_00 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_00, {
  0: "V/F",
  1: "V/F+PG",
  2: "SLV",
  3: "SV",
  4: "PMSV",
  5: "PMSLV",
  6: "SLV2",
} as const, {
  group, code: "00-00", name: "Control Mode Selection",
  range: "0-6", default: "0", unit: "-", page: p419,
})

/** @param 00-01 Motor's Rotation Direction — Range: 0-1, Default: 0, Manual p.4-19 */
export const Param_00_01 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_01, {
  0: "Forward",
  1: "Reverse",
} as const, {
  group, code: "00-01", name: "Motor's Rotation Direction",
  range: "0-1", default: "0", unit: "-", page: p419,
})

/** @param 00-02 Main Run Command Source Selection — Range: 0-3, Default: 0, Manual p.4-19 */
export const Param_00_02 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_02, {
  0: "Keypad",
  1: "External Terminal",
  2: "Communication (RS-485)",
  3: "PLC",
} as const, {
  group, code: "00-02", name: "Main Run Command Source Selection",
  range: "0-3", default: "0", unit: "-", page: p419,
})

/** @param 00-03 Alternative Run Command Selection — Range: 0-3, Default: 2, Manual p.4-19 */
export const Param_00_03 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_03, {
  0: "Keypad",
  1: "External Terminal",
  2: "Communication (RS-485)",
  3: "PLC",
} as const, {
  group, code: "00-03", name: "Alternative Run Command Selection",
  range: "0-3", default: "2 (Note4)", unit: "-", page: p419,
})

/** @param 00-04 Language — Range: 0-3, Default: 0, Manual p.4-19 */
export const Param_00_04 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_04, {
  0: "English",
  1: "Simplified Chinese",
  2: "Traditional Chinese",
  3: "Turkish",
} as const, {
  group, code: "00-04", name: "Language",
  range: "0-3", default: "0", unit: "-", page: p419,
})

/** @param 00-05 Main Frequency Command Source Selection — Range: 0-8, Default: 0, Manual p.4-19 */
export const Param_00_05 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_05, {
  0: "Keypad",
  1: "External Terminal (Analog1)",
  2: "Terminal Command UP/DOWN",
  3: "Communication (RS-485)",
  4: "Pulse Input",
  7: "AI2 Auxiliary Frequency",
  8: "Manual Pulse Generator (MPG)",
} as const, {
  group, code: "00-05", name: "Main Frequency Command Source Selection",
  range: "0-8", default: "0", unit: "-", page: p419,
})

/** @param 00-06 Alternative Frequency Source Selection — Range: 0-7, Default: 3, Manual p.4-19 */
export const Param_00_06 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_06, {
  0: "Keypad",
  1: "External Terminal (Analog1)",
  2: "Terminal Command UP/DOWN",
  3: "Communication (RS-485)",
  4: "Pulse Input",
  7: "AI2 Auxiliary Frequency",
} as const, {
  group, code: "00-06", name: "Alternative Frequency Source Selection",
  range: "0-7", default: "3 (Note4)", unit: "-", page: p419,
})

/** @param 00-07 Main and Alternative Frequency Command Modes — Range: 0-1, Default: 0, Manual p.4-20 */
export const Param_00_07 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_07, {
  0: "Main Frequency",
  1: "Main frequency + Alternative Frequency",
} as const, {
  group, code: "00-07", name: "Main and Alternative Frequency Command Modes",
  range: "0-1", default: "0", unit: "-", page: p420,
})

/** @param 00-09 Communication Frequency Command Memory Selection — Range: 0-1, Default: 0, Manual p.4-20 */
export const Param_00_09 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_09, {
  0: "Don't save when power supply is off (00-08)",
  1: "Save when power is off (00-08)",
} as const, {
  group, code: "00-09", name: "Communication Frequency Command Memory Selection",
  range: "0-1", default: "0", unit: "-", page: p420,
})

/** @param 00-10 Minimum Frequency Detection — Range: 0-1, Default: 0, Manual p.4-20 */
export const Param_00_10 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_10, {
  0: "Show warning if lower than minimum frequency",
  1: "Run as minimum frequency if lower than minimum frequency",
} as const, {
  group, code: "00-10", name: "Minimum Frequency Detection",
  range: "0-1", default: "0", unit: "-", page: p420,
})

/** @param 00-11 PID Lower Limit of Frequency Selection — Range: 0-1, Default: 0, Manual p.4-20 */
export const Param_00_11 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_11, {
  0: "PID Sleep Limit is Lower Limit of Frequency",
  1: "PID Sleep Limit is 0Hz",
} as const, {
  group, code: "00-11", name: "PID Lower Limit of Frequency Selection",
  range: "0-1", default: "0", unit: "-", page: p420,
})

/** @param 00-27 HD/ND Mode Selection — Range: 0-1, Default: 0, Manual p.4-20 */
export const Param_00_27 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_27, {
  0: "HD (Heavy Duty Mode)",
  1: "ND (Normal Duty Mode)",
} as const, {
  group, code: "00-27", name: "HD/ND Mode Selection",
  range: "0-1", default: "0", unit: "-", page: p420,
})

/** @param 00-28 Command Characteristic Selection of Master Frequency — Range: 0-1, Default: 0, Manual p.4-20 */
export const Param_00_28 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_28, {
  0: "Positive Characteristic (0~10V/4~20mA → 0~100%)",
  1: "Negative Characteristic (0~10V/4~20mA → 100~0%)",
} as const, {
  group, code: "00-28", name: "Command Characteristic Selection of Master Frequency",
  range: "0-1", default: "0", unit: "-", page: p420,
})

/** @param 00-29 Zero-Speed Operation Selection — Range: 0-3, Default: 0, Manual p.4-20 */
export const Param_00_29 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_29, {
  0: "Operation Based on Frequency Command",
  1: "Stop",
  2: "Operation Based on the Lowest Frequency",
  3: "Zero-Speed Operation",
} as const, {
  group, code: "00-29", name: "Zero-Speed Operation Selection",
  range: "0-3", default: "0", unit: "-", page: p420,
})

/** @param 00-32 Application Selection Presets — Range: 0-8, Default: 0, Manual p.4-20 */
export const Param_00_32 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_32, {
  0: "General",
  2: "Conveyor",
  3: "Exhaust Fan",
  5: "Compressor",
  6: "Hoist",
  7: "Crane",
  8: "Manual Pulse Generator (MPG)",
} as const, {
  group, code: "00-32", name: "Application Selection Presets",
  range: "0-8", default: "0", unit: "-", page: p420,
})

/** @param 00-33 Modified Parameters (LCD keypad) — Range: 0-1, Default: 0, Manual p.4-21 */
export const Param_00_33 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_33, {
  0: "Disable",
  1: "Enable",
} as const, {
  group, code: "00-33", name: "Modified Parameters (LCD keypad)",
  range: "0-1", default: "0", unit: "-", page: p421,
})

/** @param 00-57 SV High Speed Mode — Range: 0-1, Default: 0, Manual p.4-21 */
export const Param_00_57 = P.makeEnumParam(GROUP_00_Basic_Parameters._00_57, {
  0: "SV High Speed Mode 1",
  1: "SV High Speed Mode 2",
} as const, {
  group, code: "00-57", name: "SV High Speed Mode",
  range: "0-1", default: "0", unit: "-", page: p421,
})

// ── Scaled (×0.01 Hz) parameters ───────────────────────────

/** @param 00-08 Communication Frequency Command Range — Range: 0.00~599.00, Default: 0.00, Unit: Hz, Manual p.4-20 */
export const Param_00_08 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_08, 0.01, {
  group, code: "00-08", name: "Communication Frequency Command Range",
  range: "0.00~599.00", default: "0.00", unit: "Hz", page: p420,
})

/** @param 00-18 Jog Frequency — Range: 0.00~599.00, Default: 6.00, Unit: Hz, Manual p.4-20 */
export const Param_00_18 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_18, 0.01, {
  group, code: "00-18", name: "Jog Frequency",
  range: "0.00~599.00", default: "6.00", unit: "Hz", page: p420,
})

/** @param 00-25 Switch-Over Frequency of Acc/Dec Time 1 and Time 4 — Range: 0.00~599.00, Default: 0.0, Unit: Hz, Manual p.4-20 */
export const Param_00_25 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_25, 0.01, {
  group, code: "00-25", name: "Switch-Over Frequency of Acc/Dec Time 1 and Time 4",
  range: "0.00~599.00", default: "0.0", unit: "Hz", page: p420,
})

// ── Scaled (×0.1 % or s) parameters ────────────────────────

/** @param 00-12 Upper Limit Frequency — Range: 0.1~109.0, Default: 100.0, Unit: %, Manual p.4-20 */
export const Param_00_12 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_12, 0.1, {
  group, code: "00-12", name: "Upper Limit Frequency",
  range: "0.1~109.0", default: "100.0", unit: "%", page: p420,
})

/** @param 00-13 Lower Limit Frequency — Range: 0.0~109.0, Default: 0.0, Unit: %, Manual p.4-20 */
export const Param_00_13 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_13, 0.1, {
  group, code: "00-13", name: "Lower Limit Frequency",
  range: "0.0~109.0", default: "0.0", unit: "%", page: p420,
})

/** @param 00-14 Acceleration Time 1 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_14 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_14, 0.1, {
  group, code: "00-14", name: "Acceleration Time 1",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-15 Deceleration Time 1 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_15 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_15, 0.1, {
  group, code: "00-15", name: "Deceleration Time 1",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-16 Acceleration Time 2 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_16 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_16, 0.1, {
  group, code: "00-16", name: "Acceleration Time 2",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-17 Deceleration Time 2 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_17 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_17, 0.1, {
  group, code: "00-17", name: "Deceleration Time 2",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-19 Jog Acceleration Time — Range: 0.1~600.0, Default: -, Unit: s, Manual p.4-20 */
export const Param_00_19 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_19, 0.1, {
  group, code: "00-19", name: "Jog Acceleration Time",
  range: "0.1~600.0", default: "-", unit: "s", page: p420,
})

/** @param 00-20 Jog Deceleration Time — Range: 0.1~600.0, Default: -, Unit: s, Manual p.4-20 */
export const Param_00_20 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_20, 0.1, {
  group, code: "00-20", name: "Jog Deceleration Time",
  range: "0.1~600.0", default: "-", unit: "s", page: p420,
})

/** @param 00-21 Acceleration Time 3 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_21 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_21, 0.1, {
  group, code: "00-21", name: "Acceleration Time 3",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-22 Deceleration Time 3 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_22 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_22, 0.1, {
  group, code: "00-22", name: "Deceleration Time 3",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-23 Acceleration Time 4 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_23 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_23, 0.1, {
  group, code: "00-23", name: "Acceleration Time 4",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-24 Deceleration Time 4 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
export const Param_00_24 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_24, 0.1, {
  group, code: "00-24", name: "Deceleration Time 4",
  range: "0.1~6000.0", default: "* (see Attachment 1 p.170)", unit: "s", page: p420,
})

/** @param 00-26 Emergency Stop Time — Range: 0.1~6000.0, Default: 5.0, Unit: s, Manual p.4-20 */
export const Param_00_26 = P.makeScaledParam(GROUP_00_Basic_Parameters._00_26, 0.1, {
  group, code: "00-26", name: "Emergency Stop Time",
  range: "0.1~6000.0", default: "5.0", unit: "s", page: p420,
})

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 00-41 User Parameter 0 — Range: -, Default: 00-41, Manual p.4-21 */
export const Param_00_41 = P.makeParam(GROUP_00_Basic_Parameters._00_41, {
  group, code: "00-41", name: "User Parameter 0",
  range: "00-01~22-31 (except 00-41~00-56, group 17)", default: "00-41", unit: "-", page: p421,
})

/** @param 00-42 User Parameter 1 — Manual p.4-21 */
export const Param_00_42 = P.makeParam(GROUP_00_Basic_Parameters._00_42, {
  group, code: "00-42", name: "User Parameter 1",
  range: "00-01~22-31", default: "00-42", unit: "-", page: p421,
})

/** @param 00-43 User Parameter 2 — Manual p.4-21 */
export const Param_00_43 = P.makeParam(GROUP_00_Basic_Parameters._00_43, {
  group, code: "00-43", name: "User Parameter 2",
  range: "00-01~22-31", default: "00-43", unit: "-", page: p421,
})

/** @param 00-44 User Parameter 3 — Manual p.4-21 */
export const Param_00_44 = P.makeParam(GROUP_00_Basic_Parameters._00_44, {
  group, code: "00-44", name: "User Parameter 3",
  range: "00-01~22-31", default: "00-44", unit: "-", page: p421,
})

/** @param 00-45 User Parameter 4 — Manual p.4-21 */
export const Param_00_45 = P.makeParam(GROUP_00_Basic_Parameters._00_45, {
  group, code: "00-45", name: "User Parameter 4",
  range: "00-01~22-31", default: "00-45", unit: "-", page: p421,
})

/** @param 00-46 User Parameter 5 — Manual p.4-21 */
export const Param_00_46 = P.makeParam(GROUP_00_Basic_Parameters._00_46, {
  group, code: "00-46", name: "User Parameter 5",
  range: "00-01~22-31", default: "00-46", unit: "-", page: p421,
})

/** @param 00-47 User Parameter 6 — Manual p.4-21 */
export const Param_00_47 = P.makeParam(GROUP_00_Basic_Parameters._00_47, {
  group, code: "00-47", name: "User Parameter 6",
  range: "00-01~22-31", default: "00-47", unit: "-", page: p421,
})

/** @param 00-48 User Parameter 7 — Manual p.4-21 */
export const Param_00_48 = P.makeParam(GROUP_00_Basic_Parameters._00_48, {
  group, code: "00-48", name: "User Parameter 7",
  range: "00-01~22-31", default: "00-48", unit: "-", page: p421,
})

/** @param 00-49 User Parameter 8 — Manual p.4-21 */
export const Param_00_49 = P.makeParam(GROUP_00_Basic_Parameters._00_49, {
  group, code: "00-49", name: "User Parameter 8",
  range: "00-01~22-31", default: "00-49", unit: "-", page: p421,
})

/** @param 00-50 User Parameter 9 — Manual p.4-21 */
export const Param_00_50 = P.makeParam(GROUP_00_Basic_Parameters._00_50, {
  group, code: "00-50", name: "User Parameter 9",
  range: "00-01~22-31", default: "00-50", unit: "-", page: p421,
})

/** @param 00-51 User Parameter 10 — Manual p.4-21 */
export const Param_00_51 = P.makeParam(GROUP_00_Basic_Parameters._00_51, {
  group, code: "00-51", name: "User Parameter 10",
  range: "00-01~22-31", default: "00-51", unit: "-", page: p421,
})

/** @param 00-52 User Parameter 11 — Manual p.4-21 */
export const Param_00_52 = P.makeParam(GROUP_00_Basic_Parameters._00_52, {
  group, code: "00-52", name: "User Parameter 11",
  range: "00-01~22-31", default: "00-52", unit: "-", page: p421,
})

/** @param 00-53 User Parameter 12 — Manual p.4-21 */
export const Param_00_53 = P.makeParam(GROUP_00_Basic_Parameters._00_53, {
  group, code: "00-53", name: "User Parameter 12",
  range: "00-01~22-31", default: "00-53", unit: "-", page: p421,
})

/** @param 00-54 User Parameter 13 — Manual p.4-21 */
export const Param_00_54 = P.makeParam(GROUP_00_Basic_Parameters._00_54, {
  group, code: "00-54", name: "User Parameter 13",
  range: "00-01~22-31", default: "00-54", unit: "-", page: p421,
})

/** @param 00-55 User Parameter 14 — Manual p.4-21 */
export const Param_00_55 = P.makeParam(GROUP_00_Basic_Parameters._00_55, {
  group, code: "00-55", name: "User Parameter 14",
  range: "00-01~22-31", default: "00-55", unit: "-", page: p421,
})

/** @param 00-56 User Parameter 15 — Manual p.4-21 */
export const Param_00_56 = P.makeParam(GROUP_00_Basic_Parameters._00_56, {
  group, code: "00-56", name: "User Parameter 15",
  range: "00-01~22-31", default: "00-56", unit: "-", page: p421,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode00_00 = P.makeDecode(Param_00_00)
export const encode00_00 = P.makeEncode(Param_00_00)
export const formatted00_00 = P.makeFormatted(Param_00_00)

export const decode00_01 = P.makeDecode(Param_00_01)
export const encode00_01 = P.makeEncode(Param_00_01)
export const formatted00_01 = P.makeFormatted(Param_00_01)

export const decode00_02 = P.makeDecode(Param_00_02)
export const encode00_02 = P.makeEncode(Param_00_02)
export const formatted00_02 = P.makeFormatted(Param_00_02)

export const decode00_03 = P.makeDecode(Param_00_03)
export const encode00_03 = P.makeEncode(Param_00_03)
export const formatted00_03 = P.makeFormatted(Param_00_03)

export const decode00_04 = P.makeDecode(Param_00_04)
export const encode00_04 = P.makeEncode(Param_00_04)
export const formatted00_04 = P.makeFormatted(Param_00_04)

export const decode00_05 = P.makeDecode(Param_00_05)
export const encode00_05 = P.makeEncode(Param_00_05)
export const formatted00_05 = P.makeFormatted(Param_00_05)

export const decode00_06 = P.makeDecode(Param_00_06)
export const encode00_06 = P.makeEncode(Param_00_06)
export const formatted00_06 = P.makeFormatted(Param_00_06)

export const decode00_07 = P.makeDecode(Param_00_07)
export const encode00_07 = P.makeEncode(Param_00_07)
export const formatted00_07 = P.makeFormatted(Param_00_07)

export const decode00_08 = P.makeDecode(Param_00_08)
export const encode00_08 = P.makeEncode(Param_00_08)
export const formatted00_08 = P.makeFormatted(Param_00_08)

export const decode00_09 = P.makeDecode(Param_00_09)
export const encode00_09 = P.makeEncode(Param_00_09)
export const formatted00_09 = P.makeFormatted(Param_00_09)

export const decode00_10 = P.makeDecode(Param_00_10)
export const encode00_10 = P.makeEncode(Param_00_10)
export const formatted00_10 = P.makeFormatted(Param_00_10)

export const decode00_11 = P.makeDecode(Param_00_11)
export const encode00_11 = P.makeEncode(Param_00_11)
export const formatted00_11 = P.makeFormatted(Param_00_11)

export const decode00_12 = P.makeDecode(Param_00_12)
export const encode00_12 = P.makeEncode(Param_00_12)
export const formatted00_12 = P.makeFormatted(Param_00_12)

export const decode00_13 = P.makeDecode(Param_00_13)
export const encode00_13 = P.makeEncode(Param_00_13)
export const formatted00_13 = P.makeFormatted(Param_00_13)

export const decode00_14 = P.makeDecode(Param_00_14)
export const encode00_14 = P.makeEncode(Param_00_14)
export const formatted00_14 = P.makeFormatted(Param_00_14)

export const decode00_15 = P.makeDecode(Param_00_15)
export const encode00_15 = P.makeEncode(Param_00_15)
export const formatted00_15 = P.makeFormatted(Param_00_15)

export const decode00_16 = P.makeDecode(Param_00_16)
export const encode00_16 = P.makeEncode(Param_00_16)
export const formatted00_16 = P.makeFormatted(Param_00_16)

export const decode00_17 = P.makeDecode(Param_00_17)
export const encode00_17 = P.makeEncode(Param_00_17)
export const formatted00_17 = P.makeFormatted(Param_00_17)

export const decode00_18 = P.makeDecode(Param_00_18)
export const encode00_18 = P.makeEncode(Param_00_18)
export const formatted00_18 = P.makeFormatted(Param_00_18)

export const decode00_19 = P.makeDecode(Param_00_19)
export const encode00_19 = P.makeEncode(Param_00_19)
export const formatted00_19 = P.makeFormatted(Param_00_19)

export const decode00_20 = P.makeDecode(Param_00_20)
export const encode00_20 = P.makeEncode(Param_00_20)
export const formatted00_20 = P.makeFormatted(Param_00_20)

export const decode00_21 = P.makeDecode(Param_00_21)
export const encode00_21 = P.makeEncode(Param_00_21)
export const formatted00_21 = P.makeFormatted(Param_00_21)

export const decode00_22 = P.makeDecode(Param_00_22)
export const encode00_22 = P.makeEncode(Param_00_22)
export const formatted00_22 = P.makeFormatted(Param_00_22)

export const decode00_23 = P.makeDecode(Param_00_23)
export const encode00_23 = P.makeEncode(Param_00_23)
export const formatted00_23 = P.makeFormatted(Param_00_23)

export const decode00_24 = P.makeDecode(Param_00_24)
export const encode00_24 = P.makeEncode(Param_00_24)
export const formatted00_24 = P.makeFormatted(Param_00_24)

export const decode00_25 = P.makeDecode(Param_00_25)
export const encode00_25 = P.makeEncode(Param_00_25)
export const formatted00_25 = P.makeFormatted(Param_00_25)

export const decode00_26 = P.makeDecode(Param_00_26)
export const encode00_26 = P.makeEncode(Param_00_26)
export const formatted00_26 = P.makeFormatted(Param_00_26)

export const decode00_27 = P.makeDecode(Param_00_27)
export const encode00_27 = P.makeEncode(Param_00_27)
export const formatted00_27 = P.makeFormatted(Param_00_27)

export const decode00_28 = P.makeDecode(Param_00_28)
export const encode00_28 = P.makeEncode(Param_00_28)
export const formatted00_28 = P.makeFormatted(Param_00_28)

export const decode00_29 = P.makeDecode(Param_00_29)
export const encode00_29 = P.makeEncode(Param_00_29)
export const formatted00_29 = P.makeFormatted(Param_00_29)

export const decode00_32 = P.makeDecode(Param_00_32)
export const encode00_32 = P.makeEncode(Param_00_32)
export const formatted00_32 = P.makeFormatted(Param_00_32)

export const decode00_33 = P.makeDecode(Param_00_33)
export const encode00_33 = P.makeEncode(Param_00_33)
export const formatted00_33 = P.makeFormatted(Param_00_33)

export const decode00_41 = P.makeDecode(Param_00_41)
export const encode00_41 = P.makeEncode(Param_00_41)
export const formatted00_41 = P.makeFormatted(Param_00_41)

export const decode00_42 = P.makeDecode(Param_00_42)
export const encode00_42 = P.makeEncode(Param_00_42)
export const formatted00_42 = P.makeFormatted(Param_00_42)

export const decode00_43 = P.makeDecode(Param_00_43)
export const encode00_43 = P.makeEncode(Param_00_43)
export const formatted00_43 = P.makeFormatted(Param_00_43)

export const decode00_44 = P.makeDecode(Param_00_44)
export const encode00_44 = P.makeEncode(Param_00_44)
export const formatted00_44 = P.makeFormatted(Param_00_44)

export const decode00_45 = P.makeDecode(Param_00_45)
export const encode00_45 = P.makeEncode(Param_00_45)
export const formatted00_45 = P.makeFormatted(Param_00_45)

export const decode00_46 = P.makeDecode(Param_00_46)
export const encode00_46 = P.makeEncode(Param_00_46)
export const formatted00_46 = P.makeFormatted(Param_00_46)

export const decode00_47 = P.makeDecode(Param_00_47)
export const encode00_47 = P.makeEncode(Param_00_47)
export const formatted00_47 = P.makeFormatted(Param_00_47)

export const decode00_48 = P.makeDecode(Param_00_48)
export const encode00_48 = P.makeEncode(Param_00_48)
export const formatted00_48 = P.makeFormatted(Param_00_48)

export const decode00_49 = P.makeDecode(Param_00_49)
export const encode00_49 = P.makeEncode(Param_00_49)
export const formatted00_49 = P.makeFormatted(Param_00_49)

export const decode00_50 = P.makeDecode(Param_00_50)
export const encode00_50 = P.makeEncode(Param_00_50)
export const formatted00_50 = P.makeFormatted(Param_00_50)

export const decode00_51 = P.makeDecode(Param_00_51)
export const encode00_51 = P.makeEncode(Param_00_51)
export const formatted00_51 = P.makeFormatted(Param_00_51)

export const decode00_52 = P.makeDecode(Param_00_52)
export const encode00_52 = P.makeEncode(Param_00_52)
export const formatted00_52 = P.makeFormatted(Param_00_52)

export const decode00_53 = P.makeDecode(Param_00_53)
export const encode00_53 = P.makeEncode(Param_00_53)
export const formatted00_53 = P.makeFormatted(Param_00_53)

export const decode00_54 = P.makeDecode(Param_00_54)
export const encode00_54 = P.makeEncode(Param_00_54)
export const formatted00_54 = P.makeFormatted(Param_00_54)

export const decode00_55 = P.makeDecode(Param_00_55)
export const encode00_55 = P.makeEncode(Param_00_55)
export const formatted00_55 = P.makeFormatted(Param_00_55)

export const decode00_56 = P.makeDecode(Param_00_56)
export const encode00_56 = P.makeEncode(Param_00_56)
export const formatted00_56 = P.makeFormatted(Param_00_56)

export const decode00_57 = P.makeDecode(Param_00_57)
export const encode00_57 = P.makeEncode(Param_00_57)
export const formatted00_57 = P.makeFormatted(Param_00_57)

// ── Group-level lookup ─────────────────────────────────────

import { Schema } from "effect";

type ParamEntry = {
  schema: Schema.Schema<any, any>
  decode: ReturnType<typeof P.makeDecode>
  encode: ReturnType<typeof P.makeEncode>
}

const param = (
  schema: Schema.Schema<any, any>,
  decode: ReturnType<typeof P.makeDecode>,
  encode: ReturnType<typeof P.makeEncode>,
): ParamEntry => ({ schema, decode, encode })

export const group00Params: Record<string, ParamEntry> = {
  "00-00": param(Param_00_00, decode00_00, encode00_00),
  "00-01": param(Param_00_01, decode00_01, encode00_01),
  "00-02": param(Param_00_02, decode00_02, encode00_02),
  "00-03": param(Param_00_03, decode00_03, encode00_03),
  "00-04": param(Param_00_04, decode00_04, encode00_04),
  "00-05": param(Param_00_05, decode00_05, encode00_05),
  "00-06": param(Param_00_06, decode00_06, encode00_06),
  "00-07": param(Param_00_07, decode00_07, encode00_07),
  "00-08": param(Param_00_08, decode00_08, encode00_08),
  "00-09": param(Param_00_09, decode00_09, encode00_09),
  "00-10": param(Param_00_10, decode00_10, encode00_10),
  "00-11": param(Param_00_11, decode00_11, encode00_11),
  "00-12": param(Param_00_12, decode00_12, encode00_12),
  "00-13": param(Param_00_13, decode00_13, encode00_13),
  "00-14": param(Param_00_14, decode00_14, encode00_14),
  "00-15": param(Param_00_15, decode00_15, encode00_15),
  "00-16": param(Param_00_16, decode00_16, encode00_16),
  "00-17": param(Param_00_17, decode00_17, encode00_17),
  "00-18": param(Param_00_18, decode00_18, encode00_18),
  "00-19": param(Param_00_19, decode00_19, encode00_19),
  "00-20": param(Param_00_20, decode00_20, encode00_20),
  "00-21": param(Param_00_21, decode00_21, encode00_21),
  "00-22": param(Param_00_22, decode00_22, encode00_22),
  "00-23": param(Param_00_23, decode00_23, encode00_23),
  "00-24": param(Param_00_24, decode00_24, encode00_24),
  "00-25": param(Param_00_25, decode00_25, encode00_25),
  "00-26": param(Param_00_26, decode00_26, encode00_26),
  "00-27": param(Param_00_27, decode00_27, encode00_27),
  "00-28": param(Param_00_28, decode00_28, encode00_28),
  "00-29": param(Param_00_29, decode00_29, encode00_29),
  "00-32": param(Param_00_32, decode00_32, encode00_32),
  "00-33": param(Param_00_33, decode00_33, encode00_33),
  "00-41": param(Param_00_41, decode00_41, encode00_41),
  "00-42": param(Param_00_42, decode00_42, encode00_42),
  "00-43": param(Param_00_43, decode00_43, encode00_43),
  "00-44": param(Param_00_44, decode00_44, encode00_44),
  "00-45": param(Param_00_45, decode00_45, encode00_45),
  "00-46": param(Param_00_46, decode00_46, encode00_46),
  "00-47": param(Param_00_47, decode00_47, encode00_47),
  "00-48": param(Param_00_48, decode00_48, encode00_48),
  "00-49": param(Param_00_49, decode00_49, encode00_49),
  "00-50": param(Param_00_50, decode00_50, encode00_50),
  "00-51": param(Param_00_51, decode00_51, encode00_51),
  "00-52": param(Param_00_52, decode00_52, encode00_52),
  "00-53": param(Param_00_53, decode00_53, encode00_53),
  "00-54": param(Param_00_54, decode00_54, encode00_54),
  "00-55": param(Param_00_55, decode00_55, encode00_55),
  "00-56": param(Param_00_56, decode00_56, encode00_56),
  "00-57": param(Param_00_57, decode00_57, encode00_57),
}
