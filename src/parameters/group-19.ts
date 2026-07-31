/**
 * Group 19: Wobble Frequency Parameters
 * Manual pages 4-79 to 4-80
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_19_Wobble_Frequency_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 19 as const;
const p479 = 479 as const;
const p480 = 480 as const;

const all = {
  '19-00': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-00'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '19-00',
      name: 'Center Frequency of Wobble Frequency',
      range: '5.00~100.00',
      default: '20.00',
      unit: '%',
      page: p479,
    },
  },
  '19-01': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-01'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '19-01',
      name: 'Amplitude of Wobble Frequency',
      range: '0.1~20.0',
      default: '10.0',
      unit: '%',
      page: p479,
    },
  },
  '19-02': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-02'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '19-02',
      name: 'Jump Frequency of Wobble Frequency',
      range: '0.0~50.0',
      default: '0.0',
      unit: '%',
      page: p479,
    },
  },
  '19-03': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-03'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '19-03',
      name: 'Jump Time of Wobble Frequency',
      range: '0~50',
      default: '0',
      unit: 'ms',
      page: p479,
    },
  },
  '19-04': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-04'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '19-04',
      name: 'Wobble Frequency Cycle',
      range: '0.0~1000.0',
      default: '10.0',
      unit: 'Sec',
      page: p479,
    },
  },
  '19-05': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-05'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '19-05',
      name: 'Wobble Frequency Ratio',
      range: '0.1~10.0',
      default: '1.0',
      unit: '-',
      page: p479,
    },
  },
  '19-06': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-06'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '19-06',
      name: 'Upper Offset Amplitude of Wobble Frequency',
      range: '0.0~20.0',
      default: '0.0',
      unit: '%',
      page: p479,
    },
  },
  '19-07': {
    register: GROUP_19_Wobble_Frequency_Parameters['19-07'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '19-07',
      name: 'Lower Offset Amplitude of Wobble Frequency',
      range: '0.0~20.0',
      default: '0.0',
      unit: '%',
      page: p480,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

// ── Static named exports ───────────────────────────────────

// ── Group-level lookup ─────────────────────────────────────

export const group19Params = all;
