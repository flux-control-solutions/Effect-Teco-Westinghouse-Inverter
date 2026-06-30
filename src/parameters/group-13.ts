/**
 * Group 13: Maintenance Parameters
 * Manual pages 4-68 to 4-70
 */

import * as P from "./param-utils";
import { GROUP_13_Maintenance_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 13 as const;
const p468 = 468 as const;
const p469 = 469 as const;
const p470 = 470 as const;

const p = (addr: number, meta: P.ParamMeta) => {
  const schema = P.makeParam(addr, meta) as Schema.Schema<any, any>
  return { schema, decode: P.makeDecode(schema), encode: P.makeEncode(schema), formatted: P.makeFormatted(schema) }
}

type ParamEntry = { schema: Schema.Schema<any, any>; decode: ReturnType<typeof P.makeDecode>; encode: ReturnType<typeof P.makeEncode> }

const all: Record<string, { schema: Schema.Schema<any, any>; decode: any; encode: any; formatted: any }> = {
  "13-00": p(GROUP_13_Maintenance_Parameters._13_00, { group, code: "13-00", name: "Inverter Capacity Selection", range: "read-only", default: "-", unit: "-", page: p468 }),
  "13-01": p(GROUP_13_Maintenance_Parameters._13_01, { group, code: "13-01", name: "Software Version", range: "0.00~9.99", default: "-", unit: "-", page: p468 }),
  "13-02": p(GROUP_13_Maintenance_Parameters._13_02, { group, code: "13-02", name: "Clear Cumulative Operation Hours", range: "0-1 (0:Disable / 1:Clear)", default: "0", unit: "-", page: p468 }),
  "13-03": p(GROUP_13_Maintenance_Parameters._13_03, { group, code: "13-03", name: "Cumulative Operation Hours 1", range: "0~23", default: "-", unit: "hr", page: p468 }),
  "13-04": p(GROUP_13_Maintenance_Parameters._13_04, { group, code: "13-04", name: "Cumulative Operation Hours 2", range: "0~65534", default: "-", unit: "day", page: p468 }),
  "13-05": p(GROUP_13_Maintenance_Parameters._13_05, { group, code: "13-05", name: "Selection of Cumulative Operation Time", range: "0-1 (0:Power on / 1:Operation)", default: "0", unit: "-", page: p468 }),
  "13-06": p(GROUP_13_Maintenance_Parameters._13_06, { group, code: "13-06", name: "Parameters Locked", range: "0-2 (0:Read-only / 1:User defined / 2:All writable)", default: "2", unit: "-", page: p468 }),
  "13-07": p(GROUP_13_Maintenance_Parameters._13_07, { group, code: "13-07", name: "Parameter Password Function", range: "00000~65534", default: "00000", unit: "-", page: p468 }),
  "13-08": p(GROUP_13_Maintenance_Parameters._13_08, { group, code: "13-08", name: "Restore Factory Setting", range: "0-16 (0:No init / 2:2-wire 60Hz 230/460/690V / 4:2-wire 50Hz 220/380V / 6:3-wire 60Hz 230/460/690V / 8:3-wire 50Hz 220/380V / 10:Customized / 12:2-wire 50Hz 200/400V / 14:3-wire 50Hz 200/400V / 16:3-wire 50Hz 220/380V)", default: "0", unit: "-", page: p468 }),
  "13-09": p(GROUP_13_Maintenance_Parameters._13_09, { group, code: "13-09", name: "Fault History Clearance Function", range: "0-1 (0:No clearing / 1:Clear)", default: "0", unit: "-", page: p469 }),
  "13-10": p(GROUP_13_Maintenance_Parameters._13_10, { group, code: "13-10", name: "Parameter Password Function 2", range: "0~9999", default: "0", unit: "-", page: p469 }),
  "13-11": p(GROUP_13_Maintenance_Parameters._13_11, { group, code: "13-11", name: "C/B CPLD Ver.", range: "0.00~9.99", default: "-", unit: "-", page: p469 }),
  "13-12": p(GROUP_13_Maintenance_Parameters._13_12, { group, code: "13-12", name: "PG Card Id", range: "0~255", default: "0", unit: "-", page: p469 }),
  "13-13": p(GROUP_13_Maintenance_Parameters._13_13, { group, code: "13-13", name: "PG Card Ver.", range: "0.00~9.99", default: "-", unit: "-", page: p469 }),
  "13-14": p(GROUP_13_Maintenance_Parameters._13_14, { group, code: "13-14", name: "Fault Storage Selections", range: "0-1 (0:Auto restart not saved / 1:Auto restart saved)", default: "0", unit: "-", page: p469 }),
  "13-15": p(GROUP_13_Maintenance_Parameters._13_15, { group, code: "13-15", name: "Reserved", range: "-", default: "-", unit: "-", page: p469 }),
  "13-21": p(GROUP_13_Maintenance_Parameters._13_21, { group, code: "13-21", name: "Last time Fault History", range: "read-only", default: "-", unit: "-", page: p469 }),
  "13-22": p(GROUP_13_Maintenance_Parameters._13_22, { group, code: "13-22", name: "Previous two Fault History", range: "read-only", default: "-", unit: "-", page: p469 }),
  "13-23": p(GROUP_13_Maintenance_Parameters._13_23, { group, code: "13-23", name: "Previous three Fault History", range: "read-only", default: "-", unit: "-", page: p469 }),
  "13-24": p(GROUP_13_Maintenance_Parameters._13_24, { group, code: "13-24", name: "Previous four Fault History", range: "read-only", default: "-", unit: "-", page: p469 }),
  "13-25": p(GROUP_13_Maintenance_Parameters._13_25, { group, code: "13-25", name: "Previous five Fault History", range: "read-only", default: "-", unit: "-", page: p469 }),
  "13-26": p(GROUP_13_Maintenance_Parameters._13_26, { group, code: "13-26", name: "Previous six Fault History", range: "read-only", default: "-", unit: "-", page: p469 }),
  "13-27": p(GROUP_13_Maintenance_Parameters._13_27, { group, code: "13-27", name: "Previous seven Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-28": p(GROUP_13_Maintenance_Parameters._13_28, { group, code: "13-28", name: "Previous eight Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-29": p(GROUP_13_Maintenance_Parameters._13_29, { group, code: "13-29", name: "Previous nine Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-30": p(GROUP_13_Maintenance_Parameters._13_30, { group, code: "13-30", name: "Previous ten Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-31": p(GROUP_13_Maintenance_Parameters._13_31, { group, code: "13-31", name: "Previous eleven Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-32": p(GROUP_13_Maintenance_Parameters._13_32, { group, code: "13-32", name: "Previous twelve Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-33": p(GROUP_13_Maintenance_Parameters._13_33, { group, code: "13-33", name: "Previous thirteen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-34": p(GROUP_13_Maintenance_Parameters._13_34, { group, code: "13-34", name: "Previous fourteen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-35": p(GROUP_13_Maintenance_Parameters._13_35, { group, code: "13-35", name: "Previous fifteen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-36": p(GROUP_13_Maintenance_Parameters._13_36, { group, code: "13-36", name: "Previous sixteen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-37": p(GROUP_13_Maintenance_Parameters._13_37, { group, code: "13-37", name: "Previous seventeen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-38": p(GROUP_13_Maintenance_Parameters._13_38, { group, code: "13-38", name: "Previous eighteen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-39": p(GROUP_13_Maintenance_Parameters._13_39, { group, code: "13-39", name: "Previous nineteen Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-40": p(GROUP_13_Maintenance_Parameters._13_40, { group, code: "13-40", name: "Previous twenty Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-41": p(GROUP_13_Maintenance_Parameters._13_41, { group, code: "13-41", name: "Previous twenty one Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-42": p(GROUP_13_Maintenance_Parameters._13_42, { group, code: "13-42", name: "Previous twenty two Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-43": p(GROUP_13_Maintenance_Parameters._13_43, { group, code: "13-43", name: "Previous twenty three Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-44": p(GROUP_13_Maintenance_Parameters._13_44, { group, code: "13-44", name: "Previous twenty four Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-45": p(GROUP_13_Maintenance_Parameters._13_45, { group, code: "13-45", name: "Previous twenty five Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-46": p(GROUP_13_Maintenance_Parameters._13_46, { group, code: "13-46", name: "Previous twenty six Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-47": p(GROUP_13_Maintenance_Parameters._13_47, { group, code: "13-47", name: "Previous twenty seven Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-48": p(GROUP_13_Maintenance_Parameters._13_48, { group, code: "13-48", name: "Previous twenty eight Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-49": p(GROUP_13_Maintenance_Parameters._13_49, { group, code: "13-49", name: "Previous twenty nine Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
  "13-50": p(GROUP_13_Maintenance_Parameters._13_50, { group, code: "13-50", name: "Previous thirty Fault History", range: "read-only", default: "-", unit: "-", page: p470 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_13_00 = em("13-00").schema as Schema.Schema<any, any>
export const decode13_00 = em("13-00").decode
export const encode13_00 = em("13-00").encode
export const formatted13_00 = em("13-00").formatted

export const Param_13_01 = em("13-01").schema as Schema.Schema<any, any>
export const decode13_01 = em("13-01").decode
export const encode13_01 = em("13-01").encode
export const formatted13_01 = em("13-01").formatted

export const Param_13_02 = em("13-02").schema as Schema.Schema<any, any>
export const decode13_02 = em("13-02").decode
export const encode13_02 = em("13-02").encode
export const formatted13_02 = em("13-02").formatted

export const Param_13_03 = em("13-03").schema as Schema.Schema<any, any>
export const decode13_03 = em("13-03").decode
export const encode13_03 = em("13-03").encode
export const formatted13_03 = em("13-03").formatted

export const Param_13_04 = em("13-04").schema as Schema.Schema<any, any>
export const decode13_04 = em("13-04").decode
export const encode13_04 = em("13-04").encode
export const formatted13_04 = em("13-04").formatted

export const Param_13_05 = em("13-05").schema as Schema.Schema<any, any>
export const decode13_05 = em("13-05").decode
export const encode13_05 = em("13-05").encode
export const formatted13_05 = em("13-05").formatted

export const Param_13_06 = em("13-06").schema as Schema.Schema<any, any>
export const decode13_06 = em("13-06").decode
export const encode13_06 = em("13-06").encode
export const formatted13_06 = em("13-06").formatted

export const Param_13_07 = em("13-07").schema as Schema.Schema<any, any>
export const decode13_07 = em("13-07").decode
export const encode13_07 = em("13-07").encode
export const formatted13_07 = em("13-07").formatted

export const Param_13_08 = em("13-08").schema as Schema.Schema<any, any>
export const decode13_08 = em("13-08").decode
export const encode13_08 = em("13-08").encode
export const formatted13_08 = em("13-08").formatted

export const Param_13_09 = em("13-09").schema as Schema.Schema<any, any>
export const decode13_09 = em("13-09").decode
export const encode13_09 = em("13-09").encode
export const formatted13_09 = em("13-09").formatted

export const Param_13_10 = em("13-10").schema as Schema.Schema<any, any>
export const decode13_10 = em("13-10").decode
export const encode13_10 = em("13-10").encode
export const formatted13_10 = em("13-10").formatted

export const Param_13_11 = em("13-11").schema as Schema.Schema<any, any>
export const decode13_11 = em("13-11").decode
export const encode13_11 = em("13-11").encode
export const formatted13_11 = em("13-11").formatted

export const Param_13_12 = em("13-12").schema as Schema.Schema<any, any>
export const decode13_12 = em("13-12").decode
export const encode13_12 = em("13-12").encode
export const formatted13_12 = em("13-12").formatted

export const Param_13_13 = em("13-13").schema as Schema.Schema<any, any>
export const decode13_13 = em("13-13").decode
export const encode13_13 = em("13-13").encode
export const formatted13_13 = em("13-13").formatted

export const Param_13_14 = em("13-14").schema as Schema.Schema<any, any>
export const decode13_14 = em("13-14").decode
export const encode13_14 = em("13-14").encode
export const formatted13_14 = em("13-14").formatted

export const Param_13_15 = em("13-15").schema as Schema.Schema<any, any>
export const decode13_15 = em("13-15").decode
export const encode13_15 = em("13-15").encode
export const formatted13_15 = em("13-15").formatted

export const Param_13_21 = em("13-21").schema as Schema.Schema<any, any>
export const decode13_21 = em("13-21").decode
export const encode13_21 = em("13-21").encode
export const formatted13_21 = em("13-21").formatted

export const Param_13_22 = em("13-22").schema as Schema.Schema<any, any>
export const decode13_22 = em("13-22").decode
export const encode13_22 = em("13-22").encode
export const formatted13_22 = em("13-22").formatted

export const Param_13_23 = em("13-23").schema as Schema.Schema<any, any>
export const decode13_23 = em("13-23").decode
export const encode13_23 = em("13-23").encode
export const formatted13_23 = em("13-23").formatted

export const Param_13_24 = em("13-24").schema as Schema.Schema<any, any>
export const decode13_24 = em("13-24").decode
export const encode13_24 = em("13-24").encode
export const formatted13_24 = em("13-24").formatted

export const Param_13_25 = em("13-25").schema as Schema.Schema<any, any>
export const decode13_25 = em("13-25").decode
export const encode13_25 = em("13-25").encode
export const formatted13_25 = em("13-25").formatted

export const Param_13_26 = em("13-26").schema as Schema.Schema<any, any>
export const decode13_26 = em("13-26").decode
export const encode13_26 = em("13-26").encode
export const formatted13_26 = em("13-26").formatted

export const Param_13_27 = em("13-27").schema as Schema.Schema<any, any>
export const decode13_27 = em("13-27").decode
export const encode13_27 = em("13-27").encode
export const formatted13_27 = em("13-27").formatted

export const Param_13_28 = em("13-28").schema as Schema.Schema<any, any>
export const decode13_28 = em("13-28").decode
export const encode13_28 = em("13-28").encode
export const formatted13_28 = em("13-28").formatted

export const Param_13_29 = em("13-29").schema as Schema.Schema<any, any>
export const decode13_29 = em("13-29").decode
export const encode13_29 = em("13-29").encode
export const formatted13_29 = em("13-29").formatted

export const Param_13_30 = em("13-30").schema as Schema.Schema<any, any>
export const decode13_30 = em("13-30").decode
export const encode13_30 = em("13-30").encode
export const formatted13_30 = em("13-30").formatted

export const Param_13_31 = em("13-31").schema as Schema.Schema<any, any>
export const decode13_31 = em("13-31").decode
export const encode13_31 = em("13-31").encode
export const formatted13_31 = em("13-31").formatted

export const Param_13_32 = em("13-32").schema as Schema.Schema<any, any>
export const decode13_32 = em("13-32").decode
export const encode13_32 = em("13-32").encode
export const formatted13_32 = em("13-32").formatted

export const Param_13_33 = em("13-33").schema as Schema.Schema<any, any>
export const decode13_33 = em("13-33").decode
export const encode13_33 = em("13-33").encode
export const formatted13_33 = em("13-33").formatted

export const Param_13_34 = em("13-34").schema as Schema.Schema<any, any>
export const decode13_34 = em("13-34").decode
export const encode13_34 = em("13-34").encode
export const formatted13_34 = em("13-34").formatted

export const Param_13_35 = em("13-35").schema as Schema.Schema<any, any>
export const decode13_35 = em("13-35").decode
export const encode13_35 = em("13-35").encode
export const formatted13_35 = em("13-35").formatted

export const Param_13_36 = em("13-36").schema as Schema.Schema<any, any>
export const decode13_36 = em("13-36").decode
export const encode13_36 = em("13-36").encode
export const formatted13_36 = em("13-36").formatted

export const Param_13_37 = em("13-37").schema as Schema.Schema<any, any>
export const decode13_37 = em("13-37").decode
export const encode13_37 = em("13-37").encode
export const formatted13_37 = em("13-37").formatted

export const Param_13_38 = em("13-38").schema as Schema.Schema<any, any>
export const decode13_38 = em("13-38").decode
export const encode13_38 = em("13-38").encode
export const formatted13_38 = em("13-38").formatted

export const Param_13_39 = em("13-39").schema as Schema.Schema<any, any>
export const decode13_39 = em("13-39").decode
export const encode13_39 = em("13-39").encode
export const formatted13_39 = em("13-39").formatted

export const Param_13_40 = em("13-40").schema as Schema.Schema<any, any>
export const decode13_40 = em("13-40").decode
export const encode13_40 = em("13-40").encode
export const formatted13_40 = em("13-40").formatted

export const Param_13_41 = em("13-41").schema as Schema.Schema<any, any>
export const decode13_41 = em("13-41").decode
export const encode13_41 = em("13-41").encode
export const formatted13_41 = em("13-41").formatted

export const Param_13_42 = em("13-42").schema as Schema.Schema<any, any>
export const decode13_42 = em("13-42").decode
export const encode13_42 = em("13-42").encode
export const formatted13_42 = em("13-42").formatted

export const Param_13_43 = em("13-43").schema as Schema.Schema<any, any>
export const decode13_43 = em("13-43").decode
export const encode13_43 = em("13-43").encode
export const formatted13_43 = em("13-43").formatted

export const Param_13_44 = em("13-44").schema as Schema.Schema<any, any>
export const decode13_44 = em("13-44").decode
export const encode13_44 = em("13-44").encode
export const formatted13_44 = em("13-44").formatted

export const Param_13_45 = em("13-45").schema as Schema.Schema<any, any>
export const decode13_45 = em("13-45").decode
export const encode13_45 = em("13-45").encode
export const formatted13_45 = em("13-45").formatted

export const Param_13_46 = em("13-46").schema as Schema.Schema<any, any>
export const decode13_46 = em("13-46").decode
export const encode13_46 = em("13-46").encode
export const formatted13_46 = em("13-46").formatted

export const Param_13_47 = em("13-47").schema as Schema.Schema<any, any>
export const decode13_47 = em("13-47").decode
export const encode13_47 = em("13-47").encode
export const formatted13_47 = em("13-47").formatted

export const Param_13_48 = em("13-48").schema as Schema.Schema<any, any>
export const decode13_48 = em("13-48").decode
export const encode13_48 = em("13-48").encode
export const formatted13_48 = em("13-48").formatted

export const Param_13_49 = em("13-49").schema as Schema.Schema<any, any>
export const decode13_49 = em("13-49").decode
export const encode13_49 = em("13-49").encode
export const formatted13_49 = em("13-49").formatted

export const Param_13_50 = em("13-50").schema as Schema.Schema<any, any>
export const decode13_50 = em("13-50").decode
export const encode13_50 = em("13-50").encode
export const formatted13_50 = em("13-50").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group13Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group13Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
