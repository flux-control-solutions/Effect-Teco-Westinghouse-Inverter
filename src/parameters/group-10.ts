/**
 * Group 10: PID Parameters
 * Manual pages 4-53 to 4-56
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_10_PID_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 10 as const;
const p453 = 453 as const;
const p454 = 454 as const;
const p455 = 455 as const;
const p456 = 456 as const;

const all = {
  /** @param 10-00 PID Target Value Source Setting -- Range: 1-4, Default: 1, Manual p.4-53 */
  '10-00': {
    register: GROUP_10_PID_Parameters['10-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-00',
      name: 'PID Target Value Source Setting',
      range: '1-4 (1:AI1 / 2:AI2 / 3:PI / 4:10-02)',
      default: '1',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-01 PID Feedback Value Source Setting -- Range: 1-3, Default: 2, Manual p.4-53 */
  '10-01': {
    register: GROUP_10_PID_Parameters['10-01'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-01',
      name: 'PID Feedback Value Source Setting',
      range: '1-3 (1:AI1 / 2:AI2 / 3:PI)',
      default: '2',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-02 PID Target Value -- Range: 0.00~100.00, Default: 0.00, Unit: %, Manual p.4-53 */
  '10-02': {
    register: GROUP_10_PID_Parameters['10-02'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-02',
      name: 'PID Target Value',
      range: '0.00~100.00',
      default: '0.00',
      unit: '%',
      page: p453,
    },
  },

  /** @param 10-03 PID Control Mode -- Bit field, Default: 0000b, Manual p.4-53 */
  '10-03': {
    register: GROUP_10_PID_Parameters['10-03'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-03',
      name: 'PID Control Mode',
      range: 'bit0:Enable/bit1:Char/bit2:D input/bit3:Output mode',
      default: '0000b (0)',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-04 Feedback Gain -- Range: 0.01~10.00, Default: 1.00, Unit: -, Manual p.4-53 */
  '10-04': {
    register: GROUP_10_PID_Parameters['10-04'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-04',
      name: 'Feedback Gain',
      range: '0.01~10.00',
      default: '1.00',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-05 Proportional Gain (P) -- Range: 0.00~10.00, Default: 1.00, Unit: -, Manual p.4-53 */
  '10-05': {
    register: GROUP_10_PID_Parameters['10-05'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-05',
      name: 'Proportional Gain (P)',
      range: '0.00~10.00',
      default: '1.00',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-06 Integral Time (I) -- Range: 0.00~100.00, Default: 1.00, Unit: s, Manual p.4-53 */
  '10-06': {
    register: GROUP_10_PID_Parameters['10-06'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-06',
      name: 'Integral Time (I)',
      range: '0.00~100.00',
      default: '1.00',
      unit: 's',
      page: p453,
    },
  },

  /** @param 10-07 Differential Time (D) -- Range: 0.00~10.00, Default: 0.00, Unit: s, Manual p.4-53 */
  '10-07': {
    register: GROUP_10_PID_Parameters['10-07'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-07',
      name: 'Differential Time (D)',
      range: '0.00~10.00',
      default: '0.00',
      unit: 's',
      page: p453,
    },
  },

  /** @param 10-08 AI1 Frequency Limit -- Range: 0.00~599.00, Default: 0, Unit: Hz, Manual p.4-53 */
  '10-08': {
    register: GROUP_10_PID_Parameters['10-08'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-08',
      name: 'AI1 Frequency Limit',
      range: '0.00~599.00',
      default: '0',
      unit: 'Hz',
      page: p453,
    },
  },

  /** @param 10-09 PID Bias -- Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-53 */
  '10-09': {
    register: GROUP_10_PID_Parameters['10-09'],
    kind: ParamKind.SignedScaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-09',
      name: 'PID Bias',
      range: '-100.0~100.0',
      default: '0',
      unit: '%',
      page: p453,
    },
  },

  /** @param 10-10 PID Output Delay Time -- Range: 0.00~10.00, Default: 0.00, Unit: s, Manual p.4-53 */
  '10-10': {
    register: GROUP_10_PID_Parameters['10-10'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-10',
      name: 'PID Output Delay Time',
      range: '0.00~10.00',
      default: '0.00',
      unit: 's',
      page: p453,
    },
  },

  /** @param 10-11 PID Feedback Loss Detection Selection -- Range: 0-2, Default: 0, Manual p.4-53 */
  '10-11': {
    register: GROUP_10_PID_Parameters['10-11'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-11',
      name: 'PID Feedback Loss Detection Selection',
      range: '0-2 (0:Disable / 1:Warning / 2:Fault)',
      default: '0',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-12 PID Feedback Loss Detection Level -- Range: 0~100, Default: 0, Unit: %, Manual p.4-53 */
  '10-12': {
    register: GROUP_10_PID_Parameters['10-12'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-12',
      name: 'PID Feedback Loss Detection Level',
      range: '0~100',
      default: '0',
      unit: '%',
      page: p453,
    },
  },

  /** @param 10-13 PID Feedback Loss Detection Time -- Range: 0.0~10.0, Default: 1.0, Unit: s, Manual p.4-53 */
  '10-13': {
    register: GROUP_10_PID_Parameters['10-13'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-13',
      name: 'PID Feedback Loss Detection Time',
      range: '0.0~10.0',
      default: '1.0',
      unit: 's',
      page: p453,
    },
  },

  /** @param 10-14 PID Integral Limit -- Range: 0.0~100.0, Default: 100.0, Unit: %, Manual p.4-53 */
  '10-14': {
    register: GROUP_10_PID_Parameters['10-14'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-14',
      name: 'PID Integral Limit',
      range: '0.0~100.0',
      default: '100.0',
      unit: '%',
      page: p453,
    },
  },

  /** @param 10-15 PID Trim Mode -- Range: 0-2, Default: 0, Manual p.4-53 */
  '10-15': {
    register: GROUP_10_PID_Parameters['10-15'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-15',
      name: 'PID Trim Mode',
      range: '0-2',
      default: '0',
      unit: '-',
      page: p453,
    },
  },

  /** @param 10-16 PID Trim Scale -- Range: 0~100, Default: 100, Unit: %, Manual p.4-53 */
  '10-16': {
    register: GROUP_10_PID_Parameters['10-16'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-16',
      name: 'PID Trim Scale',
      range: '0~100',
      default: '100',
      unit: '%',
      page: p453,
    },
  },

  /** @param 10-17 Start Frequency of PID Sleep -- Range: 0.00~599.00, Default: 0.00, Unit: Hz, Manual p.4-54 */
  '10-17': {
    register: GROUP_10_PID_Parameters['10-17'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-17',
      name: 'Start Frequency of PID Sleep',
      range: '0.00~599.00',
      default: '0.00',
      unit: 'Hz',
      page: p454,
    },
  },

  /** @param 10-18 Delay Time of PID Sleep -- Range: 0.0~255.5, Default: 0.0, Unit: s, Manual p.4-54 */
  '10-18': {
    register: GROUP_10_PID_Parameters['10-18'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-18',
      name: 'Delay Time of PID Sleep',
      range: '0.0~255.5',
      default: '0.0',
      unit: 's',
      page: p454,
    },
  },

  /** @param 10-19 Frequency of PID Waking up -- Range: 0.00~599.00, Default: 0.00, Unit: Hz, Manual p.4-54 */
  '10-19': {
    register: GROUP_10_PID_Parameters['10-19'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-19',
      name: 'Frequency of PID Waking up',
      range: '0.00~599.00',
      default: '0.00',
      unit: 'Hz',
      page: p454,
    },
  },

  /** @param 10-20 Delay Time of PID Waking up -- Range: 0.0~255.5, Default: 0.0, Unit: s, Manual p.4-54 */
  '10-20': {
    register: GROUP_10_PID_Parameters['10-20'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-20',
      name: 'Delay Time of PID Waking up',
      range: '0.0~255.5',
      default: '0.0',
      unit: 's',
      page: p454,
    },
  },

  /** @param 10-23 PID Output Limit -- Range: 0.0~100.0, Default: 100.0, Unit: %, Manual p.4-54 */
  '10-23': {
    register: GROUP_10_PID_Parameters['10-23'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-23',
      name: 'PID Output Limit',
      range: '0.0~100.0',
      default: '100.0',
      unit: '%',
      page: p454,
    },
  },

  /** @param 10-24 PID Output Gain -- Range: 0.0~25.0, Default: 1.0, Unit: -, Manual p.4-54 */
  '10-24': {
    register: GROUP_10_PID_Parameters['10-24'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-24',
      name: 'PID Output Gain',
      range: '0.0~25.0',
      default: '1.0',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-25 PID Reversal Output Selection -- Range: 0-1, Default: 0, Manual p.4-54 */
  '10-25': {
    register: GROUP_10_PID_Parameters['10-25'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-25',
      name: 'PID Reversal Output Selection',
      range: '0-1 (0:No reversal / 1:Allow reversal)',
      default: '0',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-26 PID Target Acceleration/Deceleration Time -- Range: 0.0~25.5, Default: 0.0, Unit: s, Manual p.4-54 */
  '10-26': {
    register: GROUP_10_PID_Parameters['10-26'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-26',
      name: 'PID Target Acceleration/Deceleration Time',
      range: '0.0~25.5',
      default: '0.0',
      unit: 's',
      page: p454,
    },
  },

  /** @param 10-27 PID Feedback Display Bias -- Range: 0~9999, Default: 0, Manual p.4-54 */
  '10-27': {
    register: GROUP_10_PID_Parameters['10-27'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-27',
      name: 'PID Feedback Display Bias',
      range: '0~9999',
      default: '0',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-29 PID Sleep Selection -- Range: 0-2, Default: 1, Manual p.4-54 */
  '10-29': {
    register: GROUP_10_PID_Parameters['10-29'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-29',
      name: 'PID Sleep Selection',
      range: '0-2 (0:Disable / 1:Enable / 2:Set by DI)',
      default: '1',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-30 Upper Limit of PID Target -- Range: 0.0~100.0, Default: 100.0, Unit: %, Manual p.4-54 */
  '10-30': {
    register: GROUP_10_PID_Parameters['10-30'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-30',
      name: 'Upper Limit of PID Target',
      range: '0.0~100.0',
      default: '100.0',
      unit: '%',
      page: p454,
    },
  },

  /** @param 10-31 Lower Limit of PID Target -- Range: 0.0~100.0, Default: 0.0, Unit: %, Manual p.4-54 */
  '10-31': {
    register: GROUP_10_PID_Parameters['10-31'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '10-31',
      name: 'Lower Limit of PID Target',
      range: '0.0~100.0',
      default: '0.0',
      unit: '%',
      page: p454,
    },
  },

  /** @param 10-33 Maximum Value of PID Feedback -- Range: 1~10000, Default: 999, Manual p.4-54 */
  '10-33': {
    register: GROUP_10_PID_Parameters['10-33'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-33',
      name: 'Maximum Value of PID Feedback',
      range: '1~10000',
      default: '999',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-34 PID Decimal Width -- Range: 0~4, Default: 1, Manual p.4-54 */
  '10-34': {
    register: GROUP_10_PID_Parameters['10-34'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-34',
      name: 'PID Decimal Width',
      range: '0~4',
      default: '1',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-35 PID Unit -- Range: 0~24, Default: 0, Manual p.4-54 */
  '10-35': {
    register: GROUP_10_PID_Parameters['10-35'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-35',
      name: 'PID Unit',
      range: '0~24 (0:% / 1:FPM / 2:CFM / 3:SPI ...)',
      default: '0',
      unit: '-',
      page: p454,
    },
  },

  /** @param 10-36 Proportional Gain 2 (P) -- Range: 0.00~10.00, Default: 3.00, Unit: -, Manual p.4-55 */
  '10-36': {
    register: GROUP_10_PID_Parameters['10-36'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-36',
      name: 'Proportional Gain 2 (P)',
      range: '0.00~10.00',
      default: '3.00',
      unit: '-',
      page: p455,
    },
  },

  /** @param 10-37 Integral Time 2 (I) -- Range: 0.00~100.00, Default: 0.50, Unit: Sec, Manual p.4-55 */
  '10-37': {
    register: GROUP_10_PID_Parameters['10-37'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-37',
      name: 'Integral Time 2 (I)',
      range: '0.00~100.00',
      default: '0.50',
      unit: 'Sec',
      page: p455,
    },
  },

  /** @param 10-38 Differential Time 2 (D) -- Range: 0.00~10.00, Default: 0.00, Unit: Sec, Manual p.4-55 */
  '10-38': {
    register: GROUP_10_PID_Parameters['10-38'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-38',
      name: 'Differential Time 2 (D)',
      range: '0.00~10.00',
      default: '0.00',
      unit: 'Sec',
      page: p455,
    },
  },

  /** @param 10-39 Output Frequency Setting of PID Disconnection -- Range: 0.00~599.00, Default: 30.00, Unit: Hz, Manual p.4-55 */
  '10-39': {
    register: GROUP_10_PID_Parameters['10-39'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-39',
      name: 'Output Frequency Setting of PID Disconnection',
      range: '0.00~599.00',
      default: '30.00',
      unit: 'Hz',
      page: p455,
    },
  },

  /** @param 10-40 Selection of PID Sleep Compensation Frequency -- Range: 0-1, Default: 0, Manual p.4-55 */
  '10-40': {
    register: GROUP_10_PID_Parameters['10-40'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-40',
      name: 'Selection of PID Sleep Compensation Frequency',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p455,
    },
  },

  /** @param 10-41 PID Mode Switch -- Range: 0-1, Default: 0, Manual p.4-55 */
  '10-41': {
    register: GROUP_10_PID_Parameters['10-41'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '10-41',
      name: 'PID Mode Switch',
      range: '0-1 (0:General PID / 1:D Type PID)',
      default: '0',
      unit: '-',
      page: p455,
    },
  },

  /**
   * @param 10-47 Proportional Gain 3 (P) -- Range: 0.00~10.00, Default: 1.00, Unit: -, Manual p.4-56
   * @remarks Not listed in the A510 communication addendum (Group 10 register map ends at 10-41).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '10-47': {
    register: GROUP_10_PID_Parameters['10-47'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-47',
      name: 'Proportional Gain 3 (P)',
      range: '0.00~10.00',
      default: '1.00',
      unit: '-',
      page: p456,
    },
  },

  /**
   * @param 10-48 Integral Time 3 (I) -- Range: 0.00~100.00, Default: 1.00, Unit: Sec, Manual p.4-56
   * @remarks Not listed in the A510 communication addendum (Group 10 register map ends at 10-41).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '10-48': {
    register: GROUP_10_PID_Parameters['10-48'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-48',
      name: 'Integral Time 3 (I)',
      range: '0.00~100.00',
      default: '1.00',
      unit: 'Sec',
      page: p456,
    },
  },

  /**
   * @param 10-49 Differential Time 3 (D) -- Range: 0.00~10.00, Default: 0.00, Unit: Sec, Manual p.4-56
   * @remarks Not listed in the A510 communication addendum (Group 10 register map ends at 10-41).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '10-49': {
    register: GROUP_10_PID_Parameters['10-49'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '10-49',
      name: 'Differential Time 3 (D)',
      range: '0.00~10.00',
      default: '0.00',
      unit: 'Sec',
      page: p456,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group10Params = all;
