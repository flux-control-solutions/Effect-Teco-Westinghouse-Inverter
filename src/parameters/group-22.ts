/**
 * Group 22: PM Motor Parameters
 * Manual pages 4-85 to 4-88
 */

import * as P from "./param-utils";
import { GROUP_22_PM_Motor_Parameters } from "../Registers";
import { Schema } from "effect";

const group = 22 as const;
const p485 = 485 as const;
const p486 = 486 as const;
const p487 = 487 as const;
const p488 = 488 as const;

const p = (addr: number, meta: P.ParamMeta) => {
  const schema = P.makeParam(addr, meta) as Schema.Schema<any, any>;
  return {
    schema,
    decode: P.makeDecode(schema),
    encode: P.makeEncode(schema),
    formatted: P.makeFormatted(schema),
  };
};
const sp = (addr: number, factor: number, meta: P.ParamMeta) => {
  const schema = P.makeScaledParam(addr, factor, meta) as Schema.Schema<
    any,
    any
  >;
  return {
    schema,
    decode: P.makeDecode(schema),
    encode: P.makeEncode(schema),
    formatted: P.makeFormatted(schema),
  };
};

type ParamEntry = {
  schema: Schema.Schema<any, any>;
  decode: ReturnType<typeof P.makeDecode>;
  encode: ReturnType<typeof P.makeEncode>;
};

const all: Record<
  string,
  { schema: Schema.Schema<any, any>; decode: any; encode: any; formatted: any }
> = {
  "22-00": sp(GROUP_22_PM_Motor_Parameters._22_00, 0.01, {
    group,
    code: "22-00",
    name: "PM Motor Rated Power",
    range: "0.00~600.00",
    default: "* (see Attachment 1 p.170)",
    unit: "kW",
    page: p485,
  }),
  "22-01": sp(GROUP_22_PM_Motor_Parameters._22_01, 0.1, {
    group,
    code: "22-01",
    name: "PM Motor Rated Voltage",
    range: "230V:50.0~240.0 / 460V:100.0~480.0",
    default: "220.0 / 440.0",
    unit: "V",
    page: p485,
  }),
  "22-02": p(GROUP_22_PM_Motor_Parameters._22_02, {
    group,
    code: "22-02",
    name: "PM Motor Rated Current",
    range: "25%~200% inverter rated",
    default: "* (see Attachment 1 p.170)",
    unit: "A",
    page: p485,
  }),
  "22-03": p(GROUP_22_PM_Motor_Parameters._22_03, {
    group,
    code: "22-03",
    name: "PM Motor's Pole Number",
    range: "2~96",
    default: "6",
    unit: "poles",
    page: p485,
  }),
  "22-04": p(GROUP_22_PM_Motor_Parameters._22_04, {
    group,
    code: "22-04",
    name: "PM Motor's Rotation Speed",
    range: "6~60000",
    default: "1500",
    unit: "rpm",
    page: p485,
  }),
  "22-05": p(GROUP_22_PM_Motor_Parameters._22_05, {
    group,
    code: "22-05",
    name: "PM Motor's Max Rotation Speed",
    range: "6~60000",
    default: "1500",
    unit: "rpm",
    page: p485,
  }),
  "22-06": sp(GROUP_22_PM_Motor_Parameters._22_06, 0.1, {
    group,
    code: "22-06",
    name: "PM Motor Rated Frequency",
    range: "4.8~599.0",
    default: "75.0",
    unit: "Hz",
    page: p485,
  }),
  "22-07": p(GROUP_22_PM_Motor_Parameters._22_07, {
    group,
    code: "22-07",
    name: "PM Type Selection",
    range: "0-1 (0:SPM / 1:IPM)",
    default: "0",
    unit: "-",
    page: p485,
  }),
  "22-08": p(GROUP_22_PM_Motor_Parameters._22_08, {
    group,
    code: "22-08",
    name: "PM Encoder Type",
    range:
      "0-4 (0:Tamagawa Non-WireSaving / 1:Tamagawa WireSaving / 2:Sumtak WireSaving / 3:General Incremental / 4:Sine Wave)",
    default: "0",
    unit: "-",
    page: p485,
  }),
  "22-10": p(GROUP_22_PM_Motor_Parameters._22_10, {
    group,
    code: "22-10",
    name: "PM SLV Start Current",
    range: "20~200% Motor Rated Current",
    default: "80",
    unit: "%",
    page: p486,
  }),
  "22-11": p(GROUP_22_PM_Motor_Parameters._22_11, {
    group,
    code: "22-11",
    name: "I/F Mode Start Freq Switching Point",
    range: "10~100",
    default: "10",
    unit: "%",
    page: p486,
  }),
  "22-14": sp(GROUP_22_PM_Motor_Parameters._22_14, 0.001, {
    group,
    code: "22-14",
    name: "Armature Resistance of PM Motor",
    range: "0.001~30.000",
    default: "1.000",
    unit: "Ω",
    page: p486,
  }),
  "22-15": sp(GROUP_22_PM_Motor_Parameters._22_15, 0.01, {
    group,
    code: "22-15",
    name: "D-axis Inductance of PM Motor",
    range: "0.01~300.00",
    default: "10.00",
    unit: "mH",
    page: p486,
  }),
  "22-16": sp(GROUP_22_PM_Motor_Parameters._22_16, 0.01, {
    group,
    code: "22-16",
    name: "Q-axis Inductance of PM Motor",
    range: "0.01~300.00",
    default: "10.00",
    unit: "mH",
    page: p486,
  }),
  "22-17": p(GROUP_22_PM_Motor_Parameters._22_17, {
    group,
    code: "22-17",
    name: "PM No-Load Voltage",
    range: "200V:0~200 / 400V:0~400",
    default: "150 / 300",
    unit: "V",
    page: p486,
  }),
  "22-18": p(GROUP_22_PM_Motor_Parameters._22_18, {
    group,
    code: "22-18",
    name: "Flux-Weakening Limit",
    range: "0~100",
    default: "0",
    unit: "%",
    page: p486,
  }),
  "22-20": p(GROUP_22_PM_Motor_Parameters._22_20, {
    group,
    code: "22-20",
    name: "Offset Angle of Magnetic Pole and PG Origin",
    range: "0~360",
    default: "0",
    unit: "deg",
    page: p487,
  }),
  "22-21": p(GROUP_22_PM_Motor_Parameters._22_21, {
    group,
    code: "22-21",
    name: "PM Motor Tuning",
    range:
      "0-3 (0:Not active / 1:Param auto-tune / 2:Mag pole align+loop adjust / 3:Mag pole alignment)",
    default: "0",
    unit: "-",
    page: p487,
  }),
  "22-22": p(GROUP_22_PM_Motor_Parameters._22_22, {
    group,
    code: "22-22",
    name: "Fault History of PM Motor Tuning",
    range:
      "0-11 (0:No Error / 1:Static Mag Alignment / 2:No PG / 3:Rot Pole forced stop / 4:Encoder feedback dir / 5:Loop timeout / 6:Encoder error / 7:Other / 8:Current abn during align / 9:Current abn during loop / 10:Reserved / 11:Stator R timeout)",
    default: "0",
    unit: "-",
    page: p487,
  }),
  "22-25": p(GROUP_22_PM_Motor_Parameters._22_25, {
    group,
    code: "22-25",
    name: "Detection Mode Selection of Initial Magnetic Pole",
    range: "0-2 (0:Angle before stopping / 1:Mode1 / 2:Mode2)",
    default: "2",
    unit: "-",
    page: p487,
  }),
  "22-26": p(GROUP_22_PM_Motor_Parameters._22_26, {
    group,
    code: "22-26",
    name: "Estimator Mode",
    range: "0-1",
    default: "0",
    unit: "-",
    page: p487,
  }),
  "22-27": p(GROUP_22_PM_Motor_Parameters._22_27, {
    group,
    code: "22-27",
    name: "Voltage Command of Mode 2",
    range: "5~120",
    default: "50",
    unit: "%",
    page: p487,
  }),
  "22-28": p(GROUP_22_PM_Motor_Parameters._22_28, {
    group,
    code: "22-28",
    name: "Divider Ratio of Mode 2",
    range: "0~8",
    default: "2",
    unit: "-",
    page: p487,
  }),
  "22-29": p(GROUP_22_PM_Motor_Parameters._22_29, {
    group,
    code: "22-29",
    name: "Flux-weakening Voltage Command Restriction",
    range: "80~110",
    default: "95",
    unit: "%",
    page: p488,
  }),
  "22-30": p(GROUP_22_PM_Motor_Parameters._22_30, {
    group,
    code: "22-30",
    name: "SPM Speed Estimation Gain",
    range: "1~100",
    default: "85",
    unit: "%",
    page: p488,
  }),
  "22-31": p(GROUP_22_PM_Motor_Parameters._22_31, {
    group,
    code: "22-31",
    name: "SPM Speed Estimation Filter Value",
    range: "1~2000",
    default: "60",
    unit: "Hz",
    page: p488,
  }),
  "22-32": p(GROUP_22_PM_Motor_Parameters._22_32, {
    group,
    code: "22-32",
    name: "MTPA Selection",
    range: "0-3 (0:Disabled / 1:Mode1 / 2:Mode2 / 3:Mode3)",
    default: "2",
    unit: "-",
    page: p488,
  }),
  "22-33": p(GROUP_22_PM_Motor_Parameters._22_33, {
    group,
    code: "22-33",
    name: "MTPA Gain",
    range: "0~400",
    default: "200",
    unit: "%",
    page: p488,
  }),
  "22-34": sp(GROUP_22_PM_Motor_Parameters._22_34, 0.1, {
    group,
    code: "22-34",
    name: "IPM Estimator Gain",
    range: "0.1~500.0",
    default: "30.0",
    unit: "-",
    page: p488,
  }),
  "22-35": p(GROUP_22_PM_Motor_Parameters._22_35, {
    group,
    code: "22-35",
    name: "IPM Estimator Compensation",
    range: "0~300",
    default: "50",
    unit: "%",
    page: p488,
  }),
};

// ── Static named exports ───────────────────────────────────

const e = (code: string) => all[code]!;
const em = (code: string) => e(code);

export const Param_22_00 = em("22-00").schema;
export const decode22_00 = em("22-00").decode;
export const encode22_00 = em("22-00").encode;
export const formatted22_00 = em("22-00").formatted;

export const Param_22_01 = em("22-01").schema;
export const decode22_01 = em("22-01").decode;
export const encode22_01 = em("22-01").encode;
export const formatted22_01 = em("22-01").formatted;

export const Param_22_02 = em("22-02").schema as Schema.Schema<any, any>;
export const decode22_02 = em("22-02").decode;
export const encode22_02 = em("22-02").encode;
export const formatted22_02 = em("22-02").formatted;

export const Param_22_03 = em("22-03").schema as Schema.Schema<any, any>;
export const decode22_03 = em("22-03").decode;
export const encode22_03 = em("22-03").encode;
export const formatted22_03 = em("22-03").formatted;

export const Param_22_04 = em("22-04").schema as Schema.Schema<any, any>;
export const decode22_04 = em("22-04").decode;
export const encode22_04 = em("22-04").encode;
export const formatted22_04 = em("22-04").formatted;

export const Param_22_05 = em("22-05").schema as Schema.Schema<any, any>;
export const decode22_05 = em("22-05").decode;
export const encode22_05 = em("22-05").encode;
export const formatted22_05 = em("22-05").formatted;

export const Param_22_06 = em("22-06").schema as Schema.Schema<any, any>;
export const decode22_06 = em("22-06").decode;
export const encode22_06 = em("22-06").encode;
export const formatted22_06 = em("22-06").formatted;

export const Param_22_07 = em("22-07").schema as Schema.Schema<any, any>;
export const decode22_07 = em("22-07").decode;
export const encode22_07 = em("22-07").encode;
export const formatted22_07 = em("22-07").formatted;

export const Param_22_08 = em("22-08").schema as Schema.Schema<any, any>;
export const decode22_08 = em("22-08").decode;
export const encode22_08 = em("22-08").encode;
export const formatted22_08 = em("22-08").formatted;

export const Param_22_10 = em("22-10").schema as Schema.Schema<any, any>;
export const decode22_10 = em("22-10").decode;
export const encode22_10 = em("22-10").encode;
export const formatted22_10 = em("22-10").formatted;

export const Param_22_11 = em("22-11").schema as Schema.Schema<any, any>;
export const decode22_11 = em("22-11").decode;
export const encode22_11 = em("22-11").encode;
export const formatted22_11 = em("22-11").formatted;

export const Param_22_14 = em("22-14").schema as Schema.Schema<any, any>;
export const decode22_14 = em("22-14").decode;
export const encode22_14 = em("22-14").encode;
export const formatted22_14 = em("22-14").formatted;

export const Param_22_15 = em("22-15").schema as Schema.Schema<any, any>;
export const decode22_15 = em("22-15").decode;
export const encode22_15 = em("22-15").encode;
export const formatted22_15 = em("22-15").formatted;

export const Param_22_16 = em("22-16").schema as Schema.Schema<any, any>;
export const decode22_16 = em("22-16").decode;
export const encode22_16 = em("22-16").encode;
export const formatted22_16 = em("22-16").formatted;

export const Param_22_17 = em("22-17").schema as Schema.Schema<any, any>;
export const decode22_17 = em("22-17").decode;
export const encode22_17 = em("22-17").encode;
export const formatted22_17 = em("22-17").formatted;

export const Param_22_18 = em("22-18").schema as Schema.Schema<any, any>;
export const decode22_18 = em("22-18").decode;
export const encode22_18 = em("22-18").encode;
export const formatted22_18 = em("22-18").formatted;

export const Param_22_20 = em("22-20").schema as Schema.Schema<any, any>;
export const decode22_20 = em("22-20").decode;
export const encode22_20 = em("22-20").encode;
export const formatted22_20 = em("22-20").formatted;

export const Param_22_21 = em("22-21").schema as Schema.Schema<any, any>;
export const decode22_21 = em("22-21").decode;
export const encode22_21 = em("22-21").encode;
export const formatted22_21 = em("22-21").formatted;

export const Param_22_22 = em("22-22").schema as Schema.Schema<any, any>;
export const decode22_22 = em("22-22").decode;
export const encode22_22 = em("22-22").encode;
export const formatted22_22 = em("22-22").formatted;

export const Param_22_25 = em("22-25").schema as Schema.Schema<any, any>;
export const decode22_25 = em("22-25").decode;
export const encode22_25 = em("22-25").encode;
export const formatted22_25 = em("22-25").formatted;

export const Param_22_26 = em("22-26").schema as Schema.Schema<any, any>;
export const decode22_26 = em("22-26").decode;
export const encode22_26 = em("22-26").encode;
export const formatted22_26 = em("22-26").formatted;

export const Param_22_27 = em("22-27").schema as Schema.Schema<any, any>;
export const decode22_27 = em("22-27").decode;
export const encode22_27 = em("22-27").encode;
export const formatted22_27 = em("22-27").formatted;

export const Param_22_28 = em("22-28").schema as Schema.Schema<any, any>;
export const decode22_28 = em("22-28").decode;
export const encode22_28 = em("22-28").encode;
export const formatted22_28 = em("22-28").formatted;

export const Param_22_29 = em("22-29").schema as Schema.Schema<any, any>;
export const decode22_29 = em("22-29").decode;
export const encode22_29 = em("22-29").encode;
export const formatted22_29 = em("22-29").formatted;

export const Param_22_30 = em("22-30").schema as Schema.Schema<any, any>;
export const decode22_30 = em("22-30").decode;
export const encode22_30 = em("22-30").encode;
export const formatted22_30 = em("22-30").formatted;

export const Param_22_31 = em("22-31").schema as Schema.Schema<any, any>;
export const decode22_31 = em("22-31").decode;
export const encode22_31 = em("22-31").encode;
export const formatted22_31 = em("22-31").formatted;

export const Param_22_32 = em("22-32").schema as Schema.Schema<any, any>;
export const decode22_32 = em("22-32").decode;
export const encode22_32 = em("22-32").encode;
export const formatted22_32 = em("22-32").formatted;

export const Param_22_33 = em("22-33").schema as Schema.Schema<any, any>;
export const decode22_33 = em("22-33").decode;
export const encode22_33 = em("22-33").encode;
export const formatted22_33 = em("22-33").formatted;

export const Param_22_34 = em("22-34").schema as Schema.Schema<any, any>;
export const decode22_34 = em("22-34").decode;
export const encode22_34 = em("22-34").encode;
export const formatted22_34 = em("22-34").formatted;

export const Param_22_35 = em("22-35").schema as Schema.Schema<any, any>;
export const decode22_35 = em("22-35").decode;
export const encode22_35 = em("22-35").encode;
export const formatted22_35 = em("22-35").formatted;

// ── Group-level lookup ─────────────────────────────────────

export const group22Params: Record<string, ParamEntry> = {};

for (const [code, entry] of Object.entries(all)) {
  group22Params[code] = {
    schema: entry.schema,
    decode: entry.decode,
    encode: entry.encode,
  };
}
