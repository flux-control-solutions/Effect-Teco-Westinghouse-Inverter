/**
 * Group 05: Multi-Speed Parameters
 * Manual pages 4-37 to 4-39
 *
 * All 16 speed-stage frequencies (05-01 through 05-16) share the same
 * format: ×0.01 Hz, range 0.00~599.00 Hz.
 * All 32 accel/decel times (05-17 through 05-48) share the same format:
 * ×0.1 s, range 0.1~6000.0 s, default 10.0.
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_05_Multi_Speed_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 5 as const;
const p437 = 437 as const;
const p438 = 438 as const;
const p439 = 439 as const;

// ── Simple UInt16 parameters ───────────────────────────────

/** @param 05-00 Accel/Decel Selection of Multi-Speed — Range: 0-1, Default: 0, Manual p.4-37 */
const all = {
  '05-00': {
    register: GROUP_05_Multi_Speed_Parameters['05-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '05-00',
      name: 'Acceleration/Deceleration Selection of Multi-Speed',
      range: '0-1 (0:by 00-14~00-24 / 1:by 05-17~05-48)',
      default: '0',
      unit: '-',
      page: p437,
    },
  },

  // ── Speed-stage frequency settings (×0.01 Hz) ──────────────

  /** @param 05-01 Frequency Setting of Speed-Stage 0 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-01': {
    register: GROUP_05_Multi_Speed_Parameters['05-01'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-01',
      name: 'Frequency Setting of Speed-Stage 0',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-02 Frequency Setting of Speed-Stage 1 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-02': {
    register: GROUP_05_Multi_Speed_Parameters['05-02'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-02',
      name: 'Frequency Setting of Speed-Stage 1',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-03 Frequency Setting of Speed-Stage 2 — Range: 0.00~599.00, Default: 10.00, Unit: Hz, Manual p.4-37 */
  '05-03': {
    register: GROUP_05_Multi_Speed_Parameters['05-03'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-03',
      name: 'Frequency Setting of Speed-Stage 2',
      range: '0.00~599.00',
      default: '10.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-04 Frequency Setting of Speed-Stage 3 — Range: 0.00~599.00, Default: 20.00, Unit: Hz, Manual p.4-37 */
  '05-04': {
    register: GROUP_05_Multi_Speed_Parameters['05-04'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-04',
      name: 'Frequency Setting of Speed-Stage 3',
      range: '0.00~599.00',
      default: '20.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-05 Frequency Setting of Speed-Stage 4 — Range: 0.00~599.00, Default: 30.00, Unit: Hz, Manual p.4-37 */
  '05-05': {
    register: GROUP_05_Multi_Speed_Parameters['05-05'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-05',
      name: 'Frequency Setting of Speed-Stage 4',
      range: '0.00~599.00',
      default: '30.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-06 Frequency Setting of Speed-Stage 5 — Range: 0.00~599.00, Default: 40.00, Unit: Hz, Manual p.4-37 */
  '05-06': {
    register: GROUP_05_Multi_Speed_Parameters['05-06'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-06',
      name: 'Frequency Setting of Speed-Stage 5',
      range: '0.00~599.00',
      default: '40.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-07 Frequency Setting of Speed-Stage 6 — Range: 0.00~599.00, Default: 50.00, Unit: Hz, Manual p.4-37 */
  '05-07': {
    register: GROUP_05_Multi_Speed_Parameters['05-07'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-07',
      name: 'Frequency Setting of Speed-Stage 6',
      range: '0.00~599.00',
      default: '50.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-08 Frequency Setting of Speed-Stage 7 — Range: 0.00~599.00, Default: 50.00, Unit: Hz, Manual p.4-37 */
  '05-08': {
    register: GROUP_05_Multi_Speed_Parameters['05-08'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-08',
      name: 'Frequency Setting of Speed-Stage 7',
      range: '0.00~599.00',
      default: '50.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-09 Frequency Setting of Speed-Stage 8 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-09': {
    register: GROUP_05_Multi_Speed_Parameters['05-09'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-09',
      name: 'Frequency Setting of Speed-Stage 8',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-10 Frequency Setting of Speed-Stage 9 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-10': {
    register: GROUP_05_Multi_Speed_Parameters['05-10'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-10',
      name: 'Frequency Setting of Speed-Stage 9',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-11 Frequency Setting of Speed-Stage 10 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-11': {
    register: GROUP_05_Multi_Speed_Parameters['05-11'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-11',
      name: 'Frequency Setting of Speed-Stage 10',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-12 Frequency Setting of Speed-Stage 11 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-12': {
    register: GROUP_05_Multi_Speed_Parameters['05-12'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-12',
      name: 'Frequency Setting of Speed-Stage 11',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-13 Frequency Setting of Speed-Stage 12 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-13': {
    register: GROUP_05_Multi_Speed_Parameters['05-13'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-13',
      name: 'Frequency Setting of Speed-Stage 12',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-14 Frequency Setting of Speed-Stage 13 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-14': {
    register: GROUP_05_Multi_Speed_Parameters['05-14'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-14',
      name: 'Frequency Setting of Speed-Stage 13',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-15 Frequency Setting of Speed-Stage 14 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-15': {
    register: GROUP_05_Multi_Speed_Parameters['05-15'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-15',
      name: 'Frequency Setting of Speed-Stage 14',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  /** @param 05-16 Frequency Setting of Speed-Stage 15 — Range: 0.00~599.00, Default: 5.00, Unit: Hz, Manual p.4-37 */
  '05-16': {
    register: GROUP_05_Multi_Speed_Parameters['05-16'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '05-16',
      name: 'Frequency Setting of Speed-Stage 15',
      range: '0.00~599.00',
      default: '5.00',
      unit: 'Hz',
      page: p437,
    },
  },

  // ── Accel/Decel time settings (×0.1 s) ─────────────────────

  /** @param 05-17 Acceleration Time of Multi Speed 0 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-17': {
    register: GROUP_05_Multi_Speed_Parameters['05-17'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-17',
      name: 'Acceleration Time of Multi Speed 0',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-18 Deceleration Time of Multi Speed 0 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-18': {
    register: GROUP_05_Multi_Speed_Parameters['05-18'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-18',
      name: 'Deceleration Time of Multi Speed 0',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-19 Acceleration Time of Multi Speed 1 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-19': {
    register: GROUP_05_Multi_Speed_Parameters['05-19'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-19',
      name: 'Acceleration Time of Multi Speed 1',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-20 Deceleration Time of Multi Speed 1 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-20': {
    register: GROUP_05_Multi_Speed_Parameters['05-20'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-20',
      name: 'Deceleration Time of Multi Speed 1',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-21 Acceleration Time of Multi Speed 2 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-21': {
    register: GROUP_05_Multi_Speed_Parameters['05-21'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-21',
      name: 'Acceleration Time of Multi Speed 2',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-22 Deceleration Time of Multi Speed 2 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-22': {
    register: GROUP_05_Multi_Speed_Parameters['05-22'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-22',
      name: 'Deceleration Time of Multi Speed 2',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-23 Acceleration Time of Multi Speed 3 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-23': {
    register: GROUP_05_Multi_Speed_Parameters['05-23'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-23',
      name: 'Acceleration Time of Multi Speed 3',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-24 Deceleration Time of Multi Speed 3 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-24': {
    register: GROUP_05_Multi_Speed_Parameters['05-24'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-24',
      name: 'Deceleration Time of Multi Speed 3',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-25 Acceleration Time of Multi Speed 4 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-25': {
    register: GROUP_05_Multi_Speed_Parameters['05-25'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-25',
      name: 'Acceleration Time of Multi Speed 4',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-26 Deceleration Time of Multi Speed 4 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-37 */
  '05-26': {
    register: GROUP_05_Multi_Speed_Parameters['05-26'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-26',
      name: 'Deceleration Time of Multi Speed 4',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p437,
    },
  },

  /** @param 05-27 Acceleration Time of Multi Speed 5 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-27': {
    register: GROUP_05_Multi_Speed_Parameters['05-27'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-27',
      name: 'Acceleration Time of Multi Speed 5',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-28 Deceleration Time of Multi Speed 5 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-28': {
    register: GROUP_05_Multi_Speed_Parameters['05-28'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-28',
      name: 'Deceleration Time of Multi Speed 5',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-29 Acceleration Time of Multi Speed 6 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-29': {
    register: GROUP_05_Multi_Speed_Parameters['05-29'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-29',
      name: 'Acceleration Time of Multi Speed 6',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-30 Deceleration Time of Multi Speed 6 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-30': {
    register: GROUP_05_Multi_Speed_Parameters['05-30'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-30',
      name: 'Deceleration Time of Multi Speed 6',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-31 Acceleration Time of Multi Speed 7 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-31': {
    register: GROUP_05_Multi_Speed_Parameters['05-31'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-31',
      name: 'Acceleration Time of Multi Speed 7',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-32 Deceleration Time of Multi Speed 7 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-32': {
    register: GROUP_05_Multi_Speed_Parameters['05-32'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-32',
      name: 'Deceleration Time of Multi Speed 7',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-33 Acceleration Time of Multi Speed 8 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-33': {
    register: GROUP_05_Multi_Speed_Parameters['05-33'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-33',
      name: 'Acceleration Time of Multi Speed 8',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-34 Deceleration Time of Multi Speed 8 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-34': {
    register: GROUP_05_Multi_Speed_Parameters['05-34'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-34',
      name: 'Deceleration Time of Multi Speed 8',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-35 Acceleration Time of Multi Speed 9 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-35': {
    register: GROUP_05_Multi_Speed_Parameters['05-35'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-35',
      name: 'Acceleration Time of Multi Speed 9',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-36 Deceleration Time of Multi Speed 9 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-36': {
    register: GROUP_05_Multi_Speed_Parameters['05-36'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-36',
      name: 'Deceleration Time of Multi Speed 9',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-37 Acceleration Time of Multi Speed 10 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-37': {
    register: GROUP_05_Multi_Speed_Parameters['05-37'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-37',
      name: 'Acceleration Time of Multi Speed 10',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-38 Deceleration Time of Multi Speed 10 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-38': {
    register: GROUP_05_Multi_Speed_Parameters['05-38'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-38',
      name: 'Deceleration Time of Multi Speed 10',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-39 Acceleration Time of Multi Speed 11 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-39': {
    register: GROUP_05_Multi_Speed_Parameters['05-39'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-39',
      name: 'Acceleration Time of Multi Speed 11',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-40 Deceleration Time of Multi Speed 11 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-40': {
    register: GROUP_05_Multi_Speed_Parameters['05-40'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-40',
      name: 'Deceleration Time of Multi Speed 11',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-41 Acceleration Time of Multi Speed 12 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-41': {
    register: GROUP_05_Multi_Speed_Parameters['05-41'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-41',
      name: 'Acceleration Time of Multi Speed 12',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-42 Deceleration Time of Multi Speed 12 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-42': {
    register: GROUP_05_Multi_Speed_Parameters['05-42'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-42',
      name: 'Deceleration Time of Multi Speed 12',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-43 Acceleration Time of Multi Speed 13 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-38 */
  '05-43': {
    register: GROUP_05_Multi_Speed_Parameters['05-43'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-43',
      name: 'Acceleration Time of Multi Speed 13',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p438,
    },
  },

  /** @param 05-44 Deceleration Time of Multi Speed 13 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
  '05-44': {
    register: GROUP_05_Multi_Speed_Parameters['05-44'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-44',
      name: 'Deceleration Time of Multi Speed 13',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p439,
    },
  },

  /** @param 05-45 Acceleration Time of Multi Speed 14 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
  '05-45': {
    register: GROUP_05_Multi_Speed_Parameters['05-45'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-45',
      name: 'Acceleration Time of Multi Speed 14',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p439,
    },
  },

  /** @param 05-46 Deceleration Time of Multi Speed 14 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
  '05-46': {
    register: GROUP_05_Multi_Speed_Parameters['05-46'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-46',
      name: 'Deceleration Time of Multi Speed 14',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p439,
    },
  },

  /** @param 05-47 Acceleration Time of Multi Speed 15 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
  '05-47': {
    register: GROUP_05_Multi_Speed_Parameters['05-47'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-47',
      name: 'Acceleration Time of Multi Speed 15',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p439,
    },
  },

  /** @param 05-48 Deceleration Time of Multi Speed 15 — Range: 0.1~6000.0, Default: 10.0, Unit: s, Manual p.4-39 */
  '05-48': {
    register: GROUP_05_Multi_Speed_Parameters['05-48'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '05-48',
      name: 'Deceleration Time of Multi Speed 15',
      range: '0.1~6000.0',
      default: '10.0',
      unit: 's',
      page: p439,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group05Params = all;
