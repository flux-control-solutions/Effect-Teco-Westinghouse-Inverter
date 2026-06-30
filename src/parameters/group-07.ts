/**
 * Group 07: Start/Stop Parameters
 * Manual pages 4-44 to 4-46
 */

import * as P from "./param-utils";
import { GROUP_07_Start_Stop_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 7 as const;
const p444 = 444 as const;
const p445 = 445 as const;
const p446 = 446 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 07-00 Momentary Power Loss/Fault Restart Selection — Range: 0-1, Default: 0, Manual p.4-44 */
export const Param_07_00 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_00, {
  group, code: "07-00", name: "Momentary Power Loss/Fault Restart Selection",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p444,
})

/** @param 07-01 Fault Auto-Restart Time — Range: 0~7200, Default: 0, Unit: s, Manual p.4-44 */
export const Param_07_01 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_01, {
  group, code: "07-01", name: "Fault Auto-Restart Time",
  range: "0~7200", default: "0", unit: "s", page: p444,
})

/** @param 07-02 Number of Fault Auto-Restart Attempts — Range: 0~10, Default: 0, Manual p.4-44 */
export const Param_07_02 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_02, {
  group, code: "07-02", name: "Number of Fault Auto-Restart Attempts",
  range: "0~10", default: "0", unit: "-", page: p444,
})

/** @param 07-04 Direct Start at Power On — Range: 0-1, Default: 1, Manual p.4-44 */
export const Param_07_04 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_04, {
  group, code: "07-04", name: "Direct Start at Power On",
  range: "0-1 (0:Direct start / 1:Unable to direct start)", default: "1", unit: "-", page: p444,
})

/** @param 07-07 DC Injection Braking Current — Range: 0~100, Default: 50, Unit: %, Manual p.4-44 */
export const Param_07_07 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_07, {
  group, code: "07-07", name: "DC Injection Braking Current",
  range: "0~100", default: "50", unit: "%", page: p444,
})

/** @param 07-09 Stop Mode Selection — Range: 0-3, Default: 0, Manual p.4-44 */
export const Param_07_09 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_09, {
  group, code: "07-09", name: "Stop Mode Selection",
  range: "0-3 (0:Decel to Stop / 1:Coast to Stop / 2:DC Braking / 3:Coast to Stop w/ Timer)", default: "0", unit: "-", page: p444,
})

/** @param 07-13 Low Voltage Detection Level — Range: voltage-dependent, Default: 190/380/546, Unit: V, Manual p.4-44 */
export const Param_07_13 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_13, {
  group, code: "07-13", name: "Low Voltage Detection Level",
  range: "150~300 (230V) / 250~600 (460V) / 500~600 (575V/690V)", default: "190 (230V) / 380 (460V) / 546 (575V/690V)", unit: "V", page: p444,
})

/** @param 07-15 Pre-excitation Level — Range: 50~200, Default: 100, Unit: %, Manual p.4-44 */
export const Param_07_15 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_15, {
  group, code: "07-15", name: "Pre-excitation Level",
  range: "50~200", default: "100", unit: "%", page: p444,
})

/** @param 07-19 Direction-Detection Speed Search — Range: 0~100, Default: 50, Unit: %, Manual p.4-44 */
export const Param_07_19 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_19, {
  group, code: "07-19", name: "Direction-Detection Speed Search",
  range: "0~100", default: "50", unit: "%", page: p444,
})

/** @param 07-20 Speed Search Operating Current — Range: 0~100, Default: 20, Unit: %, Manual p.4-45 */
export const Param_07_20 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_20, {
  group, code: "07-20", name: "Speed Search Operating Current",
  range: "0~100", default: "20", unit: "%", page: p445,
})

/** @param 07-24 Direction-Detection Speed Search Selection — Range: 0-1, Default: 1, Manual p.4-45 */
export const Param_07_24 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_24, {
  group, code: "07-24", name: "Direction-Detection Speed Search Selection",
  range: "0-1 (0:Disable / 1:Enable)", default: "1", unit: "-", page: p445,
})

/** @param 07-26 Start-up Mode Selection of SLV Coast to Stop — Range: 0-1, Default: 0, Manual p.4-45 */
export const Param_07_26 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_26, {
  group, code: "07-26", name: "Start-up Mode Selection of SLV Coast to Stop",
  range: "0-1 (0:Speed search / 1:Normal start)", default: "0", unit: "-", page: p445,
})

/** @param 07-27 Start Selection after Fault during SLV Mode — Range: 0-1, Default: 0, Manual p.4-45 */
export const Param_07_27 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_27, {
  group, code: "07-27", name: "Start Selection after Fault during SLV Mode",
  range: "0-1 (0:Speed search / 1:Normal start)", default: "0", unit: "-", page: p445,
})

/** @param 07-28 Start after External Base Block — Range: 0-1, Default: 0, Manual p.4-45 */
export const Param_07_28 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_28, {
  group, code: "07-28", name: "Start after External Base Block",
  range: "0-1 (0:Speed search / 1:Normal start)", default: "0", unit: "-", page: p445,
})

/** @param 07-29 Run Command Selection at DC Braking — Range: 0-1, Default: 0, Manual p.4-45 */
export const Param_07_29 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_29, {
  group, code: "07-29", name: "Run Command Selection at DC Braking",
  range: "0-1 (0:Not Allowable / 1:Allowable)", default: "0", unit: "-", page: p445,
})

/** @param 07-30 Low Voltage Level Selection — Range: 0-1, Default: 0, Manual p.4-45 */
export const Param_07_30 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_30, {
  group, code: "07-30", name: "Low Voltage Level Selection",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p445,
})

/** @param 07-32 Speed Search Mode Selection — Range: 0-2, Default: 0, Manual p.4-45 */
export const Param_07_32 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_32, {
  group, code: "07-32", name: "Speed Search Mode Selection",
  range: "0-2 (0:Disable / 1:Mode 1 / 2:Execute each time)", default: "0", unit: "-", page: p445,
})

/** @param 07-33 Start Frequency of Speed Search Selection — Range: 0-1, Default: 0, Manual p.4-45 */
export const Param_07_33 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_33, {
  group, code: "07-33", name: "Start Frequency of Speed Search Selection",
  range: "0-1 (0:Max Output Freq / 1:Freq Cmd)", default: "0", unit: "-", page: p445,
})

/** @param 07-45 STP2 Function Selection — Range: 0-1, Default: 0, Manual p.4-46 */
export const Param_07_45 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_45, {
  group, code: "07-45", name: "STP2 Function Selection",
  range: "0-1 (0:STP2 Enable / 1:STP2 Disable)", default: "0", unit: "-", page: p446,
})

/** @param 07-46 DC Injection Current Limit — Range: 0~150, Default: 100, Unit: %, Manual p.4-46 */
export const Param_07_46 = P.makeParam(GROUP_07_Start_Stop_Parameters._07_46, {
  group, code: "07-46", name: "DC Injection Current Limit",
  range: "0~150", default: "100", unit: "%", page: p446,
})

// ── Scaled (×0.1) parameters ───────────────────────────────

/** @param 07-05 Delay of Direct Start at Power On — Range: 1.0~300.0, Default: 3.5, Unit: s, Manual p.4-44 */
export const Param_07_05 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_05, 0.1, {
  group, code: "07-05", name: "Delay of Direct Start at Power On",
  range: "1.0~300.0", default: "3.5", unit: "s", page: p444,
})

/** @param 07-06 DC Injection Braking Starting Frequency — Range: 0.0~10.0, Default: 0.5, Unit: Hz, Manual p.4-44 */
export const Param_07_06 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_06, 0.1, {
  group, code: "07-06", name: "DC Injection Braking Starting Frequency",
  range: "0.0~10.0", default: "0.5", unit: "Hz", page: p444,
})

/** @param 07-18 Minimum Base block Time — Range: 0.1~5.0, Default: *, Unit: Sec, Manual p.4-44 */
export const Param_07_18 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_18, 0.1, {
  group, code: "07-18", name: "Minimum Base block Time",
  range: "0.1~5.0", default: "* (see Attachment 1 p.170)", unit: "Sec", page: p444,
})

/** @param 07-21 Integral Time of Speed Searching — Range: 0.1~10.0, Default: 2.0, Unit: Sec, Manual p.4-45 */
export const Param_07_21 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_21, 0.1, {
  group, code: "07-21", name: "Integral Time of Speed Searching",
  range: "0.1~10.0", default: "2.0", unit: "Sec", page: p445,
})

/** @param 07-22 Delay Time of Speed Searching — Range: 0.0~20.0, Default: 0.2, Unit: Sec, Manual p.4-45 */
export const Param_07_22 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_22, 0.1, {
  group, code: "07-22", name: "Delay Time of Speed Searching",
  range: "0.0~20.0", default: "0.2", unit: "Sec", page: p445,
})

/** @param 07-23 Voltage Recovery Time — Range: 0.1~5.0, Default: 2.0, Unit: Sec, Manual p.4-45 */
export const Param_07_23 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_23, 0.1, {
  group, code: "07-23", name: "Voltage Recovery Time",
  range: "0.1~5.0", default: "2.0", unit: "Sec", page: p445,
})

/** @param 07-36 Short-circuit Braking Current — Range: 0.0~200.0, Default: 100.0, Unit: %, Manual p.4-45 */
export const Param_07_36 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_36, 0.1, {
  group, code: "07-36", name: "Short-circuit Braking Current",
  range: "0.0~200.0", default: "100.0", unit: "%", page: p445,
})

/** @param 07-42 Voltage Limit Gain — Range: 0.0~50.0, Default: 0, Unit: %, Manual p.4-46 */
export const Param_07_42 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_42, 0.1, {
  group, code: "07-42", name: "Voltage Limit Gain",
  range: "0.0~50.0", default: "0", unit: "%", page: p446,
})

// ── Scaled (×0.01) parameters ──────────────────────────────

/** @param 07-08 DC Injection Braking Time at Stop — Range: 0.00~100.00, Default: 0.50, Unit: s, Manual p.4-44 */
export const Param_07_08 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_08, 0.01, {
  group, code: "07-08", name: "DC Injection Braking Time at Stop",
  range: "0.00~100.00", default: "0.50", unit: "s", page: p444,
})

/** @param 07-14 Pre-excitation Time — Range: 0.00~10.00, Default: 2.00, Unit: s, Manual p.4-44 */
export const Param_07_14 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_14, 0.01, {
  group, code: "07-14", name: "Pre-excitation Time",
  range: "0.00~10.00", default: "2.00", unit: "s", page: p444,
})

/** @param 07-16 DC Injection Braking Time at Start — Range: 0.00~100.00, Default: 0.00, Unit: s, Manual p.4-44 */
export const Param_07_16 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_16, 0.01, {
  group, code: "07-16", name: "DC Injection Braking Time at Start",
  range: "0.00~100.00", default: "0.00", unit: "s", page: p444,
})

/** @param 07-25 Low Voltage Detection Time — Range: 0.00~1.00, Default: 0.02, Unit: Sec, Manual p.4-45 */
export const Param_07_25 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_25, 0.01, {
  group, code: "07-25", name: "Low Voltage Detection Time",
  range: "0.00~1.00", default: "0.02", unit: "Sec", page: p445,
})

/** @param 07-31 Low Voltage Run Frequency — Range: 0.00~599.00, Default: 10.00, Unit: Hz, Manual p.4-45 */
export const Param_07_31 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_31, 0.01, {
  group, code: "07-31", name: "Low Voltage Run Frequency",
  range: "0.00~599.00", default: "10.00", unit: "Hz", page: p445,
})

/** @param 07-34 Short-circuit Braking Time at Start — Range: 0.00~100.00, Default: 0.00, Unit: Sec, Manual p.4-45 */
export const Param_07_34 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_34, 0.01, {
  group, code: "07-34", name: "Short-circuit Braking Time at Start",
  range: "0.00~100.00", default: "0.00", unit: "Sec", page: p445,
})

/** @param 07-35 Short-circuit Braking Time at Stop — Range: 0.00~100.00, Default: 0.50, Unit: Sec, Manual p.4-45 */
export const Param_07_35 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_35, 0.01, {
  group, code: "07-35", name: "Short-circuit Braking Time at Stop",
  range: "0.00~100.00", default: "0.50", unit: "Sec", page: p445,
})

/** @param 07-43 Short-circuit Braking Time of PM Speed Search — Range: 0.00~100.00, Default: 0.00, Unit: Sec, Manual p.4-46 */
export const Param_07_43 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_43, 0.01, {
  group, code: "07-43", name: "Short-circuit Braking Time of PM Speed Search",
  range: "0.00~100.00", default: "0.00", unit: "Sec", page: p446,
})

/** @param 07-44 DC Braking Time of PM Speed Search — Range: 0.00~100.00, Default: 0.00, Unit: Sec, Manual p.4-46 */
export const Param_07_44 = P.makeScaledParam(GROUP_07_Start_Stop_Parameters._07_44, 0.01, {
  group, code: "07-44", name: "DC Braking Time of PM Speed Search",
  range: "0.00~100.00", default: "0.00", unit: "Sec", page: p446,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode07_00 = P.makeDecode(Param_07_00)
export const encode07_00 = P.makeEncode(Param_07_00)
export const formatted07_00 = P.makeFormatted(Param_07_00)

export const decode07_01 = P.makeDecode(Param_07_01)
export const encode07_01 = P.makeEncode(Param_07_01)
export const formatted07_01 = P.makeFormatted(Param_07_01)

export const decode07_02 = P.makeDecode(Param_07_02)
export const encode07_02 = P.makeEncode(Param_07_02)
export const formatted07_02 = P.makeFormatted(Param_07_02)

export const decode07_04 = P.makeDecode(Param_07_04)
export const encode07_04 = P.makeEncode(Param_07_04)
export const formatted07_04 = P.makeFormatted(Param_07_04)

export const decode07_05 = P.makeDecode(Param_07_05)
export const encode07_05 = P.makeEncode(Param_07_05)
export const formatted07_05 = P.makeFormatted(Param_07_05)

export const decode07_06 = P.makeDecode(Param_07_06)
export const encode07_06 = P.makeEncode(Param_07_06)
export const formatted07_06 = P.makeFormatted(Param_07_06)

export const decode07_07 = P.makeDecode(Param_07_07)
export const encode07_07 = P.makeEncode(Param_07_07)
export const formatted07_07 = P.makeFormatted(Param_07_07)

export const decode07_08 = P.makeDecode(Param_07_08)
export const encode07_08 = P.makeEncode(Param_07_08)
export const formatted07_08 = P.makeFormatted(Param_07_08)

export const decode07_09 = P.makeDecode(Param_07_09)
export const encode07_09 = P.makeEncode(Param_07_09)
export const formatted07_09 = P.makeFormatted(Param_07_09)

export const decode07_13 = P.makeDecode(Param_07_13)
export const encode07_13 = P.makeEncode(Param_07_13)
export const formatted07_13 = P.makeFormatted(Param_07_13)

export const decode07_14 = P.makeDecode(Param_07_14)
export const encode07_14 = P.makeEncode(Param_07_14)
export const formatted07_14 = P.makeFormatted(Param_07_14)

export const decode07_15 = P.makeDecode(Param_07_15)
export const encode07_15 = P.makeEncode(Param_07_15)
export const formatted07_15 = P.makeFormatted(Param_07_15)

export const decode07_16 = P.makeDecode(Param_07_16)
export const encode07_16 = P.makeEncode(Param_07_16)
export const formatted07_16 = P.makeFormatted(Param_07_16)

export const decode07_18 = P.makeDecode(Param_07_18)
export const encode07_18 = P.makeEncode(Param_07_18)
export const formatted07_18 = P.makeFormatted(Param_07_18)

export const decode07_19 = P.makeDecode(Param_07_19)
export const encode07_19 = P.makeEncode(Param_07_19)
export const formatted07_19 = P.makeFormatted(Param_07_19)

export const decode07_20 = P.makeDecode(Param_07_20)
export const encode07_20 = P.makeEncode(Param_07_20)
export const formatted07_20 = P.makeFormatted(Param_07_20)

export const decode07_21 = P.makeDecode(Param_07_21)
export const encode07_21 = P.makeEncode(Param_07_21)
export const formatted07_21 = P.makeFormatted(Param_07_21)

export const decode07_22 = P.makeDecode(Param_07_22)
export const encode07_22 = P.makeEncode(Param_07_22)
export const formatted07_22 = P.makeFormatted(Param_07_22)

export const decode07_23 = P.makeDecode(Param_07_23)
export const encode07_23 = P.makeEncode(Param_07_23)
export const formatted07_23 = P.makeFormatted(Param_07_23)

export const decode07_24 = P.makeDecode(Param_07_24)
export const encode07_24 = P.makeEncode(Param_07_24)
export const formatted07_24 = P.makeFormatted(Param_07_24)

export const decode07_25 = P.makeDecode(Param_07_25)
export const encode07_25 = P.makeEncode(Param_07_25)
export const formatted07_25 = P.makeFormatted(Param_07_25)

export const decode07_26 = P.makeDecode(Param_07_26)
export const encode07_26 = P.makeEncode(Param_07_26)
export const formatted07_26 = P.makeFormatted(Param_07_26)

export const decode07_27 = P.makeDecode(Param_07_27)
export const encode07_27 = P.makeEncode(Param_07_27)
export const formatted07_27 = P.makeFormatted(Param_07_27)

export const decode07_28 = P.makeDecode(Param_07_28)
export const encode07_28 = P.makeEncode(Param_07_28)
export const formatted07_28 = P.makeFormatted(Param_07_28)

export const decode07_29 = P.makeDecode(Param_07_29)
export const encode07_29 = P.makeEncode(Param_07_29)
export const formatted07_29 = P.makeFormatted(Param_07_29)

export const decode07_30 = P.makeDecode(Param_07_30)
export const encode07_30 = P.makeEncode(Param_07_30)
export const formatted07_30 = P.makeFormatted(Param_07_30)

export const decode07_31 = P.makeDecode(Param_07_31)
export const encode07_31 = P.makeEncode(Param_07_31)
export const formatted07_31 = P.makeFormatted(Param_07_31)

export const decode07_32 = P.makeDecode(Param_07_32)
export const encode07_32 = P.makeEncode(Param_07_32)
export const formatted07_32 = P.makeFormatted(Param_07_32)

export const decode07_33 = P.makeDecode(Param_07_33)
export const encode07_33 = P.makeEncode(Param_07_33)
export const formatted07_33 = P.makeFormatted(Param_07_33)

export const decode07_34 = P.makeDecode(Param_07_34)
export const encode07_34 = P.makeEncode(Param_07_34)
export const formatted07_34 = P.makeFormatted(Param_07_34)

export const decode07_35 = P.makeDecode(Param_07_35)
export const encode07_35 = P.makeEncode(Param_07_35)
export const formatted07_35 = P.makeFormatted(Param_07_35)

export const decode07_36 = P.makeDecode(Param_07_36)
export const encode07_36 = P.makeEncode(Param_07_36)
export const formatted07_36 = P.makeFormatted(Param_07_36)

export const decode07_42 = P.makeDecode(Param_07_42)
export const encode07_42 = P.makeEncode(Param_07_42)
export const formatted07_42 = P.makeFormatted(Param_07_42)

export const decode07_43 = P.makeDecode(Param_07_43)
export const encode07_43 = P.makeEncode(Param_07_43)
export const formatted07_43 = P.makeFormatted(Param_07_43)

export const decode07_44 = P.makeDecode(Param_07_44)
export const encode07_44 = P.makeEncode(Param_07_44)
export const formatted07_44 = P.makeFormatted(Param_07_44)

export const decode07_45 = P.makeDecode(Param_07_45)
export const encode07_45 = P.makeEncode(Param_07_45)
export const formatted07_45 = P.makeFormatted(Param_07_45)

export const decode07_46 = P.makeDecode(Param_07_46)
export const encode07_46 = P.makeEncode(Param_07_46)
export const formatted07_46 = P.makeFormatted(Param_07_46)

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

export const group07Params: Record<string, ParamEntry> = {
  "07-00": param(Param_07_00, decode07_00, encode07_00),
  "07-01": param(Param_07_01, decode07_01, encode07_01),
  "07-02": param(Param_07_02, decode07_02, encode07_02),
  "07-04": param(Param_07_04, decode07_04, encode07_04),
  "07-05": param(Param_07_05, decode07_05, encode07_05),
  "07-06": param(Param_07_06, decode07_06, encode07_06),
  "07-07": param(Param_07_07, decode07_07, encode07_07),
  "07-08": param(Param_07_08, decode07_08, encode07_08),
  "07-09": param(Param_07_09, decode07_09, encode07_09),
  "07-13": param(Param_07_13, decode07_13, encode07_13),
  "07-14": param(Param_07_14, decode07_14, encode07_14),
  "07-15": param(Param_07_15, decode07_15, encode07_15),
  "07-16": param(Param_07_16, decode07_16, encode07_16),
  "07-18": param(Param_07_18, decode07_18, encode07_18),
  "07-19": param(Param_07_19, decode07_19, encode07_19),
  "07-20": param(Param_07_20, decode07_20, encode07_20),
  "07-21": param(Param_07_21, decode07_21, encode07_21),
  "07-22": param(Param_07_22, decode07_22, encode07_22),
  "07-23": param(Param_07_23, decode07_23, encode07_23),
  "07-24": param(Param_07_24, decode07_24, encode07_24),
  "07-25": param(Param_07_25, decode07_25, encode07_25),
  "07-26": param(Param_07_26, decode07_26, encode07_26),
  "07-27": param(Param_07_27, decode07_27, encode07_27),
  "07-28": param(Param_07_28, decode07_28, encode07_28),
  "07-29": param(Param_07_29, decode07_29, encode07_29),
  "07-30": param(Param_07_30, decode07_30, encode07_30),
  "07-31": param(Param_07_31, decode07_31, encode07_31),
  "07-32": param(Param_07_32, decode07_32, encode07_32),
  "07-33": param(Param_07_33, decode07_33, encode07_33),
  "07-34": param(Param_07_34, decode07_34, encode07_34),
  "07-35": param(Param_07_35, decode07_35, encode07_35),
  "07-36": param(Param_07_36, decode07_36, encode07_36),
  "07-42": param(Param_07_42, decode07_42, encode07_42),
  "07-43": param(Param_07_43, decode07_43, encode07_43),
  "07-44": param(Param_07_44, decode07_44, encode07_44),
  "07-45": param(Param_07_45, decode07_45, encode07_45),
  "07-46": param(Param_07_46, decode07_46, encode07_46),
}
