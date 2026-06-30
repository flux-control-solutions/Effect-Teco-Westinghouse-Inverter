/**
 * Group 02: IM Motor Parameters
 * Manual pages 4-25 to 4-26
 *
 * Parameter                                | Range                        | Default       | Unit | Page
 * 02-00  No-Load Current of Motor 1        | 0.01~600.00                 | -             | A    | 4-25
 * 02-01  Rated Current of Motor 1          | 10%~200% of inv rated cur   | -             | A    | 4-25
 * 02-03  Rated Rotation Speed of Motor 1   | 0~60000                     | -             | Rpm  | 4-25
 * 02-04  Rated Voltage of Motor 1          | 50.0~240.0 (230V)           | -             | V    | 4-25
 * 02-05  Rated Power of Motor 1            | 0.01~600.00                 | -             | kW   | 4-25
 * 02-06  Rated Frequency of Motor 1        | 4.8~599.0                   | 50.0/60.0     | Hz   | 4-25
 * 02-07  Poles of Motor 1                  | 2~16 (Even)                 | 4             | -    | 4-25
 * 02-09  Excitation Current of Motor 1     | 15%~70% of Motor Rated Cur  | -             | %    | 4-25
 * 02-10  Core Saturation Coeff 1 Motor 1   | 1~100                       | -             | %    | 4-25
 * 02-11  Core Saturation Coeff 2 Motor 1   | 1~100                       | -             | %    | 4-25
 * 02-12  Core Saturation Coeff 3 Motor 1   | 80~300                      | -             | %    | 4-25
 * 02-13  Core Loss of Motor 1              | 0.0~15.0                    | -             | %    | 4-25
 * 02-15  Resistance between Wires Motor 1  | 0.001~60.000                | -             | Ω    | 4-25
 * 02-19  No-Load Voltage of Motor 1        | 50~240 (230V)               | -             | V    | 4-25
 * 02-20  No-Load Current of Motor 2        | 0.01~600.00                 | -             | A    | 4-25
 * 02-21  Rated Current of Motor 2          | 10%~200% of inv rated cur   | -             | A    | 4-25
 * 02-22  Rated Rotation Speed of Motor 2   | 0~60000                     | -             | Rpm  | 4-25
 * 02-23  Rated Voltage of Motor 2          | 50.0~240.0 (230V)           | -             | V    | 4-25
 * 02-24  Rated Power of Motor 2            | 0.01~600.00                 | -             | kW   | 4-25
 * 02-25  Rated Frequency of Motor 2        | 4.8~599.0                   | 50.0/60.0     | Hz   | 4-25
 * 02-26  Poles of Motor 2                  | 2~16 (Even)                 | 4             | -    | 4-25
 * 02-32  Resistance between Wires Motor 2  | 0.001~60.000                | -             | Ω    | 4-25
 * 02-33  Proportion of Motor 1 Leak Induct | 0.1~15.0                    | 3.7           | %    | 4-25
 * 02-34  Motor 1 Slip Frequency            | 0.10~20.00                  | 2.48          | Hz   | 4-25
 * 02-37  Motor Mechanical Loss             | 0.0~10.0                    | 4.0           | %    | 4-26
 */

import * as P from "./param-utils";
import { GROUP_02_IM_Motor_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 2 as const;
const p425 = 425 as const;
const p426 = 426 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 02-01 Rated Current of Motor 1 — Range: 10%~200% of inverter's rated current, Default: -, Unit: A, Manual p.4-25 */
export const Param_02_01 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_01, {
  group, code: "02-01", name: "Rated Current of Motor 1",
  range: "10%~200% of inverter's rated current", default: "- (inverter dependent)", unit: "A", page: p425,
})

/** @param 02-03 Rated Rotation Speed of Motor 1 — Range: 0~60000, Default: -, Unit: Rpm, Manual p.4-25 */
export const Param_02_03 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_03, {
  group, code: "02-03", name: "Rated Rotation Speed of Motor 1",
  range: "0~60000", default: "-", unit: "Rpm", page: p425,
})

/** @param 02-07 Poles of Motor 1 — Range: 2~16 (Even), Default: 4, Manual p.4-25 */
export const Param_02_07 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_07, {
  group, code: "02-07", name: "Poles of Motor 1",
  range: "2~16 (Even)", default: "4", unit: "-", page: p425,
})

/** @param 02-09 Excitation Current of Motor 1 — Range: 15%~70% of Motor Rated Current, Default: -, Unit: %, Manual p.4-25 */
export const Param_02_09 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_09, {
  group, code: "02-09", name: "Excitation Current of Motor 1",
  range: "15%~70% of Motor Rated Current", default: "-", unit: "%", page: p425,
})

/** @param 02-10 Core Saturation Coefficient 1 of Motor 1 — Range: 1~100, Default: -, Unit: %, Manual p.4-25 */
export const Param_02_10 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_10, {
  group, code: "02-10", name: "Core Saturation Coefficient 1 of Motor 1",
  range: "1~100", default: "-", unit: "%", page: p425,
})

/** @param 02-11 Core Saturation Coefficient 2 of Motor 1 — Range: 1~100, Default: -, Unit: %, Manual p.4-25 */
export const Param_02_11 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_11, {
  group, code: "02-11", name: "Core Saturation Coefficient 2 of Motor 1",
  range: "1~100", default: "-", unit: "%", page: p425,
})

/** @param 02-12 Core Saturation Coefficient 3 of Motor 1 — Range: 80~300, Default: -, Unit: %, Manual p.4-25 */
export const Param_02_12 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_12, {
  group, code: "02-12", name: "Core Saturation Coefficient 3 of Motor 1",
  range: "80~300", default: "-", unit: "%", page: p425,
})

/** @param 02-19 No-Load Voltage of Motor 1 — Range: 50~240 (230V), Default: -, Unit: V, Manual p.4-25 */
export const Param_02_19 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_19, {
  group, code: "02-19", name: "No-Load Voltage of Motor 1",
  range: "50~240 (230V) / 100~480 (460V) / 420~600 (575V) / 504~720 (690V)", default: "-", unit: "V", page: p425,
})

/** @param 02-21 Rated Current of Motor 2 — Range: 10%~200% of inverter's rated current, Default: -, Unit: A, Manual p.4-25 */
export const Param_02_21 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_21, {
  group, code: "02-21", name: "Rated Current of Motor 2",
  range: "10%~200% of inverter's rated current", default: "- (inverter dependent)", unit: "A", page: p425,
})

/** @param 02-22 Rated Rotation Speed of Motor 2 — Range: 0~60000, Default: -, Unit: Rpm, Manual p.4-25 */
export const Param_02_22 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_22, {
  group, code: "02-22", name: "Rated Rotation Speed of Motor 2",
  range: "0~60000", default: "-", unit: "Rpm", page: p425,
})

/** @param 02-26 Poles of Motor 2 — Range: 2~16 (Even), Default: 4, Manual p.4-25 */
export const Param_02_26 = P.makeParam(GROUP_02_IM_Motor_Parameters._02_26, {
  group, code: "02-26", name: "Poles of Motor 2",
  range: "2~16 (Even)", default: "4", unit: "-", page: p425,
})

// ── Scaled (×0.01) parameters ──────────────────────────────

/** @param 02-00 No-Load Current of Motor 1 — Range: 0.01~600.00, Default: -, Unit: A, Manual p.4-25 */
export const Param_02_00 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_00, 0.01, {
  group, code: "02-00", name: "No-Load Current of Motor 1",
  range: "0.01~600.00", default: "-", unit: "A", page: p425,
})

/** @param 02-05 Rated Power of Motor 1 — Range: 0.01~600.00, Default: -, Unit: kW, Manual p.4-25 */
export const Param_02_05 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_05, 0.01, {
  group, code: "02-05", name: "Rated Power of Motor 1",
  range: "0.01~600.00", default: "-", unit: "kW", page: p425,
})

/** @param 02-20 No-Load Current of Motor 2 — Range: 0.01~600.00, Default: -, Unit: A, Manual p.4-25 */
export const Param_02_20 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_20, 0.01, {
  group, code: "02-20", name: "No-Load Current of Motor 2",
  range: "0.01~600.00", default: "-", unit: "A", page: p425,
})

/** @param 02-24 Rated Power of Motor 2 — Range: 0.01~600.00, Default: -, Unit: kW, Manual p.4-25 */
export const Param_02_24 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_24, 0.01, {
  group, code: "02-24", name: "Rated Power of Motor 2",
  range: "0.01~600.00", default: "-", unit: "kW", page: p425,
})

/** @param 02-34 Motor 1 Slip Frequency — Range: 0.10~20.00, Default: 2.48, Unit: Hz, Manual p.4-25 */
export const Param_02_34 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_34, 0.01, {
  group, code: "02-34", name: "Motor 1 Slip Frequency",
  range: "0.10~20.00", default: "2.48", unit: "Hz", page: p425,
})

// ── Scaled (×0.001) parameters ─────────────────────────────

/** @param 02-15 Resistance between Wires of Motor 1 — Range: 0.001~60.000, Default: -, Unit: Ω, Manual p.4-25 */
export const Param_02_15 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_15, 0.001, {
  group, code: "02-15", name: "Resistance between Wires of Motor 1",
  range: "0.001~60.000", default: "-", unit: "Ω", page: p425,
})

/** @param 02-32 Resistance between Wires of Motor 2 — Range: 0.001~60.000, Default: -, Unit: Ω, Manual p.4-25 */
export const Param_02_32 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_32, 0.001, {
  group, code: "02-32", name: "Resistance between Wires of Motor 2",
  range: "0.001~60.000", default: "-", unit: "Ω", page: p425,
})

// ── Scaled (×0.1) parameters ───────────────────────────────

/** @param 02-04 Rated Voltage of Motor 1 — Range: 50.0~240.0 (230V), Default: -, Unit: V, Manual p.4-25 */
export const Param_02_04 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_04, 0.1, {
  group, code: "02-04", name: "Rated Voltage of Motor 1",
  range: "50.0~240.0 (230V) / 100.0~480.0 (460V) / 150.0~670.0 (575V) / 200.0~804.0 (690V)", default: "-", unit: "V", page: p425,
})

/** @param 02-06 Rated Frequency of Motor 1 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-25 */
export const Param_02_06 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_06, 0.1, {
  group, code: "02-06", name: "Rated Frequency of Motor 1",
  range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: p425,
})

/** @param 02-13 Core Loss of Motor 1 — Range: 0.0~15.0, Default: -, Unit: %, Manual p.4-25 */
export const Param_02_13 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_13, 0.1, {
  group, code: "02-13", name: "Core Loss of Motor 1",
  range: "0.0~15.0", default: "-", unit: "%", page: p425,
})

/** @param 02-23 Rated Voltage of Motor 2 — Range: 50.0~240.0 (230V), Default: -, Unit: V, Manual p.4-25 */
export const Param_02_23 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_23, 0.1, {
  group, code: "02-23", name: "Rated Voltage of Motor 2",
  range: "50.0~240.0 (230V) / 100.0~480.0 (460V) / 150.0~670.0 (575V) / 200.0~804.0 (690V)", default: "-", unit: "V", page: p425,
})

/** @param 02-25 Rated Frequency of Motor 2 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-25 */
export const Param_02_25 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_25, 0.1, {
  group, code: "02-25", name: "Rated Frequency of Motor 2",
  range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: p425,
})

/** @param 02-33 Proportion of Motor 1 Leakage Inductance — Range: 0.1~15.0, Default: 3.7, Unit: %, Manual p.4-25 */
export const Param_02_33 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_33, 0.1, {
  group, code: "02-33", name: "Proportion of Motor 1 Leakage Inductance",
  range: "0.1~15.0", default: "3.7", unit: "%", page: p425,
})

/** @param 02-37 Motor Mechanical Loss — Range: 0.0~10.0, Default: 4.0, Unit: %, Manual p.4-26 */
export const Param_02_37 = P.makeScaledParam(GROUP_02_IM_Motor_Parameters._02_37, 0.1, {
  group, code: "02-37", name: "Motor Mechanical Loss",
  range: "0.0~10.0", default: "4.0", unit: "%", page: p426,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode02_00 = P.makeDecode(Param_02_00)
export const encode02_00 = P.makeEncode(Param_02_00)
export const formatted02_00 = P.makeFormatted(Param_02_00)

export const decode02_01 = P.makeDecode(Param_02_01)
export const encode02_01 = P.makeEncode(Param_02_01)
export const formatted02_01 = P.makeFormatted(Param_02_01)

export const decode02_03 = P.makeDecode(Param_02_03)
export const encode02_03 = P.makeEncode(Param_02_03)
export const formatted02_03 = P.makeFormatted(Param_02_03)

export const decode02_04 = P.makeDecode(Param_02_04)
export const encode02_04 = P.makeEncode(Param_02_04)
export const formatted02_04 = P.makeFormatted(Param_02_04)

export const decode02_05 = P.makeDecode(Param_02_05)
export const encode02_05 = P.makeEncode(Param_02_05)
export const formatted02_05 = P.makeFormatted(Param_02_05)

export const decode02_06 = P.makeDecode(Param_02_06)
export const encode02_06 = P.makeEncode(Param_02_06)
export const formatted02_06 = P.makeFormatted(Param_02_06)

export const decode02_07 = P.makeDecode(Param_02_07)
export const encode02_07 = P.makeEncode(Param_02_07)
export const formatted02_07 = P.makeFormatted(Param_02_07)

export const decode02_09 = P.makeDecode(Param_02_09)
export const encode02_09 = P.makeEncode(Param_02_09)
export const formatted02_09 = P.makeFormatted(Param_02_09)

export const decode02_10 = P.makeDecode(Param_02_10)
export const encode02_10 = P.makeEncode(Param_02_10)
export const formatted02_10 = P.makeFormatted(Param_02_10)

export const decode02_11 = P.makeDecode(Param_02_11)
export const encode02_11 = P.makeEncode(Param_02_11)
export const formatted02_11 = P.makeFormatted(Param_02_11)

export const decode02_12 = P.makeDecode(Param_02_12)
export const encode02_12 = P.makeEncode(Param_02_12)
export const formatted02_12 = P.makeFormatted(Param_02_12)

export const decode02_13 = P.makeDecode(Param_02_13)
export const encode02_13 = P.makeEncode(Param_02_13)
export const formatted02_13 = P.makeFormatted(Param_02_13)

export const decode02_15 = P.makeDecode(Param_02_15)
export const encode02_15 = P.makeEncode(Param_02_15)
export const formatted02_15 = P.makeFormatted(Param_02_15)

export const decode02_19 = P.makeDecode(Param_02_19)
export const encode02_19 = P.makeEncode(Param_02_19)
export const formatted02_19 = P.makeFormatted(Param_02_19)

export const decode02_20 = P.makeDecode(Param_02_20)
export const encode02_20 = P.makeEncode(Param_02_20)
export const formatted02_20 = P.makeFormatted(Param_02_20)

export const decode02_21 = P.makeDecode(Param_02_21)
export const encode02_21 = P.makeEncode(Param_02_21)
export const formatted02_21 = P.makeFormatted(Param_02_21)

export const decode02_22 = P.makeDecode(Param_02_22)
export const encode02_22 = P.makeEncode(Param_02_22)
export const formatted02_22 = P.makeFormatted(Param_02_22)

export const decode02_23 = P.makeDecode(Param_02_23)
export const encode02_23 = P.makeEncode(Param_02_23)
export const formatted02_23 = P.makeFormatted(Param_02_23)

export const decode02_24 = P.makeDecode(Param_02_24)
export const encode02_24 = P.makeEncode(Param_02_24)
export const formatted02_24 = P.makeFormatted(Param_02_24)

export const decode02_25 = P.makeDecode(Param_02_25)
export const encode02_25 = P.makeEncode(Param_02_25)
export const formatted02_25 = P.makeFormatted(Param_02_25)

export const decode02_26 = P.makeDecode(Param_02_26)
export const encode02_26 = P.makeEncode(Param_02_26)
export const formatted02_26 = P.makeFormatted(Param_02_26)

export const decode02_32 = P.makeDecode(Param_02_32)
export const encode02_32 = P.makeEncode(Param_02_32)
export const formatted02_32 = P.makeFormatted(Param_02_32)

export const decode02_33 = P.makeDecode(Param_02_33)
export const encode02_33 = P.makeEncode(Param_02_33)
export const formatted02_33 = P.makeFormatted(Param_02_33)

export const decode02_34 = P.makeDecode(Param_02_34)
export const encode02_34 = P.makeEncode(Param_02_34)
export const formatted02_34 = P.makeFormatted(Param_02_34)

export const decode02_37 = P.makeDecode(Param_02_37)
export const encode02_37 = P.makeEncode(Param_02_37)
export const formatted02_37 = P.makeFormatted(Param_02_37)

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

export const group02Params: Record<string, ParamEntry> = {
  "02-00": param(Param_02_00, decode02_00, encode02_00),
  "02-01": param(Param_02_01, decode02_01, encode02_01),
  "02-03": param(Param_02_03, decode02_03, encode02_03),
  "02-04": param(Param_02_04, decode02_04, encode02_04),
  "02-05": param(Param_02_05, decode02_05, encode02_05),
  "02-06": param(Param_02_06, decode02_06, encode02_06),
  "02-07": param(Param_02_07, decode02_07, encode02_07),
  "02-09": param(Param_02_09, decode02_09, encode02_09),
  "02-10": param(Param_02_10, decode02_10, encode02_10),
  "02-11": param(Param_02_11, decode02_11, encode02_11),
  "02-12": param(Param_02_12, decode02_12, encode02_12),
  "02-13": param(Param_02_13, decode02_13, encode02_13),
  "02-15": param(Param_02_15, decode02_15, encode02_15),
  "02-19": param(Param_02_19, decode02_19, encode02_19),
  "02-20": param(Param_02_20, decode02_20, encode02_20),
  "02-21": param(Param_02_21, decode02_21, encode02_21),
  "02-22": param(Param_02_22, decode02_22, encode02_22),
  "02-23": param(Param_02_23, decode02_23, encode02_23),
  "02-24": param(Param_02_24, decode02_24, encode02_24),
  "02-25": param(Param_02_25, decode02_25, encode02_25),
  "02-26": param(Param_02_26, decode02_26, encode02_26),
  "02-32": param(Param_02_32, decode02_32, encode02_32),
  "02-33": param(Param_02_33, decode02_33, encode02_33),
  "02-34": param(Param_02_34, decode02_34, encode02_34),
  "02-37": param(Param_02_37, decode02_37, encode02_37),
}
