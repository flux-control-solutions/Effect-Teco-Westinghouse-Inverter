/**
 * Group 20: Speed Control Parameters
 * Manual pages 4-80 to 4-82 (p480, p481, p482)
 */

import * as P from "./param-utils";
import { GROUP_20_Speed_Control_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 20 as const;
const p480 = 480 as const;
const p481 = 481 as const;
const p482 = 482 as const;

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
  "20-00": sp(GROUP_20_Speed_Control_Parameters._20_00, 0.01, { group, code: "20-00", name: "ASR Gain 1", range: "0.00~250.00", default: "-", unit: "-", page: p480 }),
  "20-01": sp(GROUP_20_Speed_Control_Parameters._20_01, 0.001, { group, code: "20-01", name: "ASR Integral Time 1", range: "0.001~10.000", default: "-", unit: "Sec", page: p480 }),
  "20-02": sp(GROUP_20_Speed_Control_Parameters._20_02, 0.01, { group, code: "20-02", name: "ASR Gain 2", range: "0.00~250.00", default: "-", unit: "-", page: p480 }),
  "20-03": sp(GROUP_20_Speed_Control_Parameters._20_03, 0.001, { group, code: "20-03", name: "ASR Integral Time 2", range: "0.001~10.000", default: "-", unit: "Sec", page: p480 }),
  "20-04": p(GROUP_20_Speed_Control_Parameters._20_04, { group, code: "20-04", name: "ASR Integral Time Limit", range: "0~300", default: "200", unit: "%", page: p480 }),
  "20-05": sp(GROUP_20_Speed_Control_Parameters._20_05, 0.1, { group, code: "20-05", name: "ASR Positive Limit", range: "0.1~10.0", default: "5.0", unit: "%", page: p480 }),
  "20-06": sp(GROUP_20_Speed_Control_Parameters._20_06, 0.1, { group, code: "20-06", name: "ASR Negative Limit", range: "0.1~10.0", default: "1.0", unit: "%", page: p480 }),
  "20-07": p(GROUP_20_Speed_Control_Parameters._20_07, { group, code: "20-07", name: "Selection of Accel/Decel P/PI", range: "0-1 (0:PI only constant speed / 1:P during accel/decel)", default: "0", unit: "-", page: p480 }),
  "20-08": sp(GROUP_20_Speed_Control_Parameters._20_08, 0.001, { group, code: "20-08", name: "ASR Delay Time", range: "0.000~0.500", default: "0.004", unit: "Sec", page: p480 }),
  "20-09": sp(GROUP_20_Speed_Control_Parameters._20_09, 0.01, { group, code: "20-09", name: "Speed Observer P Gain 1", range: "0.00~2.55", default: "0.61", unit: "-", page: p480 }),
  "20-10": sp(GROUP_20_Speed_Control_Parameters._20_10, 0.01, { group, code: "20-10", name: "Speed Observer I Time 1", range: "0.01~10.00", default: "0.05", unit: "Sec", page: p480 }),
  "20-11": sp(GROUP_20_Speed_Control_Parameters._20_11, 0.01, { group, code: "20-11", name: "Speed Observer P Gain 2", range: "0.00~2.55", default: "0.61", unit: "-", page: p480 }),
  "20-12": sp(GROUP_20_Speed_Control_Parameters._20_12, 0.01, { group, code: "20-12", name: "Speed Observer I Time 2", range: "0.01~10.00", default: "0.06", unit: "Sec", page: p480 }),
  "20-13": p(GROUP_20_Speed_Control_Parameters._20_13, { group, code: "20-13", name: "Low-pass Filter Time of Speed Feedback 1", range: "1~1000", default: "4", unit: "ms", page: p480 }),
  "20-14": p(GROUP_20_Speed_Control_Parameters._20_14, { group, code: "20-14", name: "Low-pass Filter Time of Speed Feedback 2", range: "1~1000", default: "30", unit: "ms", page: p480 }),
  "20-15": sp(GROUP_20_Speed_Control_Parameters._20_15, 0.1, { group, code: "20-15", name: "ASR Gain Change Frequency 1", range: "0.0~599.0", default: "4.0", unit: "Hz", page: p481 }),
  "20-16": sp(GROUP_20_Speed_Control_Parameters._20_16, 0.1, { group, code: "20-16", name: "ASR Gain Change Frequency 2", range: "0.0~599.0", default: "8.0", unit: "Hz", page: p481 }),
  "20-17": sp(GROUP_20_Speed_Control_Parameters._20_17, 0.01, { group, code: "20-17", name: "Torque Compensation Gain at Low Speed", range: "0.00~2.50", default: "1.00", unit: "-", page: p481 }),
  "20-18": p(GROUP_20_Speed_Control_Parameters._20_18, { group, code: "20-18", name: "Torque Compensation Gain at High Speed", range: "-10~10", default: "0", unit: "%", page: p481 }),
  "20-19": p(GROUP_20_Speed_Control_Parameters._20_19, { group, code: "20-19", name: "Over Speed (OS) Selection", range: "0-2 (0:Decel stop / 1:Coast stop / 2:Continue)", default: "1", unit: "-", page: p481 }),
  "20-20": p(GROUP_20_Speed_Control_Parameters._20_20, { group, code: "20-20", name: "Over Speed (OS) Detection Level", range: "0~120", default: "115", unit: "%", page: p481 }),
  "20-21": sp(GROUP_20_Speed_Control_Parameters._20_21, 0.1, { group, code: "20-21", name: "Over Speed (OS) Detection Time", range: "0.0~2.0", default: "0.5", unit: "Sec", page: p481 }),
  "20-22": p(GROUP_20_Speed_Control_Parameters._20_22, { group, code: "20-22", name: "Speed Deviation (DEV) Selection", range: "0-2 (0:Decel stop / 1:Coast stop / 2:Continue)", default: "2", unit: "-", page: p481 }),
  "20-23": p(GROUP_20_Speed_Control_Parameters._20_23, { group, code: "20-23", name: "Speed Deviation (DEV) Detection Level", range: "0~50", default: "10", unit: "%", page: p481 }),
  "20-24": sp(GROUP_20_Speed_Control_Parameters._20_24, 0.1, { group, code: "20-24", name: "Speed Deviation (DEV) Detection Time", range: "0.0~10.0", default: "0.5", unit: "Sec", page: p481 }),
  "20-25": p(GROUP_20_Speed_Control_Parameters._20_25, { group, code: "20-25", name: "Selection of PG Open", range: "0-2 (0:Decel stop / 1:Coast stop / 2:Continue)", default: "1", unit: "-", page: p481 }),
  "20-26": sp(GROUP_20_Speed_Control_Parameters._20_26, 0.1, { group, code: "20-26", name: "Detection Time of PG Open", range: "0.0~10.0", default: "2.0", unit: "Sec", page: p481 }),
  "20-27": p(GROUP_20_Speed_Control_Parameters._20_27, { group, code: "20-27", name: "PG Pulse Number", range: "0~9999", default: "1024", unit: "ppr", page: p481 }),
  "20-28": p(GROUP_20_Speed_Control_Parameters._20_28, { group, code: "20-28", name: "Selection of PG Rotation Direction", range: "0-1 (0:CCW / 1:CW)", default: "0", unit: "-", page: p481 }),
  "20-29": p(GROUP_20_Speed_Control_Parameters._20_29, { group, code: "20-29", name: "PG Pulse Dividing Ratio", range: "001~132", default: "1", unit: "-", page: p481 }),
  "20-30": p(GROUP_20_Speed_Control_Parameters._20_30, { group, code: "20-30", name: "PG Gear Ratio 1", range: "1~1000", default: "1", unit: "-", page: p482 }),
  "20-31": p(GROUP_20_Speed_Control_Parameters._20_31, { group, code: "20-31", name: "PG Gear Ratio 2", range: "1~1000", default: "1", unit: "-", page: p482 }),
  "20-32": p(GROUP_20_Speed_Control_Parameters._20_32, { group, code: "20-32", name: "Selection of Specific Encoder", range: "0-1 (0:None / 1:Resolver)", default: "0", unit: "-", page: p482 }),
  "20-33": sp(GROUP_20_Speed_Control_Parameters._20_33, 0.1, { group, code: "20-33", name: "Detection Level at Constant Speed", range: "0.1~5.0", default: "1.0", unit: "-", page: p482 }),
  "20-34": p(GROUP_20_Speed_Control_Parameters._20_34, { group, code: "20-34", name: "Compensation Gain of Derating", range: "0~25600", default: "0", unit: "-", page: p482 }),
  "20-35": p(GROUP_20_Speed_Control_Parameters._20_35, { group, code: "20-35", name: "Compensation Time of Derating", range: "0~30000", default: "100", unit: "ms", page: p482 }),
  "20-43": p(GROUP_20_Speed_Control_Parameters._20_43, { group, code: "20-43", name: "MPG Speed Magnification Calculation", range: "1~500", default: "20", unit: "-", page: p482 }),
  "20-44": sp(GROUP_20_Speed_Control_Parameters._20_44, 0.1, { group, code: "20-44", name: "MPG Speed Command Limit", range: "0.1~30.0", default: "6.0", unit: "Hz", page: p482 }),
}

// ── Group-level lookup ─────────────────────────────────────

export const group20Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group20Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
