/**
 * Group 04: External Analog Input and Output Parameters
 * Manual pages 4-34 to 4-36
 *
 * Parameter                                | Range                        | Default       | Unit | Page
 * 04-00  AI Input Signal Type              | 0-5                          | 1             | -    | 4-34
 * 04-01  AI1 Signal Scanning/Filtering     | 0.00~2.00                   | 0.03          | s    | 4-34
 * 04-02  AI1 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-34
 * 04-03  AI1 Bias                          | -100.0~100.0                | 0             | %    | 4-34
 * 04-04  Negative AI                       | 0-1                         | 0             | -    | 4-34
 * 04-05  AI2 Function Setting              | 0-17                        | 0             | -    | 4-34
 * 04-06  AI2 Signal Scanning/Filtering     | 0.00~2.00                   | 0.03          | s    | 4-35
 * 04-07  AI2 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-35
 * 04-08  AI2 Bias                          | -100.0~100.0                | 0             | %    | 4-35
 * 04-09  AI Input Signal Type of I/O card  | 0-2                         | 0             | -    | 4-35
 * 04-10  AI3 Function Setting              | 0-17                        | 10            | -    | 4-35
 * 04-11  AO1 Function Setting              | 0-28                        | 0             | -    | 4-35
 * 04-12  AO1 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-35
 * 04-13  AO1 Bias                          | -100.0~100.0                | 0             | %    | 4-35
 * 04-16  AO2 Function Setting              | 0-28                        | 3             | -    | 4-36
 * 04-17  AO2 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-36
 * 04-18  AO2 Bias                          | -100.0~100.0                | 0             | %    | 4-36
 * 04-19  AO Output Signal Type             | 0-3                         | 0             | -    | 4-36
 * 04-20  Filter Time of AO Signal Scan     | 0.00~0.50                   | 0.00          | s    | 4-36
 * 04-21  AI3 Signal Scanning/Filtering     | 0.00~2.00                   | 0.03          | s    | 4-36
 * 04-22  AI3 Gain                          | 0.0~1000.0                  | 100.0         | %    | 4-36
 * 04-23  AI3 Bias                          | -100.0~100.0                | 0             | %    | 4-36
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_04_External_Analog_Input_and_Output_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 4 as const;
const p434 = 434 as const;
const p435 = 435 as const;
const p436 = 436 as const;

const all = {
  /** @param 04-00 AI Input Signal Type — Range: 0-5, Default: 1, Manual p.4-34 */
  '04-00': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-00',
      name: 'AI Input Signal Type',
      range: '0-5 (0:AI1 0-10V/AI2 0-10V … 5:AI1 4-20mA/AI2 4-20mA)',
      default: '1',
      unit: '-',
      page: p434,
    },
  },

  /** @param 04-01 AI1 Signal Scanning and Filtering Time — Range: 0.00~2.00, Default: 0.03, Unit: s, Manual p.4-34 */
  '04-01': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-01'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '04-01',
      name: 'AI1 Signal Scanning and Filtering Time',
      range: '0.00~2.00',
      default: '0.03',
      unit: 's',
      page: p434,
    },
  },

  /** @param 04-02 AI1 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-34 */
  '04-02': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-02'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-02',
      name: 'AI1 Gain',
      range: '0.0~1000.0',
      default: '100.0',
      unit: '%',
      page: p434,
    },
  },

  /** @param 04-03 AI1 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-34 */
  '04-03': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-03'],
    kind: ParamKind.SignedScaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-03',
      name: 'AI1 Bias',
      range: '-100.0~100.0',
      default: '0',
      unit: '%',
      page: p434,
    },
  },

  /** @param 04-04 Negative AI — Range: 0-1, Default: 0, Manual p.4-34 */
  '04-04': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-04'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-04',
      name: 'Negative AI',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p434,
    },
  },

  /** @param 04-05 AI2 Function Setting — Range: 0-17, Default: 0, Manual p.4-34 */
  '04-05': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-05'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-05',
      name: 'AI2 Function Setting',
      range: '0-17 (0:Aux Freq / 1:Freq Ref Gain / 2:Freq Ref Bias / … / 17:PTC)',
      default: '0',
      unit: '-',
      page: p434,
    },
  },

  /** @param 04-06 AI2 Signal Scanning and Filtering Time — Range: 0.00~2.00, Default: 0.03, Unit: s, Manual p.4-35 */
  '04-06': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-06'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '04-06',
      name: 'AI2 Signal Scanning and Filtering Time',
      range: '0.00~2.00',
      default: '0.03',
      unit: 's',
      page: p435,
    },
  },

  /** @param 04-07 AI2 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-35 */
  '04-07': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-07'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-07',
      name: 'AI2 Gain',
      range: '0.0~1000.0',
      default: '100.0',
      unit: '%',
      page: p435,
    },
  },

  /** @param 04-08 AI2 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-35 */
  '04-08': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-08'],
    kind: ParamKind.SignedScaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-08',
      name: 'AI2 Bias',
      range: '-100.0~100.0',
      default: '0',
      unit: '%',
      page: p435,
    },
  },

  /** @param 04-09 AI Input Signal Type of I/O card — Range: 0-2, Default: 0, Manual p.4-35 */
  '04-09': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-09'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-09',
      name: 'AI Input Signal Type of I/O card',
      range: '0-2 (0:AI3 0-10V / 1:AI3 -10-10V / 2:AI3 4-20mA)',
      default: '0',
      unit: '-',
      page: p435,
    },
  },

  /** @param 04-10 AI3 Function Setting — Range: 0-17 (same as 04-05), Default: 10, Manual p.4-35 */
  '04-10': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-10'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-10',
      name: 'AI3 Function Setting',
      range: '0-17 (same as 04-05)',
      default: '10',
      unit: '-',
      page: p435,
    },
  },

  /** @param 04-11 AO1 Function Setting — Range: 0-28, Default: 0, Manual p.4-35 */
  '04-11': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-11'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-11',
      name: 'AO1 Function Setting',
      range: '0-28 (0:Output Freq / 1:Freq Cmd / 2:Output V / … / 28:Comm control)',
      default: '0',
      unit: '-',
      page: p435,
    },
  },

  /** @param 04-12 AO1 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-35 */
  '04-12': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-12'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-12',
      name: 'AO1 Gain',
      range: '0.0~1000.0',
      default: '100.0',
      unit: '%',
      page: p435,
    },
  },

  /** @param 04-13 AO1 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-35 */
  '04-13': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-13'],
    kind: ParamKind.SignedScaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-13',
      name: 'AO1 Bias',
      range: '-100.0~100.0',
      default: '0',
      unit: '%',
      page: p435,
    },
  },

  /** @param 04-16 AO2 Function Setting — Range: 0-28 (same as 04-11), Default: 3, Manual p.4-36 */
  '04-16': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-16'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-16',
      name: 'AO2 Function Setting',
      range: '0-28 (same as 04-11)',
      default: '3',
      unit: '-',
      page: p436,
    },
  },

  /** @param 04-17 AO2 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-36 */
  '04-17': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-17'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-17',
      name: 'AO2 Gain',
      range: '0.0~1000.0',
      default: '100.0',
      unit: '%',
      page: p436,
    },
  },

  /** @param 04-18 AO2 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-36 */
  '04-18': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-18'],
    kind: ParamKind.SignedScaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-18',
      name: 'AO2 Bias',
      range: '-100.0~100.0',
      default: '0',
      unit: '%',
      page: p436,
    },
  },

  /** @param 04-19 AO Output Signal Type — Range: 0-3, Default: 0, Manual p.4-36 */
  '04-19': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-19'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '04-19',
      name: 'AO Output Signal Type',
      range: '0-3 (0:AO1 0-10V/AO2 0-10V … 3:AO1 4-20mA/AO2 4-20mA)',
      default: '0',
      unit: '-',
      page: p436,
    },
  },

  /** @param 04-20 Filter Time of AO Signal Scan — Range: 0.00~0.50, Default: 0.00, Unit: s, Manual p.4-36 */
  '04-20': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-20'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '04-20',
      name: 'Filter Time of AO Signal Scan',
      range: '0.00~0.50',
      default: '0.00',
      unit: 's',
      page: p436,
    },
  },

  /**
   * @param 04-21 AI3 Signal Scanning and Filtering Time — Range: 0.00~2.00, Default: 0.03, Unit: s, Manual p.4-36
   * @remarks Not listed in the A510 communication addendum (Group 4 register map ends at 04-12).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '04-21': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-21'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '04-21',
      name: 'AI3 Signal Scanning and Filtering Time',
      range: '0.00~2.00',
      default: '0.03',
      unit: 's',
      page: p436,
    },
  },

  /**
   * @param 04-22 AI3 Gain — Range: 0.0~1000.0, Default: 100.0, Unit: %, Manual p.4-36
   * @remarks Not listed in the A510 communication addendum (Group 4 register map ends at 04-12).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '04-22': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-22'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-22',
      name: 'AI3 Gain',
      range: '0.0~1000.0',
      default: '100.0',
      unit: '%',
      page: p436,
    },
  },

  /**
   * @param 04-23 AI3 Bias — Range: -100.0~100.0, Default: 0, Unit: %, Manual p.4-36
   * @remarks Not listed in the A510 communication addendum (Group 4 register map ends at 04-12).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '04-23': {
    register: GROUP_04_External_Analog_Input_and_Output_Parameters['04-23'],
    kind: ParamKind.SignedScaled,
    factor: 0.1,
    meta: {
      group,
      code: '04-23',
      name: 'AI3 Bias',
      range: '-100.0~100.0',
      default: '0',
      unit: '%',
      page: p436,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group04Params = all;
