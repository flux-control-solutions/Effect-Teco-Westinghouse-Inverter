/**
 * Group 06: Automatic Program Operation Parameters
 * Manual pages 4-40 to 4-43
 *
 * Three families:
 *   06-01…06-15  frequency settings     ×0.01 Hz
 *   06-16…06-31  operation times         ×0.1 s
 *   06-32…06-47  direction selections    0/1/2 (simple UInt16)
 */

import * as P from "./param-utils";
import { GROUP_06_Automatic_Program_Operation_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 6 as const;
const p440 = 440 as const;
const p441 = 441 as const;
const p442 = 442 as const;
const p443 = 443 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 06-00 Automatic Operation Mode Selection — Range: 0-6, Default: 0, Manual p.4-40 */
export const Param_06_00 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_00, {
  group, code: "06-00", name: "Automatic Operation Mode Selection",
  range: "0-6", default: "0", unit: "-", page: p440,
})

// ── Operation direction (0=Stop, 1=Forward, 2=Reverse) ────

const dirMeta = (idx: number, page: number): P.ParamMeta => ({
  group, code: `06-${32 + idx}`,
  name: `Operation Direction Selection of Speed-Stage ${idx}`,
  range: "0-2 (0:Stop / 1:Forward / 2:Reverse)", default: "0", unit: "-", page,
})

export const Param_06_32 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_32, dirMeta(0, p442))
export const Param_06_33 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_33, dirMeta(1, p442))
export const Param_06_34 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_34, dirMeta(2, p442))
export const Param_06_35 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_35, dirMeta(3, p442))
export const Param_06_36 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_36, dirMeta(4, p442))
export const Param_06_37 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_37, dirMeta(5, p443))
export const Param_06_38 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_38, dirMeta(6, p443))
export const Param_06_39 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_39, dirMeta(7, p443))
export const Param_06_40 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_40, dirMeta(8, p443))
export const Param_06_41 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_41, dirMeta(9, p443))
export const Param_06_42 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_42, dirMeta(10, p443))
export const Param_06_43 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_43, dirMeta(11, p443))
export const Param_06_44 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_44, dirMeta(12, p443))
export const Param_06_45 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_45, dirMeta(13, p443))
export const Param_06_46 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_46, dirMeta(14, p443))
export const Param_06_47 = P.makeParam(GROUP_06_Automatic_Program_Operation_Parameters._06_47, dirMeta(15, p443))

// ── Frequency settings (×0.01 Hz) ──────────────────────────

const freqMeta = (stage: number, def: string, page: number): P.ParamMeta => ({
  group, code: `06-${String(stage).padStart(2, "0")}`,
  name: `Frequency Setting of Operation-Stage ${stage}`,
  range: "0.00~599.00", default: def, unit: "Hz", page,
})

export const Param_06_01 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_01, 0.01, freqMeta(1, "5.00", p440))
export const Param_06_02 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_02, 0.01, freqMeta(2, "10.00", p440))
export const Param_06_03 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_03, 0.01, freqMeta(3, "20.00", p440))
export const Param_06_04 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_04, 0.01, freqMeta(4, "30.00", p441))
export const Param_06_05 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_05, 0.01, freqMeta(5, "40.00", p441))
export const Param_06_06 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_06, 0.01, freqMeta(6, "50.00", p441))
export const Param_06_07 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_07, 0.01, freqMeta(7, "50.00", p441))
export const Param_06_08 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_08, 0.01, freqMeta(8, "5.00", p441))
export const Param_06_09 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_09, 0.01, freqMeta(9, "5.00", p441))
export const Param_06_10 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_10, 0.01, freqMeta(10, "5.00", p441))
export const Param_06_11 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_11, 0.01, freqMeta(11, "5.00", p441))
export const Param_06_12 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_12, 0.01, freqMeta(12, "5.00", p441))
export const Param_06_13 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_13, 0.01, freqMeta(13, "5.00", p441))
export const Param_06_14 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_14, 0.01, freqMeta(14, "5.00", p441))
export const Param_06_15 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_15, 0.01, freqMeta(15, "5.00", p441))

// ── Operation time settings (×0.1 s) ───────────────────────

const timeMeta = (stage: number, page: number): P.ParamMeta => ({
  group, code: `06-${16 + stage}`,
  name: `Operation Time Setting of Speed-Stage ${stage}`,
  range: "0.0~6000.0", default: "0.0", unit: "s", page,
})

export const Param_06_16 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_16, 0.1, timeMeta(0, p441))
export const Param_06_17 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_17, 0.1, timeMeta(1, p441))
export const Param_06_18 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_18, 0.1, timeMeta(2, p441))
export const Param_06_19 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_19, 0.1, timeMeta(3, p441))
export const Param_06_20 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_20, 0.1, timeMeta(4, p442))
export const Param_06_21 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_21, 0.1, timeMeta(5, p442))
export const Param_06_22 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_22, 0.1, timeMeta(6, p442))
export const Param_06_23 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_23, 0.1, timeMeta(7, p442))
export const Param_06_24 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_24, 0.1, timeMeta(8, p442))
export const Param_06_25 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_25, 0.1, timeMeta(9, p442))
export const Param_06_26 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_26, 0.1, timeMeta(10, p442))
export const Param_06_27 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_27, 0.1, timeMeta(11, p442))
export const Param_06_28 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_28, 0.1, timeMeta(12, p442))
export const Param_06_29 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_29, 0.1, timeMeta(13, p442))
export const Param_06_30 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_30, 0.1, timeMeta(14, p442))
export const Param_06_31 = P.makeScaledParam(GROUP_06_Automatic_Program_Operation_Parameters._06_31, 0.1, timeMeta(15, p442))

// ── Decode / Encode / Formatted exports ────────────────────

export const decode06_00 = P.makeDecode(Param_06_00)
export const encode06_00 = P.makeEncode(Param_06_00)
export const formatted06_00 = P.makeFormatted(Param_06_00)

export const decode06_01 = P.makeDecode(Param_06_01)
export const encode06_01 = P.makeEncode(Param_06_01)
export const formatted06_01 = P.makeFormatted(Param_06_01)

export const decode06_02 = P.makeDecode(Param_06_02)
export const encode06_02 = P.makeEncode(Param_06_02)
export const formatted06_02 = P.makeFormatted(Param_06_02)

export const decode06_03 = P.makeDecode(Param_06_03)
export const encode06_03 = P.makeEncode(Param_06_03)
export const formatted06_03 = P.makeFormatted(Param_06_03)

export const decode06_04 = P.makeDecode(Param_06_04)
export const encode06_04 = P.makeEncode(Param_06_04)
export const formatted06_04 = P.makeFormatted(Param_06_04)

export const decode06_05 = P.makeDecode(Param_06_05)
export const encode06_05 = P.makeEncode(Param_06_05)
export const formatted06_05 = P.makeFormatted(Param_06_05)

export const decode06_06 = P.makeDecode(Param_06_06)
export const encode06_06 = P.makeEncode(Param_06_06)
export const formatted06_06 = P.makeFormatted(Param_06_06)

export const decode06_07 = P.makeDecode(Param_06_07)
export const encode06_07 = P.makeEncode(Param_06_07)
export const formatted06_07 = P.makeFormatted(Param_06_07)

export const decode06_08 = P.makeDecode(Param_06_08)
export const encode06_08 = P.makeEncode(Param_06_08)
export const formatted06_08 = P.makeFormatted(Param_06_08)

export const decode06_09 = P.makeDecode(Param_06_09)
export const encode06_09 = P.makeEncode(Param_06_09)
export const formatted06_09 = P.makeFormatted(Param_06_09)

export const decode06_10 = P.makeDecode(Param_06_10)
export const encode06_10 = P.makeEncode(Param_06_10)
export const formatted06_10 = P.makeFormatted(Param_06_10)

export const decode06_11 = P.makeDecode(Param_06_11)
export const encode06_11 = P.makeEncode(Param_06_11)
export const formatted06_11 = P.makeFormatted(Param_06_11)

export const decode06_12 = P.makeDecode(Param_06_12)
export const encode06_12 = P.makeEncode(Param_06_12)
export const formatted06_12 = P.makeFormatted(Param_06_12)

export const decode06_13 = P.makeDecode(Param_06_13)
export const encode06_13 = P.makeEncode(Param_06_13)
export const formatted06_13 = P.makeFormatted(Param_06_13)

export const decode06_14 = P.makeDecode(Param_06_14)
export const encode06_14 = P.makeEncode(Param_06_14)
export const formatted06_14 = P.makeFormatted(Param_06_14)

export const decode06_15 = P.makeDecode(Param_06_15)
export const encode06_15 = P.makeEncode(Param_06_15)
export const formatted06_15 = P.makeFormatted(Param_06_15)

export const decode06_16 = P.makeDecode(Param_06_16)
export const encode06_16 = P.makeEncode(Param_06_16)
export const formatted06_16 = P.makeFormatted(Param_06_16)

export const decode06_17 = P.makeDecode(Param_06_17)
export const encode06_17 = P.makeEncode(Param_06_17)
export const formatted06_17 = P.makeFormatted(Param_06_17)

export const decode06_18 = P.makeDecode(Param_06_18)
export const encode06_18 = P.makeEncode(Param_06_18)
export const formatted06_18 = P.makeFormatted(Param_06_18)

export const decode06_19 = P.makeDecode(Param_06_19)
export const encode06_19 = P.makeEncode(Param_06_19)
export const formatted06_19 = P.makeFormatted(Param_06_19)

export const decode06_20 = P.makeDecode(Param_06_20)
export const encode06_20 = P.makeEncode(Param_06_20)
export const formatted06_20 = P.makeFormatted(Param_06_20)

export const decode06_21 = P.makeDecode(Param_06_21)
export const encode06_21 = P.makeEncode(Param_06_21)
export const formatted06_21 = P.makeFormatted(Param_06_21)

export const decode06_22 = P.makeDecode(Param_06_22)
export const encode06_22 = P.makeEncode(Param_06_22)
export const formatted06_22 = P.makeFormatted(Param_06_22)

export const decode06_23 = P.makeDecode(Param_06_23)
export const encode06_23 = P.makeEncode(Param_06_23)
export const formatted06_23 = P.makeFormatted(Param_06_23)

export const decode06_24 = P.makeDecode(Param_06_24)
export const encode06_24 = P.makeEncode(Param_06_24)
export const formatted06_24 = P.makeFormatted(Param_06_24)

export const decode06_25 = P.makeDecode(Param_06_25)
export const encode06_25 = P.makeEncode(Param_06_25)
export const formatted06_25 = P.makeFormatted(Param_06_25)

export const decode06_26 = P.makeDecode(Param_06_26)
export const encode06_26 = P.makeEncode(Param_06_26)
export const formatted06_26 = P.makeFormatted(Param_06_26)

export const decode06_27 = P.makeDecode(Param_06_27)
export const encode06_27 = P.makeEncode(Param_06_27)
export const formatted06_27 = P.makeFormatted(Param_06_27)

export const decode06_28 = P.makeDecode(Param_06_28)
export const encode06_28 = P.makeEncode(Param_06_28)
export const formatted06_28 = P.makeFormatted(Param_06_28)

export const decode06_29 = P.makeDecode(Param_06_29)
export const encode06_29 = P.makeEncode(Param_06_29)
export const formatted06_29 = P.makeFormatted(Param_06_29)

export const decode06_30 = P.makeDecode(Param_06_30)
export const encode06_30 = P.makeEncode(Param_06_30)
export const formatted06_30 = P.makeFormatted(Param_06_30)

export const decode06_31 = P.makeDecode(Param_06_31)
export const encode06_31 = P.makeEncode(Param_06_31)
export const formatted06_31 = P.makeFormatted(Param_06_31)

export const decode06_32 = P.makeDecode(Param_06_32)
export const encode06_32 = P.makeEncode(Param_06_32)
export const formatted06_32 = P.makeFormatted(Param_06_32)

export const decode06_33 = P.makeDecode(Param_06_33)
export const encode06_33 = P.makeEncode(Param_06_33)
export const formatted06_33 = P.makeFormatted(Param_06_33)

export const decode06_34 = P.makeDecode(Param_06_34)
export const encode06_34 = P.makeEncode(Param_06_34)
export const formatted06_34 = P.makeFormatted(Param_06_34)

export const decode06_35 = P.makeDecode(Param_06_35)
export const encode06_35 = P.makeEncode(Param_06_35)
export const formatted06_35 = P.makeFormatted(Param_06_35)

export const decode06_36 = P.makeDecode(Param_06_36)
export const encode06_36 = P.makeEncode(Param_06_36)
export const formatted06_36 = P.makeFormatted(Param_06_36)

export const decode06_37 = P.makeDecode(Param_06_37)
export const encode06_37 = P.makeEncode(Param_06_37)
export const formatted06_37 = P.makeFormatted(Param_06_37)

export const decode06_38 = P.makeDecode(Param_06_38)
export const encode06_38 = P.makeEncode(Param_06_38)
export const formatted06_38 = P.makeFormatted(Param_06_38)

export const decode06_39 = P.makeDecode(Param_06_39)
export const encode06_39 = P.makeEncode(Param_06_39)
export const formatted06_39 = P.makeFormatted(Param_06_39)

export const decode06_40 = P.makeDecode(Param_06_40)
export const encode06_40 = P.makeEncode(Param_06_40)
export const formatted06_40 = P.makeFormatted(Param_06_40)

export const decode06_41 = P.makeDecode(Param_06_41)
export const encode06_41 = P.makeEncode(Param_06_41)
export const formatted06_41 = P.makeFormatted(Param_06_41)

export const decode06_42 = P.makeDecode(Param_06_42)
export const encode06_42 = P.makeEncode(Param_06_42)
export const formatted06_42 = P.makeFormatted(Param_06_42)

export const decode06_43 = P.makeDecode(Param_06_43)
export const encode06_43 = P.makeEncode(Param_06_43)
export const formatted06_43 = P.makeFormatted(Param_06_43)

export const decode06_44 = P.makeDecode(Param_06_44)
export const encode06_44 = P.makeEncode(Param_06_44)
export const formatted06_44 = P.makeFormatted(Param_06_44)

export const decode06_45 = P.makeDecode(Param_06_45)
export const encode06_45 = P.makeEncode(Param_06_45)
export const formatted06_45 = P.makeFormatted(Param_06_45)

export const decode06_46 = P.makeDecode(Param_06_46)
export const encode06_46 = P.makeEncode(Param_06_46)
export const formatted06_46 = P.makeFormatted(Param_06_46)

export const decode06_47 = P.makeDecode(Param_06_47)
export const encode06_47 = P.makeEncode(Param_06_47)
export const formatted06_47 = P.makeFormatted(Param_06_47)

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

export const group06Params: Record<string, ParamEntry> = {
  "06-00": param(Param_06_00, decode06_00, encode06_00),
  "06-01": param(Param_06_01, decode06_01, encode06_01),
  "06-02": param(Param_06_02, decode06_02, encode06_02),
  "06-03": param(Param_06_03, decode06_03, encode06_03),
  "06-04": param(Param_06_04, decode06_04, encode06_04),
  "06-05": param(Param_06_05, decode06_05, encode06_05),
  "06-06": param(Param_06_06, decode06_06, encode06_06),
  "06-07": param(Param_06_07, decode06_07, encode06_07),
  "06-08": param(Param_06_08, decode06_08, encode06_08),
  "06-09": param(Param_06_09, decode06_09, encode06_09),
  "06-10": param(Param_06_10, decode06_10, encode06_10),
  "06-11": param(Param_06_11, decode06_11, encode06_11),
  "06-12": param(Param_06_12, decode06_12, encode06_12),
  "06-13": param(Param_06_13, decode06_13, encode06_13),
  "06-14": param(Param_06_14, decode06_14, encode06_14),
  "06-15": param(Param_06_15, decode06_15, encode06_15),
  "06-16": param(Param_06_16, decode06_16, encode06_16),
  "06-17": param(Param_06_17, decode06_17, encode06_17),
  "06-18": param(Param_06_18, decode06_18, encode06_18),
  "06-19": param(Param_06_19, decode06_19, encode06_19),
  "06-20": param(Param_06_20, decode06_20, encode06_20),
  "06-21": param(Param_06_21, decode06_21, encode06_21),
  "06-22": param(Param_06_22, decode06_22, encode06_22),
  "06-23": param(Param_06_23, decode06_23, encode06_23),
  "06-24": param(Param_06_24, decode06_24, encode06_24),
  "06-25": param(Param_06_25, decode06_25, encode06_25),
  "06-26": param(Param_06_26, decode06_26, encode06_26),
  "06-27": param(Param_06_27, decode06_27, encode06_27),
  "06-28": param(Param_06_28, decode06_28, encode06_28),
  "06-29": param(Param_06_29, decode06_29, encode06_29),
  "06-30": param(Param_06_30, decode06_30, encode06_30),
  "06-31": param(Param_06_31, decode06_31, encode06_31),
  "06-32": param(Param_06_32, decode06_32, encode06_32),
  "06-33": param(Param_06_33, decode06_33, encode06_33),
  "06-34": param(Param_06_34, decode06_34, encode06_34),
  "06-35": param(Param_06_35, decode06_35, encode06_35),
  "06-36": param(Param_06_36, decode06_36, encode06_36),
  "06-37": param(Param_06_37, decode06_37, encode06_37),
  "06-38": param(Param_06_38, decode06_38, encode06_38),
  "06-39": param(Param_06_39, decode06_39, encode06_39),
  "06-40": param(Param_06_40, decode06_40, encode06_40),
  "06-41": param(Param_06_41, decode06_41, encode06_41),
  "06-42": param(Param_06_42, decode06_42, encode06_42),
  "06-43": param(Param_06_43, decode06_43, encode06_43),
  "06-44": param(Param_06_44, decode06_44, encode06_44),
  "06-45": param(Param_06_45, decode06_45, encode06_45),
  "06-46": param(Param_06_46, decode06_46, encode06_46),
  "06-47": param(Param_06_47, decode06_47, encode06_47),
}
