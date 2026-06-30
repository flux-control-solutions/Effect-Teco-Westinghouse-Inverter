/**
 * Group 11: Auxiliary Parameters
 * Manual pages 4-56 to 4-59
 */

import * as P from "./param-utils";
import { GROUP_11_Auxiliary_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 11 as const;
const p456 = 456 as const;
const p457 = 457 as const;
const p458 = 458 as const;
const p459 = 459 as const;

const p = (addr: number, meta: P.ParamMeta) => {
  const schema = P.makeParam(addr, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}
const sp = (addr: number, factor: number, meta: P.ParamMeta) => {
  const schema = P.makeScaledParam(addr, factor, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}

type ParamEntry = { schema: Schema.Schema<any, any>; decode: ReturnType<typeof P.makeDecode>; encode: ReturnType<typeof P.makeEncode> }

const all: Record<string, { schema: Schema.Schema<any, any>; decode: any; encode: any; formatted: any }> = {
  "11-00": p(GROUP_11_Auxiliary_Parameters._11_00, { group, code: "11-00", name: "Direction Lock Selection", range: "0-2 (0:Fwd+Rev / 1:Fwd only / 2:Rev only)", default: "0", unit: "-", page: p456 }),
  "11-01": p(GROUP_11_Auxiliary_Parameters._11_01, { group, code: "11-01", name: "Carrier frequency", range: "0~16 (0:Tuning / 1~16:1~16KHz)", default: "* (see Attachment 1 p.170)", unit: "-", page: p456 }),
  "11-02": p(GROUP_11_Auxiliary_Parameters._11_02, { group, code: "11-02", name: "Soft PWM Function Selection", range: "0-2 (0:Disable / 1:Soft PWM 1 / 2:Soft PWM 2)", default: "0", unit: "-", page: p456 }),
  "11-03": p(GROUP_11_Auxiliary_Parameters._11_03, { group, code: "11-03", name: "Automatic carrier lowering selection", range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p456 }),
  "11-04": sp(GROUP_11_Auxiliary_Parameters._11_04, 0.01, { group, code: "11-04", name: "S-curve Time Setting at Start of Accel", range: "0.00~2.50", default: "0.20", unit: "s", page: p456 }),
  "11-05": sp(GROUP_11_Auxiliary_Parameters._11_05, 0.01, { group, code: "11-05", name: "S-curve Time Setting at Stop of Accel", range: "0.00~2.50", default: "0.20", unit: "s", page: p456 }),
  "11-06": sp(GROUP_11_Auxiliary_Parameters._11_06, 0.01, { group, code: "11-06", name: "S-curve Time Setting at Start of Decel", range: "0.00~2.50", default: "0.20", unit: "s", page: p456 }),
  "11-07": sp(GROUP_11_Auxiliary_Parameters._11_07, 0.01, { group, code: "11-07", name: "S-curve Time Setting at Stop of Decel", range: "0.00~2.50", default: "0.20", unit: "s", page: p456 }),
  "11-08": sp(GROUP_11_Auxiliary_Parameters._11_08, 0.1, { group, code: "11-08", name: "Jump Frequency 1", range: "0.0~599.0", default: "0.0", unit: "Hz", page: p456 }),
  "11-09": sp(GROUP_11_Auxiliary_Parameters._11_09, 0.1, { group, code: "11-09", name: "Jump Frequency 2", range: "0.0~599.0", default: "0.0", unit: "Hz", page: p456 }),
  "11-10": sp(GROUP_11_Auxiliary_Parameters._11_10, 0.1, { group, code: "11-10", name: "Jump Frequency 3", range: "0.0~599.0", default: "0.0", unit: "Hz", page: p456 }),
  "11-11": sp(GROUP_11_Auxiliary_Parameters._11_11, 0.1, { group, code: "11-11", name: "Jump Frequency Width", range: "0.0~25.5", default: "1.0", unit: "Hz", page: p456 }),
  "11-12": p(GROUP_11_Auxiliary_Parameters._11_12, { group, code: "11-12", name: "Manual Energy Saving Gain", range: "0~100", default: "80", unit: "%", page: p456 }),
  "11-13": p(GROUP_11_Auxiliary_Parameters._11_13, { group, code: "11-13", name: "Automatic Return Time", range: "0~120", default: "60", unit: "Sec", page: p456 }),
  "11-18": sp(GROUP_11_Auxiliary_Parameters._11_18, 0.1, { group, code: "11-18", name: "Manual Energy Saving Frequency", range: "0.0~599.0", default: "0.00", unit: "Hz", page: p456 }),
  "11-19": p(GROUP_11_Auxiliary_Parameters._11_19, { group, code: "11-19", name: "Automatic Energy Saving Function", range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p457 }),
  "11-20": p(GROUP_11_Auxiliary_Parameters._11_20, { group, code: "11-20", name: "Filter Time of Automatic Energy Saving", range: "0~200", default: "140", unit: "ms", page: p457 }),
  "11-21": p(GROUP_11_Auxiliary_Parameters._11_21, { group, code: "11-21", name: "Voltage Upper Limit of Energy Saving", range: "0~100", default: "100", unit: "%", page: p457 }),
  "11-22": p(GROUP_11_Auxiliary_Parameters._11_22, { group, code: "11-22", name: "Adjustment Time of Auto Energy Saving", range: "0~5000", default: "20", unit: "ms", page: p457 }),
  "11-23": p(GROUP_11_Auxiliary_Parameters._11_23, { group, code: "11-23", name: "Detection Level of Auto Energy Saving", range: "0~100", default: "10", unit: "%", page: p457 }),
  "11-24": sp(GROUP_11_Auxiliary_Parameters._11_24, 0.01, { group, code: "11-24", name: "Coefficient of Auto Energy Saving", range: "0.00~655.34", default: "* (see Attachment 1 p.170)", unit: "-", page: p457 }),
  "11-28": p(GROUP_11_Auxiliary_Parameters._11_28, { group, code: "11-28", name: "Frequency Gain of OV Prevention 2", range: "1~200", default: "100", unit: "%", page: p457 }),
  "11-29": p(GROUP_11_Auxiliary_Parameters._11_29, { group, code: "11-29", name: "Auto De-rating Selection", range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p457 }),
  "11-30": p(GROUP_11_Auxiliary_Parameters._11_30, { group, code: "11-30", name: "Variable Carrier Freq Max Limit", range: "2~16", default: "* (see Attachment 1 p.170)", unit: "KHz", page: p457 }),
  "11-31": p(GROUP_11_Auxiliary_Parameters._11_31, { group, code: "11-31", name: "Variable Carrier Freq Min Limit", range: "1~16", default: "* (see Attachment 1 p.170)", unit: "KHz", page: p457 }),
  "11-32": p(GROUP_11_Auxiliary_Parameters._11_32, { group, code: "11-32", name: "Variable Carrier Freq Prop Gain", range: "0~99", default: "0", unit: "-", page: p457 }),
  "11-33": sp(GROUP_11_Auxiliary_Parameters._11_33, 0.1, { group, code: "11-33", name: "DC Voltage Filter Rise Amount", range: "0.1~10.0", default: "0.1", unit: "Vdc", page: p457 }),
  "11-34": sp(GROUP_11_Auxiliary_Parameters._11_34, 0.1, { group, code: "11-34", name: "DC Voltage Filter Fall Amount", range: "0.1~10.0", default: "5.0", unit: "Vdc", page: p457 }),
  "11-35": sp(GROUP_11_Auxiliary_Parameters._11_35, 0.1, { group, code: "11-35", name: "DC Voltage Filter Dead band Level", range: "0.0~99.0", default: "10.0", unit: "Vdc", page: p457 }),
  "11-36": sp(GROUP_11_Auxiliary_Parameters._11_36, 0.001, { group, code: "11-36", name: "Frequency Gain of OV Prevention", range: "0.000~1.000", default: "0.050", unit: "-", page: p457 }),
  "11-37": sp(GROUP_11_Auxiliary_Parameters._11_37, 0.01, { group, code: "11-37", name: "Frequency Limit of OV Prevention", range: "0.00~599.00", default: "5.00", unit: "Hz", page: p457 }),
  "11-38": p(GROUP_11_Auxiliary_Parameters._11_38, { group, code: "11-38", name: "Deceleration Start Voltage of OV Prevention", range: "200~400(230V)/400~800(460V)/500~1000(575V)/600~1200(690V)", default: "300/700/900/1080", unit: "V", page: p457 }),
  "11-39": p(GROUP_11_Auxiliary_Parameters._11_39, { group, code: "11-39", name: "Deceleration Stop Voltage of OV Prevention", range: "300~400(230V)/600~800(460V)/500~1000(575V)/600~1200(690V)", default: "350/750/950/1140", unit: "V", page: p457 }),
  "11-40": p(GROUP_11_Auxiliary_Parameters._11_40, { group, code: "11-40", name: "OV Prevention Selection", range: "0-3 (0:Disable / 1:Mode1 / 2:Mode2 / 3:Mode3)", default: "0", unit: "-", page: p457 }),
  "11-41": p(GROUP_11_Auxiliary_Parameters._11_41, { group, code: "11-41", name: "Selection of Ref Freq Disappearance Detection", range: "0-1 (0:Decel stop / 1:Use 11-42 level)", default: "0", unit: "-", page: p458 }),
  "11-42": sp(GROUP_11_Auxiliary_Parameters._11_42, 0.1, { group, code: "11-42", name: "Disappearance Level of Reference Frequency", range: "0.0~100.0", default: "80.0", unit: "%", page: p458 }),
  "11-43": sp(GROUP_11_Auxiliary_Parameters._11_43, 0.1, { group, code: "11-43", name: "Hold Frequency at Start", range: "0.0~599.0", default: "0.0", unit: "Hz", page: p458 }),
  "11-44": sp(GROUP_11_Auxiliary_Parameters._11_44, 0.1, { group, code: "11-44", name: "Frequency Hold Time at Start", range: "0.0~10.0", default: "0.0", unit: "s", page: p458 }),
  "11-45": sp(GROUP_11_Auxiliary_Parameters._11_45, 0.1, { group, code: "11-45", name: "Hold Frequency at Stop", range: "0.0~599.0", default: "0.0", unit: "Hz", page: p458 }),
  "11-46": sp(GROUP_11_Auxiliary_Parameters._11_46, 0.1, { group, code: "11-46", name: "Frequency Hold Time at Stop", range: "0.0~10.0", default: "0.0", unit: "s", page: p458 }),
  "11-47": sp(GROUP_11_Auxiliary_Parameters._11_47, 0.1, { group, code: "11-47", name: "KEB Deceleration Time", range: "0.0~25.5", default: "0.0", unit: "s", page: p458 }),
  "11-48": p(GROUP_11_Auxiliary_Parameters._11_48, { group, code: "11-48", name: "KEB Detection Level", range: "190~210(230V)/380~420(460V)/540~570(575V)/540~684(690V)", default: "200/400/555/555", unit: "V", page: p458 }),
  "11-49": sp(GROUP_11_Auxiliary_Parameters._11_49, 0.01, { group, code: "11-49", name: "Zero-servo Gain", range: "0.01~5.00", default: "1.00", unit: "-", page: p458 }),
  "11-50": p(GROUP_11_Auxiliary_Parameters._11_50, { group, code: "11-50", name: "Zero-servo Count", range: "0~4096", default: "12", unit: "-", page: p458 }),
  "11-51": p(GROUP_11_Auxiliary_Parameters._11_51, { group, code: "11-51", name: "Braking Selection of Zero Speed", range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p458 }),
  "11-52": sp(GROUP_11_Auxiliary_Parameters._11_52, 0.1, { group, code: "11-52", name: "Droop Control Level", range: "0.0~100.0", default: "0.0", unit: "%", page: p458 }),
  "11-53": sp(GROUP_11_Auxiliary_Parameters._11_53, 0.01, { group, code: "11-53", name: "Droop Control Delay", range: "0.01~2.00", default: "0.2", unit: "s", page: p458 }),
  "11-54": p(GROUP_11_Auxiliary_Parameters._11_54, { group, code: "11-54", name: "Initialization of Cumulative Energy", range: "0-1 (0:Do not clear / 1:Clear)", default: "0", unit: "-", page: p458 }),
  "11-55": p(GROUP_11_Auxiliary_Parameters._11_55, { group, code: "11-55", name: "STOP Key Selection", range: "0-1 (0:Disable / 1:Enable)", default: "1", unit: "-", page: p458 }),
  "11-56": p(GROUP_11_Auxiliary_Parameters._11_56, { group, code: "11-56", name: "UP/DOWN Selection", range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p459 }),
  "11-58": p(GROUP_11_Auxiliary_Parameters._11_58, { group, code: "11-58", name: "Record Reference Frequency", range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p459 }),
  "11-59": sp(GROUP_11_Auxiliary_Parameters._11_59, 0.01, { group, code: "11-59", name: "Gain of Preventing Oscillation", range: "0.00~2.50", default: "* (see Attachment 1 p.170)", unit: "-", page: p459 }),
  "11-60": p(GROUP_11_Auxiliary_Parameters._11_60, { group, code: "11-60", name: "Upper Limit of Preventing Oscillation", range: "0~100", default: "* (see Attachment 1 p.170)", unit: "%", page: p459 }),
  "11-61": p(GROUP_11_Auxiliary_Parameters._11_61, { group, code: "11-61", name: "Time Parameter of Preventing Oscillation", range: "0~100", default: "0", unit: "-", page: p459 }),
  "11-62": p(GROUP_11_Auxiliary_Parameters._11_62, { group, code: "11-62", name: "Selection of Preventing Oscillation", range: "0-2 (0:Mode1 / 1:Mode2 / 2:Mode3)", default: "1", unit: "-", page: p459 }),
  "11-63": p(GROUP_11_Auxiliary_Parameters._11_63, { group, code: "11-63", name: "Strong Magnetic Selection", range: "0-1 (0:Disable / 1:Enable)", default: "1", unit: "-", page: p459 }),
  "11-64": sp(GROUP_11_Auxiliary_Parameters._11_64, 0.1, { group, code: "11-64", name: "Acceleration Speed Gain Adjustment", range: "0.1~10.0", default: "1.0", unit: "-", page: p459 }),
  "11-65": p(GROUP_11_Auxiliary_Parameters._11_65, { group, code: "11-65", name: "Target Main Circuit Voltage", range: "200~400(230V)/400~800(460V)/520~1040(575V)/624~1248(690V)", default: "370/740/962/1154", unit: "-", page: p459 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_11_00 = em("11-00").schema as Schema.Schema<any, any>
export const decode11_00 = em("11-00").decode
export const encode11_00 = em("11-00").encode
export const formatted11_00 = em("11-00").formatted

export const Param_11_01 = em("11-01").schema as Schema.Schema<any, any>
export const decode11_01 = em("11-01").decode
export const encode11_01 = em("11-01").encode
export const formatted11_01 = em("11-01").formatted

export const Param_11_02 = em("11-02").schema as Schema.Schema<any, any>
export const decode11_02 = em("11-02").decode
export const encode11_02 = em("11-02").encode
export const formatted11_02 = em("11-02").formatted

export const Param_11_03 = em("11-03").schema as Schema.Schema<any, any>
export const decode11_03 = em("11-03").decode
export const encode11_03 = em("11-03").encode
export const formatted11_03 = em("11-03").formatted

export const Param_11_04 = em("11-04").schema as Schema.Schema<any, any>
export const decode11_04 = em("11-04").decode
export const encode11_04 = em("11-04").encode
export const formatted11_04 = em("11-04").formatted

export const Param_11_05 = em("11-05").schema as Schema.Schema<any, any>
export const decode11_05 = em("11-05").decode
export const encode11_05 = em("11-05").encode
export const formatted11_05 = em("11-05").formatted

export const Param_11_06 = em("11-06").schema as Schema.Schema<any, any>
export const decode11_06 = em("11-06").decode
export const encode11_06 = em("11-06").encode
export const formatted11_06 = em("11-06").formatted

export const Param_11_07 = em("11-07").schema as Schema.Schema<any, any>
export const decode11_07 = em("11-07").decode
export const encode11_07 = em("11-07").encode
export const formatted11_07 = em("11-07").formatted

export const Param_11_08 = em("11-08").schema as Schema.Schema<any, any>
export const decode11_08 = em("11-08").decode
export const encode11_08 = em("11-08").encode
export const formatted11_08 = em("11-08").formatted

export const Param_11_09 = em("11-09").schema as Schema.Schema<any, any>
export const decode11_09 = em("11-09").decode
export const encode11_09 = em("11-09").encode
export const formatted11_09 = em("11-09").formatted

export const Param_11_10 = em("11-10").schema as Schema.Schema<any, any>
export const decode11_10 = em("11-10").decode
export const encode11_10 = em("11-10").encode
export const formatted11_10 = em("11-10").formatted

export const Param_11_11 = em("11-11").schema as Schema.Schema<any, any>
export const decode11_11 = em("11-11").decode
export const encode11_11 = em("11-11").encode
export const formatted11_11 = em("11-11").formatted

export const Param_11_12 = em("11-12").schema as Schema.Schema<any, any>
export const decode11_12 = em("11-12").decode
export const encode11_12 = em("11-12").encode
export const formatted11_12 = em("11-12").formatted

export const Param_11_13 = em("11-13").schema as Schema.Schema<any, any>
export const decode11_13 = em("11-13").decode
export const encode11_13 = em("11-13").encode
export const formatted11_13 = em("11-13").formatted

export const Param_11_18 = em("11-18").schema as Schema.Schema<any, any>
export const decode11_18 = em("11-18").decode
export const encode11_18 = em("11-18").encode
export const formatted11_18 = em("11-18").formatted

export const Param_11_19 = em("11-19").schema as Schema.Schema<any, any>
export const decode11_19 = em("11-19").decode
export const encode11_19 = em("11-19").encode
export const formatted11_19 = em("11-19").formatted

export const Param_11_20 = em("11-20").schema as Schema.Schema<any, any>
export const decode11_20 = em("11-20").decode
export const encode11_20 = em("11-20").encode
export const formatted11_20 = em("11-20").formatted

export const Param_11_21 = em("11-21").schema as Schema.Schema<any, any>
export const decode11_21 = em("11-21").decode
export const encode11_21 = em("11-21").encode
export const formatted11_21 = em("11-21").formatted

export const Param_11_22 = em("11-22").schema as Schema.Schema<any, any>
export const decode11_22 = em("11-22").decode
export const encode11_22 = em("11-22").encode
export const formatted11_22 = em("11-22").formatted

export const Param_11_23 = em("11-23").schema as Schema.Schema<any, any>
export const decode11_23 = em("11-23").decode
export const encode11_23 = em("11-23").encode
export const formatted11_23 = em("11-23").formatted

export const Param_11_24 = em("11-24").schema as Schema.Schema<any, any>
export const decode11_24 = em("11-24").decode
export const encode11_24 = em("11-24").encode
export const formatted11_24 = em("11-24").formatted

export const Param_11_28 = em("11-28").schema as Schema.Schema<any, any>
export const decode11_28 = em("11-28").decode
export const encode11_28 = em("11-28").encode
export const formatted11_28 = em("11-28").formatted

export const Param_11_29 = em("11-29").schema as Schema.Schema<any, any>
export const decode11_29 = em("11-29").decode
export const encode11_29 = em("11-29").encode
export const formatted11_29 = em("11-29").formatted

export const Param_11_30 = em("11-30").schema as Schema.Schema<any, any>
export const decode11_30 = em("11-30").decode
export const encode11_30 = em("11-30").encode
export const formatted11_30 = em("11-30").formatted

export const Param_11_31 = em("11-31").schema as Schema.Schema<any, any>
export const decode11_31 = em("11-31").decode
export const encode11_31 = em("11-31").encode
export const formatted11_31 = em("11-31").formatted

export const Param_11_32 = em("11-32").schema as Schema.Schema<any, any>
export const decode11_32 = em("11-32").decode
export const encode11_32 = em("11-32").encode
export const formatted11_32 = em("11-32").formatted

export const Param_11_33 = em("11-33").schema as Schema.Schema<any, any>
export const decode11_33 = em("11-33").decode
export const encode11_33 = em("11-33").encode
export const formatted11_33 = em("11-33").formatted

export const Param_11_34 = em("11-34").schema as Schema.Schema<any, any>
export const decode11_34 = em("11-34").decode
export const encode11_34 = em("11-34").encode
export const formatted11_34 = em("11-34").formatted

export const Param_11_35 = em("11-35").schema as Schema.Schema<any, any>
export const decode11_35 = em("11-35").decode
export const encode11_35 = em("11-35").encode
export const formatted11_35 = em("11-35").formatted

export const Param_11_36 = em("11-36").schema as Schema.Schema<any, any>
export const decode11_36 = em("11-36").decode
export const encode11_36 = em("11-36").encode
export const formatted11_36 = em("11-36").formatted

export const Param_11_37 = em("11-37").schema as Schema.Schema<any, any>
export const decode11_37 = em("11-37").decode
export const encode11_37 = em("11-37").encode
export const formatted11_37 = em("11-37").formatted

export const Param_11_38 = em("11-38").schema as Schema.Schema<any, any>
export const decode11_38 = em("11-38").decode
export const encode11_38 = em("11-38").encode
export const formatted11_38 = em("11-38").formatted

export const Param_11_39 = em("11-39").schema as Schema.Schema<any, any>
export const decode11_39 = em("11-39").decode
export const encode11_39 = em("11-39").encode
export const formatted11_39 = em("11-39").formatted

export const Param_11_40 = em("11-40").schema as Schema.Schema<any, any>
export const decode11_40 = em("11-40").decode
export const encode11_40 = em("11-40").encode
export const formatted11_40 = em("11-40").formatted

export const Param_11_41 = em("11-41").schema as Schema.Schema<any, any>
export const decode11_41 = em("11-41").decode
export const encode11_41 = em("11-41").encode
export const formatted11_41 = em("11-41").formatted

export const Param_11_42 = em("11-42").schema as Schema.Schema<any, any>
export const decode11_42 = em("11-42").decode
export const encode11_42 = em("11-42").encode
export const formatted11_42 = em("11-42").formatted

export const Param_11_43 = em("11-43").schema as Schema.Schema<any, any>
export const decode11_43 = em("11-43").decode
export const encode11_43 = em("11-43").encode
export const formatted11_43 = em("11-43").formatted

export const Param_11_44 = em("11-44").schema as Schema.Schema<any, any>
export const decode11_44 = em("11-44").decode
export const encode11_44 = em("11-44").encode
export const formatted11_44 = em("11-44").formatted

export const Param_11_45 = em("11-45").schema as Schema.Schema<any, any>
export const decode11_45 = em("11-45").decode
export const encode11_45 = em("11-45").encode
export const formatted11_45 = em("11-45").formatted

export const Param_11_46 = em("11-46").schema as Schema.Schema<any, any>
export const decode11_46 = em("11-46").decode
export const encode11_46 = em("11-46").encode
export const formatted11_46 = em("11-46").formatted

export const Param_11_47 = em("11-47").schema as Schema.Schema<any, any>
export const decode11_47 = em("11-47").decode
export const encode11_47 = em("11-47").encode
export const formatted11_47 = em("11-47").formatted

export const Param_11_48 = em("11-48").schema as Schema.Schema<any, any>
export const decode11_48 = em("11-48").decode
export const encode11_48 = em("11-48").encode
export const formatted11_48 = em("11-48").formatted

export const Param_11_49 = em("11-49").schema as Schema.Schema<any, any>
export const decode11_49 = em("11-49").decode
export const encode11_49 = em("11-49").encode
export const formatted11_49 = em("11-49").formatted

export const Param_11_50 = em("11-50").schema as Schema.Schema<any, any>
export const decode11_50 = em("11-50").decode
export const encode11_50 = em("11-50").encode
export const formatted11_50 = em("11-50").formatted

export const Param_11_51 = em("11-51").schema as Schema.Schema<any, any>
export const decode11_51 = em("11-51").decode
export const encode11_51 = em("11-51").encode
export const formatted11_51 = em("11-51").formatted

export const Param_11_52 = em("11-52").schema as Schema.Schema<any, any>
export const decode11_52 = em("11-52").decode
export const encode11_52 = em("11-52").encode
export const formatted11_52 = em("11-52").formatted

export const Param_11_53 = em("11-53").schema as Schema.Schema<any, any>
export const decode11_53 = em("11-53").decode
export const encode11_53 = em("11-53").encode
export const formatted11_53 = em("11-53").formatted

export const Param_11_54 = em("11-54").schema as Schema.Schema<any, any>
export const decode11_54 = em("11-54").decode
export const encode11_54 = em("11-54").encode
export const formatted11_54 = em("11-54").formatted

export const Param_11_55 = em("11-55").schema as Schema.Schema<any, any>
export const decode11_55 = em("11-55").decode
export const encode11_55 = em("11-55").encode
export const formatted11_55 = em("11-55").formatted

export const Param_11_56 = em("11-56").schema as Schema.Schema<any, any>
export const decode11_56 = em("11-56").decode
export const encode11_56 = em("11-56").encode
export const formatted11_56 = em("11-56").formatted

export const Param_11_58 = em("11-58").schema as Schema.Schema<any, any>
export const decode11_58 = em("11-58").decode
export const encode11_58 = em("11-58").encode
export const formatted11_58 = em("11-58").formatted

export const Param_11_59 = em("11-59").schema as Schema.Schema<any, any>
export const decode11_59 = em("11-59").decode
export const encode11_59 = em("11-59").encode
export const formatted11_59 = em("11-59").formatted

export const Param_11_60 = em("11-60").schema as Schema.Schema<any, any>
export const decode11_60 = em("11-60").decode
export const encode11_60 = em("11-60").encode
export const formatted11_60 = em("11-60").formatted

export const Param_11_61 = em("11-61").schema as Schema.Schema<any, any>
export const decode11_61 = em("11-61").decode
export const encode11_61 = em("11-61").encode
export const formatted11_61 = em("11-61").formatted

export const Param_11_62 = em("11-62").schema as Schema.Schema<any, any>
export const decode11_62 = em("11-62").decode
export const encode11_62 = em("11-62").encode
export const formatted11_62 = em("11-62").formatted

export const Param_11_63 = em("11-63").schema as Schema.Schema<any, any>
export const decode11_63 = em("11-63").decode
export const encode11_63 = em("11-63").encode
export const formatted11_63 = em("11-63").formatted

export const Param_11_64 = em("11-64").schema as Schema.Schema<any, any>
export const decode11_64 = em("11-64").decode
export const encode11_64 = em("11-64").encode
export const formatted11_64 = em("11-64").formatted

export const Param_11_65 = em("11-65").schema as Schema.Schema<any, any>
export const decode11_65 = em("11-65").decode
export const encode11_65 = em("11-65").encode
export const formatted11_65 = em("11-65").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group11Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group11Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
