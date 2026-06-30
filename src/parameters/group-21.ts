/**
 * Group 21: Torque And Position Control Parameters
 * Manual pages 4-82 to 4-85
 */

import * as P from "./param-utils";
import { GROUP_21_Torque_And_Position_Control_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 21 as const;
const p482 = 482 as const;
const p483 = 483 as const;
const p484 = 484 as const;
const p485 = 485 as const;

const p = (addr: number, meta: P.ParamMeta) => {
  const schema = P.makeParam(addr, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}
const sp = (addr: number, factor: number, meta: P.ParamMeta) => {
  const schema = P.makeScaledParam(addr, factor, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}
const ssp = (addr: number, factor: number, meta: P.ParamMeta) => {
  const schema = P.makeSignedScaledParam(addr, factor, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}

type ParamEntry = { schema: Schema.Schema<any, any>; decode: ReturnType<typeof P.makeDecode>; encode: ReturnType<typeof P.makeEncode> }

const all: Record<string, { schema: Schema.Schema<any, any>; decode: any; encode: any; formatted: any }> = {
  "21-00": p(GROUP_21_Torque_And_Position_Control_Parameters._21_00, { group, code: "21-00", name: "Torque Control Selection", range: "0-1 (0:Speed Control / 1:Torque Control)", default: "0", unit: "-", page: p482 }),
  "21-01": p(GROUP_21_Torque_And_Position_Control_Parameters._21_01, { group, code: "21-01", name: "Filter Time of Torque Reference", range: "0~1000", default: "0", unit: "ms", page: p482 }),
  "21-02": p(GROUP_21_Torque_And_Position_Control_Parameters._21_02, { group, code: "21-02", name: "Speed Limit Selection", range: "0-2 (0:AI input / 1:21-03 value / 2:Comm 2502H)", default: "0", unit: "-", page: p482 }),
  "21-03": ssp(GROUP_21_Torque_And_Position_Control_Parameters._21_03, 0.1, { group, code: "21-03", name: "Speed Limit Value", range: "-120~120", default: "0", unit: "%", page: p482 }),
  "21-04": p(GROUP_21_Torque_And_Position_Control_Parameters._21_04, { group, code: "21-04", name: "Speed Limit Bias", range: "0~120", default: "10", unit: "%", page: p482 }),
  "21-05": p(GROUP_21_Torque_And_Position_Control_Parameters._21_05, { group, code: "21-05", name: "Positive Torque Limit", range: "0~300", default: "* (see Attachment 1 p.170)", unit: "%", page: p482 }),
  "21-06": p(GROUP_21_Torque_And_Position_Control_Parameters._21_06, { group, code: "21-06", name: "Negative Torque Limit", range: "0~300", default: "* (see Attachment 1 p.170)", unit: "%", page: p482 }),
  "21-07": p(GROUP_21_Torque_And_Position_Control_Parameters._21_07, { group, code: "21-07", name: "Forward Regenerative Torque Limit", range: "0~300", default: "* (see Attachment 1 p.170)", unit: "%", page: p482 }),
  "21-08": p(GROUP_21_Torque_And_Position_Control_Parameters._21_08, { group, code: "21-08", name: "Reversal Regenerative Torque Limit", range: "0~300", default: "* (see Attachment 1 p.170)", unit: "%", page: p482 }),
  "21-09": sp(GROUP_21_Torque_And_Position_Control_Parameters._21_09, 0.1, { group, code: "21-09", name: "Maximum Frequency of Position Control", range: "0.1~100.0", default: "20.0", unit: "Hz", page: p482 }),
  "21-10": p(GROUP_21_Torque_And_Position_Control_Parameters._21_10, { group, code: "21-10", name: "Command of Rotation Cycle Number of Section 0", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-11": p(GROUP_21_Torque_And_Position_Control_Parameters._21_11, { group, code: "21-11", name: "Command of the Pulse Number of Section 0", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-12": p(GROUP_21_Torque_And_Position_Control_Parameters._21_12, { group, code: "21-12", name: "Command of Rotation Cycle Number of Section 1", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-13": p(GROUP_21_Torque_And_Position_Control_Parameters._21_13, { group, code: "21-13", name: "Command of the Pulse Number of Section 1", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-14": p(GROUP_21_Torque_And_Position_Control_Parameters._21_14, { group, code: "21-14", name: "Command of Rotation Cycle Number of Section 2", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-15": p(GROUP_21_Torque_And_Position_Control_Parameters._21_15, { group, code: "21-15", name: "Command of the Pulse Number of Section 2", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-16": p(GROUP_21_Torque_And_Position_Control_Parameters._21_16, { group, code: "21-16", name: "Command of Rotation Cycle Number of Section 3", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-17": p(GROUP_21_Torque_And_Position_Control_Parameters._21_17, { group, code: "21-17", name: "Command of the Pulse Number of Section 3", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-18": p(GROUP_21_Torque_And_Position_Control_Parameters._21_18, { group, code: "21-18", name: "Command of Rotation Cycle Number of Section 4", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-19": p(GROUP_21_Torque_And_Position_Control_Parameters._21_19, { group, code: "21-19", name: "Command of the Pulse Number of Section 4", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-20": p(GROUP_21_Torque_And_Position_Control_Parameters._21_20, { group, code: "21-20", name: "Command of Rotation Cycle Number of Section 5", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-21": p(GROUP_21_Torque_And_Position_Control_Parameters._21_21, { group, code: "21-21", name: "Command of the Pulse Number of Section 5", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-22": p(GROUP_21_Torque_And_Position_Control_Parameters._21_22, { group, code: "21-22", name: "Command of Rotation Cycle Number of Section 6", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-23": p(GROUP_21_Torque_And_Position_Control_Parameters._21_23, { group, code: "21-23", name: "Command of the Pulse Number of Section 6", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-24": p(GROUP_21_Torque_And_Position_Control_Parameters._21_24, { group, code: "21-24", name: "Command of Rotation Cycle Number of Section 7", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-25": p(GROUP_21_Torque_And_Position_Control_Parameters._21_25, { group, code: "21-25", name: "Command of the Pulse Number of Section 7", range: "-9999~9999", default: "0", unit: "-", page: p483 }),
  "21-26": p(GROUP_21_Torque_And_Position_Control_Parameters._21_26, { group, code: "21-26", name: "Command of the Pulse Number of Section 8", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-27": p(GROUP_21_Torque_And_Position_Control_Parameters._21_27, { group, code: "21-27", name: "Command of Rotation Cycle Number of Section 8", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-28": p(GROUP_21_Torque_And_Position_Control_Parameters._21_28, { group, code: "21-28", name: "Command of the Pulse Number of Section 9", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-29": p(GROUP_21_Torque_And_Position_Control_Parameters._21_29, { group, code: "21-29", name: "Command of Rotation Cycle Number of Section 9", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-30": p(GROUP_21_Torque_And_Position_Control_Parameters._21_30, { group, code: "21-30", name: "Command of Rotation Cycle Number of Section 10", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-31": p(GROUP_21_Torque_And_Position_Control_Parameters._21_31, { group, code: "21-31", name: "Command of the Pulse Number of Section 10", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-32": p(GROUP_21_Torque_And_Position_Control_Parameters._21_32, { group, code: "21-32", name: "Command of Rotation Cycle Number of Section 11", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-33": p(GROUP_21_Torque_And_Position_Control_Parameters._21_33, { group, code: "21-33", name: "Command of the Pulse Number of Section 11", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-34": p(GROUP_21_Torque_And_Position_Control_Parameters._21_34, { group, code: "21-34", name: "Command of Rotation Cycle Number of Section 12", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-35": p(GROUP_21_Torque_And_Position_Control_Parameters._21_35, { group, code: "21-35", name: "Command of the Pulse Number of Section 12", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-36": p(GROUP_21_Torque_And_Position_Control_Parameters._21_36, { group, code: "21-36", name: "Command of Rotation Cycle Number of Section 13", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-37": p(GROUP_21_Torque_And_Position_Control_Parameters._21_37, { group, code: "21-37", name: "Command of the Pulse Number of Section 13", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-38": p(GROUP_21_Torque_And_Position_Control_Parameters._21_38, { group, code: "21-38", name: "Command of Rotation Cycle Number of Section 14", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-39": p(GROUP_21_Torque_And_Position_Control_Parameters._21_39, { group, code: "21-39", name: "Command of the Pulse Number of Section 14", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-40": p(GROUP_21_Torque_And_Position_Control_Parameters._21_40, { group, code: "21-40", name: "Command of Rotation Cycle Number of Section 15", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-41": p(GROUP_21_Torque_And_Position_Control_Parameters._21_41, { group, code: "21-41", name: "Command of the Pulse Number of Section 15", range: "-9999~9999", default: "0", unit: "-", page: p484 }),
  "21-42": p(GROUP_21_Torque_And_Position_Control_Parameters._21_42, { group, code: "21-42", name: "Pos. Mode Sel", range: "0-1 (0:Switch to pos mode when freq<01-08 / 1:Z Phase Locked)", default: "0", unit: "-", page: p485 }),
  "21-43": p(GROUP_21_Torque_And_Position_Control_Parameters._21_43, { group, code: "21-43", name: "Offset Angle", range: "0~9999", default: "0", unit: "Pulse", page: p485 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_21_00 = em("21-00").schema as Schema.Schema<any, any>
export const decode21_00 = em("21-00").decode
export const encode21_00 = em("21-00").encode
export const formatted21_00 = em("21-00").formatted

export const Param_21_01 = em("21-01").schema as Schema.Schema<any, any>
export const decode21_01 = em("21-01").decode
export const encode21_01 = em("21-01").encode
export const formatted21_01 = em("21-01").formatted

export const Param_21_02 = em("21-02").schema as Schema.Schema<any, any>
export const decode21_02 = em("21-02").decode
export const encode21_02 = em("21-02").encode
export const formatted21_02 = em("21-02").formatted

export const Param_21_03 = em("21-03").schema as Schema.Schema<any, any>
export const decode21_03 = em("21-03").decode
export const encode21_03 = em("21-03").encode
export const formatted21_03 = em("21-03").formatted

export const Param_21_04 = em("21-04").schema as Schema.Schema<any, any>
export const decode21_04 = em("21-04").decode
export const encode21_04 = em("21-04").encode
export const formatted21_04 = em("21-04").formatted

export const Param_21_05 = em("21-05").schema as Schema.Schema<any, any>
export const decode21_05 = em("21-05").decode
export const encode21_05 = em("21-05").encode
export const formatted21_05 = em("21-05").formatted

export const Param_21_06 = em("21-06").schema as Schema.Schema<any, any>
export const decode21_06 = em("21-06").decode
export const encode21_06 = em("21-06").encode
export const formatted21_06 = em("21-06").formatted

export const Param_21_07 = em("21-07").schema as Schema.Schema<any, any>
export const decode21_07 = em("21-07").decode
export const encode21_07 = em("21-07").encode
export const formatted21_07 = em("21-07").formatted

export const Param_21_08 = em("21-08").schema as Schema.Schema<any, any>
export const decode21_08 = em("21-08").decode
export const encode21_08 = em("21-08").encode
export const formatted21_08 = em("21-08").formatted

export const Param_21_09 = em("21-09").schema as Schema.Schema<any, any>
export const decode21_09 = em("21-09").decode
export const encode21_09 = em("21-09").encode
export const formatted21_09 = em("21-09").formatted

export const Param_21_10 = em("21-10").schema as Schema.Schema<any, any>
export const decode21_10 = em("21-10").decode
export const encode21_10 = em("21-10").encode
export const formatted21_10 = em("21-10").formatted

export const Param_21_11 = em("21-11").schema as Schema.Schema<any, any>
export const decode21_11 = em("21-11").decode
export const encode21_11 = em("21-11").encode
export const formatted21_11 = em("21-11").formatted

export const Param_21_12 = em("21-12").schema as Schema.Schema<any, any>
export const decode21_12 = em("21-12").decode
export const encode21_12 = em("21-12").encode
export const formatted21_12 = em("21-12").formatted

export const Param_21_13 = em("21-13").schema as Schema.Schema<any, any>
export const decode21_13 = em("21-13").decode
export const encode21_13 = em("21-13").encode
export const formatted21_13 = em("21-13").formatted

export const Param_21_14 = em("21-14").schema as Schema.Schema<any, any>
export const decode21_14 = em("21-14").decode
export const encode21_14 = em("21-14").encode
export const formatted21_14 = em("21-14").formatted

export const Param_21_15 = em("21-15").schema as Schema.Schema<any, any>
export const decode21_15 = em("21-15").decode
export const encode21_15 = em("21-15").encode
export const formatted21_15 = em("21-15").formatted

export const Param_21_16 = em("21-16").schema as Schema.Schema<any, any>
export const decode21_16 = em("21-16").decode
export const encode21_16 = em("21-16").encode
export const formatted21_16 = em("21-16").formatted

export const Param_21_17 = em("21-17").schema as Schema.Schema<any, any>
export const decode21_17 = em("21-17").decode
export const encode21_17 = em("21-17").encode
export const formatted21_17 = em("21-17").formatted

export const Param_21_18 = em("21-18").schema as Schema.Schema<any, any>
export const decode21_18 = em("21-18").decode
export const encode21_18 = em("21-18").encode
export const formatted21_18 = em("21-18").formatted

export const Param_21_19 = em("21-19").schema as Schema.Schema<any, any>
export const decode21_19 = em("21-19").decode
export const encode21_19 = em("21-19").encode
export const formatted21_19 = em("21-19").formatted

export const Param_21_20 = em("21-20").schema as Schema.Schema<any, any>
export const decode21_20 = em("21-20").decode
export const encode21_20 = em("21-20").encode
export const formatted21_20 = em("21-20").formatted

export const Param_21_21 = em("21-21").schema as Schema.Schema<any, any>
export const decode21_21 = em("21-21").decode
export const encode21_21 = em("21-21").encode
export const formatted21_21 = em("21-21").formatted

export const Param_21_22 = em("21-22").schema as Schema.Schema<any, any>
export const decode21_22 = em("21-22").decode
export const encode21_22 = em("21-22").encode
export const formatted21_22 = em("21-22").formatted

export const Param_21_23 = em("21-23").schema as Schema.Schema<any, any>
export const decode21_23 = em("21-23").decode
export const encode21_23 = em("21-23").encode
export const formatted21_23 = em("21-23").formatted

export const Param_21_24 = em("21-24").schema as Schema.Schema<any, any>
export const decode21_24 = em("21-24").decode
export const encode21_24 = em("21-24").encode
export const formatted21_24 = em("21-24").formatted

export const Param_21_25 = em("21-25").schema as Schema.Schema<any, any>
export const decode21_25 = em("21-25").decode
export const encode21_25 = em("21-25").encode
export const formatted21_25 = em("21-25").formatted

export const Param_21_26 = em("21-26").schema as Schema.Schema<any, any>
export const decode21_26 = em("21-26").decode
export const encode21_26 = em("21-26").encode
export const formatted21_26 = em("21-26").formatted

export const Param_21_27 = em("21-27").schema as Schema.Schema<any, any>
export const decode21_27 = em("21-27").decode
export const encode21_27 = em("21-27").encode
export const formatted21_27 = em("21-27").formatted

export const Param_21_28 = em("21-28").schema as Schema.Schema<any, any>
export const decode21_28 = em("21-28").decode
export const encode21_28 = em("21-28").encode
export const formatted21_28 = em("21-28").formatted

export const Param_21_29 = em("21-29").schema as Schema.Schema<any, any>
export const decode21_29 = em("21-29").decode
export const encode21_29 = em("21-29").encode
export const formatted21_29 = em("21-29").formatted

export const Param_21_30 = em("21-30").schema as Schema.Schema<any, any>
export const decode21_30 = em("21-30").decode
export const encode21_30 = em("21-30").encode
export const formatted21_30 = em("21-30").formatted

export const Param_21_31 = em("21-31").schema as Schema.Schema<any, any>
export const decode21_31 = em("21-31").decode
export const encode21_31 = em("21-31").encode
export const formatted21_31 = em("21-31").formatted

export const Param_21_32 = em("21-32").schema as Schema.Schema<any, any>
export const decode21_32 = em("21-32").decode
export const encode21_32 = em("21-32").encode
export const formatted21_32 = em("21-32").formatted

export const Param_21_33 = em("21-33").schema as Schema.Schema<any, any>
export const decode21_33 = em("21-33").decode
export const encode21_33 = em("21-33").encode
export const formatted21_33 = em("21-33").formatted

export const Param_21_34 = em("21-34").schema as Schema.Schema<any, any>
export const decode21_34 = em("21-34").decode
export const encode21_34 = em("21-34").encode
export const formatted21_34 = em("21-34").formatted

export const Param_21_35 = em("21-35").schema as Schema.Schema<any, any>
export const decode21_35 = em("21-35").decode
export const encode21_35 = em("21-35").encode
export const formatted21_35 = em("21-35").formatted

export const Param_21_36 = em("21-36").schema as Schema.Schema<any, any>
export const decode21_36 = em("21-36").decode
export const encode21_36 = em("21-36").encode
export const formatted21_36 = em("21-36").formatted

export const Param_21_37 = em("21-37").schema as Schema.Schema<any, any>
export const decode21_37 = em("21-37").decode
export const encode21_37 = em("21-37").encode
export const formatted21_37 = em("21-37").formatted

export const Param_21_38 = em("21-38").schema as Schema.Schema<any, any>
export const decode21_38 = em("21-38").decode
export const encode21_38 = em("21-38").encode
export const formatted21_38 = em("21-38").formatted

export const Param_21_39 = em("21-39").schema as Schema.Schema<any, any>
export const decode21_39 = em("21-39").decode
export const encode21_39 = em("21-39").encode
export const formatted21_39 = em("21-39").formatted

export const Param_21_40 = em("21-40").schema as Schema.Schema<any, any>
export const decode21_40 = em("21-40").decode
export const encode21_40 = em("21-40").encode
export const formatted21_40 = em("21-40").formatted

export const Param_21_41 = em("21-41").schema as Schema.Schema<any, any>
export const decode21_41 = em("21-41").decode
export const encode21_41 = em("21-41").encode
export const formatted21_41 = em("21-41").formatted

export const Param_21_42 = em("21-42").schema as Schema.Schema<any, any>
export const decode21_42 = em("21-42").decode
export const encode21_42 = em("21-42").encode
export const formatted21_42 = em("21-42").formatted

export const Param_21_43 = em("21-43").schema as Schema.Schema<any, any>
export const decode21_43 = em("21-43").decode
export const encode21_43 = em("21-43").encode
export const formatted21_43 = em("21-43").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group21Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group21Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
