/**
 * Group 07: Start/Stop Parameters
 * Manual pages 4-44 to 4-46
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_07_Start_Stop_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 7 as const;
const p444 = 444 as const;
const p445 = 445 as const;
const p446 = 446 as const;

const all = {
  /** @param 07-00 Momentary Power Loss/Fault Restart Selection — Range: 0-1, Default: 0, Manual p.4-44 */
  '07-00': {
    register: GROUP_07_Start_Stop_Parameters['07-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-00',
      name: 'Momentary Power Loss/Fault Restart Selection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p444,
    },
  },

  /** @param 07-01 Fault Auto-Restart Time — Range: 0~7200, Default: 0, Unit: s, Manual p.4-44 */
  '07-01': {
    register: GROUP_07_Start_Stop_Parameters['07-01'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-01',
      name: 'Fault Auto-Restart Time',
      range: '0~7200',
      default: '0',
      unit: 's',
      page: p444,
    },
  },

  /** @param 07-02 Number of Fault Auto-Restart Attempts — Range: 0~10, Default: 0, Manual p.4-44 */
  '07-02': {
    register: GROUP_07_Start_Stop_Parameters['07-02'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-02',
      name: 'Number of Fault Auto-Restart Attempts',
      range: '0~10',
      default: '0',
      unit: '-',
      page: p444,
    },
  },

  /** @param 07-04 Direct Start at Power On — Range: 0-1, Default: 1, Manual p.4-44 */
  '07-04': {
    register: GROUP_07_Start_Stop_Parameters['07-04'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-04',
      name: 'Direct Start at Power On',
      range: '0-1 (0:Direct start / 1:Unable to direct start)',
      default: '1',
      unit: '-',
      page: p444,
    },
  },

  /** @param 07-05 Delay of Direct Start at Power On — Range: 1.0~300.0, Default: 3.5, Unit: s, Manual p.4-44 */
  '07-05': {
    register: GROUP_07_Start_Stop_Parameters['07-05'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-05',
      name: 'Delay of Direct Start at Power On',
      range: '1.0~300.0',
      default: '3.5',
      unit: 's',
      page: p444,
    },
  },

  /** @param 07-06 DC Injection Braking Starting Frequency — Range: 0.0~10.0, Default: 0.5, Unit: Hz, Manual p.4-44 */
  '07-06': {
    register: GROUP_07_Start_Stop_Parameters['07-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-06',
      name: 'DC Injection Braking Starting Frequency',
      range: '0.0~10.0',
      default: '0.5',
      unit: 'Hz',
      page: p444,
    },
  },

  /** @param 07-07 DC Injection Braking Current — Range: 0~100, Default: 50, Unit: %, Manual p.4-44 */
  '07-07': {
    register: GROUP_07_Start_Stop_Parameters['07-07'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-07',
      name: 'DC Injection Braking Current',
      range: '0~100',
      default: '50',
      unit: '%',
      page: p444,
    },
  },

  /** @param 07-08 DC Injection Braking Time at Stop — Range: 0.00~100.00, Default: 0.50, Unit: s, Manual p.4-44 */
  '07-08': {
    register: GROUP_07_Start_Stop_Parameters['07-08'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-08',
      name: 'DC Injection Braking Time at Stop',
      range: '0.00~100.00',
      default: '0.50',
      unit: 's',
      page: p444,
    },
  },

  /** @param 07-09 Stop Mode Selection — Range: 0-3, Default: 0, Manual p.4-44 */
  '07-09': {
    register: GROUP_07_Start_Stop_Parameters['07-09'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-09',
      name: 'Stop Mode Selection',
      range: '0-3 (0:Decel to Stop / 1:Coast to Stop / 2:DC Braking / 3:Coast to Stop w/ Timer)',
      default: '0',
      unit: '-',
      page: p444,
    },
  },

  /** @param 07-13 Low Voltage Detection Level — Range: voltage-dependent, Default: 190/380/546, Unit: V, Manual p.4-44 */
  '07-13': {
    register: GROUP_07_Start_Stop_Parameters['07-13'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-13',
      name: 'Low Voltage Detection Level',
      range: '150~300 (230V) / 250~600 (460V) / 500~600 (575V/690V)',
      default: '190 (230V) / 380 (460V) / 546 (575V/690V)',
      unit: 'V',
      page: p444,
    },
  },

  /** @param 07-14 Pre-excitation Time — Range: 0.00~10.00, Default: 2.00, Unit: s, Manual p.4-44 */
  '07-14': {
    register: GROUP_07_Start_Stop_Parameters['07-14'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-14',
      name: 'Pre-excitation Time',
      range: '0.00~10.00',
      default: '2.00',
      unit: 's',
      page: p444,
    },
  },

  /** @param 07-15 Pre-excitation Level — Range: 50~200, Default: 100, Unit: %, Manual p.4-44 */
  '07-15': {
    register: GROUP_07_Start_Stop_Parameters['07-15'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-15',
      name: 'Pre-excitation Level',
      range: '50~200',
      default: '100',
      unit: '%',
      page: p444,
    },
  },

  /** @param 07-16 DC Injection Braking Time at Start — Range: 0.00~100.00, Default: 0.00, Unit: s, Manual p.4-44 */
  '07-16': {
    register: GROUP_07_Start_Stop_Parameters['07-16'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-16',
      name: 'DC Injection Braking Time at Start',
      range: '0.00~100.00',
      default: '0.00',
      unit: 's',
      page: p444,
    },
  },

  /** @param 07-18 Minimum Base block Time — Range: 0.1~5.0, Default: *, Unit: Sec, Manual p.4-44 */
  '07-18': {
    register: GROUP_07_Start_Stop_Parameters['07-18'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-18',
      name: 'Minimum Base block Time',
      range: '0.1~5.0',
      default: '* (see Attachment 1 p.170)',
      unit: 'Sec',
      page: p444,
    },
  },

  /** @param 07-19 Direction-Detection Speed Search — Range: 0~100, Default: 50, Unit: %, Manual p.4-44 */
  '07-19': {
    register: GROUP_07_Start_Stop_Parameters['07-19'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-19',
      name: 'Direction-Detection Speed Search',
      range: '0~100',
      default: '50',
      unit: '%',
      page: p444,
    },
  },

  /** @param 07-20 Speed Search Operating Current — Range: 0~100, Default: 20, Unit: %, Manual p.4-45 */
  '07-20': {
    register: GROUP_07_Start_Stop_Parameters['07-20'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-20',
      name: 'Speed Search Operating Current',
      range: '0~100',
      default: '20',
      unit: '%',
      page: p445,
    },
  },

  /** @param 07-21 Integral Time of Speed Searching — Range: 0.1~10.0, Default: 2.0, Unit: Sec, Manual p.4-45 */
  '07-21': {
    register: GROUP_07_Start_Stop_Parameters['07-21'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-21',
      name: 'Integral Time of Speed Searching',
      range: '0.1~10.0',
      default: '2.0',
      unit: 'Sec',
      page: p445,
    },
  },

  /** @param 07-22 Delay Time of Speed Searching — Range: 0.0~20.0, Default: 0.2, Unit: Sec, Manual p.4-45 */
  '07-22': {
    register: GROUP_07_Start_Stop_Parameters['07-22'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-22',
      name: 'Delay Time of Speed Searching',
      range: '0.0~20.0',
      default: '0.2',
      unit: 'Sec',
      page: p445,
    },
  },

  /** @param 07-23 Voltage Recovery Time — Range: 0.1~5.0, Default: 2.0, Unit: Sec, Manual p.4-45 */
  '07-23': {
    register: GROUP_07_Start_Stop_Parameters['07-23'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-23',
      name: 'Voltage Recovery Time',
      range: '0.1~5.0',
      default: '2.0',
      unit: 'Sec',
      page: p445,
    },
  },

  /** @param 07-24 Direction-Detection Speed Search Selection — Range: 0-1, Default: 1, Manual p.4-45 */
  '07-24': {
    register: GROUP_07_Start_Stop_Parameters['07-24'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-24',
      name: 'Direction-Detection Speed Search Selection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '1',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-25 Low Voltage Detection Time — Range: 0.00~1.00, Default: 0.02, Unit: Sec, Manual p.4-45 */
  '07-25': {
    register: GROUP_07_Start_Stop_Parameters['07-25'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-25',
      name: 'Low Voltage Detection Time',
      range: '0.00~1.00',
      default: '0.02',
      unit: 'Sec',
      page: p445,
    },
  },

  /** @param 07-26 Start-up Mode Selection of SLV Coast to Stop — Range: 0-1, Default: 0, Manual p.4-45 */
  '07-26': {
    register: GROUP_07_Start_Stop_Parameters['07-26'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-26',
      name: 'Start-up Mode Selection of SLV Coast to Stop',
      range: '0-1 (0:Speed search / 1:Normal start)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-27 Start Selection after Fault during SLV Mode — Range: 0-1, Default: 0, Manual p.4-45 */
  '07-27': {
    register: GROUP_07_Start_Stop_Parameters['07-27'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-27',
      name: 'Start Selection after Fault during SLV Mode',
      range: '0-1 (0:Speed search / 1:Normal start)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-28 Start after External Base Block — Range: 0-1, Default: 0, Manual p.4-45 */
  '07-28': {
    register: GROUP_07_Start_Stop_Parameters['07-28'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-28',
      name: 'Start after External Base Block',
      range: '0-1 (0:Speed search / 1:Normal start)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-29 Run Command Selection at DC Braking — Range: 0-1, Default: 0, Manual p.4-45 */
  '07-29': {
    register: GROUP_07_Start_Stop_Parameters['07-29'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-29',
      name: 'Run Command Selection at DC Braking',
      range: '0-1 (0:Not Allowable / 1:Allowable)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-30 Low Voltage Level Selection — Range: 0-1, Default: 0, Manual p.4-45 */
  '07-30': {
    register: GROUP_07_Start_Stop_Parameters['07-30'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-30',
      name: 'Low Voltage Level Selection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-31 Low Voltage Run Frequency — Range: 0.00~599.00, Default: 10.00, Unit: Hz, Manual p.4-45 */
  '07-31': {
    register: GROUP_07_Start_Stop_Parameters['07-31'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-31',
      name: 'Low Voltage Run Frequency',
      range: '0.00~599.00',
      default: '10.00',
      unit: 'Hz',
      page: p445,
    },
  },

  /** @param 07-32 Speed Search Mode Selection — Range: 0-2, Default: 0, Manual p.4-45 */
  '07-32': {
    register: GROUP_07_Start_Stop_Parameters['07-32'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-32',
      name: 'Speed Search Mode Selection',
      range: '0-2 (0:Disable / 1:Mode 1 / 2:Execute each time)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /** @param 07-33 Start Frequency of Speed Search Selection — Range: 0-1, Default: 0, Manual p.4-45 */
  '07-33': {
    register: GROUP_07_Start_Stop_Parameters['07-33'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-33',
      name: 'Start Frequency of Speed Search Selection',
      range: '0-1 (0:Max Output Freq / 1:Freq Cmd)',
      default: '0',
      unit: '-',
      page: p445,
    },
  },

  /**
   * @param 07-34 Short-circuit Braking Time at Start — Range: 0.00~100.00, Default: 0.00, Unit: Sec, Manual p.4-45
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-34': {
    register: GROUP_07_Start_Stop_Parameters['07-34'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-34',
      name: 'Short-circuit Braking Time at Start',
      range: '0.00~100.00',
      default: '0.00',
      unit: 'Sec',
      page: p445,
    },
  },

  /**
   * @param 07-35 Short-circuit Braking Time at Stop — Range: 0.00~100.00, Default: 0.50, Unit: Sec, Manual p.4-45
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-35': {
    register: GROUP_07_Start_Stop_Parameters['07-35'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-35',
      name: 'Short-circuit Braking Time at Stop',
      range: '0.00~100.00',
      default: '0.50',
      unit: 'Sec',
      page: p445,
    },
  },

  /**
   * @param 07-36 Short-circuit Braking Current — Range: 0.0~200.0, Default: 100.0, Unit: %, Manual p.4-45
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-36': {
    register: GROUP_07_Start_Stop_Parameters['07-36'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-36',
      name: 'Short-circuit Braking Current',
      range: '0.0~200.0',
      default: '100.0',
      unit: '%',
      page: p445,
    },
  },

  /**
   * @param 07-42 Voltage Limit Gain — Range: 0.0~50.0, Default: 0, Unit: %, Manual p.4-46
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-42': {
    register: GROUP_07_Start_Stop_Parameters['07-42'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '07-42',
      name: 'Voltage Limit Gain',
      range: '0.0~50.0',
      default: '0',
      unit: '%',
      page: p446,
    },
  },

  /**
   * @param 07-43 Short-circuit Braking Time of PM Speed Search — Range: 0.00~100.00, Default: 0.00, Unit: Sec, Manual p.4-46
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-43': {
    register: GROUP_07_Start_Stop_Parameters['07-43'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-43',
      name: 'Short-circuit Braking Time of PM Speed Search',
      range: '0.00~100.00',
      default: '0.00',
      unit: 'Sec',
      page: p446,
    },
  },

  /**
   * @param 07-44 DC Braking Time of PM Speed Search — Range: 0.00~100.00, Default: 0.00, Unit: Sec, Manual p.4-46
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-44': {
    register: GROUP_07_Start_Stop_Parameters['07-44'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '07-44',
      name: 'DC Braking Time of PM Speed Search',
      range: '0.00~100.00',
      default: '0.00',
      unit: 'Sec',
      page: p446,
    },
  },

  /**
   * @param 07-45 STP2 Function Selection — Range: 0-1, Default: 0, Manual p.4-46
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-45': {
    register: GROUP_07_Start_Stop_Parameters['07-45'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-45',
      name: 'STP2 Function Selection',
      range: '0-1 (0:STP2 Enable / 1:STP2 Disable)',
      default: '0',
      unit: '-',
      page: p446,
    },
  },

  /**
   * @param 07-46 DC Injection Current Limit — Range: 0~150, Default: 100, Unit: %, Manual p.4-46
   * @remarks Not listed in the A510 communication addendum (Group 7 register map ends at 07-33).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '07-46': {
    register: GROUP_07_Start_Stop_Parameters['07-46'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '07-46',
      name: 'DC Injection Current Limit',
      range: '0~150',
      default: '100',
      unit: '%',
      page: p446,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group07Params = all;
