/**
 * Group 20: Speed Control Parameters
 * Manual pages 4-80 to 4-82 (p480, p481, p482)
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_20_Speed_Control_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 20 as const;
const p480 = 480 as const;
const p481 = 481 as const;
const p482 = 482 as const;

const all = {
  '20-00': {
    register: GROUP_20_Speed_Control_Parameters['20-00'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-00',
      name: 'ASR Gain 1',
      range: '0.00~250.00',
      default: '-',
      unit: '-',
      page: p480,
    },
  },
  '20-01': {
    register: GROUP_20_Speed_Control_Parameters['20-01'],
    kind: ParamKind.Scaled,
    factor: 0.001,
    meta: {
      group,
      code: '20-01',
      name: 'ASR Integral Time 1',
      range: '0.001~10.000',
      default: '-',
      unit: 'Sec',
      page: p480,
    },
  },
  '20-02': {
    register: GROUP_20_Speed_Control_Parameters['20-02'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-02',
      name: 'ASR Gain 2',
      range: '0.00~250.00',
      default: '-',
      unit: '-',
      page: p480,
    },
  },
  '20-03': {
    register: GROUP_20_Speed_Control_Parameters['20-03'],
    kind: ParamKind.Scaled,
    factor: 0.001,
    meta: {
      group,
      code: '20-03',
      name: 'ASR Integral Time 2',
      range: '0.001~10.000',
      default: '-',
      unit: 'Sec',
      page: p480,
    },
  },
  '20-04': {
    register: GROUP_20_Speed_Control_Parameters['20-04'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-04',
      name: 'ASR Integral Time Limit',
      range: '0~300',
      default: '200',
      unit: '%',
      page: p480,
    },
  },
  '20-05': {
    register: GROUP_20_Speed_Control_Parameters['20-05'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-05',
      name: 'ASR Positive Limit',
      range: '0.1~10.0',
      default: '5.0',
      unit: '%',
      page: p480,
    },
  },
  '20-06': {
    register: GROUP_20_Speed_Control_Parameters['20-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-06',
      name: 'ASR Negative Limit',
      range: '0.1~10.0',
      default: '1.0',
      unit: '%',
      page: p480,
    },
  },
  '20-07': {
    register: GROUP_20_Speed_Control_Parameters['20-07'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-07',
      name: 'Selection of Accel/Decel P/PI',
      range: '0-1 (0:PI only constant speed / 1:P during accel/decel)',
      default: '0',
      unit: '-',
      page: p480,
    },
  },
  '20-08': {
    register: GROUP_20_Speed_Control_Parameters['20-08'],
    kind: ParamKind.Scaled,
    factor: 0.001,
    meta: {
      group,
      code: '20-08',
      name: 'ASR Delay Time',
      range: '0.000~0.500',
      default: '0.004',
      unit: 'Sec',
      page: p480,
    },
  },
  '20-09': {
    register: GROUP_20_Speed_Control_Parameters['20-09'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-09',
      name: 'Speed Observer P Gain 1',
      range: '0.00~2.55',
      default: '0.61',
      unit: '-',
      page: p480,
    },
  },
  '20-10': {
    register: GROUP_20_Speed_Control_Parameters['20-10'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-10',
      name: 'Speed Observer I Time 1',
      range: '0.01~10.00',
      default: '0.05',
      unit: 'Sec',
      page: p480,
    },
  },
  '20-11': {
    register: GROUP_20_Speed_Control_Parameters['20-11'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-11',
      name: 'Speed Observer P Gain 2',
      range: '0.00~2.55',
      default: '0.61',
      unit: '-',
      page: p480,
    },
  },
  '20-12': {
    register: GROUP_20_Speed_Control_Parameters['20-12'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-12',
      name: 'Speed Observer I Time 2',
      range: '0.01~10.00',
      default: '0.06',
      unit: 'Sec',
      page: p480,
    },
  },
  '20-13': {
    register: GROUP_20_Speed_Control_Parameters['20-13'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-13',
      name: 'Low-pass Filter Time of Speed Feedback 1',
      range: '1~1000',
      default: '4',
      unit: 'ms',
      page: p480,
    },
  },
  '20-14': {
    register: GROUP_20_Speed_Control_Parameters['20-14'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-14',
      name: 'Low-pass Filter Time of Speed Feedback 2',
      range: '1~1000',
      default: '30',
      unit: 'ms',
      page: p480,
    },
  },
  '20-15': {
    register: GROUP_20_Speed_Control_Parameters['20-15'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-15',
      name: 'ASR Gain Change Frequency 1',
      range: '0.0~599.0',
      default: '4.0',
      unit: 'Hz',
      page: p481,
    },
  },
  '20-16': {
    register: GROUP_20_Speed_Control_Parameters['20-16'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-16',
      name: 'ASR Gain Change Frequency 2',
      range: '0.0~599.0',
      default: '8.0',
      unit: 'Hz',
      page: p481,
    },
  },
  '20-17': {
    register: GROUP_20_Speed_Control_Parameters['20-17'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '20-17',
      name: 'Torque Compensation Gain at Low Speed',
      range: '0.00~2.50',
      default: '1.00',
      unit: '-',
      page: p481,
    },
  },
  '20-18': {
    register: GROUP_20_Speed_Control_Parameters['20-18'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-18',
      name: 'Torque Compensation Gain at High Speed',
      range: '-10~10',
      default: '0',
      unit: '%',
      page: p481,
    },
  },
  '20-19': {
    register: GROUP_20_Speed_Control_Parameters['20-19'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-19',
      name: 'Over Speed (OS) Selection',
      range: '0-2 (0:Decel stop / 1:Coast stop / 2:Continue)',
      default: '1',
      unit: '-',
      page: p481,
    },
  },
  '20-20': {
    register: GROUP_20_Speed_Control_Parameters['20-20'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-20',
      name: 'Over Speed (OS) Detection Level',
      range: '0~120',
      default: '115',
      unit: '%',
      page: p481,
    },
  },
  '20-21': {
    register: GROUP_20_Speed_Control_Parameters['20-21'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-21',
      name: 'Over Speed (OS) Detection Time',
      range: '0.0~2.0',
      default: '0.5',
      unit: 'Sec',
      page: p481,
    },
  },
  '20-22': {
    register: GROUP_20_Speed_Control_Parameters['20-22'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-22',
      name: 'Speed Deviation (DEV) Selection',
      range: '0-2 (0:Decel stop / 1:Coast stop / 2:Continue)',
      default: '2',
      unit: '-',
      page: p481,
    },
  },
  '20-23': {
    register: GROUP_20_Speed_Control_Parameters['20-23'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-23',
      name: 'Speed Deviation (DEV) Detection Level',
      range: '0~50',
      default: '10',
      unit: '%',
      page: p481,
    },
  },
  '20-24': {
    register: GROUP_20_Speed_Control_Parameters['20-24'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-24',
      name: 'Speed Deviation (DEV) Detection Time',
      range: '0.0~10.0',
      default: '0.5',
      unit: 'Sec',
      page: p481,
    },
  },
  '20-25': {
    register: GROUP_20_Speed_Control_Parameters['20-25'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-25',
      name: 'Selection of PG Open',
      range: '0-2 (0:Decel stop / 1:Coast stop / 2:Continue)',
      default: '1',
      unit: '-',
      page: p481,
    },
  },
  '20-26': {
    register: GROUP_20_Speed_Control_Parameters['20-26'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-26',
      name: 'Detection Time of PG Open',
      range: '0.0~10.0',
      default: '2.0',
      unit: 'Sec',
      page: p481,
    },
  },
  '20-27': {
    register: GROUP_20_Speed_Control_Parameters['20-27'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-27',
      name: 'PG Pulse Number',
      range: '0~9999',
      default: '1024',
      unit: 'ppr',
      page: p481,
    },
  },
  '20-28': {
    register: GROUP_20_Speed_Control_Parameters['20-28'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-28',
      name: 'Selection of PG Rotation Direction',
      range: '0-1 (0:CCW / 1:CW)',
      default: '0',
      unit: '-',
      page: p481,
    },
  },
  '20-29': {
    register: GROUP_20_Speed_Control_Parameters['20-29'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-29',
      name: 'PG Pulse Dividing Ratio',
      range: '001~132',
      default: '1',
      unit: '-',
      page: p481,
    },
  },
  '20-30': {
    register: GROUP_20_Speed_Control_Parameters['20-30'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-30',
      name: 'PG Gear Ratio 1',
      range: '1~1000',
      default: '1',
      unit: '-',
      page: p482,
    },
  },
  '20-31': {
    register: GROUP_20_Speed_Control_Parameters['20-31'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-31',
      name: 'PG Gear Ratio 2',
      range: '1~1000',
      default: '1',
      unit: '-',
      page: p482,
    },
  },
  '20-32': {
    register: GROUP_20_Speed_Control_Parameters['20-32'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-32',
      name: 'Selection of Specific Encoder',
      range: '0-1 (0:None / 1:Resolver)',
      default: '0',
      unit: '-',
      page: p482,
    },
  },
  '20-33': {
    register: GROUP_20_Speed_Control_Parameters['20-33'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-33',
      name: 'Detection Level at Constant Speed',
      range: '0.1~5.0',
      default: '1.0',
      unit: '-',
      page: p482,
    },
  },
  '20-34': {
    register: GROUP_20_Speed_Control_Parameters['20-34'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-34',
      name: 'Compensation Gain of Derating',
      range: '0~25600',
      default: '0',
      unit: '-',
      page: p482,
    },
  },
  '20-35': {
    register: GROUP_20_Speed_Control_Parameters['20-35'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-35',
      name: 'Compensation Time of Derating',
      range: '0~30000',
      default: '100',
      unit: 'ms',
      page: p482,
    },
  },
  /**
   * @param 20-43 MPG Speed Magnification Calculation -- Range: 1~500, Default: 20, Manual p.4-82
   * @remarks Not listed in the A510 communication addendum (Group 20 register map ends at 20-35).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '20-43': {
    register: GROUP_20_Speed_Control_Parameters['20-43'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '20-43',
      name: 'MPG Speed Magnification Calculation',
      range: '1~500',
      default: '20',
      unit: '-',
      page: p482,
    },
  },
  /**
   * @param 20-44 MPG Speed Command Limit -- Range: 0.1~30.0, Default: 6.0, Unit: Hz, Manual p.4-82
   * @remarks Not listed in the A510 communication addendum (Group 20 register map ends at 20-35).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '20-44': {
    register: GROUP_20_Speed_Control_Parameters['20-44'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '20-44',
      name: 'MPG Speed Command Limit',
      range: '0.1~30.0',
      default: '6.0',
      unit: 'Hz',
      page: p482,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

// ── Group-level lookup ─────────────────────────────────────

export const group20Params = all;
