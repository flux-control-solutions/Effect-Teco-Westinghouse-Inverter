/**
 * Group 15: PLC Monitoring Parameters
 * Manual page 4-73
 */

import * as P from "./param-utils";
import { GROUP_15_PLC_Monitoring_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 15 as const;
const p473 = 473 as const;

const p = (addr: number, meta: P.ParamMeta) => {
  const schema = P.makeParam(addr, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}

type ParamEntry = { schema: Schema.Schema<any, any>; decode: ReturnType<typeof P.makeDecode>; encode: ReturnType<typeof P.makeEncode> }

const all: Record<string, { schema: Schema.Schema<any, any>; decode: any; encode: any; formatted: any }> = {
  "15-00": p(GROUP_15_PLC_Monitoring_Parameters._15_00, { group, code: "15-00", name: "T1 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-01": p(GROUP_15_PLC_Monitoring_Parameters._15_01, { group, code: "15-01", name: "T1 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-02": p(GROUP_15_PLC_Monitoring_Parameters._15_02, { group, code: "15-02", name: "T2 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-03": p(GROUP_15_PLC_Monitoring_Parameters._15_03, { group, code: "15-03", name: "T2 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-04": p(GROUP_15_PLC_Monitoring_Parameters._15_04, { group, code: "15-04", name: "T3 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-05": p(GROUP_15_PLC_Monitoring_Parameters._15_05, { group, code: "15-05", name: "T3 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-06": p(GROUP_15_PLC_Monitoring_Parameters._15_06, { group, code: "15-06", name: "T4 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-07": p(GROUP_15_PLC_Monitoring_Parameters._15_07, { group, code: "15-07", name: "T4 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-08": p(GROUP_15_PLC_Monitoring_Parameters._15_08, { group, code: "15-08", name: "T5 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-09": p(GROUP_15_PLC_Monitoring_Parameters._15_09, { group, code: "15-09", name: "T5 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-10": p(GROUP_15_PLC_Monitoring_Parameters._15_10, { group, code: "15-10", name: "T6 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-11": p(GROUP_15_PLC_Monitoring_Parameters._15_11, { group, code: "15-11", name: "T6 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-12": p(GROUP_15_PLC_Monitoring_Parameters._15_12, { group, code: "15-12", name: "T7 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-13": p(GROUP_15_PLC_Monitoring_Parameters._15_13, { group, code: "15-13", name: "T7 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-14": p(GROUP_15_PLC_Monitoring_Parameters._15_14, { group, code: "15-14", name: "T8 Current Value 1", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-15": p(GROUP_15_PLC_Monitoring_Parameters._15_15, { group, code: "15-15", name: "T8 Current Value 2 (Mode 7)", range: "0~9999", default: "0", unit: "-", page: p473 }),
  "15-16": p(GROUP_15_PLC_Monitoring_Parameters._15_16, { group, code: "15-16", name: "C1 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-17": p(GROUP_15_PLC_Monitoring_Parameters._15_17, { group, code: "15-17", name: "C2 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-18": p(GROUP_15_PLC_Monitoring_Parameters._15_18, { group, code: "15-18", name: "C3 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-19": p(GROUP_15_PLC_Monitoring_Parameters._15_19, { group, code: "15-19", name: "C4 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-20": p(GROUP_15_PLC_Monitoring_Parameters._15_20, { group, code: "15-20", name: "C5 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-21": p(GROUP_15_PLC_Monitoring_Parameters._15_21, { group, code: "15-21", name: "C6 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-22": p(GROUP_15_PLC_Monitoring_Parameters._15_22, { group, code: "15-22", name: "C7 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-23": p(GROUP_15_PLC_Monitoring_Parameters._15_23, { group, code: "15-23", name: "C8 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-24": p(GROUP_15_PLC_Monitoring_Parameters._15_24, { group, code: "15-24", name: "AS1 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-25": p(GROUP_15_PLC_Monitoring_Parameters._15_25, { group, code: "15-25", name: "AS2 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-26": p(GROUP_15_PLC_Monitoring_Parameters._15_26, { group, code: "15-26", name: "AS3 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-27": p(GROUP_15_PLC_Monitoring_Parameters._15_27, { group, code: "15-27", name: "AS4 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-28": p(GROUP_15_PLC_Monitoring_Parameters._15_28, { group, code: "15-28", name: "MD1 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-29": p(GROUP_15_PLC_Monitoring_Parameters._15_29, { group, code: "15-29", name: "MD2 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-30": p(GROUP_15_PLC_Monitoring_Parameters._15_30, { group, code: "15-30", name: "MD3 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-31": p(GROUP_15_PLC_Monitoring_Parameters._15_31, { group, code: "15-31", name: "MD4 Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
  "15-32": p(GROUP_15_PLC_Monitoring_Parameters._15_32, { group, code: "15-32", name: "TD Current Value", range: "0~65534", default: "0", unit: "-", page: p473 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_15_00 = em("15-00").schema as Schema.Schema<any, any>
export const decode15_00 = em("15-00").decode
export const encode15_00 = em("15-00").encode
export const formatted15_00 = em("15-00").formatted

export const Param_15_01 = em("15-01").schema as Schema.Schema<any, any>
export const decode15_01 = em("15-01").decode
export const encode15_01 = em("15-01").encode
export const formatted15_01 = em("15-01").formatted

export const Param_15_02 = em("15-02").schema as Schema.Schema<any, any>
export const decode15_02 = em("15-02").decode
export const encode15_02 = em("15-02").encode
export const formatted15_02 = em("15-02").formatted

export const Param_15_03 = em("15-03").schema as Schema.Schema<any, any>
export const decode15_03 = em("15-03").decode
export const encode15_03 = em("15-03").encode
export const formatted15_03 = em("15-03").formatted

export const Param_15_04 = em("15-04").schema as Schema.Schema<any, any>
export const decode15_04 = em("15-04").decode
export const encode15_04 = em("15-04").encode
export const formatted15_04 = em("15-04").formatted

export const Param_15_05 = em("15-05").schema as Schema.Schema<any, any>
export const decode15_05 = em("15-05").decode
export const encode15_05 = em("15-05").encode
export const formatted15_05 = em("15-05").formatted

export const Param_15_06 = em("15-06").schema as Schema.Schema<any, any>
export const decode15_06 = em("15-06").decode
export const encode15_06 = em("15-06").encode
export const formatted15_06 = em("15-06").formatted

export const Param_15_07 = em("15-07").schema as Schema.Schema<any, any>
export const decode15_07 = em("15-07").decode
export const encode15_07 = em("15-07").encode
export const formatted15_07 = em("15-07").formatted

export const Param_15_08 = em("15-08").schema as Schema.Schema<any, any>
export const decode15_08 = em("15-08").decode
export const encode15_08 = em("15-08").encode
export const formatted15_08 = em("15-08").formatted

export const Param_15_09 = em("15-09").schema as Schema.Schema<any, any>
export const decode15_09 = em("15-09").decode
export const encode15_09 = em("15-09").encode
export const formatted15_09 = em("15-09").formatted

export const Param_15_10 = em("15-10").schema as Schema.Schema<any, any>
export const decode15_10 = em("15-10").decode
export const encode15_10 = em("15-10").encode
export const formatted15_10 = em("15-10").formatted

export const Param_15_11 = em("15-11").schema as Schema.Schema<any, any>
export const decode15_11 = em("15-11").decode
export const encode15_11 = em("15-11").encode
export const formatted15_11 = em("15-11").formatted

export const Param_15_12 = em("15-12").schema as Schema.Schema<any, any>
export const decode15_12 = em("15-12").decode
export const encode15_12 = em("15-12").encode
export const formatted15_12 = em("15-12").formatted

export const Param_15_13 = em("15-13").schema as Schema.Schema<any, any>
export const decode15_13 = em("15-13").decode
export const encode15_13 = em("15-13").encode
export const formatted15_13 = em("15-13").formatted

export const Param_15_14 = em("15-14").schema as Schema.Schema<any, any>
export const decode15_14 = em("15-14").decode
export const encode15_14 = em("15-14").encode
export const formatted15_14 = em("15-14").formatted

export const Param_15_15 = em("15-15").schema as Schema.Schema<any, any>
export const decode15_15 = em("15-15").decode
export const encode15_15 = em("15-15").encode
export const formatted15_15 = em("15-15").formatted

export const Param_15_16 = em("15-16").schema as Schema.Schema<any, any>
export const decode15_16 = em("15-16").decode
export const encode15_16 = em("15-16").encode
export const formatted15_16 = em("15-16").formatted

export const Param_15_17 = em("15-17").schema as Schema.Schema<any, any>
export const decode15_17 = em("15-17").decode
export const encode15_17 = em("15-17").encode
export const formatted15_17 = em("15-17").formatted

export const Param_15_18 = em("15-18").schema as Schema.Schema<any, any>
export const decode15_18 = em("15-18").decode
export const encode15_18 = em("15-18").encode
export const formatted15_18 = em("15-18").formatted

export const Param_15_19 = em("15-19").schema as Schema.Schema<any, any>
export const decode15_19 = em("15-19").decode
export const encode15_19 = em("15-19").encode
export const formatted15_19 = em("15-19").formatted

export const Param_15_20 = em("15-20").schema as Schema.Schema<any, any>
export const decode15_20 = em("15-20").decode
export const encode15_20 = em("15-20").encode
export const formatted15_20 = em("15-20").formatted

export const Param_15_21 = em("15-21").schema as Schema.Schema<any, any>
export const decode15_21 = em("15-21").decode
export const encode15_21 = em("15-21").encode
export const formatted15_21 = em("15-21").formatted

export const Param_15_22 = em("15-22").schema as Schema.Schema<any, any>
export const decode15_22 = em("15-22").decode
export const encode15_22 = em("15-22").encode
export const formatted15_22 = em("15-22").formatted

export const Param_15_23 = em("15-23").schema as Schema.Schema<any, any>
export const decode15_23 = em("15-23").decode
export const encode15_23 = em("15-23").encode
export const formatted15_23 = em("15-23").formatted

export const Param_15_24 = em("15-24").schema as Schema.Schema<any, any>
export const decode15_24 = em("15-24").decode
export const encode15_24 = em("15-24").encode
export const formatted15_24 = em("15-24").formatted

export const Param_15_25 = em("15-25").schema as Schema.Schema<any, any>
export const decode15_25 = em("15-25").decode
export const encode15_25 = em("15-25").encode
export const formatted15_25 = em("15-25").formatted

export const Param_15_26 = em("15-26").schema as Schema.Schema<any, any>
export const decode15_26 = em("15-26").decode
export const encode15_26 = em("15-26").encode
export const formatted15_26 = em("15-26").formatted

export const Param_15_27 = em("15-27").schema as Schema.Schema<any, any>
export const decode15_27 = em("15-27").decode
export const encode15_27 = em("15-27").encode
export const formatted15_27 = em("15-27").formatted

export const Param_15_28 = em("15-28").schema as Schema.Schema<any, any>
export const decode15_28 = em("15-28").decode
export const encode15_28 = em("15-28").encode
export const formatted15_28 = em("15-28").formatted

export const Param_15_29 = em("15-29").schema as Schema.Schema<any, any>
export const decode15_29 = em("15-29").decode
export const encode15_29 = em("15-29").encode
export const formatted15_29 = em("15-29").formatted

export const Param_15_30 = em("15-30").schema as Schema.Schema<any, any>
export const decode15_30 = em("15-30").decode
export const encode15_30 = em("15-30").encode
export const formatted15_30 = em("15-30").formatted

export const Param_15_31 = em("15-31").schema as Schema.Schema<any, any>
export const decode15_31 = em("15-31").decode
export const encode15_31 = em("15-31").encode
export const formatted15_31 = em("15-31").formatted

export const Param_15_32 = em("15-32").schema as Schema.Schema<any, any>
export const decode15_32 = em("15-32").decode
export const encode15_32 = em("15-32").encode
export const formatted15_32 = em("15-32").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group15Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group15Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
