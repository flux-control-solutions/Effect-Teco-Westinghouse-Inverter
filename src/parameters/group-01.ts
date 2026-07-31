/**
 * Group 01: V/F Control Parameters
 * Manual pages 4-22 to 4-24
 *
 * Parameter                           | Range              | Default       | Unit | Register
 * 01-00  V/F Curve Selection          | 0~FF (hex)         | F             | -    | 0x0100
 * 01-02  Max Output Freq Motor 1      | 4.8~599.0          | 50.0/60.0     | Hz   | 0x0102
 * 01-03  Max Output Voltage Motor 1   | 0.1~255.0 (230V)   | -             | V    | 0x0103
 * 01-04  Middle Freq 2 Motor 1        | 0.0~599.0          | 0.0           | Hz   | 0x0104
 * 01-05  Middle Voltage 2 Motor 1     | 0.0~255.0 (230V)   | 0.0           | V    | 0x0105
 * 01-06  Middle Freq 1 Motor 1        | 0.0~599.0          | 3.0           | Hz   | 0x0106
 * 01-07  Middle Voltage 1 Motor 1     | 0.0~255.0 (230V)   | ***** (KVA)   | V    | 0x0107
 * 01-08  Min Output Freq Motor 1      | 0.0~599.0          | VF:1.5        | Hz   | 0x0108
 * 01-09  Min Output Voltage Motor 1   | 0.0~255.0 (230V)   | 8.3 (230V)    | V    | 0x0109
 * 01-10  Torque Compensation Gain     | 0.0~2.0            | 0.5           | -    | 0x010A
 * 01-11  Torque Compensation Mode     | 0-1                | 0             | -    | 0x010B
 * 01-12  Base Freq Motor 1            | 4.8~599.0          | 50.0/60.0     | Hz   | 0x010C
 * 01-13  Base Output Voltage Motor 1  | 0.0~255.0 (230V)   | -             | V    | 0x010D
 * 01-14  Input Voltage Setting        | 155.0~255.0 (230V) | -             | V    | 0x010E
 * 01-15  Torque Compensation Time     | 0~10000            | 200           | ms   | 0x010F
 * 01-16  Max Output Freq Motor 2      | 4.8~599.0          | 50.0/60.0     | Hz   | 0x0110
 * 01-17  Max Output Voltage Motor 2   | 0.1~255.0 (230V)   | -             | V    | 0x0111
 * 01-18  Middle Freq 2 Motor 2        | 0.0~599.0          | 0.0           | Hz   | 0x0112
 * 01-19  Middle Voltage 2 Motor 2     | 0.0~255.0 (230V)   | 0.0           | V    | 0x0113
 * 01-20  Middle Freq 1 Motor 2        | 0.0~599.0          | 3.0           | Hz   | 0x0114
 * 01-21  Middle Voltage 1 Motor 2     | 0.0~255.0 (230V)   | KVA           | V    | 0x0115
 * 01-22  Min Output Freq Motor 2      | 0.0~599.0          | 1.5           | Hz   | 0x0116
 * 01-23  Min Output Voltage Motor 2   | 0.0~255.0 (230V)   | KVA           | V    | 0x0117
 * 01-24  Base Freq Motor 2            | 4.8~599.0          | 50.0/60.0     | Hz   | 0x0118
 * 01-25  Base Output Voltage Motor 2  | 0.0~255.0 (230V)   | -             | V    | 0x0119
 * 01-26  V/F Curve Selection Motor 2  | 0~FF (hex)         | F             | -    | 0x011A
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_01_VF_Control_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 1 as const;
const p422 = 422 as const;
const p423 = 423 as const;
const p424 = 424 as const;

const all = {
  /** @param 01-00 V/F Curve Selection — Range: 0~FF (hex), Default: F, Manual p.4-22 */
  '01-00': {
    register: GROUP_01_VF_Control_Parameters['01-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '01-00',
      name: 'V/F Curve Selection',
      range: '0~FF (hex)',
      default: 'F (hex)',
      unit: '-',
      page: p422,
    },
  },

  /** @param 01-02 Maximum Output Frequency of Motor 1 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-22 */
  '01-02': {
    register: GROUP_01_VF_Control_Parameters['01-02'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-02',
      name: 'Maximum Output Frequency of Motor 1',
      range: '4.8~599.0',
      default: '50.0/60.0',
      unit: 'Hz',
      page: p422,
    },
  },

  /** @param 01-03 Maximum Output Voltage of Motor 1 — Range: 0.1~255.0 (230V), Default: -, Unit: V, Manual p.4-22 */
  '01-03': {
    register: GROUP_01_VF_Control_Parameters['01-03'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-03',
      name: 'Maximum Output Voltage of Motor 1',
      range: '0.1~255.0 (230V) / 0.2~510.0 (460V) / 0.1~670.0 (575V) / 0.1~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p422,
    },
  },

  /** @param 01-04 Middle Output Frequency 2 of Motor 1 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-22 */
  '01-04': {
    register: GROUP_01_VF_Control_Parameters['01-04'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-04',
      name: 'Middle Output Frequency 2 of Motor 1',
      range: '0.0~599.0',
      default: '0.0',
      unit: 'Hz',
      page: p422,
    },
  },

  /** @param 01-05 Middle Output Voltage 2 of Motor 1 — Range: 0.0~255.0 (230V), Default: 0.0, Unit: V, Manual p.4-22 */
  '01-05': {
    register: GROUP_01_VF_Control_Parameters['01-05'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-05',
      name: 'Middle Output Voltage 2 of Motor 1',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: '0.0',
      unit: 'V',
      page: p422,
    },
  },

  /** @param 01-06 Middle Output Frequency 1 of Motor 1 — Range: 0.0~599.0, Default: 3.0, Unit: Hz, Manual p.4-22 */
  '01-06': {
    register: GROUP_01_VF_Control_Parameters['01-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-06',
      name: 'Middle Output Frequency 1 of Motor 1',
      range: '0.0~599.0',
      default: '3.0',
      unit: 'Hz',
      page: p422,
    },
  },

  /** @param 01-07 Middle Output Voltage 1 of Motor 1 — Range: 0.0~255.0 (230V), Default: ***** (KVA dependent), Unit: V, Manual p.4-22 */
  '01-07': {
    register: GROUP_01_VF_Control_Parameters['01-07'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-07',
      name: 'Middle Output Voltage 1 of Motor 1',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: '***** (KVA dependent)',
      unit: 'V',
      page: p422,
    },
  },

  /** @param 01-08 Minimum Output Frequency of Motor 1 — Range: 0.0~599.0, Default: VF:1.5 / SLV:0.6 / SV:0.1, Unit: Hz, Manual p.4-22 */
  '01-08': {
    register: GROUP_01_VF_Control_Parameters['01-08'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-08',
      name: 'Minimum Output Frequency of Motor 1',
      range: '0.0~599.0',
      default: 'VF:1.5 / VF+PG:1.5 / SLV:0.6 / SV:0.1 / PMSV:0.1 / PMSLV:9.0 / SLV2:1.0',
      unit: 'Hz',
      page: p422,
    },
  },

  /** @param 01-09 Minimum Output Voltage of Motor 1 — Range: 0.0~255.0 (230V), Default: 8.3 (230V) / 15.0 (460V), Unit: V, Manual p.4-22 */
  '01-09': {
    register: GROUP_01_VF_Control_Parameters['01-09'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-09',
      name: 'Minimum Output Voltage of Motor 1',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: '8.3 (230V) / 15.0 (460V)',
      unit: 'V',
      page: p422,
    },
  },

  /** @param 01-10 Torque Compensation Gain — Range: 0.0~2.0, Default: 0.5, Unit: -, Manual p.4-22 */
  '01-10': {
    register: GROUP_01_VF_Control_Parameters['01-10'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-10',
      name: 'Torque Compensation Gain',
      range: '0.0~2.0',
      default: '0.5',
      unit: '-',
      page: p422,
    },
  },

  /** @param 01-11 Selection of Torque Compensation Mode — Range: 0-1, Default: 0, Manual p.4-23 */
  '01-11': {
    register: GROUP_01_VF_Control_Parameters['01-11'],
    kind: ParamKind.Enum,
    labels: {
      0: 'Torque Compensation Mode 0',
      1: 'Torque Compensation Mode 1',
    } as const,
    meta: {
      group,
      code: '01-11',
      name: 'Selection of Torque Compensation Mode',
      range: '0-1',
      default: '0',
      unit: '-',
      page: p423,
    },
  },

  /** @param 01-12 Base Frequency of Motor 1 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-23 */
  '01-12': {
    register: GROUP_01_VF_Control_Parameters['01-12'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-12',
      name: 'Base Frequency of Motor 1',
      range: '4.8~599.0',
      default: '50.0/60.0',
      unit: 'Hz',
      page: p423,
    },
  },

  /** @param 01-13 Base Output Voltage of Motor 1 — Range: 0.0~255.0 (230V), Default: -, Unit: V, Manual p.4-23 */
  '01-13': {
    register: GROUP_01_VF_Control_Parameters['01-13'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-13',
      name: 'Base Output Voltage of Motor 1',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p423,
    },
  },

  /** @param 01-14 Input Voltage Setting — Range: 155.0~255.0 (230V), Default: -, Unit: V, Manual p.4-23 */
  '01-14': {
    register: GROUP_01_VF_Control_Parameters['01-14'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-14',
      name: 'Input Voltage Setting',
      range: '155.0~255.0 (230V) / 310.0~510.0 (460V) / 540.0~670.0 (575V) / 648.0~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p423,
    },
  },

  /** @param 01-15 Torque Compensation Time — Range: 0~10000, Default: 200, Unit: ms, Manual p.4-23 */
  '01-15': {
    register: GROUP_01_VF_Control_Parameters['01-15'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '01-15',
      name: 'Torque Compensation Time',
      range: '0~10000',
      default: '200',
      unit: 'ms',
      page: p423,
    },
  },

  /** @param 01-16 Maximum Output Frequency of Motor 2 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-23 */
  '01-16': {
    register: GROUP_01_VF_Control_Parameters['01-16'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-16',
      name: 'Maximum Output Frequency of Motor 2',
      range: '4.8~599.0',
      default: '50.0/60.0',
      unit: 'Hz',
      page: p423,
    },
  },

  /** @param 01-17 Maximum Output Voltage of Motor 2 — Range: 0.1~255.0 (230V), Default: -, Unit: V, Manual p.4-23 */
  '01-17': {
    register: GROUP_01_VF_Control_Parameters['01-17'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-17',
      name: 'Maximum Output Voltage of Motor 2',
      range: '0.1~255.0 (230V) / 0.2~510.0 (460V) / 0.1~670.0 (575V) / 0.1~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p423,
    },
  },

  /** @param 01-18 Middle Output Frequency 2 of Motor 2 — Range: 0.0~599.0, Default: 0.0, Unit: Hz, Manual p.4-23 */
  '01-18': {
    register: GROUP_01_VF_Control_Parameters['01-18'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-18',
      name: 'Middle Output Frequency 2 of Motor 2',
      range: '0.0~599.0',
      default: '0.0',
      unit: 'Hz',
      page: p423,
    },
  },

  /** @param 01-19 Middle Output Voltage 2 of Motor 2 — Range: 0.0~255.0 (230V), Default: 0.0, Unit: V, Manual p.4-23 */
  '01-19': {
    register: GROUP_01_VF_Control_Parameters['01-19'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-19',
      name: 'Middle Output Voltage 2 of Motor 2',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: '0.0',
      unit: 'V',
      page: p423,
    },
  },

  /** @param 01-20 Middle Output Frequency 1 of Motor 2 — Range: 0.0~599.0, Default: 3.0, Unit: Hz, Manual p.4-23 */
  '01-20': {
    register: GROUP_01_VF_Control_Parameters['01-20'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-20',
      name: 'Middle Output Frequency 1 of Motor 2',
      range: '0.0~599.0',
      default: '3.0',
      unit: 'Hz',
      page: p423,
    },
  },

  /** @param 01-21 Middle Output Voltage 1 of Motor 2 — Range: 0.0~255.0 (230V), Default: KVA, Unit: V, Manual p.4-23 */
  '01-21': {
    register: GROUP_01_VF_Control_Parameters['01-21'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-21',
      name: 'Middle Output Voltage 1 of Motor 2',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: 'KVA (inverter capacity dependent)',
      unit: 'V',
      page: p423,
    },
  },

  /** @param 01-22 Minimum Output Frequency of Motor 2 — Range: 0.0~599.0, Default: 1.5, Unit: Hz, Manual p.4-23 */
  '01-22': {
    register: GROUP_01_VF_Control_Parameters['01-22'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-22',
      name: 'Minimum Output Frequency of Motor 2',
      range: '0.0~599.0',
      default: '1.5',
      unit: 'Hz',
      page: p423,
    },
  },

  /** @param 01-23 Minimum Output Voltage of Motor 2 — Range: 0.0~255.0 (230V), Default: KVA, Unit: V, Manual p.4-23 */
  '01-23': {
    register: GROUP_01_VF_Control_Parameters['01-23'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-23',
      name: 'Minimum Output Voltage of Motor 2',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: 'KVA (inverter capacity dependent)',
      unit: 'V',
      page: p423,
    },
  },

  /** @param 01-24 Base Frequency of Motor 2 — Range: 4.8~599.0, Default: 50.0/60.0, Unit: Hz, Manual p.4-23 */
  '01-24': {
    register: GROUP_01_VF_Control_Parameters['01-24'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-24',
      name: 'Base Frequency of Motor 2',
      range: '4.8~599.0',
      default: '50.0/60.0',
      unit: 'Hz',
      page: p423,
    },
  },

  /** @param 01-25 Base Output Voltage of Motor 2 — Range: 0.0~255.0 (230V), Default: -, Unit: V, Manual p.4-24 */
  '01-25': {
    register: GROUP_01_VF_Control_Parameters['01-25'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '01-25',
      name: 'Base Output Voltage of Motor 2',
      range: '0.0~255.0 (230V) / 0.0~510.0 (460V) / 0.0~670.0 (575V) / 0.0~804.0 (690V)',
      default: '-',
      unit: 'V',
      page: p424,
    },
  },

  /** @param 01-26 V/F Curve Selection of Motor 2 — Range: 0~FF (hex), Default: F, Manual p.4-24 */
  '01-26': {
    register: GROUP_01_VF_Control_Parameters['01-26'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '01-26',
      name: 'V/F Curve Selection of Motor 2',
      range: '0~FF (hex)',
      default: 'F (hex)',
      unit: '-',
      page: p424,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group01Params = all;
