/**
 * Group 22: PM Motor Parameters
 * Manual pages 4-85 to 4-88
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_22_PM_Motor_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 22 as const;
const p485 = 485 as const;
const p486 = 486 as const;
const p487 = 487 as const;
const p488 = 488 as const;

const all = {
  '22-00': {
    register: GROUP_22_PM_Motor_Parameters['22-00'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '22-00',
      name: 'PM Motor Rated Power',
      range: '0.00~600.00',
      default: '* (see Attachment 1 p.170)',
      unit: 'kW',
      page: p485,
    },
  },
  '22-01': {
    register: GROUP_22_PM_Motor_Parameters['22-01'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '22-01',
      name: 'PM Motor Rated Voltage',
      range: '230V:50.0~240.0 / 460V:100.0~480.0',
      default: '220.0 / 440.0',
      unit: 'V',
      page: p485,
    },
  },
  '22-02': {
    register: GROUP_22_PM_Motor_Parameters['22-02'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-02',
      name: 'PM Motor Rated Current',
      range: '25%~200% inverter rated',
      default: '* (see Attachment 1 p.170)',
      unit: 'A',
      page: p485,
    },
  },
  '22-03': {
    register: GROUP_22_PM_Motor_Parameters['22-03'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-03',
      name: "PM Motor's Pole Number",
      range: '2~96',
      default: '6',
      unit: 'poles',
      page: p485,
    },
  },
  '22-04': {
    register: GROUP_22_PM_Motor_Parameters['22-04'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-04',
      name: "PM Motor's Rotation Speed",
      range: '6~60000',
      default: '1500',
      unit: 'rpm',
      page: p485,
    },
  },
  '22-05': {
    register: GROUP_22_PM_Motor_Parameters['22-05'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-05',
      name: "PM Motor's Max Rotation Speed",
      range: '6~60000',
      default: '1500',
      unit: 'rpm',
      page: p485,
    },
  },
  '22-06': {
    register: GROUP_22_PM_Motor_Parameters['22-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '22-06',
      name: 'PM Motor Rated Frequency',
      range: '4.8~599.0',
      default: '75.0',
      unit: 'Hz',
      page: p485,
    },
  },
  '22-07': {
    register: GROUP_22_PM_Motor_Parameters['22-07'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-07',
      name: 'PM Type Selection',
      range: '0-1 (0:SPM / 1:IPM)',
      default: '0',
      unit: '-',
      page: p485,
    },
  },
  '22-08': {
    register: GROUP_22_PM_Motor_Parameters['22-08'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-08',
      name: 'PM Encoder Type',
      range:
        '0-4 (0:Tamagawa Non-WireSaving / 1:Tamagawa WireSaving / 2:Sumtak WireSaving / 3:General Incremental / 4:Sine Wave)',
      default: '0',
      unit: '-',
      page: p485,
    },
  },
  '22-10': {
    register: GROUP_22_PM_Motor_Parameters['22-10'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-10',
      name: 'PM SLV Start Current',
      range: '20~200% Motor Rated Current',
      default: '80',
      unit: '%',
      page: p486,
    },
  },
  '22-11': {
    register: GROUP_22_PM_Motor_Parameters['22-11'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-11',
      name: 'I/F Mode Start Freq Switching Point',
      range: '10~100',
      default: '10',
      unit: '%',
      page: p486,
    },
  },
  '22-14': {
    register: GROUP_22_PM_Motor_Parameters['22-14'],
    kind: ParamKind.Scaled,
    factor: 0.001,
    meta: {
      group,
      code: '22-14',
      name: 'Armature Resistance of PM Motor',
      range: '0.001~30.000',
      default: '1.000',
      unit: 'Ω',
      page: p486,
    },
  },
  '22-15': {
    register: GROUP_22_PM_Motor_Parameters['22-15'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '22-15',
      name: 'D-axis Inductance of PM Motor',
      range: '0.01~300.00',
      default: '10.00',
      unit: 'mH',
      page: p486,
    },
  },
  '22-16': {
    register: GROUP_22_PM_Motor_Parameters['22-16'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '22-16',
      name: 'Q-axis Inductance of PM Motor',
      range: '0.01~300.00',
      default: '10.00',
      unit: 'mH',
      page: p486,
    },
  },
  '22-17': {
    register: GROUP_22_PM_Motor_Parameters['22-17'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-17',
      name: 'PM No-Load Voltage',
      range: '200V:0~200 / 400V:0~400',
      default: '150 / 300',
      unit: 'V',
      page: p486,
    },
  },
  '22-18': {
    register: GROUP_22_PM_Motor_Parameters['22-18'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-18',
      name: 'Flux-Weakening Limit',
      range: '0~100',
      default: '0',
      unit: '%',
      page: p486,
    },
  },
  '22-20': {
    register: GROUP_22_PM_Motor_Parameters['22-20'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-20',
      name: 'Offset Angle of Magnetic Pole and PG Origin',
      range: '0~360',
      default: '0',
      unit: 'deg',
      page: p487,
    },
  },
  '22-21': {
    register: GROUP_22_PM_Motor_Parameters['22-21'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-21',
      name: 'PM Motor Tuning',
      range:
        '0-3 (0:Not active / 1:Param auto-tune / 2:Mag pole align+loop adjust / 3:Mag pole alignment)',
      default: '0',
      unit: '-',
      page: p487,
    },
  },
  '22-22': {
    register: GROUP_22_PM_Motor_Parameters['22-22'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-22',
      name: 'Fault History of PM Motor Tuning',
      range:
        '0-11 (0:No Error / 1:Static Mag Alignment / 2:No PG / 3:Rot Pole forced stop / 4:Encoder feedback dir / 5:Loop timeout / 6:Encoder error / 7:Other / 8:Current abn during align / 9:Current abn during loop / 10:Reserved / 11:Stator R timeout)',
      default: '0',
      unit: '-',
      page: p487,
    },
  },
  /**
   * PM motor tuning registers 22-25 through 22-35.
   * @remarks Not listed in the A510 communication addendum (Group 22 register map ends at 22-22).
   *          All returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '22-25': {
    register: GROUP_22_PM_Motor_Parameters['22-25'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-25',
      name: 'Detection Mode Selection of Initial Magnetic Pole',
      range: '0-2 (0:Angle before stopping / 1:Mode1 / 2:Mode2)',
      default: '2',
      unit: '-',
      page: p487,
    },
  },
  '22-26': {
    register: GROUP_22_PM_Motor_Parameters['22-26'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-26',
      name: 'Estimator Mode',
      range: '0-1',
      default: '0',
      unit: '-',
      page: p487,
    },
  },
  '22-27': {
    register: GROUP_22_PM_Motor_Parameters['22-27'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-27',
      name: 'Voltage Command of Mode 2',
      range: '5~120',
      default: '50',
      unit: '%',
      page: p487,
    },
  },
  '22-28': {
    register: GROUP_22_PM_Motor_Parameters['22-28'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-28',
      name: 'Divider Ratio of Mode 2',
      range: '0~8',
      default: '2',
      unit: '-',
      page: p487,
    },
  },
  '22-29': {
    register: GROUP_22_PM_Motor_Parameters['22-29'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-29',
      name: 'Flux-weakening Voltage Command Restriction',
      range: '80~110',
      default: '95',
      unit: '%',
      page: p488,
    },
  },
  '22-30': {
    register: GROUP_22_PM_Motor_Parameters['22-30'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-30',
      name: 'SPM Speed Estimation Gain',
      range: '1~100',
      default: '85',
      unit: '%',
      page: p488,
    },
  },
  '22-31': {
    register: GROUP_22_PM_Motor_Parameters['22-31'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-31',
      name: 'SPM Speed Estimation Filter Value',
      range: '1~2000',
      default: '60',
      unit: 'Hz',
      page: p488,
    },
  },
  '22-32': {
    register: GROUP_22_PM_Motor_Parameters['22-32'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-32',
      name: 'MTPA Selection',
      range: '0-3 (0:Disabled / 1:Mode1 / 2:Mode2 / 3:Mode3)',
      default: '2',
      unit: '-',
      page: p488,
    },
  },
  '22-33': {
    register: GROUP_22_PM_Motor_Parameters['22-33'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-33',
      name: 'MTPA Gain',
      range: '0~400',
      default: '200',
      unit: '%',
      page: p488,
    },
  },
  '22-34': {
    register: GROUP_22_PM_Motor_Parameters['22-34'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '22-34',
      name: 'IPM Estimator Gain',
      range: '0.1~500.0',
      default: '30.0',
      unit: '-',
      page: p488,
    },
  },
  '22-35': {
    register: GROUP_22_PM_Motor_Parameters['22-35'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '22-35',
      name: 'IPM Estimator Compensation',
      range: '0~300',
      default: '50',
      unit: '%',
      page: p488,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

// ── Static named exports ───────────────────────────────────

// ── Group-level lookup ─────────────────────────────────────

export const group22Params = all;
