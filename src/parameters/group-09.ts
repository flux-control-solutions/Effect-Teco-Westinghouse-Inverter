/**
 * Group 09: Communication Parameters
 * Manual pages 4-52
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_09_Communication_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 9 as const;
const p452 = 452 as const;

const all = {
  /** @param 09-00 INV Communication Station Address -- Range: 1~31, Default: 1, Manual p.4-52 */
  '09-00': {
    register: GROUP_09_Communication_Parameters['09-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-00',
      name: 'INV Communication Station Address',
      range: '1~31',
      default: '1',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-01 Communication Mode Selection -- Range: 0 (MODBUS), Default: 0, Manual p.4-52 */
  '09-01': {
    register: GROUP_09_Communication_Parameters['09-01'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-01',
      name: 'Communication Mode Selection',
      range: '0 (MODBUS)',
      default: '0',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-02 Baud Rate Setting (bps) -- Range: 0-5, Default: 4, Manual p.4-52 */
  '09-02': {
    register: GROUP_09_Communication_Parameters['09-02'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-02',
      name: 'Baud Rate Setting (bps)',
      range: '0-5 (0:1200 / 1:2400 / 2:4800 / 3:9600 / 4:19200 / 5:38400)',
      default: '4',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-03 Stop Bit Selection -- Range: 0-1, Default: 0, Manual p.4-52 */
  '09-03': {
    register: GROUP_09_Communication_Parameters['09-03'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-03',
      name: 'Stop Bit Selection',
      range: '0-1 (0:1 StopBit / 1:2 StopBit)',
      default: '0',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-04 Parity Selection -- Range: 0-2, Default: 0, Manual p.4-52 */
  '09-04': {
    register: GROUP_09_Communication_Parameters['09-04'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-04',
      name: 'Parity Selection',
      range: '0-2 (0:No Parity / 1:Even Bit / 2:Odd Bit)',
      default: '0',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-05 Communication DataBit Selection -- Range: 0-1, Default: 0, Manual p.4-52 */
  '09-05': {
    register: GROUP_09_Communication_Parameters['09-05'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-05',
      name: 'Communication DataBit Selection',
      range: '0-1 (0:8 Bit Data / 1:7 Bit Data)',
      default: '0',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-06 Communication Error Detection Time -- Range: 0.0~25.5, Default: 0.0, Unit: S, Manual p.4-52 */
  '09-06': {
    register: GROUP_09_Communication_Parameters['09-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '09-06',
      name: 'Communication Error Detection Time',
      range: '0.0~25.5',
      default: '0.0',
      unit: 'S',
      page: p452,
    },
  },

  /** @param 09-07 Fault Stop Selection -- Range: 0-3, Default: 3, Manual p.4-52 */
  '09-07': {
    register: GROUP_09_Communication_Parameters['09-07'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-07',
      name: 'Fault Stop Selection',
      range: '0-3 (0:Decel stop DT1 / 1:Coast stop / 2:Decel stop DT2 / 3:Keep operating)',
      default: '3',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-08 Comm. Fault Tolerance Count -- Range: 1~20, Default: 1, Manual p.4-52 */
  '09-08': {
    register: GROUP_09_Communication_Parameters['09-08'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-08',
      name: 'Comm. Fault Tolerance Count',
      range: '1~20',
      default: '1',
      unit: '-',
      page: p452,
    },
  },

  /** @param 09-09 Waiting Time -- Range: 5~65, Default: 5, Unit: ms, Manual p.4-52 */
  '09-09': {
    register: GROUP_09_Communication_Parameters['09-09'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '09-09',
      name: 'Waiting Time',
      range: '5~65',
      default: '5',
      unit: 'ms',
      page: p452,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group09Params = all;
