/**
 * Group 02: IM Motor Parameters
 * Manual pages 4-25 to 4-26
 *
 * Parameter                                | Range                        | Default       | Unit | Page
 * 02-00  No-Load Current of Motor 1        | 0.01~600.00                 | -             | A    | 4-25
 * 02-01  Rated Current of Motor 1          | 10%~200% of inv rated cur   | -             | A    | 4-25
 * 02-03  Rated Rotation Speed of Motor 1   | 0~60000                     | -             | Rpm  | 4-25
 * 02-04  Rated Voltage of Motor 1          | 50.0~240.0 (230V)           | -             | V    | 4-25
 * 02-05  Rated Power of Motor 1            | 0.01~600.00                 | -             | kW   | 4-25
 * 02-06  Rated Frequency of Motor 1        | 4.8~599.0                   | 50.0/60.0     | Hz   | 4-25
 * 02-07  Poles of Motor 1                  | 2~16 (Even)                 | 4             | -    | 4-25
 * 02-09  Excitation Current of Motor 1     | 15%~70% of Motor Rated Cur  | -             | %    | 4-25
 * 02-10  Core Saturation Coeff 1 Motor 1   | 1~100                       | -             | %    | 4-25
 * 02-11  Core Saturation Coeff 2 Motor 1   | 1~100                       | -             | %    | 4-25
 * 02-12  Core Saturation Coeff 3 Motor 1   | 80~300                      | -             | %    | 4-25
 * 02-13  Core Loss of Motor 1              | 0.0~15.0                    | -             | %    | 4-25
 * 02-15  Resistance between Wires Motor 1  | 0.001~60.000                | -             | Ω    | 4-25
 * 02-19  No-Load Voltage of Motor 1        | 50~240 (230V)               | -             | V    | 4-25
 * 02-20  No-Load Current of Motor 2        | 0.01~600.00                 | -             | A    | 4-25
 * 02-21  Rated Current of Motor 2          | 10%~200% of inv rated cur   | -             | A    | 4-25
 * 02-22  Rated Rotation Speed of Motor 2   | 0~60000                     | -             | Rpm  | 4-25
 * 02-23  Rated Voltage of Motor 2          | 50.0~240.0 (230V)           | -             | V    | 4-25
 * 02-24  Rated Power of Motor 2            | 0.01~600.00                 | -             | kW   | 4-25
 * 02-25  Rated Frequency of Motor 2        | 4.8~599.0                   | 50.0/60.0     | Hz   | 4-25
 * 02-26  Poles of Motor 2                  | 2~16 (Even)                 | 4             | -    | 4-25
 * 02-32  Resistance between Wires Motor 2  | 0.001~60.000                | -             | Ω    | 4-25
 * 02-33  Proportion of Motor 1 Leak Induct | 0.1~15.0                    | 3.7           | %    | 4-25
 * 02-34  Motor 1 Slip Frequency            | 0.10~20.00                  | 2.48          | Hz   | 4-25
 * 02-37  Motor Mechanical Loss             | 0.0~10.0                    | 4.0           | %    | 4-26
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_02_IM_Motor_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 2 as const;
const p425 = 425 as const;
const p426 = 426 as const;

const all = {
  /** @param 02-00 No-Load Current of Motor 1 — Range: 0.01~600.00, Default: -, Unit: A, Manual p.4-25 */
  '02-00': {
    register: GROUP_02_IM_Motor_Parameters['02-00'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '02-00',
      name: 'No-Load Current of Motor 1',
      range: '0.01~600.00',
      default: '-',
      unit: 'A',
      page: p425,
    },
  },

  /** @param 02-01 Rated Current of Motor 1 — Range: 10%~200% of inverter's rated current, Default: -, Unit: A, Manual p.4-25 */
  '02-01': {
    register: GROUP_02_IM_Motor_Parameters['02-01'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-01',
      name: 'Rated Current of Motor 1',
      range: "10%~200% of inverter's rated current",
      default: '- (inverter dependent)',
      unit: 'A',
      page: p425,
    },
  },

  /** @param 02-03 Rated Rotation Speed of Motor 1 — Range: 0~60000, Default: -, Unit: Rpm, Manual p.4-25 */
  '02-03': {
    register: GROUP_02_IM_Motor_Parameters['02-03'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-03',
      name: 'Rated Rotation Speed of Motor 1',
      range: '0~60000',
      default: '-',
      unit: 'Rpm',
      page: p425,
    },
  },

  /** @param 02-04 Rated Voltage of Motor 1 — Range: 50.0~240.0 (230V), Default: -, Unit: V, Manual p.4-25 */
  '02-04': {
    register: GROUP_02_IM_Motor_Parameters['02-04'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-04',
      name: 'Rated Voltage of Motor 1',
      range: '50.0~240.0 (230V) / 100.0~480.0 (460V) / 150.0~670.0 (575V) / 200.0~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p425,
    },
  },

  /** @param 02-05 Rated Power of Motor 1 — Range: 0.01~600.00, Default: -, Unit: kW, Manual p.4-25 */
  '02-05': {
    register: GROUP_02_IM_Motor_Parameters['02-05'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '02-05',
      name: 'Rated Power of Motor 1',
      range: '0.01~600.00',
      default: '-',
      unit: 'kW',
      page: p425,
    },
  },

  /** @param 02-06 Rated Frequency of Motor 1 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-25 */
  '02-06': {
    register: GROUP_02_IM_Motor_Parameters['02-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-06',
      name: 'Rated Frequency of Motor 1',
      range: '4.8~599.0',
      default: '50.0/60.0',
      unit: 'Hz',
      page: p425,
    },
  },

  /** @param 02-07 Poles of Motor 1 — Range: 2~16 (Even), Default: 4, Manual p.4-25 */
  '02-07': {
    register: GROUP_02_IM_Motor_Parameters['02-07'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-07',
      name: 'Poles of Motor 1',
      range: '2~16 (Even)',
      default: '4',
      unit: '-',
      page: p425,
    },
  },

  /** @param 02-09 Excitation Current of Motor 1 — Range: 15%~70% of Motor Rated Current, Default: -, Unit: %, Manual p.4-25 */
  '02-09': {
    register: GROUP_02_IM_Motor_Parameters['02-09'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-09',
      name: 'Excitation Current of Motor 1',
      range: '15%~70% of Motor Rated Current',
      default: '-',
      unit: '%',
      page: p425,
    },
  },

  /** @param 02-10 Core Saturation Coefficient 1 of Motor 1 — Range: 1~100, Default: -, Unit: %, Manual p.4-25 */
  '02-10': {
    register: GROUP_02_IM_Motor_Parameters['02-10'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-10',
      name: 'Core Saturation Coefficient 1 of Motor 1',
      range: '1~100',
      default: '-',
      unit: '%',
      page: p425,
    },
  },

  /** @param 02-11 Core Saturation Coefficient 2 of Motor 1 — Range: 1~100, Default: -, Unit: %, Manual p.4-25 */
  '02-11': {
    register: GROUP_02_IM_Motor_Parameters['02-11'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-11',
      name: 'Core Saturation Coefficient 2 of Motor 1',
      range: '1~100',
      default: '-',
      unit: '%',
      page: p425,
    },
  },

  /** @param 02-12 Core Saturation Coefficient 3 of Motor 1 — Range: 80~300, Default: -, Unit: %, Manual p.4-25 */
  '02-12': {
    register: GROUP_02_IM_Motor_Parameters['02-12'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-12',
      name: 'Core Saturation Coefficient 3 of Motor 1',
      range: '80~300',
      default: '-',
      unit: '%',
      page: p425,
    },
  },

  /** @param 02-13 Core Loss of Motor 1 — Range: 0.0~15.0, Default: -, Unit: %, Manual p.4-25 */
  '02-13': {
    register: GROUP_02_IM_Motor_Parameters['02-13'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-13',
      name: 'Core Loss of Motor 1',
      range: '0.0~15.0',
      default: '-',
      unit: '%',
      page: p425,
    },
  },

  /** @param 02-15 Resistance between Wires of Motor 1 — Range: 0.001~60.000, Default: -, Unit: Ω, Manual p.4-25 */
  '02-15': {
    register: GROUP_02_IM_Motor_Parameters['02-15'],
    kind: ParamKind.Scaled,
    factor: 0.001,
    meta: {
      group,
      code: '02-15',
      name: 'Resistance between Wires of Motor 1',
      range: '0.001~60.000',
      default: '-',
      unit: 'Ω',
      page: p425,
    },
  },

  /** @param 02-19 No-Load Voltage of Motor 1 — Range: 50~240 (230V), Default: -, Unit: V, Manual p.4-25 */
  '02-19': {
    register: GROUP_02_IM_Motor_Parameters['02-19'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-19',
      name: 'No-Load Voltage of Motor 1',
      range: '50~240 (230V) / 100~480 (460V) / 420~600 (575V) / 504~720 (690V)',
      default: '-',
      unit: 'V',
      page: p425,
    },
  },

  /** @param 02-20 No-Load Current of Motor 2 — Range: 0.01~600.00, Default: -, Unit: A, Manual p.4-25 */
  '02-20': {
    register: GROUP_02_IM_Motor_Parameters['02-20'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '02-20',
      name: 'No-Load Current of Motor 2',
      range: '0.01~600.00',
      default: '-',
      unit: 'A',
      page: p425,
    },
  },

  /** @param 02-21 Rated Current of Motor 2 — Range: 10%~200% of inverter's rated current, Default: -, Unit: A, Manual p.4-25 */
  '02-21': {
    register: GROUP_02_IM_Motor_Parameters['02-21'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-21',
      name: 'Rated Current of Motor 2',
      range: "10%~200% of inverter's rated current",
      default: '- (inverter dependent)',
      unit: 'A',
      page: p425,
    },
  },

  /** @param 02-22 Rated Rotation Speed of Motor 2 — Range: 0~60000, Default: -, Unit: Rpm, Manual p.4-25 */
  '02-22': {
    register: GROUP_02_IM_Motor_Parameters['02-22'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-22',
      name: 'Rated Rotation Speed of Motor 2',
      range: '0~60000',
      default: '-',
      unit: 'Rpm',
      page: p425,
    },
  },

  /** @param 02-23 Rated Voltage of Motor 2 — Range: 50.0~240.0 (230V), Default: -, Unit: V, Manual p.4-25 */
  '02-23': {
    register: GROUP_02_IM_Motor_Parameters['02-23'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-23',
      name: 'Rated Voltage of Motor 2',
      range: '50.0~240.0 (230V) / 100.0~480.0 (460V) / 150.0~670.0 (575V) / 200.0~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p425,
    },
  },

  /** @param 02-24 Rated Power of Motor 2 — Range: 0.01~600.00, Default: -, Unit: kW, Manual p.4-25 */
  '02-24': {
    register: GROUP_02_IM_Motor_Parameters['02-24'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '02-24',
      name: 'Rated Power of Motor 2',
      range: '0.01~600.00',
      default: '-',
      unit: 'kW',
      page: p425,
    },
  },

  /** @param 02-25 Rated Frequency of Motor 2 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-25 */
  '02-25': {
    register: GROUP_02_IM_Motor_Parameters['02-25'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-25',
      name: 'Rated Frequency of Motor 2',
      range: '4.8~599.0',
      default: '50.0/60.0',
      unit: 'Hz',
      page: p425,
    },
  },

  /** @param 02-26 Poles of Motor 2 — Range: 2~16 (Even), Default: 4, Manual p.4-25 */
  '02-26': {
    register: GROUP_02_IM_Motor_Parameters['02-26'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '02-26',
      name: 'Poles of Motor 2',
      range: '2~16 (Even)',
      default: '4',
      unit: '-',
      page: p425,
    },
  },

  /** @param 02-32 Resistance between Wires of Motor 2 — Range: 0.001~60.000, Default: -, Unit: Ω, Manual p.4-25 */
  '02-32': {
    register: GROUP_02_IM_Motor_Parameters['02-32'],
    kind: ParamKind.Scaled,
    factor: 0.001,
    meta: {
      group,
      code: '02-32',
      name: 'Resistance between Wires of Motor 2',
      range: '0.001~60.000',
      default: '-',
      unit: 'Ω',
      page: p425,
    },
  },

  /** @param 02-33 Proportion of Motor 1 Leakage Inductance — Range: 0.1~15.0, Default: 3.7, Unit: %, Manual p.4-25 */
  '02-33': {
    register: GROUP_02_IM_Motor_Parameters['02-33'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-33',
      name: 'Proportion of Motor 1 Leakage Inductance',
      range: '0.1~15.0',
      default: '3.7',
      unit: '%',
      page: p425,
    },
  },

  /** @param 02-34 Motor 1 Slip Frequency — Range: 0.10~20.00, Default: 2.48, Unit: Hz, Manual p.4-25 */
  '02-34': {
    register: GROUP_02_IM_Motor_Parameters['02-34'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '02-34',
      name: 'Motor 1 Slip Frequency',
      range: '0.10~20.00',
      default: '2.48',
      unit: 'Hz',
      page: p425,
    },
  },

  /** @param 02-37 Motor Mechanical Loss — Range: 0.0~10.0, Default: 4.0, Unit: %, Manual p.4-26 */
  '02-37': {
    register: GROUP_02_IM_Motor_Parameters['02-37'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '02-37',
      name: 'Motor Mechanical Loss',
      range: '0.0~10.0',
      default: '4.0',
      unit: '%',
      page: p426,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group02Params = all;
