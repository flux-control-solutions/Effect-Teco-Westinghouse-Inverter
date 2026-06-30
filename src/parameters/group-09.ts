/**
 * Group 09: Communication Parameters
 * Manual pages 4-52
 */

import * as P from "./param-utils";
import { GROUP_09_Communication_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 9 as const;
const p452 = 452 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 09-00 INV Communication Station Address — Range: 1~31, Default: 1, Manual p.4-52 */
export const Param_09_00 = P.makeParam(GROUP_09_Communication_Parameters._09_00, {
  group, code: "09-00", name: "INV Communication Station Address",
  range: "1~31", default: "1", unit: "-", page: p452,
})

/** @param 09-01 Communication Mode Selection — Range: 0 (MODBUS), Default: 0, Manual p.4-52 */
export const Param_09_01 = P.makeParam(GROUP_09_Communication_Parameters._09_01, {
  group, code: "09-01", name: "Communication Mode Selection",
  range: "0 (MODBUS)", default: "0", unit: "-", page: p452,
})

/** @param 09-02 Baud Rate Setting (bps) — Range: 0-5, Default: 4, Manual p.4-52 */
export const Param_09_02 = P.makeParam(GROUP_09_Communication_Parameters._09_02, {
  group, code: "09-02", name: "Baud Rate Setting (bps)",
  range: "0-5 (0:1200 / 1:2400 / 2:4800 / 3:9600 / 4:19200 / 5:38400)", default: "4", unit: "-", page: p452,
})

/** @param 09-03 Stop Bit Selection — Range: 0-1, Default: 0, Manual p.4-52 */
export const Param_09_03 = P.makeParam(GROUP_09_Communication_Parameters._09_03, {
  group, code: "09-03", name: "Stop Bit Selection",
  range: "0-1 (0:1 StopBit / 1:2 StopBit)", default: "0", unit: "-", page: p452,
})

/** @param 09-04 Parity Selection — Range: 0-2, Default: 0, Manual p.4-52 */
export const Param_09_04 = P.makeParam(GROUP_09_Communication_Parameters._09_04, {
  group, code: "09-04", name: "Parity Selection",
  range: "0-2 (0:No Parity / 1:Even Bit / 2:Odd Bit)", default: "0", unit: "-", page: p452,
})

/** @param 09-05 Communication DataBit Selection — Range: 0-1, Default: 0, Manual p.4-52 */
export const Param_09_05 = P.makeParam(GROUP_09_Communication_Parameters._09_05, {
  group, code: "09-05", name: "Communication DataBit Selection",
  range: "0-1 (0:8 Bit Data / 1:7 Bit Data)", default: "0", unit: "-", page: p452,
})

/** @param 09-07 Fault Stop Selection — Range: 0-3, Default: 3, Manual p.4-52 */
export const Param_09_07 = P.makeParam(GROUP_09_Communication_Parameters._09_07, {
  group, code: "09-07", name: "Fault Stop Selection",
  range: "0-3 (0:Decel stop DT1 / 1:Coast stop / 2:Decel stop DT2 / 3:Keep operating)", default: "3", unit: "-", page: p452,
})

/** @param 09-08 Comm. Fault Tolerance Count — Range: 1~20, Default: 1, Manual p.4-52 */
export const Param_09_08 = P.makeParam(GROUP_09_Communication_Parameters._09_08, {
  group, code: "09-08", name: "Comm. Fault Tolerance Count",
  range: "1~20", default: "1", unit: "-", page: p452,
})

/** @param 09-09 Waiting Time — Range: 5~65, Default: 5, Unit: ms, Manual p.4-52 */
export const Param_09_09 = P.makeParam(GROUP_09_Communication_Parameters._09_09, {
  group, code: "09-09", name: "Waiting Time",
  range: "5~65", default: "5", unit: "ms", page: p452,
})

// ── Scaled (×0.1) parameters ───────────────────────────────

/** @param 09-06 Communication Error Detection Time — Range: 0.0~25.5, Default: 0.0, Unit: S, Manual p.4-52 */
export const Param_09_06 = P.makeScaledParam(GROUP_09_Communication_Parameters._09_06, 0.1, {
  group, code: "09-06", name: "Communication Error Detection Time",
  range: "0.0~25.5", default: "0.0", unit: "S", page: p452,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode09_00 = P.makeDecode(Param_09_00)
export const encode09_00 = P.makeEncode(Param_09_00)
export const formatted09_00 = P.makeFormatted(Param_09_00)

export const decode09_01 = P.makeDecode(Param_09_01)
export const encode09_01 = P.makeEncode(Param_09_01)
export const formatted09_01 = P.makeFormatted(Param_09_01)

export const decode09_02 = P.makeDecode(Param_09_02)
export const encode09_02 = P.makeEncode(Param_09_02)
export const formatted09_02 = P.makeFormatted(Param_09_02)

export const decode09_03 = P.makeDecode(Param_09_03)
export const encode09_03 = P.makeEncode(Param_09_03)
export const formatted09_03 = P.makeFormatted(Param_09_03)

export const decode09_04 = P.makeDecode(Param_09_04)
export const encode09_04 = P.makeEncode(Param_09_04)
export const formatted09_04 = P.makeFormatted(Param_09_04)

export const decode09_05 = P.makeDecode(Param_09_05)
export const encode09_05 = P.makeEncode(Param_09_05)
export const formatted09_05 = P.makeFormatted(Param_09_05)

export const decode09_06 = P.makeDecode(Param_09_06)
export const encode09_06 = P.makeEncode(Param_09_06)
export const formatted09_06 = P.makeFormatted(Param_09_06)

export const decode09_07 = P.makeDecode(Param_09_07)
export const encode09_07 = P.makeEncode(Param_09_07)
export const formatted09_07 = P.makeFormatted(Param_09_07)

export const decode09_08 = P.makeDecode(Param_09_08)
export const encode09_08 = P.makeEncode(Param_09_08)
export const formatted09_08 = P.makeFormatted(Param_09_08)

export const decode09_09 = P.makeDecode(Param_09_09)
export const encode09_09 = P.makeEncode(Param_09_09)
export const formatted09_09 = P.makeFormatted(Param_09_09)

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

export const group09Params: Record<string, ParamEntry> = {
  "09-00": param(Param_09_00, decode09_00, encode09_00),
  "09-01": param(Param_09_01, decode09_01, encode09_01),
  "09-02": param(Param_09_02, decode09_02, encode09_02),
  "09-03": param(Param_09_03, decode09_03, encode09_03),
  "09-04": param(Param_09_04, decode09_04, encode09_04),
  "09-05": param(Param_09_05, decode09_05, encode09_05),
  "09-06": param(Param_09_06, decode09_06, encode09_06),
  "09-07": param(Param_09_07, decode09_07, encode09_07),
  "09-08": param(Param_09_08, decode09_08, encode09_08),
  "09-09": param(Param_09_09, decode09_09, encode09_09),
}
