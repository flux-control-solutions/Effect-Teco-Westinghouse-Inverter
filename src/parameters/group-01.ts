/**
 * Group 01: V/F Control Parameters
 * Manual pages 4-22 to 4-24
 *
 * Parameter                           | Range              | Default       | Unit | Register
 * 01-00  V/F Curve Selection          | 0~FF (hex)         | F             | -    | 0x0100
 * 01-02  Max Output Freq Motor 1      | 4.8~599.0          | 50.0/60.0     | Hz   | 0x0102
 * 01-03  Max Output Voltage Motor 1   | 0.1~255.0 (230V)   | -             | V    | 0x0103
 * 01-04  Middle Freq 2 Motor 1        | 0.0~599.0          | 0.0           | Hz   | 0x0104
 * 01-05  Middle Voltage 2 Motor 1     | 0.0~255.0 (230V)   | 0.0           | V    | 0x0105
 * 01-06  Middle Freq 1 Motor 1        | 0.0~599.0          | 3.0           | Hz   | 0x0106
 * 01-07  Middle Voltage 1 Motor 1     | 0.0~255.0 (230V)   | ***** (KVA)   | V    | 0x0107
 * 01-08  Min Output Freq Motor 1      | 0.0~599.0          | VF:1.5        | Hz   | 0x0108
 * 01-09  Min Output Voltage Motor 1   | 0.0~255.0 (230V)   | 8.3 (230V)    | V    | 0x0109
 * 01-10  Torque Compensation Gain     | 0.0~2.0            | 0.5           | -    | 0x010A
 * 01-11  Torque Compensation Mode     | 0-1                | 0             | -    | 0x010B
 * 01-12  Base Freq Motor 1            | 4.8~599.0          | 50.0/60.0     | Hz   | 0x010C
 * 01-13  Base Output Voltage Motor 1  | 0.0~255.0 (230V)   | -             | V    | 0x010D
 * 01-14  Input Voltage Setting        | 155.0~255.0 (230V) | -             | V    | 0x010E
 * 01-15  Torque Compensation Time     | 0~10000            | 200           | ms   | 0x010F
 * 01-16  Max Output Freq Motor 2      | 4.8~599.0          | 50.0/60.0     | Hz   | 0x0110
 * 01-17  Max Output Voltage Motor 2   | 0.1~255.0 (230V)   | -             | V    | 0x0111
 * 01-18  Middle Freq 2 Motor 2        | 0.0~599.0          | 0.0           | Hz   | 0x0112
 * 01-19  Middle Voltage 2 Motor 2     | 0.0~255.0 (230V)   | 0.0           | V    | 0x0113
 * 01-20  Middle Freq 1 Motor 2        | 0.0~599.0          | 3.0           | Hz   | 0x0114
 * 01-21  Middle Voltage 1 Motor 2     | 0.0~255.0 (230V)   | KVA           | V    | 0x0115
 * 01-22  Min Output Freq Motor 2      | 0.0~599.0          | 1.5           | Hz   | 0x0116
 * 01-23  Min Output Voltage Motor 2   | 0.0~255.0 (230V)   | KVA           | V    | 0x0117
 * 01-24  Base Freq Motor 2            | 4.8~599.0          | 50.0/60.0     | Hz   | 0x0118
 * 01-25  Base Output Voltage Motor 2  | 0.0~255.0 (230V)   | -             | V    | 0x0119
 * 01-26  V/F Curve Selection Motor 2  | 0~FF (hex)         | F             | -    | 0x011A
 */

import * as P from "./param-utils";
import { GROUP_01_VF_Control_Parameters } from "../Registers";

const group = 1 as const;
const p422 = 422 as const;
const p423 = 423 as const;
const p424 = 424 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 01-00 V/F Curve Selection — Range: 0~FF (hex), Default: F, Manual p.4-22 */
export const Param_01_00 = P.makeParam(GROUP_01_VF_Control_Parameters._01_00, {
  group, code: "01-00", name: "V/F Curve Selection",
  range: "0~FF (hex)", default: "F (hex)", unit: "-", page: p422,
})

/** @param 01-15 Torque Compensation Time — Range: 0~10000, Default: 200, Unit: ms, Manual p.4-23 */
export const Param_01_15 = P.makeParam(GROUP_01_VF_Control_Parameters._01_15, {
  group, code: "01-15", name: "Torque Compensation Time",
  range: "0~10000", default: "200", unit: "ms", page: p423,
})

/** @param 01-26 V/F Curve Selection of Motor 2 — Range: 0~FF (hex), Default: F, Manual p.4-24 */
export const Param_01_26 = P.makeParam(GROUP_01_VF_Control_Parameters._01_26, {
  group, code: "01-26", name: "V/F Curve Selection of Motor 2",
  range: "0~FF (hex)", default: "F (hex)", unit: "-", page: p424,
})

// ── Scaled (×0.1 Hz or V) parameters ───────────────────────

/** @param 01-02 Maximum Output Frequency of Motor 1 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-22 */
export const Param_01_02 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_02, 0.1, {
  group, code: "01-02", name: "Maximum Output Frequency of Motor 1",
  range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: p422,
})

/** @param 01-03 Maximum Output Voltage of Motor 1 — Range: 0.1~255.0 (230V), Default: -, Unit: V, Manual p.4-22 */
export const Param_01_03 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_03, 0.1, {
  group, code: "01-03", name: "Maximum Output Voltage of Motor 1",
  range: "0.1~255.0 (230V) / 0.2~510.0 (460V) / 0.1~670.0 (575V) / 0.1~804.0 (690V)", default: "-", unit: "V", page: p422,
})

/** @param 01-04 Middle Output Frequency 2 of Motor 1 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-22 */
export const Param_01_04 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_04, 0.1, {
  group, code: "01-04", name: "Middle Output Frequency 2 of Motor 1",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p422,
})

/** @param 01-05 Middle Output Voltage 2 of Motor 1 — Range: 0.0~255.0 (230V), Default: 0.0, Unit: V, Manual p.4-22 */
export const Param_01_05 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_05, 0.1, {
  group, code: "01-05", name: "Middle Output Voltage 2 of Motor 1",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "0.0", unit: "V", page: p422,
})

/** @param 01-06 Middle Output Frequency 1 of Motor 1 — Range: 0.0~599.0, Default: 3.0, Unit: Hz, Manual p.4-22 */
export const Param_01_06 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_06, 0.1, {
  group, code: "01-06", name: "Middle Output Frequency 1 of Motor 1",
  range: "0.0~599.0", default: "3.0", unit: "Hz", page: p422,
})

/** @param 01-07 Middle Output Voltage 1 of Motor 1 — Range: 0.0~255.0 (230V), Default: ***** (KVA dependent), Unit: V, Manual p.4-22 */
export const Param_01_07 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_07, 0.1, {
  group, code: "01-07", name: "Middle Output Voltage 1 of Motor 1",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "***** (KVA dependent)", unit: "V", page: p422,
})

/** @param 01-08 Minimum Output Frequency of Motor 1 — Range: 0.0~599.0, Default: VF:1.5 / SLV:0.6 / SV:0.1, Unit: Hz, Manual p.4-22 */
export const Param_01_08 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_08, 0.1, {
  group, code: "01-08", name: "Minimum Output Frequency of Motor 1",
  range: "0.0~599.0", default: "VF:1.5 / VF+PG:1.5 / SLV:0.6 / SV:0.1 / PMSV:0.1 / PMSLV:9.0 / SLV2:1.0", unit: "Hz", page: p422,
})

/** @param 01-09 Minimum Output Voltage of Motor 1 — Range: 0.0~255.0 (230V), Default: 8.3 (230V) / 15.0 (460V), Unit: V, Manual p.4-22 */
export const Param_01_09 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_09, 0.1, {
  group, code: "01-09", name: "Minimum Output Voltage of Motor 1",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "8.3 (230V) / 15.0 (460V)", unit: "V", page: p422,
})

/** @param 01-10 Torque Compensation Gain — Range: 0.0~2.0, Default: 0.5, Unit: -, Manual p.4-22 */
export const Param_01_10 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_10, 0.1, {
  group, code: "01-10", name: "Torque Compensation Gain",
  range: "0.0~2.0", default: "0.5", unit: "-", page: p422,
})

/** @param 01-12 Base Frequency of Motor 1 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-23 */
export const Param_01_12 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_12, 0.1, {
  group, code: "01-12", name: "Base Frequency of Motor 1",
  range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: p423,
})

/** @param 01-13 Base Output Voltage of Motor 1 — Range: 0.0~255.0 (230V), Default: -, Unit: V, Manual p.4-23 */
export const Param_01_13 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_13, 0.1, {
  group, code: "01-13", name: "Base Output Voltage of Motor 1",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "-", unit: "V", page: p423,
})

/** @param 01-14 Input Voltage Setting — Range: 155.0~255.0 (230V), Default: -, Unit: V, Manual p.4-23 */
export const Param_01_14 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_14, 0.1, {
  group, code: "01-14", name: "Input Voltage Setting",
  range: "155.0~255.0 (230V) / 310.0~510.0 (460V) / 540.0~670.0 (575V) / 648.0~804.0 (690V)", default: "-", unit: "V", page: p423,
})

/** @param 01-16 Maximum Output Frequency of Motor 2 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-23 */
export const Param_01_16 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_16, 0.1, {
  group, code: "01-16", name: "Maximum Output Frequency of Motor 2",
  range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: p423,
})

/** @param 01-17 Maximum Output Voltage of Motor 2 — Range: 0.1~255.0 (230V), Default: -, Unit: V, Manual p.4-23 */
export const Param_01_17 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_17, 0.1, {
  group, code: "01-17", name: "Maximum Output Voltage of Motor 2",
  range: "0.1~255.0 (230V) / 0.2~510.0 (460V) / 0.1~670.0 (575V) / 0.1~804.0 (690V)", default: "-", unit: "V", page: p423,
})

/** @param 01-18 Middle Output Frequency 2 of Motor 2 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-23 */
export const Param_01_18 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_18, 0.1, {
  group, code: "01-18", name: "Middle Output Frequency 2 of Motor 2",
  range: "0.0~599.0", default: "0.0", unit: "Hz", page: p423,
})

/** @param 01-19 Middle Output Voltage 2 of Motor 2 — Range: 0.0~255.0 (230V), Default: 0.0, Unit: V, Manual p.4-23 */
export const Param_01_19 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_19, 0.1, {
  group, code: "01-19", name: "Middle Output Voltage 2 of Motor 2",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "0.0", unit: "V", page: p423,
})

/** @param 01-20 Middle Output Frequency 1 of Motor 2 — Range: 0.0~599.0, Default: 3.0, Unit: Hz, Manual p.4-23 */
export const Param_01_20 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_20, 0.1, {
  group, code: "01-20", name: "Middle Output Frequency 1 of Motor 2",
  range: "0.0~599.0", default: "3.0", unit: "Hz", page: p423,
})

/** @param 01-21 Middle Output Voltage 1 of Motor 2 — Range: 0.0~255.0 (230V), Default: KVA, Unit: V, Manual p.4-23 */
export const Param_01_21 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_21, 0.1, {
  group, code: "01-21", name: "Middle Output Voltage 1 of Motor 2",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "KVA (inverter capacity dependent)", unit: "V", page: p423,
})

/** @param 01-22 Minimum Output Frequency of Motor 2 — Range: 0.0~599.0, Default: 1.5, Unit: Hz, Manual p.4-23 */
export const Param_01_22 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_22, 0.1, {
  group, code: "01-22", name: "Minimum Output Frequency of Motor 2",
  range: "0.0~599.0", default: "1.5", unit: "Hz", page: p423,
})

/** @param 01-23 Minimum Output Voltage of Motor 2 — Range: 0.0~255.0 (230V), Default: KVA, Unit: V, Manual p.4-23 */
export const Param_01_23 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_23, 0.1, {
  group, code: "01-23", name: "Minimum Output Voltage of Motor 2",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "KVA (inverter capacity dependent)", unit: "V", page: p423,
})

/** @param 01-24 Base Frequency of Motor 2 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-23 */
export const Param_01_24 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_24, 0.1, {
  group, code: "01-24", name: "Base Frequency of Motor 2",
  range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: p423,
})

/** @param 01-25 Base Output Voltage of Motor 2 — Range: 0.0~255.0 (230V), Default: -, Unit: V, Manual p.4-24 */
export const Param_01_25 = P.makeScaledParam(GROUP_01_VF_Control_Parameters._01_25, 0.1, {
  group, code: "01-25", name: "Base Output Voltage of Motor 2",
  range: "0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)", default: "-", unit: "V", page: p424,
})

// ── Enum parameters ────────────────────────────────────────

/** @param 01-11 Selection of Torque Compensation Mode — Range: 0-1, Default: 0, Manual p.4-23 */
export const Param_01_11 = P.makeEnumParam(GROUP_01_VF_Control_Parameters._01_11, {
  0: "Torque Compensation Mode 0",
  1: "Torque Compensation Mode 1",
} as const, {
  group, code: "01-11", name: "Selection of Torque Compensation Mode",
  range: "0-1", default: "0", unit: "-", page: p423,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode01_00 = P.makeDecode(Param_01_00)
export const encode01_00 = P.makeEncode(Param_01_00)
export const formatted01_00 = P.makeFormatted(Param_01_00)

export const decode01_02 = P.makeDecode(Param_01_02)
export const encode01_02 = P.makeEncode(Param_01_02)
export const formatted01_02 = P.makeFormatted(Param_01_02)

export const decode01_03 = P.makeDecode(Param_01_03)
export const encode01_03 = P.makeEncode(Param_01_03)
export const formatted01_03 = P.makeFormatted(Param_01_03)

export const decode01_04 = P.makeDecode(Param_01_04)
export const encode01_04 = P.makeEncode(Param_01_04)
export const formatted01_04 = P.makeFormatted(Param_01_04)

export const decode01_05 = P.makeDecode(Param_01_05)
export const encode01_05 = P.makeEncode(Param_01_05)
export const formatted01_05 = P.makeFormatted(Param_01_05)

export const decode01_06 = P.makeDecode(Param_01_06)
export const encode01_06 = P.makeEncode(Param_01_06)
export const formatted01_06 = P.makeFormatted(Param_01_06)

export const decode01_07 = P.makeDecode(Param_01_07)
export const encode01_07 = P.makeEncode(Param_01_07)
export const formatted01_07 = P.makeFormatted(Param_01_07)

export const decode01_08 = P.makeDecode(Param_01_08)
export const encode01_08 = P.makeEncode(Param_01_08)
export const formatted01_08 = P.makeFormatted(Param_01_08)

export const decode01_09 = P.makeDecode(Param_01_09)
export const encode01_09 = P.makeEncode(Param_01_09)
export const formatted01_09 = P.makeFormatted(Param_01_09)

export const decode01_10 = P.makeDecode(Param_01_10)
export const encode01_10 = P.makeEncode(Param_01_10)
export const formatted01_10 = P.makeFormatted(Param_01_10)

export const decode01_11 = P.makeDecode(Param_01_11)
export const encode01_11 = P.makeEncode(Param_01_11)
export const formatted01_11 = P.makeFormatted(Param_01_11)

export const decode01_12 = P.makeDecode(Param_01_12)
export const encode01_12 = P.makeEncode(Param_01_12)
export const formatted01_12 = P.makeFormatted(Param_01_12)

export const decode01_13 = P.makeDecode(Param_01_13)
export const encode01_13 = P.makeEncode(Param_01_13)
export const formatted01_13 = P.makeFormatted(Param_01_13)

export const decode01_14 = P.makeDecode(Param_01_14)
export const encode01_14 = P.makeEncode(Param_01_14)
export const formatted01_14 = P.makeFormatted(Param_01_14)

export const decode01_15 = P.makeDecode(Param_01_15)
export const encode01_15 = P.makeEncode(Param_01_15)
export const formatted01_15 = P.makeFormatted(Param_01_15)

export const decode01_16 = P.makeDecode(Param_01_16)
export const encode01_16 = P.makeEncode(Param_01_16)
export const formatted01_16 = P.makeFormatted(Param_01_16)

export const decode01_17 = P.makeDecode(Param_01_17)
export const encode01_17 = P.makeEncode(Param_01_17)
export const formatted01_17 = P.makeFormatted(Param_01_17)

export const decode01_18 = P.makeDecode(Param_01_18)
export const encode01_18 = P.makeEncode(Param_01_18)
export const formatted01_18 = P.makeFormatted(Param_01_18)

export const decode01_19 = P.makeDecode(Param_01_19)
export const encode01_19 = P.makeEncode(Param_01_19)
export const formatted01_19 = P.makeFormatted(Param_01_19)

export const decode01_20 = P.makeDecode(Param_01_20)
export const encode01_20 = P.makeEncode(Param_01_20)
export const formatted01_20 = P.makeFormatted(Param_01_20)

export const decode01_21 = P.makeDecode(Param_01_21)
export const encode01_21 = P.makeEncode(Param_01_21)
export const formatted01_21 = P.makeFormatted(Param_01_21)

export const decode01_22 = P.makeDecode(Param_01_22)
export const encode01_22 = P.makeEncode(Param_01_22)
export const formatted01_22 = P.makeFormatted(Param_01_22)

export const decode01_23 = P.makeDecode(Param_01_23)
export const encode01_23 = P.makeEncode(Param_01_23)
export const formatted01_23 = P.makeFormatted(Param_01_23)

export const decode01_24 = P.makeDecode(Param_01_24)
export const encode01_24 = P.makeEncode(Param_01_24)
export const formatted01_24 = P.makeFormatted(Param_01_24)

export const decode01_25 = P.makeDecode(Param_01_25)
export const encode01_25 = P.makeEncode(Param_01_25)
export const formatted01_25 = P.makeFormatted(Param_01_25)

export const decode01_26 = P.makeDecode(Param_01_26)
export const encode01_26 = P.makeEncode(Param_01_26)
export const formatted01_26 = P.makeFormatted(Param_01_26)

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

export const group01Params: Record<string, ParamEntry> = {
  "01-00": param(Param_01_00, decode01_00, encode01_00),
  "01-02": param(Param_01_02, decode01_02, encode01_02),
  "01-03": param(Param_01_03, decode01_03, encode01_03),
  "01-04": param(Param_01_04, decode01_04, encode01_04),
  "01-05": param(Param_01_05, decode01_05, encode01_05),
  "01-06": param(Param_01_06, decode01_06, encode01_06),
  "01-07": param(Param_01_07, decode01_07, encode01_07),
  "01-08": param(Param_01_08, decode01_08, encode01_08),
  "01-09": param(Param_01_09, decode01_09, encode01_09),
  "01-10": param(Param_01_10, decode01_10, encode01_10),
  "01-11": param(Param_01_11, decode01_11, encode01_11),
  "01-12": param(Param_01_12, decode01_12, encode01_12),
  "01-13": param(Param_01_13, decode01_13, encode01_13),
  "01-14": param(Param_01_14, decode01_14, encode01_14),
  "01-15": param(Param_01_15, decode01_15, encode01_15),
  "01-16": param(Param_01_16, decode01_16, encode01_16),
  "01-17": param(Param_01_17, decode01_17, encode01_17),
  "01-18": param(Param_01_18, decode01_18, encode01_18),
  "01-19": param(Param_01_19, decode01_19, encode01_19),
  "01-20": param(Param_01_20, decode01_20, encode01_20),
  "01-21": param(Param_01_21, decode01_21, encode01_21),
  "01-22": param(Param_01_22, decode01_22, encode01_22),
  "01-23": param(Param_01_23, decode01_23, encode01_23),
  "01-24": param(Param_01_24, decode01_24, encode01_24),
  "01-25": param(Param_01_25, decode01_25, encode01_25),
  "01-26": param(Param_01_26, decode01_26, encode01_26),
}
