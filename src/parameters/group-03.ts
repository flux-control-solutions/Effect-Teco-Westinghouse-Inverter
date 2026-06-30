/**
 * Group 03: External Digital Input and Output Parameters
 * Manual pages 4-27 to 4-33
 *
 * Parameter                                | Range                        | Default       | Unit | Page
 * 03-00  Multi-Function Terminal S1        | 0~69 (function code)        | 0             | -    | 4-27
 * 03-01  Multi-Function Terminal S2        | 0~69 (function code)        | 1             | -    | 4-27
 * 03-02  Multi-Function Terminal S3        | 0~69 (function code)        | 2             | -    | 4-27
 * 03-03  Multi-Function Terminal S4        | 0~69 (function code)        | 3             | -    | 4-27
 * 03-04  Multi-Function Terminal S5        | 0~69 (function code)        | 4             | -    | 4-27
 * 03-05  Multi-Function Terminal S6        | 0~69 (function code)        | 17            | -    | 4-27
 * 03-06  Multi-Function Terminal S7        | 0~69 (function code)        | 29            | -    | 4-28
 * 03-07  Multi-Function Terminal S8        | 0~69 (function code)        | 15            | -    | 4-28
 * 03-08  (S1~S8) DI Scan Time             | 0-1                         | 1             | -    | 4-28
 * 03-09  S1-S4 Type Selection             | bitfield (0000b~1111b)     | 0000b         | -    | 4-28
 * 03-10  S5-S8 Type Selection             | bitfield (0000b~1111b)     | 0000b         | -    | 4-28
 * 03-11  Relay (R1A-R1C) Output           | 0~59 (03-11 table)         | 0             | -    | 4-29
 * 03-12  Relay (R2A-R2C) Output           | 0~59 (03-11 table)         | 1             | -    | 4-29
 * 03-13  Frequency Detection Level        | 0.0~599.0                  | 0.0           | Hz   | 4-29
 * 03-14  Frequency Detection Width        | 0.1~25.5                   | 2.0           | Hz   | 4-29
 * 03-15  Current Agree Level              | 0.1~999.9                  | 0.1           | A    | 4-29
 * 03-16  Delay Time of Current Agree Det  | 0.1~10.0                   | 0.1           | s    | 4-29
 * 03-17  Mechanical Braking Release Level | 0.00~599.00                | 0.00          | Hz   | 4-29
 * 03-18  Mechanical Braking Level Set     | 0.00~599.00                | 0.00          | Hz   | 4-29
 * 03-19  Relay (R1A-R2A) Type            | bitfield (0000b~1111b)     | 0000b         | -    | 4-29
 * 03-20  Relay (R4A-R4C) Output           | 0~59 (03-11 table)         | 2             | -    | 4-30
 * 03-21  Photo-coupler Output (DO2-DOG)   | 0~59 (03-11 table)         | 3             | -    | 4-30
 * 03-27  UP/DOWN Freq Hold/Adjust Sel     | 0-3                         | 0             | -    | 4-31
 * 03-28  Photo-coupler Output (DO1-DOG)   | 0~59 (03-11 table)         | 0             | -    | 4-31
 * 03-29  Photo-coupler Output Sel (DO1-2) | bitfield (0000b~1111b)     | 0000b         | -    | 4-31
 * 03-30  Selection of Pulse Input         | 0-1                         | 0             | -    | 4-31
 * 03-31  Scale of Pulse Input             | 50~32000 (pulse)           | 1000          | Hz   | 4-31
 * 03-32  Pulse Input Gain                 | 0.0~1000.0                 | 100.0         | %    | 4-31
 * 03-33  Pulse Input Bias                 | -100.0~100.0               | 0.0           | %    | 4-31
 * 03-34  Filter Time of Pulse Input       | 0.00~2.00                  | 0.10          | Sec  | 4-31
 * 03-35  Function Setting of Pulse Output | 1-7                         | 2             | -    | 4-32
 * 03-36  Scale of Pulse Output            | 1~32000                    | 1000          | Hz   | 4-32
 * 03-37  Timer ON Delay (DIO)             | 0.0~6000.0                 | 0.0           | s    | 4-32
 * 03-38  Timer OFF Delay (DIO)            | 0.0~6000.0                 | 0.0           | s    | 4-32
 * 03-40  Up/Down Frequency Width Setting  | 0.00~5.00                  | 0.00          | Hz   | 4-32
 * 03-41  Torque Detection Level           | 0~150                      | 10            | %    | 4-32
 * 03-42  Brake Release Delay Time         | 0.00~65.00                 | 0.00          | s    | 4-32
 * 03-43  UP/DOWN Accel/Decel Selection    | 0-1                         | 0             | -    | 4-32
 * 03-44  Frequency Detection Level 2      | 0.0~599.0                  | 0.0           | Hz   | 4-32
 * 03-45  Frequency Detection Width 2      | 0.1~25.5                   | 2.0           | Hz   | 4-32
 * 03-46  Frequency Detection Level 3      | 0.0~599.0                  | 0.0           | Hz   | 4-32
 * 03-47  Frequency Detection Width 3      | 0.1~25.5                   | 2.0           | Hz   | 4-32
 * 03-48  Low Current Detection Level      | 0.0~999.9                  | 0.1           | A    | 4-32
 * 03-49  Low Current Detection Delay Time | 0.00~655.34                | 0.01          | Sec  | 4-32
 * 03-50  Frequency Detection Level 4      | 0.0~599.0                  | 0.0           | Hz   | 4-32
 * 03-51  Frequency Detection Level 5      | 0.0~599.0                  | 0.0           | Hz   | 4-32
 * 03-52  Frequency Detection Level 6      | 0.0~599.0                  | 0.0           | Hz   | 4-33
 * 03-53  Current Agree Level 2            | 0.0~999.9                  | 0.1           | A    | 4-33
 */

import * as P from "./param-utils";
import { GROUP_03_External_Digital_Input_and_Output_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 3 as const;
const p426 = 426 as const;
const p427 = 427 as const;
const p428 = 428 as const;
const p429 = 429 as const;
const p430 = 430 as const;
const p431 = 431 as const;
const p432 = 432 as const;
const p433 = 433 as const;

// ── Simple UInt16 parameters ───────────────────────────────

// ── Multi-function terminal settings ───────────────────────

/** @param 03-00 Multi-Function Terminal Function Setting-S1 — Range: 0~69, Default: 0, Manual p.4-27 */
export const Param_03_00 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_00, {
  group, code: "03-00", name: "Multi-Function Terminal Function Setting-S1",
  range: "0~69", default: "0", unit: "-", page: p427,
})

/** @param 03-01 Multi-Function Terminal Function Setting-S2 — Range: 0~69, Default: 1, Manual p.4-27 */
export const Param_03_01 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_01, {
  group, code: "03-01", name: "Multi-Function Terminal Function Setting-S2",
  range: "0~69", default: "1", unit: "-", page: p427,
})

/** @param 03-02 Multi-Function Terminal Function Setting-S3 — Range: 0~69, Default: 2, Manual p.4-27 */
export const Param_03_02 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_02, {
  group, code: "03-02", name: "Multi-Function Terminal Function Setting-S3",
  range: "0~69", default: "2", unit: "-", page: p427,
})

/** @param 03-03 Multi-Function Terminal Function Setting-S4 — Range: 0~69, Default: 3, Manual p.4-27 */
export const Param_03_03 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_03, {
  group, code: "03-03", name: "Multi-Function Terminal Function Setting-S4",
  range: "0~69", default: "3", unit: "-", page: p427,
})

/** @param 03-04 Multi-Function Terminal Function Setting-S5 — Range: 0~69, Default: 4, Manual p.4-27 */
export const Param_03_04 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_04, {
  group, code: "03-04", name: "Multi-Function Terminal Function Setting-S5",
  range: "0~69", default: "4", unit: "-", page: p427,
})

/** @param 03-05 Multi-Function Terminal Function Setting-S6 — Range: 0~69, Default: 17, Manual p.4-27 */
export const Param_03_05 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_05, {
  group, code: "03-05", name: "Multi-Function Terminal Function Setting-S6",
  range: "0~69", default: "17", unit: "-", page: p427,
})

/** @param 03-06 Multi-Function Terminal Function Setting-S7 — Range: 0~69, Default: 29, Manual p.4-28 */
export const Param_03_06 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_06, {
  group, code: "03-06", name: "Multi-Function Terminal Function Setting-S7",
  range: "0~69", default: "29", unit: "-", page: p428,
})

/** @param 03-07 Multi-Function Terminal Function Setting-S8 — Range: 0~69, Default: 15, Manual p.4-28 */
export const Param_03_07 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_07, {
  group, code: "03-07", name: "Multi-Function Terminal Function Setting-S8",
  range: "0~69", default: "15", unit: "-", page: p428,
})

// ── DI / DO configuration ──────────────────────────────────

/** @param 03-08 (S1~S8) DI Scan Time — Range: 0-1, Default: 1, Manual p.4-28 */
export const Param_03_08 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_08, {
  group, code: "03-08", name: "(S1~S8) DI Scan Time",
  range: "0-1 (0:4ms / 1:8ms)", default: "1 (8ms)", unit: "-", page: p428,
})

/** @param 03-09 Multi-Function Terminal S1-S4 Type Selection — Range: bitfield 0000b~1111b, Default: 0000b, Manual p.4-28 */
export const Param_03_09 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_09, {
  group, code: "03-09", name: "Multi-Function Terminal S1-S4 Type Selection",
  range: "0000b~1111b (bit0:S1 A/B ... bit3:S4 A/B)", default: "0000b", unit: "-", page: p428,
})

/** @param 03-10 Multi-Function Terminal S5-S8 Type Selection — Range: bitfield 0000b~1111b, Default: 0000b, Manual p.4-28 */
export const Param_03_10 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_10, {
  group, code: "03-10", name: "Multi-Function Terminal S5-S8 Type Selection",
  range: "0000b~1111b (bit0:S5 A/B ... bit3:S8 A/B)", default: "0000b", unit: "-", page: p428,
})

/** @param 03-11 Relay (R1A-R1C) Output — Range: 0~59, Default: 0, Manual p.4-29 */
export const Param_03_11 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_11, {
  group, code: "03-11", name: "Relay (R1A-R1C) Output",
  range: "0~59 (see 03-11/03-12 function table)", default: "0 (During Running)", unit: "-", page: p429,
})

/** @param 03-12 Relay (R2A-R2C) Output — Range: 0~59, Default: 1, Manual p.4-29 */
export const Param_03_12 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_12, {
  group, code: "03-12", name: "Relay (R2A-R2C) Output",
  range: "0~59 (see 03-11/03-12 function table)", default: "1 (Fault Contact Output)", unit: "-", page: p429,
})

/** @param 03-19 Relay (R1A-R2A) Type — Range: bitfield 0000b~1111b, Default: 0000b, Manual p.4-29 */
export const Param_03_19 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_19, {
  group, code: "03-19", name: "Relay (R1A-R2A) Type",
  range: "0000b~1111b (bit0:R1 A/B, bit1:R2 A/B, bit3:R4 A/B)", default: "0000b", unit: "-", page: p429,
})

/** @param 03-20 Relay (R4A-R4C) Output — Range: 0~59, Default: 2, Manual p.4-30 */
export const Param_03_20 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_20, {
  group, code: "03-20", name: "Relay (R4A-R4C) Output",
  range: "0~59 (see 03-11/03-12 function table)", default: "2 (Frequency Agree)", unit: "-", page: p430,
})

/** @param 03-21 Photo-coupler Output Selection (DO2-DOG) — Range: 0~59, Default: 3, Manual p.4-30 */
export const Param_03_21 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_21, {
  group, code: "03-21", name: "Photo-coupler Output Selection (DO2-DOG)",
  range: "0~59 (see 03-11/03-12 function table)", default: "3", unit: "-", page: p430,
})

/** @param 03-27 UP/DOWN Frequency Hold/Adjust Selection — Range: 0-3, Default: 0, Manual p.4-31 */
export const Param_03_27 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_27, {
  group, code: "03-27", name: "UP/DOWN Frequency Hold/Adjust Selection",
  range: "0-3", default: "0", unit: "-", page: p431,
})

/** @param 03-28 Photo-coupler Output (DO1-DOG) — Range: 0~59, Default: 0, Manual p.4-31 */
export const Param_03_28 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_28, {
  group, code: "03-28", name: "Photo-coupler Output (DO1-DOG)",
  range: "0~59 (see 03-11/03-12 function table)", default: "0", unit: "-", page: p431,
})

/** @param 03-29 Photo-coupler Output Selection (DO1-DOG)(DO2-DOG) — Range: bitfield, Default: 0000b, Manual p.4-31 */
export const Param_03_29 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_29, {
  group, code: "03-29", name: "Photo-coupler Output Selection (DO1-DOG)(DO2-DOG)",
  range: "0000b~1111b (bit0:PC1 A/B, bit1:PC2 A/B)", default: "0000b", unit: "-", page: p431,
})

/** @param 03-30 Selection of Pulse Input — Range: 0-1, Default: 0, Manual p.4-31 */
export const Param_03_30 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_30, {
  group, code: "03-30", name: "Selection of Pulse Input",
  range: "0-1 (0:General Pulse Input / 1:PWM)", default: "0", unit: "-", page: p431,
})

/** @param 03-31 Scale of Pulse Input — Range: 50~32000 / 10~1000, Default: 1000, Unit: Hz, Manual p.4-31 */
export const Param_03_31 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_31, {
  group, code: "03-31", name: "Scale of Pulse Input",
  range: "50~32000 (03-30=0) / 10~1000 (03-30=1)", default: "1000", unit: "Hz", page: p431,
})

/** @param 03-35 Function Setting of Pulse Output — Range: 1-7, Default: 2, Manual p.4-32 */
export const Param_03_35 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_35, {
  group, code: "03-35", name: "Function Setting of Pulse Output",
  range: "1-7 (1:Freq Cmd / 2:Output Freq / 3:After Soft-Start / 4:Motor Speed / 5:PID Fdbk / 6:PID Input / 7:PG Output)", default: "2", unit: "-", page: p432,
})

/** @param 03-36 Scale of Pulse Output — Range: 1~32000, Default: 1000, Unit: Hz, Manual p.4-32 */
export const Param_03_36 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_36, {
  group, code: "03-36", name: "Scale of Pulse Output",
  range: "1~32000", default: "1000", unit: "Hz", page: p432,
})

/** @param 03-41 Torque Detection Level — Range: 0~150, Default: 10, Unit: %, Manual p.4-32 */
export const Param_03_41 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_41, {
  group, code: "03-41", name: "Torque Detection Level",
  range: "0~150", default: "10", unit: "%", page: p432,
})

/** @param 03-43 UP/DOWN Acceleration/Deceleration Selection — Range: 0-1, Default: 0, Manual p.4-32 */
export const Param_03_43 = P.makeParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_43, {
  group, code: "03-43", name: "UP/DOWN Acceleration/Deceleration Selection",
  range: "0-1 (0:Accel/Decel Time 1 / 1:Accel/Decel Time 2)", default: "0", unit: "-", page: p432,
})

// ── Scaled (×0.1) parameters ───────────────────────────────

/** @param 03-13 Frequency Detection Level — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-29 */
export const Param_03_13 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_13, 0.1, {
  group, code: "03-13", name: "Frequency Detection Level",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p429,
})

/** @param 03-14 Frequency Detection Width — Range: 0.1~25.5, Default: 2.0, Unit: Hz, Manual p.4-29 */
export const Param_03_14 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_14, 0.1, {
  group, code: "03-14", name: "Frequency Detection Width",
  range: "0.1~25.5", default: "2.0", unit: "Hz", page: p429,
})

/** @param 03-15 Current Agree Level — Range: 0.1~999.9, Default: 0.1, Unit: A, Manual p.4-29 */
export const Param_03_15 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_15, 0.1, {
  group, code: "03-15", name: "Current Agree Level",
  range: "0.1~999.9", default: "0.1", unit: "A", page: p429,
})

/** @param 03-16 Delay Time of Current Agree Detection — Range: 0.1~10.0, Default: 0.1, Unit: s, Manual p.4-29 */
export const Param_03_16 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_16, 0.1, {
  group, code: "03-16", name: "Delay Time of Current Agree Detection",
  range: "0.1~10.0", default: "0.1", unit: "s", page: p429,
})

/** @param 03-32 Pulse Input Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-31 */
export const Param_03_32 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_32, 0.1, {
  group, code: "03-32", name: "Pulse Input Gain",
  range: "0.0~1000.0", default: "100.0", unit: "%", page: p431,
})

/** @param 03-33 Pulse Input Bias — Range: -100.0~100.0, Default: 0.0, Unit: %, Manual p.4-31 */
export const Param_03_33 = P.makeSignedScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_33, 0.1, {
  group, code: "03-33", name: "Pulse Input Bias",
  range: "-100.0~100.0", default: "0.0", unit: "%", page: p431,
})

/** @param 03-37 Timer ON Delay (DIO) — Range: 0.0~6000.0, Default: 0.0, Unit: s, Manual p.4-32 */
export const Param_03_37 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_37, 0.1, {
  group, code: "03-37", name: "Timer ON Delay (DIO)",
  range: "0.0~6000.0", default: "0.0", unit: "s", page: p432,
})

/** @param 03-38 Timer OFF Delay (DIO) — Range: 0.0~6000.0, Default: 0.0, Unit: s, Manual p.4-32 */
export const Param_03_38 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_38, 0.1, {
  group, code: "03-38", name: "Timer OFF Delay (DIO)",
  range: "0.0~6000.0", default: "0.0", unit: "s", page: p432,
})

/** @param 03-44 Frequency Detection Level 2 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-32 */
export const Param_03_44 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_44, 0.1, {
  group, code: "03-44", name: "Frequency Detection Level 2",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p432,
})

/** @param 03-45 Frequency Detection Width 2 — Range: 0.1~25.5, Default: 2.0, Unit: Hz, Manual p.4-32 */
export const Param_03_45 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_45, 0.1, {
  group, code: "03-45", name: "Frequency Detection Width 2",
  range: "0.1~25.5", default: "2.0", unit: "Hz", page: p432,
})

/** @param 03-46 Frequency Detection Level 3 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-32 */
export const Param_03_46 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_46, 0.1, {
  group, code: "03-46", name: "Frequency Detection Level 3",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p432,
})

/** @param 03-47 Frequency Detection Width 3 — Range: 0.1~25.5, Default: 2.0, Unit: Hz, Manual p.4-32 */
export const Param_03_47 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_47, 0.1, {
  group, code: "03-47", name: "Frequency Detection Width 3",
  range: "0.1~25.5", default: "2.0", unit: "Hz", page: p432,
})

/** @param 03-48 Low Current Detection Level — Range: 0.0~999.9, Default: 0.1, Unit: A, Manual p.4-32 */
export const Param_03_48 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_48, 0.1, {
  group, code: "03-48", name: "Low Current Detection Level",
  range: "0.0~999.9", default: "0.1", unit: "A", page: p432,
})

/** @param 03-50 Frequency Detection Level 4 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-32 */
export const Param_03_50 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_50, 0.1, {
  group, code: "03-50", name: "Frequency Detection Level 4",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p432,
})

/** @param 03-51 Frequency Detection Level 5 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-32 */
export const Param_03_51 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_51, 0.1, {
  group, code: "03-51", name: "Frequency Detection Level 5",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p432,
})

/** @param 03-52 Frequency Detection Level 6 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-33 */
export const Param_03_52 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_52, 0.1, {
  group, code: "03-52", name: "Frequency Detection Level 6",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p433,
})

/** @param 03-53 Current Agree Level 2 — Range: 0.0~999.9, Default: 0.1, Unit: A, Manual p.4-33 */
export const Param_03_53 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_53, 0.1, {
  group, code: "03-53", name: "Current Agree Level 2",
  range: "0.0~999.9", default: "0.1", unit: "A", page: p433,
})

// ── Scaled (×0.01) parameters ──────────────────────────────

/** @param 03-17 Mechanical Braking Release Level — Range: 0.00~599.00, Default: 0.00, Unit: Hz, Manual p.4-29 */
export const Param_03_17 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_17, 0.01, {
  group, code: "03-17", name: "Mechanical Braking Release Level",
  range: "0.00~599.00", default: "0.00", unit: "Hz", page: p429,
})

/** @param 03-18 Mechanical Braking Level Set — Range: 0.00~599.00, Default: 0.00, Unit: Hz, Manual p.4-29 */
export const Param_03_18 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_18, 0.01, {
  group, code: "03-18", name: "Mechanical Braking Level Set",
  range: "0.00~599.00", default: "0.00", unit: "Hz", page: p429,
})

/** @param 03-34 Filter Time of Pulse Input — Range: 0.00~2.00, Default: 0.10, Unit: Sec, Manual p.4-31 */
export const Param_03_34 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_34, 0.01, {
  group, code: "03-34", name: "Filter Time of Pulse Input",
  range: "0.00~2.00", default: "0.10", unit: "Sec", page: p431,
})

/** @param 03-40 Up/Down Frequency Width Setting — Range: 0.00~5.00, Default: 0.00, Unit: Hz, Manual p.4-32 */
export const Param_03_40 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_40, 0.01, {
  group, code: "03-40", name: "Up/Down Frequency Width Setting",
  range: "0.00~5.00", default: "0.00", unit: "Hz", page: p432,
})

/** @param 03-42 Brake Release Delay Time — Range: 0.00~65.00, Default: 0.00, Unit: s, Manual p.4-32 */
export const Param_03_42 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_42, 0.01, {
  group, code: "03-42", name: "Brake Release Delay Time",
  range: "0.00~65.00", default: "0.00", unit: "s", page: p432,
})

/** @param 03-49 Low Current Detection Delay Time — Range: 0.00~655.34, Default: 0.01, Unit: Sec, Manual p.4-32 */
export const Param_03_49 = P.makeScaledParam(GROUP_03_External_Digital_Input_and_Output_Parameters._03_49, 0.01, {
  group, code: "03-49", name: "Low Current Detection Delay Time",
  range: "0.00~655.34", default: "0.01", unit: "Sec", page: p432,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode03_00 = P.makeDecode(Param_03_00)
export const encode03_00 = P.makeEncode(Param_03_00)
export const formatted03_00 = P.makeFormatted(Param_03_00)

export const decode03_01 = P.makeDecode(Param_03_01)
export const encode03_01 = P.makeEncode(Param_03_01)
export const formatted03_01 = P.makeFormatted(Param_03_01)

export const decode03_02 = P.makeDecode(Param_03_02)
export const encode03_02 = P.makeEncode(Param_03_02)
export const formatted03_02 = P.makeFormatted(Param_03_02)

export const decode03_03 = P.makeDecode(Param_03_03)
export const encode03_03 = P.makeEncode(Param_03_03)
export const formatted03_03 = P.makeFormatted(Param_03_03)

export const decode03_04 = P.makeDecode(Param_03_04)
export const encode03_04 = P.makeEncode(Param_03_04)
export const formatted03_04 = P.makeFormatted(Param_03_04)

export const decode03_05 = P.makeDecode(Param_03_05)
export const encode03_05 = P.makeEncode(Param_03_05)
export const formatted03_05 = P.makeFormatted(Param_03_05)

export const decode03_06 = P.makeDecode(Param_03_06)
export const encode03_06 = P.makeEncode(Param_03_06)
export const formatted03_06 = P.makeFormatted(Param_03_06)

export const decode03_07 = P.makeDecode(Param_03_07)
export const encode03_07 = P.makeEncode(Param_03_07)
export const formatted03_07 = P.makeFormatted(Param_03_07)

export const decode03_08 = P.makeDecode(Param_03_08)
export const encode03_08 = P.makeEncode(Param_03_08)
export const formatted03_08 = P.makeFormatted(Param_03_08)

export const decode03_09 = P.makeDecode(Param_03_09)
export const encode03_09 = P.makeEncode(Param_03_09)
export const formatted03_09 = P.makeFormatted(Param_03_09)

export const decode03_10 = P.makeDecode(Param_03_10)
export const encode03_10 = P.makeEncode(Param_03_10)
export const formatted03_10 = P.makeFormatted(Param_03_10)

export const decode03_11 = P.makeDecode(Param_03_11)
export const encode03_11 = P.makeEncode(Param_03_11)
export const formatted03_11 = P.makeFormatted(Param_03_11)

export const decode03_12 = P.makeDecode(Param_03_12)
export const encode03_12 = P.makeEncode(Param_03_12)
export const formatted03_12 = P.makeFormatted(Param_03_12)

export const decode03_13 = P.makeDecode(Param_03_13)
export const encode03_13 = P.makeEncode(Param_03_13)
export const formatted03_13 = P.makeFormatted(Param_03_13)

export const decode03_14 = P.makeDecode(Param_03_14)
export const encode03_14 = P.makeEncode(Param_03_14)
export const formatted03_14 = P.makeFormatted(Param_03_14)

export const decode03_15 = P.makeDecode(Param_03_15)
export const encode03_15 = P.makeEncode(Param_03_15)
export const formatted03_15 = P.makeFormatted(Param_03_15)

export const decode03_16 = P.makeDecode(Param_03_16)
export const encode03_16 = P.makeEncode(Param_03_16)
export const formatted03_16 = P.makeFormatted(Param_03_16)

export const decode03_17 = P.makeDecode(Param_03_17)
export const encode03_17 = P.makeEncode(Param_03_17)
export const formatted03_17 = P.makeFormatted(Param_03_17)

export const decode03_18 = P.makeDecode(Param_03_18)
export const encode03_18 = P.makeEncode(Param_03_18)
export const formatted03_18 = P.makeFormatted(Param_03_18)

export const decode03_19 = P.makeDecode(Param_03_19)
export const encode03_19 = P.makeEncode(Param_03_19)
export const formatted03_19 = P.makeFormatted(Param_03_19)

export const decode03_20 = P.makeDecode(Param_03_20)
export const encode03_20 = P.makeEncode(Param_03_20)
export const formatted03_20 = P.makeFormatted(Param_03_20)

export const decode03_21 = P.makeDecode(Param_03_21)
export const encode03_21 = P.makeEncode(Param_03_21)
export const formatted03_21 = P.makeFormatted(Param_03_21)

export const decode03_27 = P.makeDecode(Param_03_27)
export const encode03_27 = P.makeEncode(Param_03_27)
export const formatted03_27 = P.makeFormatted(Param_03_27)

export const decode03_28 = P.makeDecode(Param_03_28)
export const encode03_28 = P.makeEncode(Param_03_28)
export const formatted03_28 = P.makeFormatted(Param_03_28)

export const decode03_29 = P.makeDecode(Param_03_29)
export const encode03_29 = P.makeEncode(Param_03_29)
export const formatted03_29 = P.makeFormatted(Param_03_29)

export const decode03_30 = P.makeDecode(Param_03_30)
export const encode03_30 = P.makeEncode(Param_03_30)
export const formatted03_30 = P.makeFormatted(Param_03_30)

export const decode03_31 = P.makeDecode(Param_03_31)
export const encode03_31 = P.makeEncode(Param_03_31)
export const formatted03_31 = P.makeFormatted(Param_03_31)

export const decode03_32 = P.makeDecode(Param_03_32)
export const encode03_32 = P.makeEncode(Param_03_32)
export const formatted03_32 = P.makeFormatted(Param_03_32)

export const decode03_33 = P.makeDecode(Param_03_33)
export const encode03_33 = P.makeEncode(Param_03_33)
export const formatted03_33 = P.makeFormatted(Param_03_33)

export const decode03_34 = P.makeDecode(Param_03_34)
export const encode03_34 = P.makeEncode(Param_03_34)
export const formatted03_34 = P.makeFormatted(Param_03_34)

export const decode03_35 = P.makeDecode(Param_03_35)
export const encode03_35 = P.makeEncode(Param_03_35)
export const formatted03_35 = P.makeFormatted(Param_03_35)

export const decode03_36 = P.makeDecode(Param_03_36)
export const encode03_36 = P.makeEncode(Param_03_36)
export const formatted03_36 = P.makeFormatted(Param_03_36)

export const decode03_37 = P.makeDecode(Param_03_37)
export const encode03_37 = P.makeEncode(Param_03_37)
export const formatted03_37 = P.makeFormatted(Param_03_37)

export const decode03_38 = P.makeDecode(Param_03_38)
export const encode03_38 = P.makeEncode(Param_03_38)
export const formatted03_38 = P.makeFormatted(Param_03_38)

export const decode03_40 = P.makeDecode(Param_03_40)
export const encode03_40 = P.makeEncode(Param_03_40)
export const formatted03_40 = P.makeFormatted(Param_03_40)

export const decode03_41 = P.makeDecode(Param_03_41)
export const encode03_41 = P.makeEncode(Param_03_41)
export const formatted03_41 = P.makeFormatted(Param_03_41)

export const decode03_42 = P.makeDecode(Param_03_42)
export const encode03_42 = P.makeEncode(Param_03_42)
export const formatted03_42 = P.makeFormatted(Param_03_42)

export const decode03_43 = P.makeDecode(Param_03_43)
export const encode03_43 = P.makeEncode(Param_03_43)
export const formatted03_43 = P.makeFormatted(Param_03_43)

export const decode03_44 = P.makeDecode(Param_03_44)
export const encode03_44 = P.makeEncode(Param_03_44)
export const formatted03_44 = P.makeFormatted(Param_03_44)

export const decode03_45 = P.makeDecode(Param_03_45)
export const encode03_45 = P.makeEncode(Param_03_45)
export const formatted03_45 = P.makeFormatted(Param_03_45)

export const decode03_46 = P.makeDecode(Param_03_46)
export const encode03_46 = P.makeEncode(Param_03_46)
export const formatted03_46 = P.makeFormatted(Param_03_46)

export const decode03_47 = P.makeDecode(Param_03_47)
export const encode03_47 = P.makeEncode(Param_03_47)
export const formatted03_47 = P.makeFormatted(Param_03_47)

export const decode03_48 = P.makeDecode(Param_03_48)
export const encode03_48 = P.makeEncode(Param_03_48)
export const formatted03_48 = P.makeFormatted(Param_03_48)

export const decode03_49 = P.makeDecode(Param_03_49)
export const encode03_49 = P.makeEncode(Param_03_49)
export const formatted03_49 = P.makeFormatted(Param_03_49)

export const decode03_50 = P.makeDecode(Param_03_50)
export const encode03_50 = P.makeEncode(Param_03_50)
export const formatted03_50 = P.makeFormatted(Param_03_50)

export const decode03_51 = P.makeDecode(Param_03_51)
export const encode03_51 = P.makeEncode(Param_03_51)
export const formatted03_51 = P.makeFormatted(Param_03_51)

export const decode03_52 = P.makeDecode(Param_03_52)
export const encode03_52 = P.makeEncode(Param_03_52)
export const formatted03_52 = P.makeFormatted(Param_03_52)

export const decode03_53 = P.makeDecode(Param_03_53)
export const encode03_53 = P.makeEncode(Param_03_53)
export const formatted03_53 = P.makeFormatted(Param_03_53)

// ── Group-level lookup ─────────────────────────────────────

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

export const group03Params: Record<string, ParamEntry> = {
  "03-00": param(Param_03_00, decode03_00, encode03_00),
  "03-01": param(Param_03_01, decode03_01, encode03_01),
  "03-02": param(Param_03_02, decode03_02, encode03_02),
  "03-03": param(Param_03_03, decode03_03, encode03_03),
  "03-04": param(Param_03_04, decode03_04, encode03_04),
  "03-05": param(Param_03_05, decode03_05, encode03_05),
  "03-06": param(Param_03_06, decode03_06, encode03_06),
  "03-07": param(Param_03_07, decode03_07, encode03_07),
  "03-08": param(Param_03_08, decode03_08, encode03_08),
  "03-09": param(Param_03_09, decode03_09, encode03_09),
  "03-10": param(Param_03_10, decode03_10, encode03_10),
  "03-11": param(Param_03_11, decode03_11, encode03_11),
  "03-12": param(Param_03_12, decode03_12, encode03_12),
  "03-13": param(Param_03_13, decode03_13, encode03_13),
  "03-14": param(Param_03_14, decode03_14, encode03_14),
  "03-15": param(Param_03_15, decode03_15, encode03_15),
  "03-16": param(Param_03_16, decode03_16, encode03_16),
  "03-17": param(Param_03_17, decode03_17, encode03_17),
  "03-18": param(Param_03_18, decode03_18, encode03_18),
  "03-19": param(Param_03_19, decode03_19, encode03_19),
  "03-20": param(Param_03_20, decode03_20, encode03_20),
  "03-21": param(Param_03_21, decode03_21, encode03_21),
  "03-27": param(Param_03_27, decode03_27, encode03_27),
  "03-28": param(Param_03_28, decode03_28, encode03_28),
  "03-29": param(Param_03_29, decode03_29, encode03_29),
  "03-30": param(Param_03_30, decode03_30, encode03_30),
  "03-31": param(Param_03_31, decode03_31, encode03_31),
  "03-32": param(Param_03_32, decode03_32, encode03_32),
  "03-33": param(Param_03_33, decode03_33, encode03_33),
  "03-34": param(Param_03_34, decode03_34, encode03_34),
  "03-35": param(Param_03_35, decode03_35, encode03_35),
  "03-36": param(Param_03_36, decode03_36, encode03_36),
  "03-37": param(Param_03_37, decode03_37, encode03_37),
  "03-38": param(Param_03_38, decode03_38, encode03_38),
  "03-40": param(Param_03_40, decode03_40, encode03_40),
  "03-41": param(Param_03_41, decode03_41, encode03_41),
  "03-42": param(Param_03_42, decode03_42, encode03_42),
  "03-43": param(Param_03_43, decode03_43, encode03_43),
  "03-44": param(Param_03_44, decode03_44, encode03_44),
  "03-45": param(Param_03_45, decode03_45, encode03_45),
  "03-46": param(Param_03_46, decode03_46, encode03_46),
  "03-47": param(Param_03_47, decode03_47, encode03_47),
  "03-48": param(Param_03_48, decode03_48, encode03_48),
  "03-49": param(Param_03_49, decode03_49, encode03_49),
  "03-50": param(Param_03_50, decode03_50, encode03_50),
  "03-51": param(Param_03_51, decode03_51, encode03_51),
  "03-52": param(Param_03_52, decode03_52, encode03_52),
  "03-53": param(Param_03_53, decode03_53, encode03_53),
}
