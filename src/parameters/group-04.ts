/**
 * Group 04: External Analog Input and Output Parameters
 * Manual pages 4-34 to 4-36
 *
 * Parameter                                | Range                        | Default       | Unit | Page
 * 04-00  AI Input Signal Type              | 0-5                          | 1             | -    | 4-34
 * 04-01  AI1 Signal Scanning/Filtering     | 0.00~2.00                   | 0.03          | s    | 4-34
 * 04-02  AI1 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-34
 * 04-03  AI1 Bias                          | -100.0~100.0                | 0             | %    | 4-34
 * 04-04  Negative AI                       | 0-1                         | 0             | -    | 4-34
 * 04-05  AI2 Function Setting              | 0-17                        | 0             | -    | 4-34
 * 04-06  AI2 Signal Scanning/Filtering     | 0.00~2.00                   | 0.03          | s    | 4-35
 * 04-07  AI2 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-35
 * 04-08  AI2 Bias                          | -100.0~100.0                | 0             | %    | 4-35
 * 04-09  AI Input Signal Type of I/O card  | 0-2                         | 0             | -    | 4-35
 * 04-10  AI3 Function Setting              | 0-17                        | 10            | -    | 4-35
 * 04-11  AO1 Function Setting              | 0-28                        | 0             | -    | 4-35
 * 04-12  AO1 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-35
 * 04-13  AO1 Bias                          | -100.0~100.0                | 0             | %    | 4-35
 * 04-16  AO2 Function Setting              | 0-28                        | 3             | -    | 4-36
 * 04-17  AO2 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-36
 * 04-18  AO2 Bias                          | -100.0~100.0                | 0             | %    | 4-36
 * 04-19  AO Output Signal Type             | 0-3                         | 0             | -    | 4-36
 * 04-20  Filter Time of AO Signal Scan     | 0.00~0.50                   | 0.00          | s    | 4-36
 * 04-21  AI3 Signal Scanning/Filtering     | 0.00~2.00                   | 0.03          | s    | 4-36
 * 04-22  AI3 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-36
 * 04-23  AI3 Bias                          | -100.0~100.0                | 0             | %    | 4-36
 */

import * as P from "./param-utils";
import { GROUP_04_External_Analog_Input_and_Output_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 4 as const;
const p434 = 434 as const;
const p435 = 435 as const;
const p436 = 436 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 04-00 AI Input Signal Type — Range: 0-5, Default: 1, Manual p.4-34 */
export const Param_04_00 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_00, {
  group, code: "04-00", name: "AI Input Signal Type",
  range: "0-5 (0:AI1 0-10V/AI2 0-10V … 5:AI1 4-20mA/AI2 4-20mA)", default: "1", unit: "-", page: p434,
})

/** @param 04-04 Negative AI — Range: 0-1, Default: 0, Manual p.4-34 */
export const Param_04_04 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_04, {
  group, code: "04-04", name: "Negative AI",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p434,
})

/** @param 04-05 AI2 Function Setting — Range: 0-17, Default: 0, Manual p.4-34 */
export const Param_04_05 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_05, {
  group, code: "04-05", name: "AI2 Function Setting",
  range: "0-17 (0:Aux Freq / 1:Freq Ref Gain / 2:Freq Ref Bias / … / 17:PTC)", default: "0", unit: "-", page: p434,
})

/** @param 04-09 AI Input Signal Type of I/O card — Range: 0-2, Default: 0, Manual p.4-35 */
export const Param_04_09 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_09, {
  group, code: "04-09", name: "AI Input Signal Type of I/O card",
  range: "0-2 (0:AI3 0-10V / 1:AI3 -10-10V / 2:AI3 4-20mA)", default: "0", unit: "-", page: p435,
})

/** @param 04-10 AI3 Function Setting — Range: 0-17 (same as 04-05), Default: 10, Manual p.4-35 */
export const Param_04_10 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_10, {
  group, code: "04-10", name: "AI3 Function Setting",
  range: "0-17 (same as 04-05)", default: "10", unit: "-", page: p435,
})

/** @param 04-11 AO1 Function Setting — Range: 0-28, Default: 0, Manual p.4-35 */
export const Param_04_11 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_11, {
  group, code: "04-11", name: "AO1 Function Setting",
  range: "0-28 (0:Output Freq / 1:Freq Cmd / 2:Output V / … / 28:Comm control)", default: "0", unit: "-", page: p435,
})

/** @param 04-16 AO2 Function Setting — Range: 0-28 (same as 04-11), Default: 3, Manual p.4-36 */
export const Param_04_16 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_16, {
  group, code: "04-16", name: "AO2 Function Setting",
  range: "0-28 (same as 04-11)", default: "3", unit: "-", page: p436,
})

/** @param 04-19 AO Output Signal Type — Range: 0-3, Default: 0, Manual p.4-36 */
export const Param_04_19 = P.makeParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_19, {
  group, code: "04-19", name: "AO Output Signal Type",
  range: "0-3 (0:AO1 0-10V/AO2 0-10V … 3:AO1 4-20mA/AO2 4-20mA)", default: "0", unit: "-", page: p436,
})

// ── Scaled (×0.01) parameters ──────────────────────────────

/** @param 04-01 AI1 Signal Scanning and Filtering Time — Range: 0.00~2.00, Default: 0.03, Unit: s, Manual p.4-34 */
export const Param_04_01 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_01, 0.01, {
  group, code: "04-01", name: "AI1 Signal Scanning and Filtering Time",
  range: "0.00~2.00", default: "0.03", unit: "s", page: p434,
})

/** @param 04-06 AI2 Signal Scanning and Filtering Time — Range: 0.00~2.00, Default: 0.03, Unit: s, Manual p.4-35 */
export const Param_04_06 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_06, 0.01, {
  group, code: "04-06", name: "AI2 Signal Scanning and Filtering Time",
  range: "0.00~2.00", default: "0.03", unit: "s", page: p435,
})

/** @param 04-20 Filter Time of AO Signal Scan — Range: 0.00~0.50, Default: 0.00, Unit: s, Manual p.4-36 */
export const Param_04_20 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_20, 0.01, {
  group, code: "04-20", name: "Filter Time of AO Signal Scan",
  range: "0.00~0.50", default: "0.00", unit: "s", page: p436,
})

/** @param 04-21 AI3 Signal Scanning and Filtering Time — Range: 0.00~2.00, Default: 0.03, Unit: s, Manual p.4-36 */
export const Param_04_21 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_21, 0.01, {
  group, code: "04-21", name: "AI3 Signal Scanning and Filtering Time",
  range: "0.00~2.00", default: "0.03", unit: "s", page: p436,
})

// ── Scaled (×0.1) parameters ───────────────────────────────

/** @param 04-02 AI1 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-34 */
export const Param_04_02 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_02, 0.1, {
  group, code: "04-02", name: "AI1 Gain",
  range: "0.0~1000.0", default: "100.0", unit: "%", page: p434,
})

/** @param 04-07 AI2 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-35 */
export const Param_04_07 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_07, 0.1, {
  group, code: "04-07", name: "AI2 Gain",
  range: "0.0~1000.0", default: "100.0", unit: "%", page: p435,
})

/** @param 04-12 AO1 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-35 */
export const Param_04_12 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_12, 0.1, {
  group, code: "04-12", name: "AO1 Gain",
  range: "0.0~1000.0", default: "100.0", unit: "%", page: p435,
})

/** @param 04-17 AO2 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-36 */
export const Param_04_17 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_17, 0.1, {
  group, code: "04-17", name: "AO2 Gain",
  range: "0.0~1000.0", default: "100.0", unit: "%", page: p436,
})

/** @param 04-22 AI3 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-36 */
export const Param_04_22 = P.makeScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_22, 0.1, {
  group, code: "04-22", name: "AI3 Gain",
  range: "0.0~1000.0", default: "100.0", unit: "%", page: p436,
})

// ── Signed scaled (×0.1) parameters ────────────────────────

/** @param 04-03 AI1 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-34 */
export const Param_04_03 = P.makeSignedScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_03, 0.1, {
  group, code: "04-03", name: "AI1 Bias",
  range: "-100.0~100.0", default: "0", unit: "%", page: p434,
})

/** @param 04-08 AI2 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-35 */
export const Param_04_08 = P.makeSignedScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_08, 0.1, {
  group, code: "04-08", name: "AI2 Bias",
  range: "-100.0~100.0", default: "0", unit: "%", page: p435,
})

/** @param 04-13 AO1 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-35 */
export const Param_04_13 = P.makeSignedScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_13, 0.1, {
  group, code: "04-13", name: "AO1 Bias",
  range: "-100.0~100.0", default: "0", unit: "%", page: p435,
})

/** @param 04-18 AO2 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-36 */
export const Param_04_18 = P.makeSignedScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_18, 0.1, {
  group, code: "04-18", name: "AO2 Bias",
  range: "-100.0~100.0", default: "0", unit: "%", page: p436,
})

/** @param 04-23 AI3 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-36 */
export const Param_04_23 = P.makeSignedScaledParam(GROUP_04_External_Analog_Input_and_Output_Parameters._04_23, 0.1, {
  group, code: "04-23", name: "AI3 Bias",
  range: "-100.0~100.0", default: "0", unit: "%", page: p436,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode04_00 = P.makeDecode(Param_04_00)
export const encode04_00 = P.makeEncode(Param_04_00)
export const formatted04_00 = P.makeFormatted(Param_04_00)

export const decode04_01 = P.makeDecode(Param_04_01)
export const encode04_01 = P.makeEncode(Param_04_01)
export const formatted04_01 = P.makeFormatted(Param_04_01)

export const decode04_02 = P.makeDecode(Param_04_02)
export const encode04_02 = P.makeEncode(Param_04_02)
export const formatted04_02 = P.makeFormatted(Param_04_02)

export const decode04_03 = P.makeDecode(Param_04_03)
export const encode04_03 = P.makeEncode(Param_04_03)
export const formatted04_03 = P.makeFormatted(Param_04_03)

export const decode04_04 = P.makeDecode(Param_04_04)
export const encode04_04 = P.makeEncode(Param_04_04)
export const formatted04_04 = P.makeFormatted(Param_04_04)

export const decode04_05 = P.makeDecode(Param_04_05)
export const encode04_05 = P.makeEncode(Param_04_05)
export const formatted04_05 = P.makeFormatted(Param_04_05)

export const decode04_06 = P.makeDecode(Param_04_06)
export const encode04_06 = P.makeEncode(Param_04_06)
export const formatted04_06 = P.makeFormatted(Param_04_06)

export const decode04_07 = P.makeDecode(Param_04_07)
export const encode04_07 = P.makeEncode(Param_04_07)
export const formatted04_07 = P.makeFormatted(Param_04_07)

export const decode04_08 = P.makeDecode(Param_04_08)
export const encode04_08 = P.makeEncode(Param_04_08)
export const formatted04_08 = P.makeFormatted(Param_04_08)

export const decode04_09 = P.makeDecode(Param_04_09)
export const encode04_09 = P.makeEncode(Param_04_09)
export const formatted04_09 = P.makeFormatted(Param_04_09)

export const decode04_10 = P.makeDecode(Param_04_10)
export const encode04_10 = P.makeEncode(Param_04_10)
export const formatted04_10 = P.makeFormatted(Param_04_10)

export const decode04_11 = P.makeDecode(Param_04_11)
export const encode04_11 = P.makeEncode(Param_04_11)
export const formatted04_11 = P.makeFormatted(Param_04_11)

export const decode04_12 = P.makeDecode(Param_04_12)
export const encode04_12 = P.makeEncode(Param_04_12)
export const formatted04_12 = P.makeFormatted(Param_04_12)

export const decode04_13 = P.makeDecode(Param_04_13)
export const encode04_13 = P.makeEncode(Param_04_13)
export const formatted04_13 = P.makeFormatted(Param_04_13)

export const decode04_16 = P.makeDecode(Param_04_16)
export const encode04_16 = P.makeEncode(Param_04_16)
export const formatted04_16 = P.makeFormatted(Param_04_16)

export const decode04_17 = P.makeDecode(Param_04_17)
export const encode04_17 = P.makeEncode(Param_04_17)
export const formatted04_17 = P.makeFormatted(Param_04_17)

export const decode04_18 = P.makeDecode(Param_04_18)
export const encode04_18 = P.makeEncode(Param_04_18)
export const formatted04_18 = P.makeFormatted(Param_04_18)

export const decode04_19 = P.makeDecode(Param_04_19)
export const encode04_19 = P.makeEncode(Param_04_19)
export const formatted04_19 = P.makeFormatted(Param_04_19)

export const decode04_20 = P.makeDecode(Param_04_20)
export const encode04_20 = P.makeEncode(Param_04_20)
export const formatted04_20 = P.makeFormatted(Param_04_20)

export const decode04_21 = P.makeDecode(Param_04_21)
export const encode04_21 = P.makeEncode(Param_04_21)
export const formatted04_21 = P.makeFormatted(Param_04_21)

export const decode04_22 = P.makeDecode(Param_04_22)
export const encode04_22 = P.makeEncode(Param_04_22)
export const formatted04_22 = P.makeFormatted(Param_04_22)

export const decode04_23 = P.makeDecode(Param_04_23)
export const encode04_23 = P.makeEncode(Param_04_23)
export const formatted04_23 = P.makeFormatted(Param_04_23)

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

export const group04Params: Record<string, ParamEntry> = {
  "04-00": param(Param_04_00, decode04_00, encode04_00),
  "04-01": param(Param_04_01, decode04_01, encode04_01),
  "04-02": param(Param_04_02, decode04_02, encode04_02),
  "04-03": param(Param_04_03, decode04_03, encode04_03),
  "04-04": param(Param_04_04, decode04_04, encode04_04),
  "04-05": param(Param_04_05, decode04_05, encode04_05),
  "04-06": param(Param_04_06, decode04_06, encode04_06),
  "04-07": param(Param_04_07, decode04_07, encode04_07),
  "04-08": param(Param_04_08, decode04_08, encode04_08),
  "04-09": param(Param_04_09, decode04_09, encode04_09),
  "04-10": param(Param_04_10, decode04_10, encode04_10),
  "04-11": param(Param_04_11, decode04_11, encode04_11),
  "04-12": param(Param_04_12, decode04_12, encode04_12),
  "04-13": param(Param_04_13, decode04_13, encode04_13),
  "04-16": param(Param_04_16, decode04_16, encode04_16),
  "04-17": param(Param_04_17, decode04_17, encode04_17),
  "04-18": param(Param_04_18, decode04_18, encode04_18),
  "04-19": param(Param_04_19, decode04_19, encode04_19),
  "04-20": param(Param_04_20, decode04_20, encode04_20),
  "04-21": param(Param_04_21, decode04_21, encode04_21),
  "04-22": param(Param_04_22, decode04_22, encode04_22),
  "04-23": param(Param_04_23, decode04_23, encode04_23),
}
