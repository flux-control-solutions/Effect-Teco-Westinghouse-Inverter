/**
 * Group 12: Monitoring Parameters
 * Manual pages 4-62 to 4-67
 */

import * as P from "./param-utils";
import { GROUP_12_Monitoring_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 12 as const;
const p462 = 462 as const;
const p463 = 463 as const;
const p464 = 464 as const;
const p465 = 465 as const;
const p466 = 466 as const;
const p467 = 467 as const;

const p = (addr: number, meta: P.ParamMeta) => {
  const schema = P.makeParam(addr, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}
const sp = (addr: number, factor: number, meta: P.ParamMeta) => {
  const schema = P.makeScaledParam(addr, factor, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}
const spSigned = (addr: number, factor: number, meta: P.ParamMeta) => {
  const schema = P.makeSignedScaledParam(addr, factor, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}

type ParamEntry = { schema: Schema.Schema<any, any>; decode: ReturnType<typeof P.makeDecode>; encode: ReturnType<typeof P.makeEncode> }

const all: Record<string, { schema: Schema.Schema<any, any>; decode: any; encode: any; formatted: any }> = {
  "12-00": p(GROUP_12_Monitoring_Parameters._12_00, { group, code: "12-00", name: "Display Screen Selection (LED)", range: "00000~77777", default: "-", unit: "-", page: p462 }),
  "12-01": p(GROUP_12_Monitoring_Parameters._12_01, { group, code: "12-01", name: "PID Feedback Display Mode (LED)", range: "0-2 (0:Integer / 1:1 decimal / 2:2 decimals)", default: "0", unit: "-", page: p462 }),
  "12-02": p(GROUP_12_Monitoring_Parameters._12_02, { group, code: "12-02", name: "PID Feedback Display Unit Setting (LED)", range: "0-2 (0:xxxxx / 1:xxxPb / 2:xxxFL)", default: "0", unit: "-", page: p462 }),
  "12-03": p(GROUP_12_Monitoring_Parameters._12_03, { group, code: "12-03", name: "Line Speed Display (LED)", range: "0~60000", default: "1500", unit: "RPM", page: p462 }),
  "12-04": p(GROUP_12_Monitoring_Parameters._12_04, { group, code: "12-04", name: "Modes of Line Speed Display (LED)", range: "0-4 (0:Output Freq / 1:Integer / 2:1 dec / 3:2 dec / 4:3 dec)", default: "0", unit: "-", page: p462 }),
  "12-05": p(GROUP_12_Monitoring_Parameters._12_05, { group, code: "12-05", name: "Status Display of Digital Input & Output Terminal", range: "bit-field (see manual)", default: "-", unit: "-", page: p462 }),
  "12-11": p(GROUP_12_Monitoring_Parameters._12_11, { group, code: "12-11", name: "Output Current of Current Fault", range: "read-only", default: "-", unit: "A", page: p463 }),
  "12-12": p(GROUP_12_Monitoring_Parameters._12_12, { group, code: "12-12", name: "Output Voltage of Current Fault", range: "read-only", default: "-", unit: "V", page: p463 }),
  "12-13": p(GROUP_12_Monitoring_Parameters._12_13, { group, code: "12-13", name: "Output Frequency of Current Fault", range: "read-only", default: "-", unit: "Hz", page: p463 }),
  "12-14": p(GROUP_12_Monitoring_Parameters._12_14, { group, code: "12-14", name: "DC Voltage of Current Fault", range: "read-only", default: "-", unit: "V", page: p463 }),
  "12-15": p(GROUP_12_Monitoring_Parameters._12_15, { group, code: "12-15", name: "Frequency Command of Current Fault", range: "read-only", default: "-", unit: "Hz", page: p463 }),
  "12-16": p(GROUP_12_Monitoring_Parameters._12_16, { group, code: "12-16", name: "Frequency Command", range: "read-only", default: "-", unit: "Hz", page: p463 }),
  "12-17": p(GROUP_12_Monitoring_Parameters._12_17, { group, code: "12-17", name: "Output Frequency", range: "read-only", default: "-", unit: "Hz", page: p463 }),
  "12-18": p(GROUP_12_Monitoring_Parameters._12_18, { group, code: "12-18", name: "Output Current", range: "read-only", default: "-", unit: "A", page: p463 }),
  "12-19": p(GROUP_12_Monitoring_Parameters._12_19, { group, code: "12-19", name: "Output Voltage", range: "read-only", default: "-", unit: "V", page: p463 }),
  "12-20": p(GROUP_12_Monitoring_Parameters._12_20, { group, code: "12-20", name: "DC Voltage (Vdc)", range: "read-only", default: "-", unit: "V", page: p463 }),
  "12-21": p(GROUP_12_Monitoring_Parameters._12_21, { group, code: "12-21", name: "Output Power (kW)", range: "read-only", default: "-", unit: "kW", page: p463 }),
  "12-22": p(GROUP_12_Monitoring_Parameters._12_22, { group, code: "12-22", name: "Motor's Rotation Speed (rpm)", range: "read-only", default: "-", unit: "rpm", page: p463 }),
  "12-23": p(GROUP_12_Monitoring_Parameters._12_23, { group, code: "12-23", name: "Output Power Factor (Pfo)", range: "read-only", default: "-", unit: "-", page: p463 }),
  "12-24": p(GROUP_12_Monitoring_Parameters._12_24, { group, code: "12-24", name: "Control Mode", range: "Display only", default: "-", unit: "-", page: p463 }),
  "12-25": p(GROUP_12_Monitoring_Parameters._12_25, { group, code: "12-25", name: "AI1 Input", range: "read-only", default: "-", unit: "%", page: p463 }),
  "12-26": p(GROUP_12_Monitoring_Parameters._12_26, { group, code: "12-26", name: "AI2 Input", range: "read-only", default: "-", unit: "%", page: p463 }),
  "12-27": p(GROUP_12_Monitoring_Parameters._12_27, { group, code: "12-27", name: "Motor Torque", range: "read-only", default: "-", unit: "%", page: p463 }),
  "12-28": p(GROUP_12_Monitoring_Parameters._12_28, { group, code: "12-28", name: "Motor Torque Current (Iq)", range: "read-only", default: "-", unit: "%", page: p463 }),
  "12-29": p(GROUP_12_Monitoring_Parameters._12_29, { group, code: "12-29", name: "Motor Excitation Current (Id)", range: "read-only", default: "-", unit: "%", page: p463 }),
  "12-30": p(GROUP_12_Monitoring_Parameters._12_30, { group, code: "12-30", name: "ASR Deviation", range: "read-only", default: "-", unit: "%", page: p463 }),
  "12-32": p(GROUP_12_Monitoring_Parameters._12_32, { group, code: "12-32", name: "ASR Output", range: "read-only", default: "-", unit: "%", page: p464 }),
  "12-33": p(GROUP_12_Monitoring_Parameters._12_33, { group, code: "12-33", name: "PG Feedback", range: "read-only", default: "-", unit: "%", page: p464 }),
  "12-34": p(GROUP_12_Monitoring_Parameters._12_34, { group, code: "12-34", name: "PG Pulse Number", range: "read-only", default: "-", unit: "Pulse", page: p464 }),
  "12-35": p(GROUP_12_Monitoring_Parameters._12_35, { group, code: "12-35", name: "Zero-servo Pulse Number", range: "read-only", default: "-", unit: "Pulse", page: p464 }),
  "12-36": p(GROUP_12_Monitoring_Parameters._12_36, { group, code: "12-36", name: "PID Input", range: "read-only", default: "-", unit: "%", page: p464 }),
  "12-37": p(GROUP_12_Monitoring_Parameters._12_37, { group, code: "12-37", name: "PID Output", range: "read-only", default: "-", unit: "%", page: p464 }),
  "12-38": p(GROUP_12_Monitoring_Parameters._12_38, { group, code: "12-38", name: "PID Setting", range: "read-only", default: "-", unit: "%", page: p464 }),
  "12-39": p(GROUP_12_Monitoring_Parameters._12_39, { group, code: "12-39", name: "PID Feedback", range: "read-only", default: "-", unit: "%", page: p464 }),
  "12-41": p(GROUP_12_Monitoring_Parameters._12_41, { group, code: "12-41", name: "Heatsink Temperature", range: "read-only", default: "-", unit: "℃", page: p464 }),
  "12-42": p(GROUP_12_Monitoring_Parameters._12_42, { group, code: "12-42", name: "RS-485 Error Code", range: "bit-field (CRC/Data len/Function/Parity/Overrun/Framing/Timeout)", default: "-", unit: "-", page: p464 }),
  "12-43": p(GROUP_12_Monitoring_Parameters._12_43, { group, code: "12-43", name: "Inverter Status", range: "bit-field (Ready/Running/Zero speed/Speed agree/Fault minor/Fault major)", default: "-", unit: "-", page: p464 }),
  "12-44": p(GROUP_12_Monitoring_Parameters._12_44, { group, code: "12-44", name: "Pulse Input Frequency", range: "read-only", default: "-", unit: "Hz", page: p464 }),
  "12-45": p(GROUP_12_Monitoring_Parameters._12_45, { group, code: "12-45", name: "Recent Fault Message", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-46": p(GROUP_12_Monitoring_Parameters._12_46, { group, code: "12-46", name: "Previous Fault Message", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-47": p(GROUP_12_Monitoring_Parameters._12_47, { group, code: "12-47", name: "Previous Two Fault Messages", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-48": p(GROUP_12_Monitoring_Parameters._12_48, { group, code: "12-48", name: "Previous Three Fault Messages", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-49": p(GROUP_12_Monitoring_Parameters._12_49, { group, code: "12-49", name: "Previous Four Fault Messages", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-50": p(GROUP_12_Monitoring_Parameters._12_50, { group, code: "12-50", name: "DIO Status of Current Fault", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-51": p(GROUP_12_Monitoring_Parameters._12_51, { group, code: "12-51", name: "Inverter Status of Current Fault", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-52": p(GROUP_12_Monitoring_Parameters._12_52, { group, code: "12-52", name: "Trip Time 1 of Current Fault", range: "read-only", default: "-", unit: "Hr", page: p465 }),
  "12-53": p(GROUP_12_Monitoring_Parameters._12_53, { group, code: "12-53", name: "Trip Time 2 of Current Fault", range: "read-only", default: "-", unit: "day", page: p465 }),
  "12-54": p(GROUP_12_Monitoring_Parameters._12_54, { group, code: "12-54", name: "Frequency Command of Previous Fault", range: "read-only", default: "-", unit: "Hz", page: p465 }),
  "12-55": p(GROUP_12_Monitoring_Parameters._12_55, { group, code: "12-55", name: "Output Frequency of Previous Fault", range: "read-only", default: "-", unit: "Hz", page: p465 }),
  "12-56": p(GROUP_12_Monitoring_Parameters._12_56, { group, code: "12-56", name: "Output Current of Previous Fault", range: "read-only", default: "-", unit: "A", page: p465 }),
  "12-57": p(GROUP_12_Monitoring_Parameters._12_57, { group, code: "12-57", name: "Output Voltage of Previous Fault", range: "read-only", default: "-", unit: "V", page: p465 }),
  "12-58": p(GROUP_12_Monitoring_Parameters._12_58, { group, code: "12-58", name: "DC Voltage of Previous Fault", range: "read-only", default: "-", unit: "V", page: p465 }),
  "12-59": p(GROUP_12_Monitoring_Parameters._12_59, { group, code: "12-59", name: "DIO Status of Previous Fault", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-60": p(GROUP_12_Monitoring_Parameters._12_60, { group, code: "12-60", name: "Inverter Status of Previous Fault", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-61": p(GROUP_12_Monitoring_Parameters._12_61, { group, code: "12-61", name: "Trip Time 1 of Last Fault", range: "read-only", default: "-", unit: "Hr", page: p465 }),
  "12-62": p(GROUP_12_Monitoring_Parameters._12_62, { group, code: "12-62", name: "Trip Time 2 of Last Fault", range: "read-only", default: "-", unit: "day", page: p465 }),
  "12-63": p(GROUP_12_Monitoring_Parameters._12_63, { group, code: "12-63", name: "Recent Warning Messages", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-64": p(GROUP_12_Monitoring_Parameters._12_64, { group, code: "12-64", name: "Previous Warning Message", range: "read-only", default: "-", unit: "-", page: p465 }),
  "12-65": p(GROUP_12_Monitoring_Parameters._12_65, { group, code: "12-65", name: "Motor Start Angle", range: "0~360", default: "-", unit: "-", page: p466 }),
  "12-66": p(GROUP_12_Monitoring_Parameters._12_66, { group, code: "12-66", name: "Encoder Angle", range: "0~360", default: "-", unit: "-", page: p466 }),
  "12-67": sp(GROUP_12_Monitoring_Parameters._12_67, 0.1, { group, code: "12-67", name: "Cumulative Energy (kWHr)", range: "0.0~999.9", default: "-", unit: "kWHr", page: p466 }),
  "12-68": p(GROUP_12_Monitoring_Parameters._12_68, { group, code: "12-68", name: "Cumulative Energy (MWHr)", range: "0~60000", default: "-", unit: "MWHr", page: p466 }),
  "12-76": sp(GROUP_12_Monitoring_Parameters._12_76, 0.1, { group, code: "12-76", name: "No-Load Voltage Output", range: "0.0~600.0", default: "-", unit: "V", page: p467 }),
  "12-78": spSigned(GROUP_12_Monitoring_Parameters._12_78, 1, { group, code: "12-78", name: "Z-Phase Bias Value", range: "-9999~9999", default: "-", unit: "Pulse", page: p467 }),
  "12-79": sp(GROUP_12_Monitoring_Parameters._12_79, 0.1, { group, code: "12-79", name: "Pulse Input Percentage", range: "0.0~100.0", default: "-", unit: "%", page: p467 }),
  "12-80": sp(GROUP_12_Monitoring_Parameters._12_80, 0.1, { group, code: "12-80", name: "AI1 Frequency Command", range: "0.0~599.0", default: "0", unit: "Hz", page: p467 }),
  "12-82": sp(GROUP_12_Monitoring_Parameters._12_82, 0.1, { group, code: "12-82", name: "Motor Load", range: "0~200.0", default: "-", unit: "%", page: p467 }),
  "12-85": p(GROUP_12_Monitoring_Parameters._12_85, { group, code: "12-85", name: "AI3 Input", range: "read-only", default: "-", unit: "%", page: p467 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_12_00 = em("12-00").schema as Schema.Schema<any, any>
export const decode12_00 = em("12-00").decode
export const encode12_00 = em("12-00").encode
export const formatted12_00 = em("12-00").formatted

export const Param_12_01 = em("12-01").schema as Schema.Schema<any, any>
export const decode12_01 = em("12-01").decode
export const encode12_01 = em("12-01").encode
export const formatted12_01 = em("12-01").formatted

export const Param_12_02 = em("12-02").schema as Schema.Schema<any, any>
export const decode12_02 = em("12-02").decode
export const encode12_02 = em("12-02").encode
export const formatted12_02 = em("12-02").formatted

export const Param_12_03 = em("12-03").schema as Schema.Schema<any, any>
export const decode12_03 = em("12-03").decode
export const encode12_03 = em("12-03").encode
export const formatted12_03 = em("12-03").formatted

export const Param_12_04 = em("12-04").schema as Schema.Schema<any, any>
export const decode12_04 = em("12-04").decode
export const encode12_04 = em("12-04").encode
export const formatted12_04 = em("12-04").formatted

export const Param_12_05 = em("12-05").schema as Schema.Schema<any, any>
export const decode12_05 = em("12-05").decode
export const encode12_05 = em("12-05").encode
export const formatted12_05 = em("12-05").formatted

export const Param_12_11 = em("12-11").schema as Schema.Schema<any, any>
export const decode12_11 = em("12-11").decode
export const encode12_11 = em("12-11").encode
export const formatted12_11 = em("12-11").formatted

export const Param_12_12 = em("12-12").schema as Schema.Schema<any, any>
export const decode12_12 = em("12-12").decode
export const encode12_12 = em("12-12").encode
export const formatted12_12 = em("12-12").formatted

export const Param_12_13 = em("12-13").schema as Schema.Schema<any, any>
export const decode12_13 = em("12-13").decode
export const encode12_13 = em("12-13").encode
export const formatted12_13 = em("12-13").formatted

export const Param_12_14 = em("12-14").schema as Schema.Schema<any, any>
export const decode12_14 = em("12-14").decode
export const encode12_14 = em("12-14").encode
export const formatted12_14 = em("12-14").formatted

export const Param_12_15 = em("12-15").schema as Schema.Schema<any, any>
export const decode12_15 = em("12-15").decode
export const encode12_15 = em("12-15").encode
export const formatted12_15 = em("12-15").formatted

export const Param_12_16 = em("12-16").schema as Schema.Schema<any, any>
export const decode12_16 = em("12-16").decode
export const encode12_16 = em("12-16").encode
export const formatted12_16 = em("12-16").formatted

export const Param_12_17 = em("12-17").schema as Schema.Schema<any, any>
export const decode12_17 = em("12-17").decode
export const encode12_17 = em("12-17").encode
export const formatted12_17 = em("12-17").formatted

export const Param_12_18 = em("12-18").schema as Schema.Schema<any, any>
export const decode12_18 = em("12-18").decode
export const encode12_18 = em("12-18").encode
export const formatted12_18 = em("12-18").formatted

export const Param_12_19 = em("12-19").schema as Schema.Schema<any, any>
export const decode12_19 = em("12-19").decode
export const encode12_19 = em("12-19").encode
export const formatted12_19 = em("12-19").formatted

export const Param_12_20 = em("12-20").schema as Schema.Schema<any, any>
export const decode12_20 = em("12-20").decode
export const encode12_20 = em("12-20").encode
export const formatted12_20 = em("12-20").formatted

export const Param_12_21 = em("12-21").schema as Schema.Schema<any, any>
export const decode12_21 = em("12-21").decode
export const encode12_21 = em("12-21").encode
export const formatted12_21 = em("12-21").formatted

export const Param_12_22 = em("12-22").schema as Schema.Schema<any, any>
export const decode12_22 = em("12-22").decode
export const encode12_22 = em("12-22").encode
export const formatted12_22 = em("12-22").formatted

export const Param_12_23 = em("12-23").schema as Schema.Schema<any, any>
export const decode12_23 = em("12-23").decode
export const encode12_23 = em("12-23").encode
export const formatted12_23 = em("12-23").formatted

export const Param_12_24 = em("12-24").schema as Schema.Schema<any, any>
export const decode12_24 = em("12-24").decode
export const encode12_24 = em("12-24").encode
export const formatted12_24 = em("12-24").formatted

export const Param_12_25 = em("12-25").schema as Schema.Schema<any, any>
export const decode12_25 = em("12-25").decode
export const encode12_25 = em("12-25").encode
export const formatted12_25 = em("12-25").formatted

export const Param_12_26 = em("12-26").schema as Schema.Schema<any, any>
export const decode12_26 = em("12-26").decode
export const encode12_26 = em("12-26").encode
export const formatted12_26 = em("12-26").formatted

export const Param_12_27 = em("12-27").schema as Schema.Schema<any, any>
export const decode12_27 = em("12-27").decode
export const encode12_27 = em("12-27").encode
export const formatted12_27 = em("12-27").formatted

export const Param_12_28 = em("12-28").schema as Schema.Schema<any, any>
export const decode12_28 = em("12-28").decode
export const encode12_28 = em("12-28").encode
export const formatted12_28 = em("12-28").formatted

export const Param_12_29 = em("12-29").schema as Schema.Schema<any, any>
export const decode12_29 = em("12-29").decode
export const encode12_29 = em("12-29").encode
export const formatted12_29 = em("12-29").formatted

export const Param_12_30 = em("12-30").schema as Schema.Schema<any, any>
export const decode12_30 = em("12-30").decode
export const encode12_30 = em("12-30").encode
export const formatted12_30 = em("12-30").formatted

export const Param_12_32 = em("12-32").schema as Schema.Schema<any, any>
export const decode12_32 = em("12-32").decode
export const encode12_32 = em("12-32").encode
export const formatted12_32 = em("12-32").formatted

export const Param_12_33 = em("12-33").schema as Schema.Schema<any, any>
export const decode12_33 = em("12-33").decode
export const encode12_33 = em("12-33").encode
export const formatted12_33 = em("12-33").formatted

export const Param_12_34 = em("12-34").schema as Schema.Schema<any, any>
export const decode12_34 = em("12-34").decode
export const encode12_34 = em("12-34").encode
export const formatted12_34 = em("12-34").formatted

export const Param_12_35 = em("12-35").schema as Schema.Schema<any, any>
export const decode12_35 = em("12-35").decode
export const encode12_35 = em("12-35").encode
export const formatted12_35 = em("12-35").formatted

export const Param_12_36 = em("12-36").schema as Schema.Schema<any, any>
export const decode12_36 = em("12-36").decode
export const encode12_36 = em("12-36").encode
export const formatted12_36 = em("12-36").formatted

export const Param_12_37 = em("12-37").schema as Schema.Schema<any, any>
export const decode12_37 = em("12-37").decode
export const encode12_37 = em("12-37").encode
export const formatted12_37 = em("12-37").formatted

export const Param_12_38 = em("12-38").schema as Schema.Schema<any, any>
export const decode12_38 = em("12-38").decode
export const encode12_38 = em("12-38").encode
export const formatted12_38 = em("12-38").formatted

export const Param_12_39 = em("12-39").schema as Schema.Schema<any, any>
export const decode12_39 = em("12-39").decode
export const encode12_39 = em("12-39").encode
export const formatted12_39 = em("12-39").formatted

export const Param_12_41 = em("12-41").schema as Schema.Schema<any, any>
export const decode12_41 = em("12-41").decode
export const encode12_41 = em("12-41").encode
export const formatted12_41 = em("12-41").formatted

export const Param_12_42 = em("12-42").schema as Schema.Schema<any, any>
export const decode12_42 = em("12-42").decode
export const encode12_42 = em("12-42").encode
export const formatted12_42 = em("12-42").formatted

export const Param_12_43 = em("12-43").schema as Schema.Schema<any, any>
export const decode12_43 = em("12-43").decode
export const encode12_43 = em("12-43").encode
export const formatted12_43 = em("12-43").formatted

export const Param_12_44 = em("12-44").schema as Schema.Schema<any, any>
export const decode12_44 = em("12-44").decode
export const encode12_44 = em("12-44").encode
export const formatted12_44 = em("12-44").formatted

export const Param_12_45 = em("12-45").schema as Schema.Schema<any, any>
export const decode12_45 = em("12-45").decode
export const encode12_45 = em("12-45").encode
export const formatted12_45 = em("12-45").formatted

export const Param_12_46 = em("12-46").schema as Schema.Schema<any, any>
export const decode12_46 = em("12-46").decode
export const encode12_46 = em("12-46").encode
export const formatted12_46 = em("12-46").formatted

export const Param_12_47 = em("12-47").schema as Schema.Schema<any, any>
export const decode12_47 = em("12-47").decode
export const encode12_47 = em("12-47").encode
export const formatted12_47 = em("12-47").formatted

export const Param_12_48 = em("12-48").schema as Schema.Schema<any, any>
export const decode12_48 = em("12-48").decode
export const encode12_48 = em("12-48").encode
export const formatted12_48 = em("12-48").formatted

export const Param_12_49 = em("12-49").schema as Schema.Schema<any, any>
export const decode12_49 = em("12-49").decode
export const encode12_49 = em("12-49").encode
export const formatted12_49 = em("12-49").formatted

export const Param_12_50 = em("12-50").schema as Schema.Schema<any, any>
export const decode12_50 = em("12-50").decode
export const encode12_50 = em("12-50").encode
export const formatted12_50 = em("12-50").formatted

export const Param_12_51 = em("12-51").schema as Schema.Schema<any, any>
export const decode12_51 = em("12-51").decode
export const encode12_51 = em("12-51").encode
export const formatted12_51 = em("12-51").formatted

export const Param_12_52 = em("12-52").schema as Schema.Schema<any, any>
export const decode12_52 = em("12-52").decode
export const encode12_52 = em("12-52").encode
export const formatted12_52 = em("12-52").formatted

export const Param_12_53 = em("12-53").schema as Schema.Schema<any, any>
export const decode12_53 = em("12-53").decode
export const encode12_53 = em("12-53").encode
export const formatted12_53 = em("12-53").formatted

export const Param_12_54 = em("12-54").schema as Schema.Schema<any, any>
export const decode12_54 = em("12-54").decode
export const encode12_54 = em("12-54").encode
export const formatted12_54 = em("12-54").formatted

export const Param_12_55 = em("12-55").schema as Schema.Schema<any, any>
export const decode12_55 = em("12-55").decode
export const encode12_55 = em("12-55").encode
export const formatted12_55 = em("12-55").formatted

export const Param_12_56 = em("12-56").schema as Schema.Schema<any, any>
export const decode12_56 = em("12-56").decode
export const encode12_56 = em("12-56").encode
export const formatted12_56 = em("12-56").formatted

export const Param_12_57 = em("12-57").schema as Schema.Schema<any, any>
export const decode12_57 = em("12-57").decode
export const encode12_57 = em("12-57").encode
export const formatted12_57 = em("12-57").formatted

export const Param_12_58 = em("12-58").schema as Schema.Schema<any, any>
export const decode12_58 = em("12-58").decode
export const encode12_58 = em("12-58").encode
export const formatted12_58 = em("12-58").formatted

export const Param_12_59 = em("12-59").schema as Schema.Schema<any, any>
export const decode12_59 = em("12-59").decode
export const encode12_59 = em("12-59").encode
export const formatted12_59 = em("12-59").formatted

export const Param_12_60 = em("12-60").schema as Schema.Schema<any, any>
export const decode12_60 = em("12-60").decode
export const encode12_60 = em("12-60").encode
export const formatted12_60 = em("12-60").formatted

export const Param_12_61 = em("12-61").schema as Schema.Schema<any, any>
export const decode12_61 = em("12-61").decode
export const encode12_61 = em("12-61").encode
export const formatted12_61 = em("12-61").formatted

export const Param_12_62 = em("12-62").schema as Schema.Schema<any, any>
export const decode12_62 = em("12-62").decode
export const encode12_62 = em("12-62").encode
export const formatted12_62 = em("12-62").formatted

export const Param_12_63 = em("12-63").schema as Schema.Schema<any, any>
export const decode12_63 = em("12-63").decode
export const encode12_63 = em("12-63").encode
export const formatted12_63 = em("12-63").formatted

export const Param_12_64 = em("12-64").schema as Schema.Schema<any, any>
export const decode12_64 = em("12-64").decode
export const encode12_64 = em("12-64").encode
export const formatted12_64 = em("12-64").formatted

export const Param_12_65 = em("12-65").schema as Schema.Schema<any, any>
export const decode12_65 = em("12-65").decode
export const encode12_65 = em("12-65").encode
export const formatted12_65 = em("12-65").formatted

export const Param_12_66 = em("12-66").schema as Schema.Schema<any, any>
export const decode12_66 = em("12-66").decode
export const encode12_66 = em("12-66").encode
export const formatted12_66 = em("12-66").formatted

export const Param_12_67 = em("12-67").schema as Schema.Schema<any, any>
export const decode12_67 = em("12-67").decode
export const encode12_67 = em("12-67").encode
export const formatted12_67 = em("12-67").formatted

export const Param_12_68 = em("12-68").schema as Schema.Schema<any, any>
export const decode12_68 = em("12-68").decode
export const encode12_68 = em("12-68").encode
export const formatted12_68 = em("12-68").formatted

export const Param_12_76 = em("12-76").schema as Schema.Schema<any, any>
export const decode12_76 = em("12-76").decode
export const encode12_76 = em("12-76").encode
export const formatted12_76 = em("12-76").formatted

export const Param_12_78 = em("12-78").schema as Schema.Schema<any, any>
export const decode12_78 = em("12-78").decode
export const encode12_78 = em("12-78").encode
export const formatted12_78 = em("12-78").formatted

export const Param_12_79 = em("12-79").schema as Schema.Schema<any, any>
export const decode12_79 = em("12-79").decode
export const encode12_79 = em("12-79").encode
export const formatted12_79 = em("12-79").formatted

export const Param_12_80 = em("12-80").schema as Schema.Schema<any, any>
export const decode12_80 = em("12-80").decode
export const encode12_80 = em("12-80").encode
export const formatted12_80 = em("12-80").formatted

export const Param_12_82 = em("12-82").schema as Schema.Schema<any, any>
export const decode12_82 = em("12-82").decode
export const encode12_82 = em("12-82").encode
export const formatted12_82 = em("12-82").formatted

export const Param_12_85 = em("12-85").schema as Schema.Schema<any, any>
export const decode12_85 = em("12-85").decode
export const encode12_85 = em("12-85").encode
export const formatted12_85 = em("12-85").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group12Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group12Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
