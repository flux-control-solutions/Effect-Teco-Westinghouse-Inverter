/**
 * Group 06: Automatic Program Operation Parameters
 * Manual pages 4-40 to 4-43
 *
 * Three families:
 *   06-01…06-15  frequency settings     ×0.01 Hz
 *   06-16…06-31  operation times         ×0.1 s
 *   06-32…06-47  direction selections    0/1/2 (simple UInt16)
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_06_Automatic_Program_Operation_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 6 as const;
const p440 = 440 as const;
const p441 = 441 as const;
const p442 = 442 as const;
const p443 = 443 as const;

// ── Operation direction (0=Stop, 1=Forward, 2=Reverse) ────

const dirMeta = (idx: number, page: number) => ({
  group,
  code: `06-${32 + idx}`,
  name: `Operation Direction Selection of Speed-Stage ${idx}`,
  range: '0-2 (0:Stop / 1:Forward / 2:Reverse)',
  default: '0',
  unit: '-',
  page,
});

// ── Frequency settings (×0.01 Hz) ──────────────────────────

const freqMeta = (stage: number, def: string, page: number) => ({
  group,
  code: `06-${String(stage).padStart(2, '0')}`,
  name: `Frequency Setting of Operation-Stage ${stage}`,
  range: '0.00~599.00',
  default: def,
  unit: 'Hz',
  page,
});

// ── Operation time settings (×0.1 s) ───────────────────────

const timeMeta = (stage: number, page: number) => ({
  group,
  code: `06-${16 + stage}`,
  name: `Operation Time Setting of Speed-Stage ${stage}`,
  range: '0.0~6000.0',
  default: '0.0',
  unit: 's',
  page,
});

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 06-00 Automatic Operation Mode Selection — Range: 0-6, Default: 0, Manual p.4-40 */
const all = {
  '06-00': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '06-00',
      name: 'Automatic Operation Mode Selection',
      range: '0-6',
      default: '0',
      unit: '-',
      page: p440,
    },
  },

  // ── Operation direction (0=Stop, 1=Forward, 2=Reverse) ────

  '06-32': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-32'],
    kind: ParamKind.UInt16,
    meta: dirMeta(0, p442),
  },
  '06-33': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-33'],
    kind: ParamKind.UInt16,
    meta: dirMeta(1, p442),
  },
  '06-34': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-34'],
    kind: ParamKind.UInt16,
    meta: dirMeta(2, p442),
  },
  '06-35': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-35'],
    kind: ParamKind.UInt16,
    meta: dirMeta(3, p442),
  },
  '06-36': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-36'],
    kind: ParamKind.UInt16,
    meta: dirMeta(4, p442),
  },
  '06-37': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-37'],
    kind: ParamKind.UInt16,
    meta: dirMeta(5, p443),
  },
  '06-38': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-38'],
    kind: ParamKind.UInt16,
    meta: dirMeta(6, p443),
  },
  '06-39': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-39'],
    kind: ParamKind.UInt16,
    meta: dirMeta(7, p443),
  },
  '06-40': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-40'],
    kind: ParamKind.UInt16,
    meta: dirMeta(8, p443),
  },
  '06-41': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-41'],
    kind: ParamKind.UInt16,
    meta: dirMeta(9, p443),
  },
  '06-42': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-42'],
    kind: ParamKind.UInt16,
    meta: dirMeta(10, p443),
  },
  '06-43': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-43'],
    kind: ParamKind.UInt16,
    meta: dirMeta(11, p443),
  },
  '06-44': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-44'],
    kind: ParamKind.UInt16,
    meta: dirMeta(12, p443),
  },
  '06-45': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-45'],
    kind: ParamKind.UInt16,
    meta: dirMeta(13, p443),
  },
  '06-46': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-46'],
    kind: ParamKind.UInt16,
    meta: dirMeta(14, p443),
  },
  '06-47': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-47'],
    kind: ParamKind.UInt16,
    meta: dirMeta(15, p443),
  },

  // ── Frequency settings (×0.01 Hz) ──────────────────────────

  '06-01': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-01'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(1, '5.00', p440),
  },
  '06-02': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-02'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(2, '10.00', p440),
  },
  '06-03': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-03'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(3, '20.00', p440),
  },
  '06-04': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-04'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(4, '30.00', p441),
  },
  '06-05': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-05'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(5, '40.00', p441),
  },
  '06-06': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-06'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(6, '50.00', p441),
  },
  '06-07': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-07'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(7, '50.00', p441),
  },
  '06-08': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-08'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(8, '5.00', p441),
  },
  '06-09': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-09'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(9, '5.00', p441),
  },
  '06-10': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-10'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(10, '5.00', p441),
  },
  '06-11': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-11'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(11, '5.00', p441),
  },
  '06-12': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-12'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(12, '5.00', p441),
  },
  '06-13': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-13'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(13, '5.00', p441),
  },
  '06-14': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-14'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(14, '5.00', p441),
  },
  '06-15': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-15'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: freqMeta(15, '5.00', p441),
  },

  // ── Operation time settings (×0.1 s) ───────────────────────

  '06-16': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-16'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(0, p441),
  },
  '06-17': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-17'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(1, p441),
  },
  '06-18': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-18'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(2, p441),
  },
  '06-19': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-19'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(3, p441),
  },
  '06-20': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-20'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(4, p442),
  },
  '06-21': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-21'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(5, p442),
  },
  '06-22': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-22'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(6, p442),
  },
  '06-23': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-23'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(7, p442),
  },
  '06-24': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-24'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(8, p442),
  },
  '06-25': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-25'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(9, p442),
  },
  '06-26': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-26'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(10, p442),
  },
  '06-27': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-27'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(11, p442),
  },
  '06-28': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-28'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(12, p442),
  },
  '06-29': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-29'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(13, p442),
  },
  '06-30': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-30'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(14, p442),
  },
  '06-31': {
    register: GROUP_06_Automatic_Program_Operation_Parameters['06-31'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: timeMeta(15, p442),
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group06Params = all;
