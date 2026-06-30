/**
 * Group 05: Multi-Speed Parameters
 * Manual pages 4-37 to 4-39
 *
 * All 16 speed-stage frequencies (05-01 through 05-16) share the same
 * format: ×0.01 Hz, range 0.00~599.00 Hz.
 * All 32 accel/decel times (05-17 through 05-48) share the same format:
 * ×0.1 s, range 0.1~6000.0 s, default 10.0.
 */

import * as P from "./param-utils";
import { GROUP_05_Multi_Speed_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 5 as const;
const p437 = 437 as const;
const p438 = 438 as const;
const p439 = 439 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 05-00 Accel/Decel Selection of Multi-Speed — Range: 0-1, Default: 0, Manual p.4-37 */
export const Param_05_00 = P.makeParam(GROUP_05_Multi_Speed_Parameters._05_00, {
  group, code: "05-00", name: "Acceleration/Deceleration Selection of Multi-Speed",
  range: "0-1 (0:by 00-14~00-24 / 1:by 05-17~05-48)", default: "0", unit: "-", page: p437,
})

// ── Speed-stage frequency settings (×0.01 Hz) ──────────────

/** @param 05-01 Frequency Setting of Speed-Stage 0 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_01 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_01, 0.01, {
  group, code: "05-01", name: "Frequency Setting of Speed-Stage 0",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-02 Frequency Setting of Speed-Stage 1 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_02 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_02, 0.01, {
  group, code: "05-02", name: "Frequency Setting of Speed-Stage 1",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-03 Frequency Setting of Speed-Stage 2 — Range: 0.00~599.00, Default: 10.00, Unit: Hz, Manual p.4-37 */
export const Param_05_03 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_03, 0.01, {
  group, code: "05-03", name: "Frequency Setting of Speed-Stage 2",
  range: "0.00~599.00", default: "10.00", unit: "Hz", page: p437,
})

/** @param 05-04 Frequency Setting of Speed-Stage 3 — Range: 0.00~599.00, Default: 20.00, Unit: Hz, Manual p.4-37 */
export const Param_05_04 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_04, 0.01, {
  group, code: "05-04", name: "Frequency Setting of Speed-Stage 3",
  range: "0.00~599.00", default: "20.00", unit: "Hz", page: p437,
})

/** @param 05-05 Frequency Setting of Speed-Stage 4 — Range: 0.00~599.00, Default: 30.00, Unit: Hz, Manual p.4-37 */
export const Param_05_05 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_05, 0.01, {
  group, code: "05-05", name: "Frequency Setting of Speed-Stage 4",
  range: "0.00~599.00", default: "30.00", unit: "Hz", page: p437,
})

/** @param 05-06 Frequency Setting of Speed-Stage 5 — Range: 0.00~599.00, Default: 40.00, Unit: Hz, Manual p.4-37 */
export const Param_05_06 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_06, 0.01, {
  group, code: "05-06", name: "Frequency Setting of Speed-Stage 5",
  range: "0.00~599.00", default: "40.00", unit: "Hz", page: p437,
})

/** @param 05-07 Frequency Setting of Speed-Stage 6 — Range: 0.00~599.00, Default: 50.00, Unit: Hz, Manual p.4-37 */
export const Param_05_07 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_07, 0.01, {
  group, code: "05-07", name: "Frequency Setting of Speed-Stage 6",
  range: "0.00~599.00", default: "50.00", unit: "Hz", page: p437,
})

/** @param 05-08 Frequency Setting of Speed-Stage 7 — Range: 0.00~599.00, Default: 50.00, Unit: Hz, Manual p.4-37 */
export const Param_05_08 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_08, 0.01, {
  group, code: "05-08", name: "Frequency Setting of Speed-Stage 7",
  range: "0.00~599.00", default: "50.00", unit: "Hz", page: p437,
})

/** @param 05-09 Frequency Setting of Speed-Stage 8 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_09 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_09, 0.01, {
  group, code: "05-09", name: "Frequency Setting of Speed-Stage 8",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-10 Frequency Setting of Speed-Stage 9 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_10 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_10, 0.01, {
  group, code: "05-10", name: "Frequency Setting of Speed-Stage 9",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-11 Frequency Setting of Speed-Stage 10 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_11 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_11, 0.01, {
  group, code: "05-11", name: "Frequency Setting of Speed-Stage 10",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-12 Frequency Setting of Speed-Stage 11 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_12 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_12, 0.01, {
  group, code: "05-12", name: "Frequency Setting of Speed-Stage 11",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-13 Frequency Setting of Speed-Stage 12 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_13 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_13, 0.01, {
  group, code: "05-13", name: "Frequency Setting of Speed-Stage 12",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-14 Frequency Setting of Speed-Stage 13 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_14 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_14, 0.01, {
  group, code: "05-14", name: "Frequency Setting of Speed-Stage 13",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-15 Frequency Setting of Speed-Stage 14 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_15 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_15, 0.01, {
  group, code: "05-15", name: "Frequency Setting of Speed-Stage 14",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

/** @param 05-16 Frequency Setting of Speed-Stage 15 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
export const Param_05_16 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_16, 0.01, {
  group, code: "05-16", name: "Frequency Setting of Speed-Stage 15",
  range: "0.00~599.00", default: "5.00", unit: "Hz", page: p437,
})

// ── Accel/Decel time settings (×0.1 s) ─────────────────────

/** @param 05-17 Acceleration Time of Multi Speed 0 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_17 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_17, 0.1, {
  group, code: "05-17", name: "Acceleration Time of Multi Speed 0",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-18 Deceleration Time of Multi Speed 0 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_18 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_18, 0.1, {
  group, code: "05-18", name: "Deceleration Time of Multi Speed 0",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-19 Acceleration Time of Multi Speed 1 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_19 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_19, 0.1, {
  group, code: "05-19", name: "Acceleration Time of Multi Speed 1",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-20 Deceleration Time of Multi Speed 1 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_20 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_20, 0.1, {
  group, code: "05-20", name: "Deceleration Time of Multi Speed 1",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-21 Acceleration Time of Multi Speed 2 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_21 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_21, 0.1, {
  group, code: "05-21", name: "Acceleration Time of Multi Speed 2",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-22 Deceleration Time of Multi Speed 2 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_22 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_22, 0.1, {
  group, code: "05-22", name: "Deceleration Time of Multi Speed 2",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-23 Acceleration Time of Multi Speed 3 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_23 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_23, 0.1, {
  group, code: "05-23", name: "Acceleration Time of Multi Speed 3",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-24 Deceleration Time of Multi Speed 3 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_24 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_24, 0.1, {
  group, code: "05-24", name: "Deceleration Time of Multi Speed 3",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-25 Acceleration Time of Multi Speed 4 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_25 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_25, 0.1, {
  group, code: "05-25", name: "Acceleration Time of Multi Speed 4",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-26 Deceleration Time of Multi Speed 4 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
export const Param_05_26 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_26, 0.1, {
  group, code: "05-26", name: "Deceleration Time of Multi Speed 4",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p437,
})

/** @param 05-27 Acceleration Time of Multi Speed 5 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_27 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_27, 0.1, {
  group, code: "05-27", name: "Acceleration Time of Multi Speed 5",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-28 Deceleration Time of Multi Speed 5 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_28 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_28, 0.1, {
  group, code: "05-28", name: "Deceleration Time of Multi Speed 5",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-29 Acceleration Time of Multi Speed 6 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_29 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_29, 0.1, {
  group, code: "05-29", name: "Acceleration Time of Multi Speed 6",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-30 Deceleration Time of Multi Speed 6 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_30 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_30, 0.1, {
  group, code: "05-30", name: "Deceleration Time of Multi Speed 6",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-31 Acceleration Time of Multi Speed 7 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_31 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_31, 0.1, {
  group, code: "05-31", name: "Acceleration Time of Multi Speed 7",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-32 Deceleration Time of Multi Speed 7 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_32 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_32, 0.1, {
  group, code: "05-32", name: "Deceleration Time of Multi Speed 7",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-33 Acceleration Time of Multi Speed 8 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_33 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_33, 0.1, {
  group, code: "05-33", name: "Acceleration Time of Multi Speed 8",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-34 Deceleration Time of Multi Speed 8 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_34 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_34, 0.1, {
  group, code: "05-34", name: "Deceleration Time of Multi Speed 8",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-35 Acceleration Time of Multi Speed 9 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_35 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_35, 0.1, {
  group, code: "05-35", name: "Acceleration Time of Multi Speed 9",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-36 Deceleration Time of Multi Speed 9 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_36 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_36, 0.1, {
  group, code: "05-36", name: "Deceleration Time of Multi Speed 9",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-37 Acceleration Time of Multi Speed 10 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_37 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_37, 0.1, {
  group, code: "05-37", name: "Acceleration Time of Multi Speed 10",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-38 Deceleration Time of Multi Speed 10 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_38 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_38, 0.1, {
  group, code: "05-38", name: "Deceleration Time of Multi Speed 10",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-39 Acceleration Time of Multi Speed 11 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_39 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_39, 0.1, {
  group, code: "05-39", name: "Acceleration Time of Multi Speed 11",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-40 Deceleration Time of Multi Speed 11 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_40 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_40, 0.1, {
  group, code: "05-40", name: "Deceleration Time of Multi Speed 11",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-41 Acceleration Time of Multi Speed 12 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_41 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_41, 0.1, {
  group, code: "05-41", name: "Acceleration Time of Multi Speed 12",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-42 Deceleration Time of Multi Speed 12 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_42 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_42, 0.1, {
  group, code: "05-42", name: "Deceleration Time of Multi Speed 12",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-43 Acceleration Time of Multi Speed 13 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
export const Param_05_43 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_43, 0.1, {
  group, code: "05-43", name: "Acceleration Time of Multi Speed 13",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p438,
})

/** @param 05-44 Deceleration Time of Multi Speed 13 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
export const Param_05_44 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_44, 0.1, {
  group, code: "05-44", name: "Deceleration Time of Multi Speed 13",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p439,
})

/** @param 05-45 Acceleration Time of Multi Speed 14 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
export const Param_05_45 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_45, 0.1, {
  group, code: "05-45", name: "Acceleration Time of Multi Speed 14",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p439,
})

/** @param 05-46 Deceleration Time of Multi Speed 14 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
export const Param_05_46 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_46, 0.1, {
  group, code: "05-46", name: "Deceleration Time of Multi Speed 14",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p439,
})

/** @param 05-47 Acceleration Time of Multi Speed 15 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
export const Param_05_47 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_47, 0.1, {
  group, code: "05-47", name: "Acceleration Time of Multi Speed 15",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p439,
})

/** @param 05-48 Deceleration Time of Multi Speed 15 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
export const Param_05_48 = P.makeScaledParam(GROUP_05_Multi_Speed_Parameters._05_48, 0.1, {
  group, code: "05-48", name: "Deceleration Time of Multi Speed 15",
  range: "0.1~6000.0", default: "10.0", unit: "s", page: p439,
})

// ── Decode / Encode / Formatted exports ────────────────────

export const decode05_00 = P.makeDecode(Param_05_00)
export const encode05_00 = P.makeEncode(Param_05_00)
export const formatted05_00 = P.makeFormatted(Param_05_00)

export const decode05_01 = P.makeDecode(Param_05_01)
export const encode05_01 = P.makeEncode(Param_05_01)
export const formatted05_01 = P.makeFormatted(Param_05_01)

export const decode05_02 = P.makeDecode(Param_05_02)
export const encode05_02 = P.makeEncode(Param_05_02)
export const formatted05_02 = P.makeFormatted(Param_05_02)

export const decode05_03 = P.makeDecode(Param_05_03)
export const encode05_03 = P.makeEncode(Param_05_03)
export const formatted05_03 = P.makeFormatted(Param_05_03)

export const decode05_04 = P.makeDecode(Param_05_04)
export const encode05_04 = P.makeEncode(Param_05_04)
export const formatted05_04 = P.makeFormatted(Param_05_04)

export const decode05_05 = P.makeDecode(Param_05_05)
export const encode05_05 = P.makeEncode(Param_05_05)
export const formatted05_05 = P.makeFormatted(Param_05_05)

export const decode05_06 = P.makeDecode(Param_05_06)
export const encode05_06 = P.makeEncode(Param_05_06)
export const formatted05_06 = P.makeFormatted(Param_05_06)

export const decode05_07 = P.makeDecode(Param_05_07)
export const encode05_07 = P.makeEncode(Param_05_07)
export const formatted05_07 = P.makeFormatted(Param_05_07)

export const decode05_08 = P.makeDecode(Param_05_08)
export const encode05_08 = P.makeEncode(Param_05_08)
export const formatted05_08 = P.makeFormatted(Param_05_08)

export const decode05_09 = P.makeDecode(Param_05_09)
export const encode05_09 = P.makeEncode(Param_05_09)
export const formatted05_09 = P.makeFormatted(Param_05_09)

export const decode05_10 = P.makeDecode(Param_05_10)
export const encode05_10 = P.makeEncode(Param_05_10)
export const formatted05_10 = P.makeFormatted(Param_05_10)

export const decode05_11 = P.makeDecode(Param_05_11)
export const encode05_11 = P.makeEncode(Param_05_11)
export const formatted05_11 = P.makeFormatted(Param_05_11)

export const decode05_12 = P.makeDecode(Param_05_12)
export const encode05_12 = P.makeEncode(Param_05_12)
export const formatted05_12 = P.makeFormatted(Param_05_12)

export const decode05_13 = P.makeDecode(Param_05_13)
export const encode05_13 = P.makeEncode(Param_05_13)
export const formatted05_13 = P.makeFormatted(Param_05_13)

export const decode05_14 = P.makeDecode(Param_05_14)
export const encode05_14 = P.makeEncode(Param_05_14)
export const formatted05_14 = P.makeFormatted(Param_05_14)

export const decode05_15 = P.makeDecode(Param_05_15)
export const encode05_15 = P.makeEncode(Param_05_15)
export const formatted05_15 = P.makeFormatted(Param_05_15)

export const decode05_16 = P.makeDecode(Param_05_16)
export const encode05_16 = P.makeEncode(Param_05_16)
export const formatted05_16 = P.makeFormatted(Param_05_16)

export const decode05_17 = P.makeDecode(Param_05_17)
export const encode05_17 = P.makeEncode(Param_05_17)
export const formatted05_17 = P.makeFormatted(Param_05_17)

export const decode05_18 = P.makeDecode(Param_05_18)
export const encode05_18 = P.makeEncode(Param_05_18)
export const formatted05_18 = P.makeFormatted(Param_05_18)

export const decode05_19 = P.makeDecode(Param_05_19)
export const encode05_19 = P.makeEncode(Param_05_19)
export const formatted05_19 = P.makeFormatted(Param_05_19)

export const decode05_20 = P.makeDecode(Param_05_20)
export const encode05_20 = P.makeEncode(Param_05_20)
export const formatted05_20 = P.makeFormatted(Param_05_20)

export const decode05_21 = P.makeDecode(Param_05_21)
export const encode05_21 = P.makeEncode(Param_05_21)
export const formatted05_21 = P.makeFormatted(Param_05_21)

export const decode05_22 = P.makeDecode(Param_05_22)
export const encode05_22 = P.makeEncode(Param_05_22)
export const formatted05_22 = P.makeFormatted(Param_05_22)

export const decode05_23 = P.makeDecode(Param_05_23)
export const encode05_23 = P.makeEncode(Param_05_23)
export const formatted05_23 = P.makeFormatted(Param_05_23)

export const decode05_24 = P.makeDecode(Param_05_24)
export const encode05_24 = P.makeEncode(Param_05_24)
export const formatted05_24 = P.makeFormatted(Param_05_24)

export const decode05_25 = P.makeDecode(Param_05_25)
export const encode05_25 = P.makeEncode(Param_05_25)
export const formatted05_25 = P.makeFormatted(Param_05_25)

export const decode05_26 = P.makeDecode(Param_05_26)
export const encode05_26 = P.makeEncode(Param_05_26)
export const formatted05_26 = P.makeFormatted(Param_05_26)

export const decode05_27 = P.makeDecode(Param_05_27)
export const encode05_27 = P.makeEncode(Param_05_27)
export const formatted05_27 = P.makeFormatted(Param_05_27)

export const decode05_28 = P.makeDecode(Param_05_28)
export const encode05_28 = P.makeEncode(Param_05_28)
export const formatted05_28 = P.makeFormatted(Param_05_28)

export const decode05_29 = P.makeDecode(Param_05_29)
export const encode05_29 = P.makeEncode(Param_05_29)
export const formatted05_29 = P.makeFormatted(Param_05_29)

export const decode05_30 = P.makeDecode(Param_05_30)
export const encode05_30 = P.makeEncode(Param_05_30)
export const formatted05_30 = P.makeFormatted(Param_05_30)

export const decode05_31 = P.makeDecode(Param_05_31)
export const encode05_31 = P.makeEncode(Param_05_31)
export const formatted05_31 = P.makeFormatted(Param_05_31)

export const decode05_32 = P.makeDecode(Param_05_32)
export const encode05_32 = P.makeEncode(Param_05_32)
export const formatted05_32 = P.makeFormatted(Param_05_32)

export const decode05_33 = P.makeDecode(Param_05_33)
export const encode05_33 = P.makeEncode(Param_05_33)
export const formatted05_33 = P.makeFormatted(Param_05_33)

export const decode05_34 = P.makeDecode(Param_05_34)
export const encode05_34 = P.makeEncode(Param_05_34)
export const formatted05_34 = P.makeFormatted(Param_05_34)

export const decode05_35 = P.makeDecode(Param_05_35)
export const encode05_35 = P.makeEncode(Param_05_35)
export const formatted05_35 = P.makeFormatted(Param_05_35)

export const decode05_36 = P.makeDecode(Param_05_36)
export const encode05_36 = P.makeEncode(Param_05_36)
export const formatted05_36 = P.makeFormatted(Param_05_36)

export const decode05_37 = P.makeDecode(Param_05_37)
export const encode05_37 = P.makeEncode(Param_05_37)
export const formatted05_37 = P.makeFormatted(Param_05_37)

export const decode05_38 = P.makeDecode(Param_05_38)
export const encode05_38 = P.makeEncode(Param_05_38)
export const formatted05_38 = P.makeFormatted(Param_05_38)

export const decode05_39 = P.makeDecode(Param_05_39)
export const encode05_39 = P.makeEncode(Param_05_39)
export const formatted05_39 = P.makeFormatted(Param_05_39)

export const decode05_40 = P.makeDecode(Param_05_40)
export const encode05_40 = P.makeEncode(Param_05_40)
export const formatted05_40 = P.makeFormatted(Param_05_40)

export const decode05_41 = P.makeDecode(Param_05_41)
export const encode05_41 = P.makeEncode(Param_05_41)
export const formatted05_41 = P.makeFormatted(Param_05_41)

export const decode05_42 = P.makeDecode(Param_05_42)
export const encode05_42 = P.makeEncode(Param_05_42)
export const formatted05_42 = P.makeFormatted(Param_05_42)

export const decode05_43 = P.makeDecode(Param_05_43)
export const encode05_43 = P.makeEncode(Param_05_43)
export const formatted05_43 = P.makeFormatted(Param_05_43)

export const decode05_44 = P.makeDecode(Param_05_44)
export const encode05_44 = P.makeEncode(Param_05_44)
export const formatted05_44 = P.makeFormatted(Param_05_44)

export const decode05_45 = P.makeDecode(Param_05_45)
export const encode05_45 = P.makeEncode(Param_05_45)
export const formatted05_45 = P.makeFormatted(Param_05_45)

export const decode05_46 = P.makeDecode(Param_05_46)
export const encode05_46 = P.makeEncode(Param_05_46)
export const formatted05_46 = P.makeFormatted(Param_05_46)

export const decode05_47 = P.makeDecode(Param_05_47)
export const encode05_47 = P.makeEncode(Param_05_47)
export const formatted05_47 = P.makeFormatted(Param_05_47)

export const decode05_48 = P.makeDecode(Param_05_48)
export const encode05_48 = P.makeEncode(Param_05_48)
export const formatted05_48 = P.makeFormatted(Param_05_48)

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

export const group05Params: Record<string, ParamEntry> = {
  "05-00": param(Param_05_00, decode05_00, encode05_00),
  "05-01": param(Param_05_01, decode05_01, encode05_01),
  "05-02": param(Param_05_02, decode05_02, encode05_02),
  "05-03": param(Param_05_03, decode05_03, encode05_03),
  "05-04": param(Param_05_04, decode05_04, encode05_04),
  "05-05": param(Param_05_05, decode05_05, encode05_05),
  "05-06": param(Param_05_06, decode05_06, encode05_06),
  "05-07": param(Param_05_07, decode05_07, encode05_07),
  "05-08": param(Param_05_08, decode05_08, encode05_08),
  "05-09": param(Param_05_09, decode05_09, encode05_09),
  "05-10": param(Param_05_10, decode05_10, encode05_10),
  "05-11": param(Param_05_11, decode05_11, encode05_11),
  "05-12": param(Param_05_12, decode05_12, encode05_12),
  "05-13": param(Param_05_13, decode05_13, encode05_13),
  "05-14": param(Param_05_14, decode05_14, encode05_14),
  "05-15": param(Param_05_15, decode05_15, encode05_15),
  "05-16": param(Param_05_16, decode05_16, encode05_16),
  "05-17": param(Param_05_17, decode05_17, encode05_17),
  "05-18": param(Param_05_18, decode05_18, encode05_18),
  "05-19": param(Param_05_19, decode05_19, encode05_19),
  "05-20": param(Param_05_20, decode05_20, encode05_20),
  "05-21": param(Param_05_21, decode05_21, encode05_21),
  "05-22": param(Param_05_22, decode05_22, encode05_22),
  "05-23": param(Param_05_23, decode05_23, encode05_23),
  "05-24": param(Param_05_24, decode05_24, encode05_24),
  "05-25": param(Param_05_25, decode05_25, encode05_25),
  "05-26": param(Param_05_26, decode05_26, encode05_26),
  "05-27": param(Param_05_27, decode05_27, encode05_27),
  "05-28": param(Param_05_28, decode05_28, encode05_28),
  "05-29": param(Param_05_29, decode05_29, encode05_29),
  "05-30": param(Param_05_30, decode05_30, encode05_30),
  "05-31": param(Param_05_31, decode05_31, encode05_31),
  "05-32": param(Param_05_32, decode05_32, encode05_32),
  "05-33": param(Param_05_33, decode05_33, encode05_33),
  "05-34": param(Param_05_34, decode05_34, encode05_34),
  "05-35": param(Param_05_35, decode05_35, encode05_35),
  "05-36": param(Param_05_36, decode05_36, encode05_36),
  "05-37": param(Param_05_37, decode05_37, encode05_37),
  "05-38": param(Param_05_38, decode05_38, encode05_38),
  "05-39": param(Param_05_39, decode05_39, encode05_39),
  "05-40": param(Param_05_40, decode05_40, encode05_40),
  "05-41": param(Param_05_41, decode05_41, encode05_41),
  "05-42": param(Param_05_42, decode05_42, encode05_42),
  "05-43": param(Param_05_43, decode05_43, encode05_43),
  "05-44": param(Param_05_44, decode05_44, encode05_44),
  "05-45": param(Param_05_45, decode05_45, encode05_45),
  "05-46": param(Param_05_46, decode05_46, encode05_46),
  "05-47": param(Param_05_47, decode05_47, encode05_47),
  "05-48": param(Param_05_48, decode05_48, encode05_48),
}
