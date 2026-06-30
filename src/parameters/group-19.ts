/**
 * Group 19: Wobble Frequency Parameters
 * Manual pages 4-79 to 4-80
 */

import * as P from "./param-utils";
import { GROUP_19_Wobble_Frequency_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 19 as const;
const p479 = 479 as const;
const p480 = 480 as const;

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
  "19-00": sp(GROUP_19_Wobble_Frequency_Parameters._19_00, 0.01, { group, code: "19-00", name: "Center Frequency of Wobble Frequency", range: "5.00~100.00", default: "20.00", unit: "%", page: p479 }),
  "19-01": sp(GROUP_19_Wobble_Frequency_Parameters._19_01, 0.1, { group, code: "19-01", name: "Amplitude of Wobble Frequency", range: "0.1~20.0", default: "10.0", unit: "%", page: p479 }),
  "19-02": sp(GROUP_19_Wobble_Frequency_Parameters._19_02, 0.1, { group, code: "19-02", name: "Jump Frequency of Wobble Frequency", range: "0.0~50.0", default: "0.0", unit: "%", page: p479 }),
  "19-03": p(GROUP_19_Wobble_Frequency_Parameters._19_03, { group, code: "19-03", name: "Jump Time of Wobble Frequency", range: "0~50", default: "0", unit: "ms", page: p479 }),
  "19-04": sp(GROUP_19_Wobble_Frequency_Parameters._19_04, 0.1, { group, code: "19-04", name: "Wobble Frequency Cycle", range: "0.0~1000.0", default: "10.0", unit: "Sec", page: p479 }),
  "19-05": sp(GROUP_19_Wobble_Frequency_Parameters._19_05, 0.1, { group, code: "19-05", name: "Wobble Frequency Ratio", range: "0.1~10.0", default: "1.0", unit: "-", page: p479 }),
  "19-06": sp(GROUP_19_Wobble_Frequency_Parameters._19_06, 0.1, { group, code: "19-06", name: "Upper Offset Amplitude of Wobble Frequency", range: "0.0~20.0", default: "0.0", unit: "%", page: p479 }),
  "19-07": sp(GROUP_19_Wobble_Frequency_Parameters._19_07, 0.1, { group, code: "19-07", name: "Lower Offset Amplitude of Wobble Frequency", range: "0.0~20.0", default: "0.0", unit: "%", page: p480 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_19_00 = em("19-00").schema as Schema.Schema<any, any>
export const decode19_00 = em("19-00").decode
export const encode19_00 = em("19-00").encode
export const formatted19_00 = em("19-00").formatted

export const Param_19_01 = em("19-01").schema as Schema.Schema<any, any>
export const decode19_01 = em("19-01").decode
export const encode19_01 = em("19-01").encode
export const formatted19_01 = em("19-01").formatted

export const Param_19_02 = em("19-02").schema as Schema.Schema<any, any>
export const decode19_02 = em("19-02").decode
export const encode19_02 = em("19-02").encode
export const formatted19_02 = em("19-02").formatted

export const Param_19_03 = em("19-03").schema as Schema.Schema<any, any>
export const decode19_03 = em("19-03").decode
export const encode19_03 = em("19-03").encode
export const formatted19_03 = em("19-03").formatted

export const Param_19_04 = em("19-04").schema as Schema.Schema<any, any>
export const decode19_04 = em("19-04").decode
export const encode19_04 = em("19-04").encode
export const formatted19_04 = em("19-04").formatted

export const Param_19_05 = em("19-05").schema as Schema.Schema<any, any>
export const decode19_05 = em("19-05").decode
export const encode19_05 = em("19-05").encode
export const formatted19_05 = em("19-05").formatted

export const Param_19_06 = em("19-06").schema as Schema.Schema<any, any>
export const decode19_06 = em("19-06").decode
export const encode19_06 = em("19-06").encode
export const formatted19_06 = em("19-06").formatted

export const Param_19_07 = em("19-07").schema as Schema.Schema<any, any>
export const decode19_07 = em("19-07").decode
export const encode19_07 = em("19-07").encode
export const formatted19_07 = em("19-07").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group19Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group19Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
