/**
 * Group 16: LCD Function Parameters
 * Manual pages 4-74 to 4-77
 */

import * as P from "./param-utils";
import { GROUP_16_LCD_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 16 as const;
const p474 = 474 as const;
const p475 = 475 as const;
const p476 = 476 as const;
const p477 = 477 as const;

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
  "16-00": p(GROUP_16_LCD_Parameters._16_00, { group, code: "16-00", name: "Main Screen Monitoring", range: "5~82", default: "16", unit: "-", page: p474 }),
  "16-01": p(GROUP_16_LCD_Parameters._16_01, { group, code: "16-01", name: "Sub-Screen Monitoring 1", range: "5~82", default: "17", unit: "-", page: p474 }),
  "16-02": p(GROUP_16_LCD_Parameters._16_02, { group, code: "16-02", name: "Sub-Screen Monitoring 2", range: "5~82", default: "18", unit: "-", page: p474 }),
  "16-03": p(GROUP_16_LCD_Parameters._16_03, { group, code: "16-03", name: "Display Unit", range: "0~39999 (0:0.01Hz / 1:0.01% / 2:rpm / 40~9999:XXXX at 100% / 10001~19999:XXX.X / 20001~29999:XX.XX / 30001~39999:X.XXX)", default: "0", unit: "-", page: p474 }),
  "16-04": p(GROUP_16_LCD_Parameters._16_04, { group, code: "16-04", name: "Engineering Unit", range: "0~24 (0:none / 1:FPM / 2:CFM / 3:PSI / 4:GPH / 5:GPM / 6:IN / 7:FT / 8:/s / 9:/m / 10:/h / 11:°F / 12:inW / 13:HP / 14:m/s / 15:MPM / 16:CMM / 17:W / 18:KW / 19:m / 20:°C / 21:RPM / 22:Bar / 23:Pa / 24:KPa)", default: "0", unit: "-", page: p474 }),
  "16-05": p(GROUP_16_LCD_Parameters._16_05, { group, code: "16-05", name: "LCD Backlight", range: "0~7", default: "5", unit: "-", page: p475 }),
  "16-07": p(GROUP_16_LCD_Parameters._16_07, { group, code: "16-07", name: "Copy Function Selection", range: "0-3 (0:Do not copy / 1:Read to operator / 2:Write to inverter / 3:Compare)", default: "0", unit: "-", page: p475 }),
  "16-08": p(GROUP_16_LCD_Parameters._16_08, { group, code: "16-08", name: "Selection of Allowing Reading", range: "0-1 (0:Not allow / 1:Allow)", default: "0", unit: "-", page: p475 }),
  "16-09": p(GROUP_16_LCD_Parameters._16_09, { group, code: "16-09", name: "Selection of Operator Removed (LCD)", range: "0-1 (0:Keep operating / 1:Display fault)", default: "0", unit: "-", page: p475 }),
  "16-10": p(GROUP_16_LCD_Parameters._16_10, { group, code: "16-10", name: "RTC Time Display Setting", range: "0-1 (0:Hide / 1:Display)", default: "0", unit: "-", page: p475 }),
  "16-11": p(GROUP_16_LCD_Parameters._16_11, { group, code: "16-11", name: "RTC Date Setting", range: "12.01.01~99.12.31", default: "12.01.01", unit: "-", page: p475 }),
  "16-12": p(GROUP_16_LCD_Parameters._16_12, { group, code: "16-12", name: "RTC Time Setting", range: "00:00~23:59", default: "00:00", unit: "-", page: p475 }),
  "16-13": p(GROUP_16_LCD_Parameters._16_13, { group, code: "16-13", name: "RTC Timer Function", range: "0-2 (0:Disable / 1:Enable / 2:Set by DI)", default: "0", unit: "-", page: p475 }),
  "16-14": p(GROUP_16_LCD_Parameters._16_14, { group, code: "16-14", name: "P1 Start Time", range: "00:00~23:59", default: "08:00", unit: "-", page: p475 }),
  "16-15": p(GROUP_16_LCD_Parameters._16_15, { group, code: "16-15", name: "P1 Stop Time", range: "00:00~23:59", default: "18:00", unit: "-", page: p475 }),
  "16-16": p(GROUP_16_LCD_Parameters._16_16, { group, code: "16-16", name: "P1 Start Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "1", unit: "-", page: p475 }),
  "16-17": p(GROUP_16_LCD_Parameters._16_17, { group, code: "16-17", name: "P1 Stop Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "5", unit: "-", page: p475 }),
  "16-18": p(GROUP_16_LCD_Parameters._16_18, { group, code: "16-18", name: "P2 Start Time", range: "00:00~23:59", default: "08:00", unit: "-", page: p475 }),
  "16-19": p(GROUP_16_LCD_Parameters._16_19, { group, code: "16-19", name: "P2 Stop Time", range: "00:00~23:59", default: "18:00", unit: "-", page: p475 }),
  "16-20": p(GROUP_16_LCD_Parameters._16_20, { group, code: "16-20", name: "P2 Start Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "1", unit: "-", page: p475 }),
  "16-21": p(GROUP_16_LCD_Parameters._16_21, { group, code: "16-21", name: "P2 Stop Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "5", unit: "-", page: p476 }),
  "16-22": p(GROUP_16_LCD_Parameters._16_22, { group, code: "16-22", name: "P3 Start Time", range: "00:00~23:59", default: "08:00", unit: "-", page: p476 }),
  "16-23": p(GROUP_16_LCD_Parameters._16_23, { group, code: "16-23", name: "P3 Stop Time", range: "00:00~23:59", default: "18:00", unit: "-", page: p476 }),
  "16-24": p(GROUP_16_LCD_Parameters._16_24, { group, code: "16-24", name: "P3 Start Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "1", unit: "-", page: p476 }),
  "16-25": p(GROUP_16_LCD_Parameters._16_25, { group, code: "16-25", name: "P3 Stop Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "5", unit: "-", page: p476 }),
  "16-26": p(GROUP_16_LCD_Parameters._16_26, { group, code: "16-26", name: "P4 Start Time", range: "00:00~23:59", default: "08:00", unit: "-", page: p476 }),
  "16-27": p(GROUP_16_LCD_Parameters._16_27, { group, code: "16-27", name: "P4 Stop Time", range: "00:00~23:59", default: "18:00", unit: "-", page: p476 }),
  "16-28": p(GROUP_16_LCD_Parameters._16_28, { group, code: "16-28", name: "P4 Start Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "1", unit: "-", page: p476 }),
  "16-29": p(GROUP_16_LCD_Parameters._16_29, { group, code: "16-29", name: "P4 Stop Date", range: "1-7 (1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat 7:Sun)", default: "5", unit: "-", page: p476 }),
  "16-30": p(GROUP_16_LCD_Parameters._16_30, { group, code: "16-30", name: "Selection of RTC Offset", range: "0-2 (0:Disable / 1:Enable / 2:Set by DI)", default: "0", unit: "-", page: p476 }),
  "16-31": p(GROUP_16_LCD_Parameters._16_31, { group, code: "16-31", name: "RTC Offset Time Setting", range: "00:00~23:59", default: "00:00", unit: "-", page: p476 }),
  "16-32": p(GROUP_16_LCD_Parameters._16_32, { group, code: "16-32", name: "Source of Timer 1", range: "0-31 (bit-field: 0:None / 1:P1 / 2:P2 / 4:P3 / 8:P4 / ... / 31:Off+P1+P2+P3+P4)", default: "1", unit: "-", page: p476 }),
  "16-33": p(GROUP_16_LCD_Parameters._16_33, { group, code: "16-33", name: "Source of Timer 2", range: "0-31 (bit-field: 0:None / 1:P1 / 2:P2 / 4:P3 / 8:P4 / ... / 31:Off+P1+P2+P3+P4)", default: "2", unit: "-", page: p476 }),
  "16-34": p(GROUP_16_LCD_Parameters._16_34, { group, code: "16-34", name: "Source of Timer 3", range: "0-31 (bit-field: 0:None / 1:P1 / 2:P2 / 4:P3 / 8:P4 / ... / 31:Off+P1+P2+P3+P4)", default: "4", unit: "-", page: p476 }),
  "16-35": p(GROUP_16_LCD_Parameters._16_35, { group, code: "16-35", name: "Source of Timer 4", range: "0-31 (bit-field: 0:None / 1:P1 / 2:P2 / 4:P3 / 8:P4 / ... / 31:Off+P1+P2+P3+P4)", default: "8", unit: "-", page: p476 }),
  "16-36": p(GROUP_16_LCD_Parameters._16_36, { group, code: "16-36", name: "Selection of RTC Speed", range: "0-5 (0:Off / 1:Timer1 / 2:Timer2 / 3:Timer3 / 4:Timer4 / 5:Timer1+2)", default: "0", unit: "-", page: p477 }),
  "16-37": p(GROUP_16_LCD_Parameters._16_37, { group, code: "16-37", name: "Selection of RTC Rotation Direction", range: "0~15 (bit-field for direction)", default: "0000b", unit: "-", page: p477 }),
}

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!
const em = (code: string) => e(code)

export const Param_16_00 = em("16-00").schema as Schema.Schema<any, any>
export const decode16_00 = em("16-00").decode
export const encode16_00 = em("16-00").encode
export const formatted16_00 = em("16-00").formatted

export const Param_16_01 = em("16-01").schema as Schema.Schema<any, any>
export const decode16_01 = em("16-01").decode
export const encode16_01 = em("16-01").encode
export const formatted16_01 = em("16-01").formatted

export const Param_16_02 = em("16-02").schema as Schema.Schema<any, any>
export const decode16_02 = em("16-02").decode
export const encode16_02 = em("16-02").encode
export const formatted16_02 = em("16-02").formatted

export const Param_16_03 = em("16-03").schema as Schema.Schema<any, any>
export const decode16_03 = em("16-03").decode
export const encode16_03 = em("16-03").encode
export const formatted16_03 = em("16-03").formatted

export const Param_16_04 = em("16-04").schema as Schema.Schema<any, any>
export const decode16_04 = em("16-04").decode
export const encode16_04 = em("16-04").encode
export const formatted16_04 = em("16-04").formatted

export const Param_16_05 = em("16-05").schema as Schema.Schema<any, any>
export const decode16_05 = em("16-05").decode
export const encode16_05 = em("16-05").encode
export const formatted16_05 = em("16-05").formatted

export const Param_16_07 = em("16-07").schema as Schema.Schema<any, any>
export const decode16_07 = em("16-07").decode
export const encode16_07 = em("16-07").encode
export const formatted16_07 = em("16-07").formatted

export const Param_16_08 = em("16-08").schema as Schema.Schema<any, any>
export const decode16_08 = em("16-08").decode
export const encode16_08 = em("16-08").encode
export const formatted16_08 = em("16-08").formatted

export const Param_16_09 = em("16-09").schema as Schema.Schema<any, any>
export const decode16_09 = em("16-09").decode
export const encode16_09 = em("16-09").encode
export const formatted16_09 = em("16-09").formatted

export const Param_16_10 = em("16-10").schema as Schema.Schema<any, any>
export const decode16_10 = em("16-10").decode
export const encode16_10 = em("16-10").encode
export const formatted16_10 = em("16-10").formatted

export const Param_16_11 = em("16-11").schema as Schema.Schema<any, any>
export const decode16_11 = em("16-11").decode
export const encode16_11 = em("16-11").encode
export const formatted16_11 = em("16-11").formatted

export const Param_16_12 = em("16-12").schema as Schema.Schema<any, any>
export const decode16_12 = em("16-12").decode
export const encode16_12 = em("16-12").encode
export const formatted16_12 = em("16-12").formatted

export const Param_16_13 = em("16-13").schema as Schema.Schema<any, any>
export const decode16_13 = em("16-13").decode
export const encode16_13 = em("16-13").encode
export const formatted16_13 = em("16-13").formatted

export const Param_16_14 = em("16-14").schema as Schema.Schema<any, any>
export const decode16_14 = em("16-14").decode
export const encode16_14 = em("16-14").encode
export const formatted16_14 = em("16-14").formatted

export const Param_16_15 = em("16-15").schema as Schema.Schema<any, any>
export const decode16_15 = em("16-15").decode
export const encode16_15 = em("16-15").encode
export const formatted16_15 = em("16-15").formatted

export const Param_16_16 = em("16-16").schema as Schema.Schema<any, any>
export const decode16_16 = em("16-16").decode
export const encode16_16 = em("16-16").encode
export const formatted16_16 = em("16-16").formatted

export const Param_16_17 = em("16-17").schema as Schema.Schema<any, any>
export const decode16_17 = em("16-17").decode
export const encode16_17 = em("16-17").encode
export const formatted16_17 = em("16-17").formatted

export const Param_16_18 = em("16-18").schema as Schema.Schema<any, any>
export const decode16_18 = em("16-18").decode
export const encode16_18 = em("16-18").encode
export const formatted16_18 = em("16-18").formatted

export const Param_16_19 = em("16-19").schema as Schema.Schema<any, any>
export const decode16_19 = em("16-19").decode
export const encode16_19 = em("16-19").encode
export const formatted16_19 = em("16-19").formatted

export const Param_16_20 = em("16-20").schema as Schema.Schema<any, any>
export const decode16_20 = em("16-20").decode
export const encode16_20 = em("16-20").encode
export const formatted16_20 = em("16-20").formatted

export const Param_16_21 = em("16-21").schema as Schema.Schema<any, any>
export const decode16_21 = em("16-21").decode
export const encode16_21 = em("16-21").encode
export const formatted16_21 = em("16-21").formatted

export const Param_16_22 = em("16-22").schema as Schema.Schema<any, any>
export const decode16_22 = em("16-22").decode
export const encode16_22 = em("16-22").encode
export const formatted16_22 = em("16-22").formatted

export const Param_16_23 = em("16-23").schema as Schema.Schema<any, any>
export const decode16_23 = em("16-23").decode
export const encode16_23 = em("16-23").encode
export const formatted16_23 = em("16-23").formatted

export const Param_16_24 = em("16-24").schema as Schema.Schema<any, any>
export const decode16_24 = em("16-24").decode
export const encode16_24 = em("16-24").encode
export const formatted16_24 = em("16-24").formatted

export const Param_16_25 = em("16-25").schema as Schema.Schema<any, any>
export const decode16_25 = em("16-25").decode
export const encode16_25 = em("16-25").encode
export const formatted16_25 = em("16-25").formatted

export const Param_16_26 = em("16-26").schema as Schema.Schema<any, any>
export const decode16_26 = em("16-26").decode
export const encode16_26 = em("16-26").encode
export const formatted16_26 = em("16-26").formatted

export const Param_16_27 = em("16-27").schema as Schema.Schema<any, any>
export const decode16_27 = em("16-27").decode
export const encode16_27 = em("16-27").encode
export const formatted16_27 = em("16-27").formatted

export const Param_16_28 = em("16-28").schema as Schema.Schema<any, any>
export const decode16_28 = em("16-28").decode
export const encode16_28 = em("16-28").encode
export const formatted16_28 = em("16-28").formatted

export const Param_16_29 = em("16-29").schema as Schema.Schema<any, any>
export const decode16_29 = em("16-29").decode
export const encode16_29 = em("16-29").encode
export const formatted16_29 = em("16-29").formatted

export const Param_16_30 = em("16-30").schema as Schema.Schema<any, any>
export const decode16_30 = em("16-30").decode
export const encode16_30 = em("16-30").encode
export const formatted16_30 = em("16-30").formatted

export const Param_16_31 = em("16-31").schema as Schema.Schema<any, any>
export const decode16_31 = em("16-31").decode
export const encode16_31 = em("16-31").encode
export const formatted16_31 = em("16-31").formatted

export const Param_16_32 = em("16-32").schema as Schema.Schema<any, any>
export const decode16_32 = em("16-32").decode
export const encode16_32 = em("16-32").encode
export const formatted16_32 = em("16-32").formatted

export const Param_16_33 = em("16-33").schema as Schema.Schema<any, any>
export const decode16_33 = em("16-33").decode
export const encode16_33 = em("16-33").encode
export const formatted16_33 = em("16-33").formatted

export const Param_16_34 = em("16-34").schema as Schema.Schema<any, any>
export const decode16_34 = em("16-34").decode
export const encode16_34 = em("16-34").encode
export const formatted16_34 = em("16-34").formatted

export const Param_16_35 = em("16-35").schema as Schema.Schema<any, any>
export const decode16_35 = em("16-35").decode
export const encode16_35 = em("16-35").encode
export const formatted16_35 = em("16-35").formatted

export const Param_16_36 = em("16-36").schema as Schema.Schema<any, any>
export const decode16_36 = em("16-36").decode
export const encode16_36 = em("16-36").encode
export const formatted16_36 = em("16-36").formatted

export const Param_16_37 = em("16-37").schema as Schema.Schema<any, any>
export const decode16_37 = em("16-37").decode
export const encode16_37 = em("16-37").encode
export const formatted16_37 = em("16-37").formatted

// ── Group-level lookup ─────────────────────────────────────

export const group16Params: Record<string, ParamEntry> = {}

for (const [code, entry] of Object.entries(all)) {
  group16Params[code] = { schema: entry.schema, decode: entry.decode, encode: entry.encode }
}
