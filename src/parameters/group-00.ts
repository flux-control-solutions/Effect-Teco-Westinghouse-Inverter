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

import { ParamKind, type ParamConfig } from "./param-utils";
import { GROUP_00_Basic_Parameters } from "../Registers";

const group = 0 as const;
const p419 = 419 as const;
const p420 = 420 as const;
const p421 = 421 as const;

const all = {
  // ── Enum parameters ────────────────────────────────────────

  /** @param 00-00 Control Mode Selection — Range: 0-6, Default: 0, Manual p.4-19 */
  "00-00": {
    register: GROUP_00_Basic_Parameters["00-00"],
    kind: ParamKind.Enum,
    labels: {
      0: "V/F",
      1: "V/F+PG",
      2: "SLV",
      3: "SV",
      4: "PMSV",
      5: "PMSLV",
      6: "SLV2",
    } as const,
    meta: {
      group,
      code: "00-00",
      name: "Control Mode Selection",
      range: "0-6",
      default: "0",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-01 Motor's Rotation Direction — Range: 0-1, Default: 0, Manual p.4-19 */
  "00-01": {
    register: GROUP_00_Basic_Parameters["00-01"],
    kind: ParamKind.Enum,
    labels: {
      0: "Forward",
      1: "Reverse",
    } as const,
    meta: {
      group,
      code: "00-01",
      name: "Motor's Rotation Direction",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-02 Main Run Command Source Selection — Range: 0-3, Default: 0, Manual p.4-19 */
  "00-02": {
    register: GROUP_00_Basic_Parameters["00-02"],
    kind: ParamKind.Enum,
    labels: {
      0: "Keypad",
      1: "External Terminal",
      2: "Communication (RS-485)",
      3: "PLC",
    } as const,
    meta: {
      group,
      code: "00-02",
      name: "Main Run Command Source Selection",
      range: "0-3",
      default: "0",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-03 Alternative Run Command Selection — Range: 0-3, Default: 2, Manual p.4-19 */
  "00-03": {
    register: GROUP_00_Basic_Parameters["00-03"],
    kind: ParamKind.Enum,
    labels: {
      0: "Keypad",
      1: "External Terminal",
      2: "Communication (RS-485)",
      3: "PLC",
    } as const,
    meta: {
      group,
      code: "00-03",
      name: "Alternative Run Command Selection",
      range: "0-3",
      default: "2 (Note4)",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-04 Language — Range: 0-3, Default: 0, Manual p.4-19 */
  "00-04": {
    register: GROUP_00_Basic_Parameters["00-04"],
    kind: ParamKind.Enum,
    labels: {
      0: "English",
      1: "Simplified Chinese",
      2: "Traditional Chinese",
      3: "Turkish",
    } as const,
    meta: {
      group,
      code: "00-04",
      name: "Language",
      range: "0-3",
      default: "0",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-05 Main Frequency Command Source Selection — Range: 0-8, Default: 0, Manual p.4-19 */
  "00-05": {
    register: GROUP_00_Basic_Parameters["00-05"],
    kind: ParamKind.Enum,
    labels: {
      0: "Keypad",
      1: "External Terminal (Analog1)",
      2: "Terminal Command UP/DOWN",
      3: "Communication (RS-485)",
      4: "Pulse Input",
      7: "AI2 Auxiliary Frequency",
      8: "Manual Pulse Generator (MPG)",
    } as const,
    meta: {
      group,
      code: "00-05",
      name: "Main Frequency Command Source Selection",
      range: "0-8",
      default: "0",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-06 Alternative Frequency Source Selection — Range: 0-7, Default: 3, Manual p.4-19 */
  "00-06": {
    register: GROUP_00_Basic_Parameters["00-06"],
    kind: ParamKind.Enum,
    labels: {
      0: "Keypad",
      1: "External Terminal (Analog1)",
      2: "Terminal Command UP/DOWN",
      3: "Communication (RS-485)",
      4: "Pulse Input",
      7: "AI2 Auxiliary Frequency",
    } as const,
    meta: {
      group,
      code: "00-06",
      name: "Alternative Frequency Source Selection",
      range: "0-7",
      default: "3 (Note4)",
      unit: "-",
      page: p419,
    },
  },

  /** @param 00-07 Main and Alternative Frequency Command Modes — Range: 0-1, Default: 0, Manual p.4-20 */
  "00-07": {
    register: GROUP_00_Basic_Parameters["00-07"],
    kind: ParamKind.Enum,
    labels: {
      0: "Main Frequency",
      1: "Main frequency + Alternative Frequency",
    } as const,
    meta: {
      group,
      code: "00-07",
      name: "Main and Alternative Frequency Command Modes",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-09 Communication Frequency Command Memory Selection — Range: 0-1, Default: 0, Manual p.4-20 */
  "00-09": {
    register: GROUP_00_Basic_Parameters["00-09"],
    kind: ParamKind.Enum,
    labels: {
      0: "Don't save when power supply is off (00-08)",
      1: "Save when power is off (00-08)",
    } as const,
    meta: {
      group,
      code: "00-09",
      name: "Communication Frequency Command Memory Selection",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-10 Minimum Frequency Detection — Range: 0-1, Default: 0, Manual p.4-20 */
  "00-10": {
    register: GROUP_00_Basic_Parameters["00-10"],
    kind: ParamKind.Enum,
    labels: {
      0: "Show warning if lower than minimum frequency",
      1: "Run as minimum frequency if lower than minimum frequency",
    } as const,
    meta: {
      group,
      code: "00-10",
      name: "Minimum Frequency Detection",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-11 PID Lower Limit of Frequency Selection — Range: 0-1, Default: 0, Manual p.4-20 */
  "00-11": {
    register: GROUP_00_Basic_Parameters["00-11"],
    kind: ParamKind.Enum,
    labels: {
      0: "PID Sleep Limit is Lower Limit of Frequency",
      1: "PID Sleep Limit is 0Hz",
    } as const,
    meta: {
      group,
      code: "00-11",
      name: "PID Lower Limit of Frequency Selection",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-27 HD/ND Mode Selection — Range: 0-1, Default: 0, Manual p.4-20 */
  "00-27": {
    register: GROUP_00_Basic_Parameters["00-27"],
    kind: ParamKind.Enum,
    labels: {
      0: "HD (Heavy Duty Mode)",
      1: "ND (Normal Duty Mode)",
    } as const,
    meta: {
      group,
      code: "00-27",
      name: "HD/ND Mode Selection",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-28 Command Characteristic Selection of Master Frequency — Range: 0-1, Default: 0, Manual p.4-20 */
  "00-28": {
    register: GROUP_00_Basic_Parameters["00-28"],
    kind: ParamKind.Enum,
    labels: {
      0: "Positive Characteristic (0~10V/4~20mA → 0~100%)",
      1: "Negative Characteristic (0~10V/4~20mA → 100~0%)",
    } as const,
    meta: {
      group,
      code: "00-28",
      name: "Command Characteristic Selection of Master Frequency",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-29 Zero-Speed Operation Selection — Range: 0-3, Default: 0, Manual p.4-20 */
  "00-29": {
    register: GROUP_00_Basic_Parameters["00-29"],
    kind: ParamKind.Enum,
    labels: {
      0: "Operation Based on Frequency Command",
      1: "Stop",
      2: "Operation Based on the Lowest Frequency",
      3: "Zero-Speed Operation",
    } as const,
    meta: {
      group,
      code: "00-29",
      name: "Zero-Speed Operation Selection",
      range: "0-3",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-32 Application Selection Presets — Range: 0-8, Default: 0, Manual p.4-20 */
  "00-32": {
    register: GROUP_00_Basic_Parameters["00-32"],
    kind: ParamKind.Enum,
    labels: {
      0: "General",
      2: "Conveyor",
      3: "Exhaust Fan",
      5: "Compressor",
      6: "Hoist",
      7: "Crane",
      8: "Manual Pulse Generator (MPG)",
    } as const,
    meta: {
      group,
      code: "00-32",
      name: "Application Selection Presets",
      range: "0-8",
      default: "0",
      unit: "-",
      page: p420,
    },
  },

  /** @param 00-33 Modified Parameters (LCD keypad) — Range: 0-1, Default: 0, Manual p.4-21 */
  "00-33": {
    register: GROUP_00_Basic_Parameters["00-33"],
    kind: ParamKind.Enum,
    labels: {
      0: "Disable",
      1: "Enable",
    } as const,
    meta: {
      group,
      code: "00-33",
      name: "Modified Parameters (LCD keypad)",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-57 SV High Speed Mode — Range: 0-1, Default: 0, Manual p.4-21 */
  "00-57": {
    register: GROUP_00_Basic_Parameters["00-57"],
    kind: ParamKind.Enum,
    labels: {
      0: "SV High Speed Mode 1",
      1: "SV High Speed Mode 2",
    } as const,
    meta: {
      group,
      code: "00-57",
      name: "SV High Speed Mode",
      range: "0-1",
      default: "0",
      unit: "-",
      page: p421,
    },
  },

  // ── Scaled (×0.01 Hz) parameters ───────────────────────────

  /** @param 00-08 Communication Frequency Command Range — Range: 0.00~599.00, Default: 0.00, Unit: Hz, Manual p.4-20 */
  "00-08": {
    register: GROUP_00_Basic_Parameters["00-08"],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: "00-08",
      name: "Communication Frequency Command Range",
      range: "0.00~599.00",
      default: "0.00",
      unit: "Hz",
      page: p420,
    },
  },

  /** @param 00-18 Jog Frequency — Range: 0.00~599.00, Default: 6.00, Unit: Hz, Manual p.4-20 */
  "00-18": {
    register: GROUP_00_Basic_Parameters["00-18"],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: "00-18",
      name: "Jog Frequency",
      range: "0.00~599.00",
      default: "6.00",
      unit: "Hz",
      page: p420,
    },
  },

  /** @param 00-25 Switch-Over Frequency of Acc/Dec Time 1 and Time 4 — Range: 0.00~599.00, Default: 0.0, Unit: Hz, Manual p.4-20 */
  "00-25": {
    register: GROUP_00_Basic_Parameters["00-25"],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: "00-25",
      name: "Switch-Over Frequency of Acc/Dec Time 1 and Time 4",
      range: "0.00~599.00",
      default: "0.0",
      unit: "Hz",
      page: p420,
    },
  },

  // ── Scaled (×0.1 % or s) parameters ────────────────────────

  /** @param 00-12 Upper Limit Frequency — Range: 0.1~109.0, Default: 100.0, Unit: %, Manual p.4-20 */
  "00-12": {
    register: GROUP_00_Basic_Parameters["00-12"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-12",
      name: "Upper Limit Frequency",
      range: "0.1~109.0",
      default: "100.0",
      unit: "%",
      page: p420,
    },
  },

  /** @param 00-13 Lower Limit Frequency — Range: 0.0~109.0, Default: 0.0, Unit: %, Manual p.4-20 */
  "00-13": {
    register: GROUP_00_Basic_Parameters["00-13"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-13",
      name: "Lower Limit Frequency",
      range: "0.0~109.0",
      default: "0.0",
      unit: "%",
      page: p420,
    },
  },

  /** @param 00-14 Acceleration Time 1 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-14": {
    register: GROUP_00_Basic_Parameters["00-14"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-14",
      name: "Acceleration Time 1",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-15 Deceleration Time 1 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-15": {
    register: GROUP_00_Basic_Parameters["00-15"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-15",
      name: "Deceleration Time 1",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-16 Acceleration Time 2 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-16": {
    register: GROUP_00_Basic_Parameters["00-16"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-16",
      name: "Acceleration Time 2",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-17 Deceleration Time 2 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-17": {
    register: GROUP_00_Basic_Parameters["00-17"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-17",
      name: "Deceleration Time 2",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-19 Jog Acceleration Time — Range: 0.1~600.0, Default: -, Unit: s, Manual p.4-20 */
  "00-19": {
    register: GROUP_00_Basic_Parameters["00-19"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-19",
      name: "Jog Acceleration Time",
      range: "0.1~600.0",
      default: "-",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-20 Jog Deceleration Time — Range: 0.1~600.0, Default: -, Unit: s, Manual p.4-20 */
  "00-20": {
    register: GROUP_00_Basic_Parameters["00-20"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-20",
      name: "Jog Deceleration Time",
      range: "0.1~600.0",
      default: "-",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-21 Acceleration Time 3 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-21": {
    register: GROUP_00_Basic_Parameters["00-21"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-21",
      name: "Acceleration Time 3",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-22 Deceleration Time 3 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-22": {
    register: GROUP_00_Basic_Parameters["00-22"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-22",
      name: "Deceleration Time 3",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-23 Acceleration Time 4 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-23": {
    register: GROUP_00_Basic_Parameters["00-23"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-23",
      name: "Acceleration Time 4",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-24 Deceleration Time 4 — Range: 0.1~6000.0, Default: * (see Attachment 1 p.170), Unit: s, Manual p.4-20 */
  "00-24": {
    register: GROUP_00_Basic_Parameters["00-24"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-24",
      name: "Deceleration Time 4",
      range: "0.1~6000.0",
      default: "* (see Attachment 1 p.170)",
      unit: "s",
      page: p420,
    },
  },

  /** @param 00-26 Emergency Stop Time — Range: 0.1~6000.0, Default: 5.0, Unit: s, Manual p.4-20 */
  "00-26": {
    register: GROUP_00_Basic_Parameters["00-26"],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: "00-26",
      name: "Emergency Stop Time",
      range: "0.1~6000.0",
      default: "5.0",
      unit: "s",
      page: p420,
    },
  },

  // ── Simple UInt16 parameters ───────────────────────────────

  /** @param 00-41 User Parameter 0 — Range: -, Default: 00-41, Manual p.4-21 */
  "00-41": {
    register: GROUP_00_Basic_Parameters["00-41"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-41",
      name: "User Parameter 0",
      range: "00-01~22-31 (except 00-41~00-56, group 17)",
      default: "00-41",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-42 User Parameter 1 — Manual p.4-21 */
  "00-42": {
    register: GROUP_00_Basic_Parameters["00-42"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-42",
      name: "User Parameter 1",
      range: "00-01~22-31",
      default: "00-42",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-43 User Parameter 2 — Manual p.4-21 */
  "00-43": {
    register: GROUP_00_Basic_Parameters["00-43"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-43",
      name: "User Parameter 2",
      range: "00-01~22-31",
      default: "00-43",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-44 User Parameter 3 — Manual p.4-21 */
  "00-44": {
    register: GROUP_00_Basic_Parameters["00-44"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-44",
      name: "User Parameter 3",
      range: "00-01~22-31",
      default: "00-44",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-45 User Parameter 4 — Manual p.4-21 */
  "00-45": {
    register: GROUP_00_Basic_Parameters["00-45"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-45",
      name: "User Parameter 4",
      range: "00-01~22-31",
      default: "00-45",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-46 User Parameter 5 — Manual p.4-21 */
  "00-46": {
    register: GROUP_00_Basic_Parameters["00-46"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-46",
      name: "User Parameter 5",
      range: "00-01~22-31",
      default: "00-46",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-47 User Parameter 6 — Manual p.4-21 */
  "00-47": {
    register: GROUP_00_Basic_Parameters["00-47"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-47",
      name: "User Parameter 6",
      range: "00-01~22-31",
      default: "00-47",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-48 User Parameter 7 — Manual p.4-21 */
  "00-48": {
    register: GROUP_00_Basic_Parameters["00-48"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-48",
      name: "User Parameter 7",
      range: "00-01~22-31",
      default: "00-48",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-49 User Parameter 8 — Manual p.4-21 */
  "00-49": {
    register: GROUP_00_Basic_Parameters["00-49"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-49",
      name: "User Parameter 8",
      range: "00-01~22-31",
      default: "00-49",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-50 User Parameter 9 — Manual p.4-21 */
  "00-50": {
    register: GROUP_00_Basic_Parameters["00-50"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-50",
      name: "User Parameter 9",
      range: "00-01~22-31",
      default: "00-50",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-51 User Parameter 10 — Manual p.4-21 */
  "00-51": {
    register: GROUP_00_Basic_Parameters["00-51"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-51",
      name: "User Parameter 10",
      range: "00-01~22-31",
      default: "00-51",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-52 User Parameter 11 — Manual p.4-21 */
  "00-52": {
    register: GROUP_00_Basic_Parameters["00-52"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-52",
      name: "User Parameter 11",
      range: "00-01~22-31",
      default: "00-52",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-53 User Parameter 12 — Manual p.4-21 */
  "00-53": {
    register: GROUP_00_Basic_Parameters["00-53"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-53",
      name: "User Parameter 12",
      range: "00-01~22-31",
      default: "00-53",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-54 User Parameter 13 — Manual p.4-21 */
  "00-54": {
    register: GROUP_00_Basic_Parameters["00-54"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-54",
      name: "User Parameter 13",
      range: "00-01~22-31",
      default: "00-54",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-55 User Parameter 14 — Manual p.4-21 */
  "00-55": {
    register: GROUP_00_Basic_Parameters["00-55"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-55",
      name: "User Parameter 14",
      range: "00-01~22-31",
      default: "00-55",
      unit: "-",
      page: p421,
    },
  },

  /** @param 00-56 User Parameter 15 — Manual p.4-21 */
  "00-56": {
    register: GROUP_00_Basic_Parameters["00-56"],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: "00-56",
      name: "User Parameter 15",
      range: "00-01~22-31",
      default: "00-56",
      unit: "-",
      page: p421,
    },
  },
} as const satisfies Record<string, ParamConfig>;

export const group00Params = all;
