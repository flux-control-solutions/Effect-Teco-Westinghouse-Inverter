/**
 * Group 18: Slip Compensation Parameters
 * Manual page 4-79
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_18_Slip_Compensation_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 18 as const;
const p479 = 479 as const;

const all = {
  '18-00': {
    register: GROUP_18_Slip_Compensation_Parameters['18-00'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '18-00',
      name: 'Slip Compensation Gain at Low Speed',
      range: '0.00~2.50',
      default: '0.00 / *',
      unit: '-',
      page: p479,
    },
  },
  '18-01': {
    register: GROUP_18_Slip_Compensation_Parameters['18-01'],
    kind: ParamKind.SignedScaled,
    factor: 0.01,
    meta: {
      group,
      code: '18-01',
      name: 'Slip Compensation Gain at High Speed',
      range: '-1.00~1.00',
      default: '0.0',
      unit: '-',
      page: p479,
    },
  },
  '18-02': {
    register: GROUP_18_Slip_Compensation_Parameters['18-02'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '18-02',
      name: 'Slip Compensation Limit',
      range: '0~250',
      default: '200',
      unit: '%',
      page: p479,
    },
  },
  '18-03': {
    register: GROUP_18_Slip_Compensation_Parameters['18-03'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '18-03',
      name: 'Slip Compensation Filter Time',
      range: '0.0~10.0',
      default: '1.0',
      unit: 'Sec',
      page: p479,
    },
  },
  '18-04': {
    register: GROUP_18_Slip_Compensation_Parameters['18-04'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '18-04',
      name: 'Regenerative Slip Compensation Selection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p479,
    },
  },
  '18-05': {
    register: GROUP_18_Slip_Compensation_Parameters['18-05'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '18-05',
      name: 'FOC Delay Time',
      range: '1~1000',
      default: '100',
      unit: 'ms',
      page: p479,
    },
  },
  '18-06': {
    register: GROUP_18_Slip_Compensation_Parameters['18-06'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '18-06',
      name: 'FOC Gain',
      range: '0.00~2.00',
      default: '0.1',
      unit: '-',
      page: p479,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

// ── Static named exports ───────────────────────────────────

// ── Group-level lookup ─────────────────────────────────────

export const group18Params = all;
