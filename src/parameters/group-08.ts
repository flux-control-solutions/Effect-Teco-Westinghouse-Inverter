/**
 * Group 08: Protection Parameters
 * Manual pages 4-47 to 4-51
 */

import * as P from "./param-utils";
import { GROUP_08_Protection_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 8 as const;
const p447 = 447 as const;
const p448 = 448 as const;
const p449 = 449 as const;
const p450 = 450 as const;
const p451 = 451 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 08-00 Stall Prevention Function — Bit field, Default: 0000b, Manual p.4-47 */
export const Param_08_00 = P.makeParam(GROUP_08_Protection_Parameters._08_00, {
  group, code: "08-00", name: "Stall Prevention Function",
  range: "bit0:Acc/bit1:Dec/bit2:Op/bit3:DecTimeBase", default: "0000b (0)", unit: "-", page: p447,
})

/** @param 08-01 Stall Prevention Level in Acceleration — Range: 20~200, Default: HD:150 ND:120, Unit: %, Manual p.4-47 */
export const Param_08_01 = P.makeParam(GROUP_08_Protection_Parameters._08_01, {
  group, code: "08-01", name: "Stall Prevention Level in Acceleration",
  range: "20~200", default: "HD:150 / ND:120", unit: "%", page: p447,
})

/** @param 08-02 Stall Prevention Level in Deceleration — Range: voltage-dependent, Unit: V, Manual p.4-47 */
export const Param_08_02 = P.makeParam(GROUP_08_Protection_Parameters._08_02, {
  group, code: "08-02", name: "Stall Prevention Level in Deceleration",
  range: "330~410 (230V) / 660~820 (460V) / 900~1000 (575V) / 1080~1200 (690V)", default: "385 (230V) / 770 (460V) / 950 (575V) / 1140 (690V)", unit: "V", page: p447,
})

/** @param 08-03 Stall Prevention Level in Operation — Range: 30~200, Default: HD:160 ND:120, Unit: %, Manual p.4-47 */
export const Param_08_03 = P.makeParam(GROUP_08_Protection_Parameters._08_03, {
  group, code: "08-03", name: "Stall Prevention Level in Operation",
  range: "30~200", default: "HD:160 / ND:120", unit: "%", page: p447,
})

/** @param 08-05 Selection for Motor Overload Protection (OL1) — Bit field, Default: 0101b, Manual p.4-47 */
export const Param_08_05 = P.makeParam(GROUP_08_Protection_Parameters._08_05, {
  group, code: "08-05", name: "Selection for Motor Overload Protection (OL1)",
  range: "bit0:Enable/bit1:ColdHot/bit2:MotorType/bit3:Reserved", default: "0101b (5)", unit: "-", page: p447,
})

/** @param 08-06 Start-up Mode of Overload Protection Operation (OL1) — Range: 0-1, Default: 0, Manual p.4-47 */
export const Param_08_06 = P.makeParam(GROUP_08_Protection_Parameters._08_06, {
  group, code: "08-06", name: "Start-up Mode of Overload Protection Operation (OL1)",
  range: "0-1 (0:Stop output / 1:Continuous operation)", default: "0", unit: "-", page: p447,
})

/** @param 08-07 Motor Overload (OL1) Protection Level — Range: 0-2, Default: 0, Manual p.4-47 */
export const Param_08_07 = P.makeParam(GROUP_08_Protection_Parameters._08_07, {
  group, code: "08-07", name: "Motor Overload (OL1) Protection Level",
  range: "0-2 (0:Protection 0 / 1:Protection 1 / 2:Protection 2)", default: "0", unit: "-", page: p447,
})

/** @param 08-08 Automatic Voltage Regulation (AVR) — Range: 0-1, Default: 0, Manual p.4-47 */
export const Param_08_08 = P.makeParam(GROUP_08_Protection_Parameters._08_08, {
  group, code: "08-08", name: "Automatic Voltage Regulation (AVR)",
  range: "0-1 (0:Enable / 1:Disable)", default: "0", unit: "-", page: p447,
})

/** @param 08-09 Selection of Input Phase Loss Protection — Range: 0-1, Default: 0, Manual p.4-47 */
export const Param_08_09 = P.makeParam(GROUP_08_Protection_Parameters._08_09, {
  group, code: "08-09", name: "Selection of Input Phase Loss Protection",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p447,
})

/** @param 08-10 Selection of Output Phase Loss Protection — Range: 0-1, Default: 0, Manual p.4-48 */
export const Param_08_10 = P.makeParam(GROUP_08_Protection_Parameters._08_10, {
  group, code: "08-10", name: "Selection of Output Phase Loss Protection",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p448,
})

/** @param 08-13 Selection of Over-Torque Detection — Range: 0-2, Default: 0, Manual p.4-48 */
export const Param_08_13 = P.makeParam(GROUP_08_Protection_Parameters._08_13, {
  group, code: "08-13", name: "Selection of Over-Torque Detection",
  range: "0-2 (0:Disable / 1:Detect at set freq / 2:Detect at operation start)", default: "0", unit: "-", page: p448,
})

/** @param 08-14 Selection of Over-Torque Operation — Range: 0-2, Default: 0, Manual p.4-48 */
export const Param_08_14 = P.makeParam(GROUP_08_Protection_Parameters._08_14, {
  group, code: "08-14", name: "Selection of Over-Torque Operation",
  range: "0-2 (0:Decel to stop / 1:Warning only / 2:Coast to stop)", default: "0", unit: "-", page: p448,
})

/** @param 08-15 Level of Over-Torque Detection — Range: 0~300, Default: 150, Unit: %, Manual p.4-48 */
export const Param_08_15 = P.makeParam(GROUP_08_Protection_Parameters._08_15, {
  group, code: "08-15", name: "Level of Over-Torque Detection",
  range: "0~300", default: "150", unit: "%", page: p448,
})

/** @param 08-17 Selection of Low-Torque Detection — Range: 0-2, Default: 0, Manual p.4-48 */
export const Param_08_17 = P.makeParam(GROUP_08_Protection_Parameters._08_17, {
  group, code: "08-17", name: "Selection of Low-Torque Detection",
  range: "0-2 (0:Disable / 1:Detect at set freq / 2:Detect at operation start)", default: "0", unit: "-", page: p448,
})

/** @param 08-18 Selection of Low-Torque Operation — Range: 0-2, Default: 0, Manual p.4-48 */
export const Param_08_18 = P.makeParam(GROUP_08_Protection_Parameters._08_18, {
  group, code: "08-18", name: "Selection of Low-Torque Operation",
  range: "0-2 (0:Decel to stop / 1:Warning only / 2:Coast to stop)", default: "0", unit: "-", page: p448,
})

/** @param 08-19 Level of Low-Torque Detection — Range: 0~300, Default: 30, Unit: %, Manual p.4-48 */
export const Param_08_19 = P.makeParam(GROUP_08_Protection_Parameters._08_19, {
  group, code: "08-19", name: "Level of Low-Torque Detection",
  range: "0~300", default: "30", unit: "%", page: p448,
})

/** @param 08-21 Limit of Stall Prevention in Acc over Base Speed — Range: 1~100, Default: 50, Unit: %, Manual p.4-49 */
export const Param_08_21 = P.makeParam(GROUP_08_Protection_Parameters._08_21, {
  group, code: "08-21", name: "Limit of Stall Prevention in Acc over Base Speed",
  range: "1~100", default: "50", unit: "%", page: p449,
})

/** @param 08-22 Stall Prevention Detection Time in Operation — Range: 2~100, Default: 100, Unit: ms, Manual p.4-49 */
export const Param_08_22 = P.makeParam(GROUP_08_Protection_Parameters._08_22, {
  group, code: "08-22", name: "Stall Prevention Detection Time in Operation",
  range: "2~100", default: "100", unit: "ms", page: p449,
})

/** @param 08-23 Ground Fault (GF) Selection — Range: 0-1, Default: 0, Manual p.4-49 */
export const Param_08_23 = P.makeParam(GROUP_08_Protection_Parameters._08_23, {
  group, code: "08-23", name: "Ground Fault (GF) Selection",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p449,
})

/** @param 08-24 External Fault Operation Selection — Range: 0-2, Default: 0, Manual p.4-49 */
export const Param_08_24 = P.makeParam(GROUP_08_Protection_Parameters._08_24, {
  group, code: "08-24", name: "External Fault Operation Selection",
  range: "0-2 (0:Decel to stop / 1:Coast to stop / 2:Continuous operation)", default: "0", unit: "-", page: p449,
})

/** @param 08-25 Detection Selection of External Fault — Range: 0-1, Default: 0, Manual p.4-49 */
export const Param_08_25 = P.makeParam(GROUP_08_Protection_Parameters._08_25, {
  group, code: "08-25", name: "Detection Selection of External Fault",
  range: "0-1 (0:Immediately / 1:When operation started)", default: "0", unit: "-", page: p449,
})

/** @param 08-30 Run Permissive Function Selection — Range: 0-1, Default: 0, Manual p.4-49 */
export const Param_08_30 = P.makeParam(GROUP_08_Protection_Parameters._08_30, {
  group, code: "08-30", name: "Run Permissive Function Selection",
  range: "0-1 (0:Decel to stop / 1:Coast to stop)", default: "0", unit: "-", page: p449,
})

/** @param 08-35 Motor Overheating Fault Selection — Range: 0-3, Default: 0, Manual p.4-49 */
export const Param_08_35 = P.makeParam(GROUP_08_Protection_Parameters._08_35, {
  group, code: "08-35", name: "Motor Overheating Fault Selection",
  range: "0-3 (0:Disable / 1:Decel to stop / 2:Coast to stop / 3:Continue running)", default: "0", unit: "-", page: p449,
})

/** @param 08-37 Fan Control Function — Range: 0-2, Default: 0, Manual p.4-49 */
export const Param_08_37 = P.makeParam(GROUP_08_Protection_Parameters._08_37, {
  group, code: "08-37", name: "Fan Control Function",
  range: "0-2 (0:Start in operation / 1:Permanent start / 2:Start in high temp)", default: "0", unit: "-", page: p449,
})

/** @param 08-38 Delay Time of Fan Off — Range: 0~600, Default: 60, Unit: s, Manual p.4-49 */
export const Param_08_38 = P.makeParam(GROUP_08_Protection_Parameters._08_38, {
  group, code: "08-38", name: "Delay Time of Fan Off",
  range: "0~600", default: "60", unit: "s", page: p449,
})

/** @param 08-39 Delay Time of Motor Overheat Protection — Range: 1~300, Default: 60, Unit: sec, Manual p.4-49 */
export const Param_08_39 = P.makeParam(GROUP_08_Protection_Parameters._08_39, {
  group, code: "08-39", name: "Delay Time of Motor Overheat Protection",
  range: "1~300", default: "60", unit: "sec", page: p449,
})

/** @param 08-40 Motor2 Acceleration Stall Prevention Level — Range: 20~200, Default: HD:150 ND:120, Unit: %, Manual p.4-49 */
export const Param_08_40 = P.makeParam(GROUP_08_Protection_Parameters._08_40, {
  group, code: "08-40", name: "Motor2 Acceleration Stall Prevention Level",
  range: "20~200", default: "HD:150 / ND:120", unit: "%", page: p449,
})

/** @param 08-41 Motor2 Acceleration Stall Prevention Limit — Range: 1~100, Default: 50, Unit: %, Manual p.4-50 */
export const Param_08_41 = P.makeParam(GROUP_08_Protection_Parameters._08_41, {
  group, code: "08-41", name: "Motor2 Acceleration Stall Prevention Limit",
  range: "1~100", default: "50", unit: "%", page: p450,
})

/** @param 08-46 Temperature Agree Level — Range: 0~254, Default: 0, Unit: °C, Manual p.4-50 */
export const Param_08_46 = P.makeParam(GROUP_08_Protection_Parameters._08_46, {
  group, code: "08-46", name: "Temperature Agree Level",
  range: "0~254", default: "0", unit: "°C", page: p450,
})

/** @param 08-47 Temperature Reset Level — Range: 0~254, Default: 0, Unit: °C, Manual p.4-50 */
export const Param_08_47 = P.makeParam(GROUP_08_Protection_Parameters._08_47, {
  group, code: "08-47", name: "Temperature Reset Level",
  range: "0~254", default: "0", unit: "°C", page: p450,
})

/** @param 08-48 Selection of Fire Mode — Range: 0-1, Default: 0, Manual p.4-50 */
export const Param_08_48 = P.makeParam(GROUP_08_Protection_Parameters._08_48, {
  group, code: "08-48", name: "Selection of Fire Mode",
  range: "0-1 (0:Disable / 1:Enable)", default: "0", unit: "-", page: p450,
})

/** @param 08-49 Multi-Function Input Terminal Status of Fire Mode — Range: 0-1, Default: 0, Manual p.4-50 */
export const Param_08_49 = P.makeParam(GROUP_08_Protection_Parameters._08_49, {
  group, code: "08-49", name: "Multi-Function Input Terminal Status of Fire Mode",
  range: "0-1 (0:Reset after power off / 1:Reset after terminal removed)", default: "0", unit: "-", page: p450,
})

/** @param 08-50 Multi-Function Terminal Status of Fire Mode — Bit field, Default: 0000b, Manual p.4-50 */
export const Param_08_50 = P.makeParam(GROUP_08_Protection_Parameters._08_50, {
  group, code: "08-50", name: "Multi-Function Terminal Status of Fire Mode",
  range: "bit0:S6 A/B contact (0:A / 1:B)", default: "0000b (0)", unit: "-", page: p450,
})

/** @param 08-51 Motor Speed Setting Source of Fire Mode — Range: 0-2, Default: 0, Manual p.4-50 */
export const Param_08_51 = P.makeParam(GROUP_08_Protection_Parameters._08_51, {
  group, code: "08-51", name: "Motor Speed Setting Source of Fire Mode",
  range: "0-2 (0:Fire speed / 1:PID / 2:AI2)", default: "0", unit: "-", page: p450,
})

/** @param 08-53 PID Detection Level of Fire Mode — Range: 0~100, Default: 0, Unit: %, Manual p.4-50 */
export const Param_08_53 = P.makeParam(GROUP_08_Protection_Parameters._08_53, {
  group, code: "08-53", name: "PID Detection Level of Fire Mode",
  range: "0~100", default: "0", unit: "%", page: p450,
})

/** @param 08-55 PID Feedback Loss Detection Selection of Fire Mode — Range: 0-2, Default: 1, Manual p.4-50 */
export const Param_08_55 = P.makeParam(GROUP_08_Protection_Parameters._08_55, {
  group, code: "08-55", name: "PID Feedback Loss Detection Selection of Fire Mode",
  range: "0-2 (0:Keep running / 1:Fire speed / 2:Max output freq)", default: "1", unit: "-", page: p450,
})

/** @param 08-58 Selection of Fire Mode AI2 Signal Loss — Range: 0-2, Default: 1, Manual p.4-51 */
export const Param_08_58 = P.makeParam(GROUP_08_Protection_Parameters._08_58, {
  group, code: "08-58", name: "Selection of Fire Mode AI2 Signal Loss",
  range: "0-2 (0:Keep running / 1:Fire speed / 2:Max output freq)", default: "1", unit: "-", page: p451,
})

/** @param 08-59 Fire Mode Motor Direction — Range: 0-1, Default: 0, Manual p.4-51 */
export const Param_08_59 = P.makeParam(GROUP_08_Protection_Parameters._08_59, {
  group, code: "08-59", name: "Fire Mode Motor Direction",
  range: "0-1 (0:Forward / 1:Reverse)", default: "0", unit: "-", page: p451,
})

/** @param 08-60 Fire Mode Password — Range: 00000~65534, Default: 0, Manual p.4-51 */
export const Param_08_60 = P.makeParam(GROUP_08_Protection_Parameters._08_60, {
  group, code: "08-60", name: "Fire Mode Password",
  range: "0~65534", default: "0", unit: "-", page: p451,
})

// ── Scaled (×0.1) parameters ───────────────────────────────

/** @param 08-16 Time of Over-Torque Detection — Range: 0.0~10.0, Default: 0.1, Unit: Sec, Manual p.4-48 */
export const Param_08_16 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_16, 0.1, {
  group, code: "08-16", name: "Time of Over-Torque Detection",
  range: "0.0~10.0", default: "0.1", unit: "Sec", page: p448,
})

/** @param 08-20 Time of Low-Torque Detection — Range: 0.0~10.0, Default: 0.1, Unit: Sec, Manual p.4-49 */
export const Param_08_20 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_20, 0.1, {
  group, code: "08-20", name: "Time of Low-Torque Detection",
  range: "0.0~10.0", default: "0.1", unit: "Sec", page: p449,
})

/** @param 08-42 PTC Protection Level — Range: 0.1~10.0, Default: 0.7, Unit: V, Manual p.4-50 */
export const Param_08_42 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_42, 0.1, {
  group, code: "08-42", name: "PTC Protection Level",
  range: "0.1~10.0", default: "0.7", unit: "V", page: p450,
})

/** @param 08-43 PTC Restart Level — Range: 0.1~10.0, Default: 0.3, Unit: V, Manual p.4-50 */
export const Param_08_43 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_43, 0.1, {
  group, code: "08-43", name: "PTC Restart Level",
  range: "0.1~10.0", default: "0.3", unit: "V", page: p450,
})

/** @param 08-44 PTC Warning Level — Range: 0.1~10.0, Default: 0.5, Unit: V, Manual p.4-50 */
export const Param_08_44 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_44, 0.1, {
  group, code: "08-44", name: "PTC Warning Level",
  range: "0.1~10.0", default: "0.5", unit: "V", page: p450,
})

/** @param 08-54 Delay Time of Fire Mode PID Loss — Range: 0.0~10.0, Default: 1.0, Unit: s, Manual p.4-50 */
export const Param_08_54 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_54, 0.1, {
  group, code: "08-54", name: "Delay Time of Fire Mode PID Loss",
  range: "0.0~10.0", default: "1.0", unit: "s", page: p450,
})

/** @param 08-56 Detection Level of Fire Mode AI2 Signal — Range: 0.0~100.0, Default: 80.0, Unit: %, Manual p.4-50 */
export const Param_08_56 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_56, 0.1, {
  group, code: "08-56", name: "Detection Level of Fire Mode AI2 Signal",
  range: "0.0~100.0", default: "80.0", unit: "%", page: p450,
})

/** @param 08-57 Delay Time of Fire Mode AI2 Signal Loss — Range: 0.0~10.0, Default: 1.0, Unit: s, Manual p.4-50 */
export const Param_08_57 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_57, 0.1, {
  group, code: "08-57", name: "Delay Time of Fire Mode AI2 Signal Loss",
  range: "0.0~10.0", default: "1.0", unit: "s", page: p450,
})

// ── Scaled (×0.01) parameters ──────────────────────────────

/** @param 08-36 PTC Input Filter Time Constant — Range: 0.00~5.00, Default: 2.00, Unit: Sec, Manual p.4-49 */
export const Param_08_36 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_36, 0.01, {
  group, code: "08-36", name: "PTC Input Filter Time Constant",
  range: "0.00~5.00", default: "2.00", unit: "Sec", page: p449,
})

/** @param 08-52 Motor Speed of Fire Mode — Range: 0.00~100.00, Default: 100.00, Unit: %, Manual p.4-50 */
export const Param_08_52 = P.makeScaledParam(GROUP_08_Protection_Parameters._08_52, 0.01, {
  group, code: "08-52", name: "Motor Speed of Fire Mode",
  range: "0.00~100.00", default: "100.00", unit: "%", page: p450,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode08_00 = P.makeDecode(Param_08_00)
export const encode08_00 = P.makeEncode(Param_08_00)
export const formatted08_00 = P.makeFormatted(Param_08_00)

export const decode08_01 = P.makeDecode(Param_08_01)
export const encode08_01 = P.makeEncode(Param_08_01)
export const formatted08_01 = P.makeFormatted(Param_08_01)

export const decode08_02 = P.makeDecode(Param_08_02)
export const encode08_02 = P.makeEncode(Param_08_02)
export const formatted08_02 = P.makeFormatted(Param_08_02)

export const decode08_03 = P.makeDecode(Param_08_03)
export const encode08_03 = P.makeEncode(Param_08_03)
export const formatted08_03 = P.makeFormatted(Param_08_03)

export const decode08_05 = P.makeDecode(Param_08_05)
export const encode08_05 = P.makeEncode(Param_08_05)
export const formatted08_05 = P.makeFormatted(Param_08_05)

export const decode08_06 = P.makeDecode(Param_08_06)
export const encode08_06 = P.makeEncode(Param_08_06)
export const formatted08_06 = P.makeFormatted(Param_08_06)

export const decode08_07 = P.makeDecode(Param_08_07)
export const encode08_07 = P.makeEncode(Param_08_07)
export const formatted08_07 = P.makeFormatted(Param_08_07)

export const decode08_08 = P.makeDecode(Param_08_08)
export const encode08_08 = P.makeEncode(Param_08_08)
export const formatted08_08 = P.makeFormatted(Param_08_08)

export const decode08_09 = P.makeDecode(Param_08_09)
export const encode08_09 = P.makeEncode(Param_08_09)
export const formatted08_09 = P.makeFormatted(Param_08_09)

export const decode08_10 = P.makeDecode(Param_08_10)
export const encode08_10 = P.makeEncode(Param_08_10)
export const formatted08_10 = P.makeFormatted(Param_08_10)

export const decode08_13 = P.makeDecode(Param_08_13)
export const encode08_13 = P.makeEncode(Param_08_13)
export const formatted08_13 = P.makeFormatted(Param_08_13)

export const decode08_14 = P.makeDecode(Param_08_14)
export const encode08_14 = P.makeEncode(Param_08_14)
export const formatted08_14 = P.makeFormatted(Param_08_14)

export const decode08_15 = P.makeDecode(Param_08_15)
export const encode08_15 = P.makeEncode(Param_08_15)
export const formatted08_15 = P.makeFormatted(Param_08_15)

export const decode08_16 = P.makeDecode(Param_08_16)
export const encode08_16 = P.makeEncode(Param_08_16)
export const formatted08_16 = P.makeFormatted(Param_08_16)

export const decode08_17 = P.makeDecode(Param_08_17)
export const encode08_17 = P.makeEncode(Param_08_17)
export const formatted08_17 = P.makeFormatted(Param_08_17)

export const decode08_18 = P.makeDecode(Param_08_18)
export const encode08_18 = P.makeEncode(Param_08_18)
export const formatted08_18 = P.makeFormatted(Param_08_18)

export const decode08_19 = P.makeDecode(Param_08_19)
export const encode08_19 = P.makeEncode(Param_08_19)
export const formatted08_19 = P.makeFormatted(Param_08_19)

export const decode08_20 = P.makeDecode(Param_08_20)
export const encode08_20 = P.makeEncode(Param_08_20)
export const formatted08_20 = P.makeFormatted(Param_08_20)

export const decode08_21 = P.makeDecode(Param_08_21)
export const encode08_21 = P.makeEncode(Param_08_21)
export const formatted08_21 = P.makeFormatted(Param_08_21)

export const decode08_22 = P.makeDecode(Param_08_22)
export const encode08_22 = P.makeEncode(Param_08_22)
export const formatted08_22 = P.makeFormatted(Param_08_22)

export const decode08_23 = P.makeDecode(Param_08_23)
export const encode08_23 = P.makeEncode(Param_08_23)
export const formatted08_23 = P.makeFormatted(Param_08_23)

export const decode08_24 = P.makeDecode(Param_08_24)
export const encode08_24 = P.makeEncode(Param_08_24)
export const formatted08_24 = P.makeFormatted(Param_08_24)

export const decode08_25 = P.makeDecode(Param_08_25)
export const encode08_25 = P.makeEncode(Param_08_25)
export const formatted08_25 = P.makeFormatted(Param_08_25)

export const decode08_30 = P.makeDecode(Param_08_30)
export const encode08_30 = P.makeEncode(Param_08_30)
export const formatted08_30 = P.makeFormatted(Param_08_30)

export const decode08_35 = P.makeDecode(Param_08_35)
export const encode08_35 = P.makeEncode(Param_08_35)
export const formatted08_35 = P.makeFormatted(Param_08_35)

export const decode08_36 = P.makeDecode(Param_08_36)
export const encode08_36 = P.makeEncode(Param_08_36)
export const formatted08_36 = P.makeFormatted(Param_08_36)

export const decode08_37 = P.makeDecode(Param_08_37)
export const encode08_37 = P.makeEncode(Param_08_37)
export const formatted08_37 = P.makeFormatted(Param_08_37)

export const decode08_38 = P.makeDecode(Param_08_38)
export const encode08_38 = P.makeEncode(Param_08_38)
export const formatted08_38 = P.makeFormatted(Param_08_38)

export const decode08_39 = P.makeDecode(Param_08_39)
export const encode08_39 = P.makeEncode(Param_08_39)
export const formatted08_39 = P.makeFormatted(Param_08_39)

export const decode08_40 = P.makeDecode(Param_08_40)
export const encode08_40 = P.makeEncode(Param_08_40)
export const formatted08_40 = P.makeFormatted(Param_08_40)

export const decode08_41 = P.makeDecode(Param_08_41)
export const encode08_41 = P.makeEncode(Param_08_41)
export const formatted08_41 = P.makeFormatted(Param_08_41)

export const decode08_42 = P.makeDecode(Param_08_42)
export const encode08_42 = P.makeEncode(Param_08_42)
export const formatted08_42 = P.makeFormatted(Param_08_42)

export const decode08_43 = P.makeDecode(Param_08_43)
export const encode08_43 = P.makeEncode(Param_08_43)
export const formatted08_43 = P.makeFormatted(Param_08_43)

export const decode08_44 = P.makeDecode(Param_08_44)
export const encode08_44 = P.makeEncode(Param_08_44)
export const formatted08_44 = P.makeFormatted(Param_08_44)

export const decode08_46 = P.makeDecode(Param_08_46)
export const encode08_46 = P.makeEncode(Param_08_46)
export const formatted08_46 = P.makeFormatted(Param_08_46)

export const decode08_47 = P.makeDecode(Param_08_47)
export const encode08_47 = P.makeEncode(Param_08_47)
export const formatted08_47 = P.makeFormatted(Param_08_47)

export const decode08_48 = P.makeDecode(Param_08_48)
export const encode08_48 = P.makeEncode(Param_08_48)
export const formatted08_48 = P.makeFormatted(Param_08_48)

export const decode08_49 = P.makeDecode(Param_08_49)
export const encode08_49 = P.makeEncode(Param_08_49)
export const formatted08_49 = P.makeFormatted(Param_08_49)

export const decode08_50 = P.makeDecode(Param_08_50)
export const encode08_50 = P.makeEncode(Param_08_50)
export const formatted08_50 = P.makeFormatted(Param_08_50)

export const decode08_51 = P.makeDecode(Param_08_51)
export const encode08_51 = P.makeEncode(Param_08_51)
export const formatted08_51 = P.makeFormatted(Param_08_51)

export const decode08_52 = P.makeDecode(Param_08_52)
export const encode08_52 = P.makeEncode(Param_08_52)
export const formatted08_52 = P.makeFormatted(Param_08_52)

export const decode08_53 = P.makeDecode(Param_08_53)
export const encode08_53 = P.makeEncode(Param_08_53)
export const formatted08_53 = P.makeFormatted(Param_08_53)

export const decode08_54 = P.makeDecode(Param_08_54)
export const encode08_54 = P.makeEncode(Param_08_54)
export const formatted08_54 = P.makeFormatted(Param_08_54)

export const decode08_55 = P.makeDecode(Param_08_55)
export const encode08_55 = P.makeEncode(Param_08_55)
export const formatted08_55 = P.makeFormatted(Param_08_55)

export const decode08_56 = P.makeDecode(Param_08_56)
export const encode08_56 = P.makeEncode(Param_08_56)
export const formatted08_56 = P.makeFormatted(Param_08_56)

export const decode08_57 = P.makeDecode(Param_08_57)
export const encode08_57 = P.makeEncode(Param_08_57)
export const formatted08_57 = P.makeFormatted(Param_08_57)

export const decode08_58 = P.makeDecode(Param_08_58)
export const encode08_58 = P.makeEncode(Param_08_58)
export const formatted08_58 = P.makeFormatted(Param_08_58)

export const decode08_59 = P.makeDecode(Param_08_59)
export const encode08_59 = P.makeEncode(Param_08_59)
export const formatted08_59 = P.makeFormatted(Param_08_59)

export const decode08_60 = P.makeDecode(Param_08_60)
export const encode08_60 = P.makeEncode(Param_08_60)
export const formatted08_60 = P.makeFormatted(Param_08_60)

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

export const group08Params: Record<string, ParamEntry> = {
  "08-00": param(Param_08_00, decode08_00, encode08_00),
  "08-01": param(Param_08_01, decode08_01, encode08_01),
  "08-02": param(Param_08_02, decode08_02, encode08_02),
  "08-03": param(Param_08_03, decode08_03, encode08_03),
  "08-05": param(Param_08_05, decode08_05, encode08_05),
  "08-06": param(Param_08_06, decode08_06, encode08_06),
  "08-07": param(Param_08_07, decode08_07, encode08_07),
  "08-08": param(Param_08_08, decode08_08, encode08_08),
  "08-09": param(Param_08_09, decode08_09, encode08_09),
  "08-10": param(Param_08_10, decode08_10, encode08_10),
  "08-13": param(Param_08_13, decode08_13, encode08_13),
  "08-14": param(Param_08_14, decode08_14, encode08_14),
  "08-15": param(Param_08_15, decode08_15, encode08_15),
  "08-16": param(Param_08_16, decode08_16, encode08_16),
  "08-17": param(Param_08_17, decode08_17, encode08_17),
  "08-18": param(Param_08_18, decode08_18, encode08_18),
  "08-19": param(Param_08_19, decode08_19, encode08_19),
  "08-20": param(Param_08_20, decode08_20, encode08_20),
  "08-21": param(Param_08_21, decode08_21, encode08_21),
  "08-22": param(Param_08_22, decode08_22, encode08_22),
  "08-23": param(Param_08_23, decode08_23, encode08_23),
  "08-24": param(Param_08_24, decode08_24, encode08_24),
  "08-25": param(Param_08_25, decode08_25, encode08_25),
  "08-30": param(Param_08_30, decode08_30, encode08_30),
  "08-35": param(Param_08_35, decode08_35, encode08_35),
  "08-36": param(Param_08_36, decode08_36, encode08_36),
  "08-37": param(Param_08_37, decode08_37, encode08_37),
  "08-38": param(Param_08_38, decode08_38, encode08_38),
  "08-39": param(Param_08_39, decode08_39, encode08_39),
  "08-40": param(Param_08_40, decode08_40, encode08_40),
  "08-41": param(Param_08_41, decode08_41, encode08_41),
  "08-42": param(Param_08_42, decode08_42, encode08_42),
  "08-43": param(Param_08_43, decode08_43, encode08_43),
  "08-44": param(Param_08_44, decode08_44, encode08_44),
  "08-46": param(Param_08_46, decode08_46, encode08_46),
  "08-47": param(Param_08_47, decode08_47, encode08_47),
  "08-48": param(Param_08_48, decode08_48, encode08_48),
  "08-49": param(Param_08_49, decode08_49, encode08_49),
  "08-50": param(Param_08_50, decode08_50, encode08_50),
  "08-51": param(Param_08_51, decode08_51, encode08_51),
  "08-52": param(Param_08_52, decode08_52, encode08_52),
  "08-53": param(Param_08_53, decode08_53, encode08_53),
  "08-54": param(Param_08_54, decode08_54, encode08_54),
  "08-55": param(Param_08_55, decode08_55, encode08_55),
  "08-56": param(Param_08_56, decode08_56, encode08_56),
  "08-57": param(Param_08_57, decode08_57, encode08_57),
  "08-58": param(Param_08_58, decode08_58, encode08_58),
  "08-59": param(Param_08_59, decode08_59, encode08_59),
  "08-60": param(Param_08_60, decode08_60, encode08_60),
}
