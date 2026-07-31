/**
 * Group 08: Protection Parameters
 * Manual pages 4-47 to 4-51
 */

import { ParamKind, type ParamConfig } from '@flux-control/modbus-schema';

import { GROUP_08_Protection_Parameters } from '../Registers';
import type { InverterRegisterMeta } from './operations';

const group = 8 as const;
const p447 = 447 as const;
const p448 = 448 as const;
const p449 = 449 as const;
const p450 = 450 as const;
const p451 = 451 as const;

const all = {
  /** @param 08-00 Stall Prevention Function -- Bit field, Default: 0000b, Manual p.4-47 */
  '08-00': {
    register: GROUP_08_Protection_Parameters['08-00'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-00',
      name: 'Stall Prevention Function',
      range: 'bit0:Acc/bit1:Dec/bit2:Op/bit3:DecTimeBase',
      default: '0000b (0)',
      unit: '-',
      page: p447,
    },
  },

  /** @param 08-01 Stall Prevention Level in Acceleration -- Range: 20~200, Default: HD:150 ND:120, Unit: %, Manual p.4-47 */
  '08-01': {
    register: GROUP_08_Protection_Parameters['08-01'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-01',
      name: 'Stall Prevention Level in Acceleration',
      range: '20~200',
      default: 'HD:150 / ND:120',
      unit: '%',
      page: p447,
    },
  },

  /** @param 08-02 Stall Prevention Level in Deceleration -- Range: voltage-dependent, Unit: V, Manual p.4-47 */
  '08-02': {
    register: GROUP_08_Protection_Parameters['08-02'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-02',
      name: 'Stall Prevention Level in Deceleration',
      range: '330~410 (230V) / 660~820 (460V) / 900~1000 (575V) / 1080~1200 (690V)',
      default: '385 (230V) / 770 (460V) / 950 (575V) / 1140 (690V)',
      unit: 'V',
      page: p447,
    },
  },

  /** @param 08-03 Stall Prevention Level in Operation -- Range: 30~200, Default: HD:160 ND:120, Unit: %, Manual p.4-47 */
  '08-03': {
    register: GROUP_08_Protection_Parameters['08-03'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-03',
      name: 'Stall Prevention Level in Operation',
      range: '30~200',
      default: 'HD:160 / ND:120',
      unit: '%',
      page: p447,
    },
  },

  /** @param 08-05 Selection for Motor Overload Protection (OL1) -- Bit field, Default: 0101b, Manual p.4-47 */
  '08-05': {
    register: GROUP_08_Protection_Parameters['08-05'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-05',
      name: 'Selection for Motor Overload Protection (OL1)',
      range: 'bit0:Enable/bit1:ColdHot/bit2:MotorType/bit3:Reserved',
      default: '0101b (5)',
      unit: '-',
      page: p447,
    },
  },

  /** @param 08-06 Start-up Mode of Overload Protection Operation (OL1) -- Range: 0-1, Default: 0, Manual p.4-47 */
  '08-06': {
    register: GROUP_08_Protection_Parameters['08-06'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-06',
      name: 'Start-up Mode of Overload Protection Operation (OL1)',
      range: '0-1 (0:Stop output / 1:Continuous operation)',
      default: '0',
      unit: '-',
      page: p447,
    },
  },

  /** @param 08-07 Motor Overload (OL1) Protection Level -- Range: 0-2, Default: 0, Manual p.4-47 */
  '08-07': {
    register: GROUP_08_Protection_Parameters['08-07'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-07',
      name: 'Motor Overload (OL1) Protection Level',
      range: '0-2 (0:Protection 0 / 1:Protection 1 / 2:Protection 2)',
      default: '0',
      unit: '-',
      page: p447,
    },
  },

  /** @param 08-08 Automatic Voltage Regulation (AVR) -- Range: 0-1, Default: 0, Manual p.4-47 */
  '08-08': {
    register: GROUP_08_Protection_Parameters['08-08'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-08',
      name: 'Automatic Voltage Regulation (AVR)',
      range: '0-1 (0:Enable / 1:Disable)',
      default: '0',
      unit: '-',
      page: p447,
    },
  },

  /** @param 08-09 Selection of Input Phase Loss Protection -- Range: 0-1, Default: 0, Manual p.4-47 */
  '08-09': {
    register: GROUP_08_Protection_Parameters['08-09'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-09',
      name: 'Selection of Input Phase Loss Protection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p447,
    },
  },

  /** @param 08-10 Selection of Output Phase Loss Protection -- Range: 0-1, Default: 0, Manual p.4-48 */
  '08-10': {
    register: GROUP_08_Protection_Parameters['08-10'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-10',
      name: 'Selection of Output Phase Loss Protection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p448,
    },
  },

  /** @param 08-13 Selection of Over-Torque Detection -- Range: 0-2, Default: 0, Manual p.4-48 */
  '08-13': {
    register: GROUP_08_Protection_Parameters['08-13'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-13',
      name: 'Selection of Over-Torque Detection',
      range: '0-2 (0:Disable / 1:Detect at set freq / 2:Detect at operation start)',
      default: '0',
      unit: '-',
      page: p448,
    },
  },

  /** @param 08-14 Selection of Over-Torque Operation -- Range: 0-2, Default: 0, Manual p.4-48 */
  '08-14': {
    register: GROUP_08_Protection_Parameters['08-14'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-14',
      name: 'Selection of Over-Torque Operation',
      range: '0-2 (0:Decel to stop / 1:Warning only / 2:Coast to stop)',
      default: '0',
      unit: '-',
      page: p448,
    },
  },

  /** @param 08-15 Level of Over-Torque Detection -- Range: 0~300, Default: 150, Unit: %, Manual p.4-48 */
  '08-15': {
    register: GROUP_08_Protection_Parameters['08-15'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-15',
      name: 'Level of Over-Torque Detection',
      range: '0~300',
      default: '150',
      unit: '%',
      page: p448,
    },
  },

  /** @param 08-16 Time of Over-Torque Detection -- Range: 0.0~10.0, Default: 0.1, Unit: Sec, Manual p.4-48 */
  '08-16': {
    register: GROUP_08_Protection_Parameters['08-16'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-16',
      name: 'Time of Over-Torque Detection',
      range: '0.0~10.0',
      default: '0.1',
      unit: 'Sec',
      page: p448,
    },
  },

  /** @param 08-17 Selection of Low-Torque Detection -- Range: 0-2, Default: 0, Manual p.4-48 */
  '08-17': {
    register: GROUP_08_Protection_Parameters['08-17'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-17',
      name: 'Selection of Low-Torque Detection',
      range: '0-2 (0:Disable / 1:Detect at set freq / 2:Detect at operation start)',
      default: '0',
      unit: '-',
      page: p448,
    },
  },

  /** @param 08-18 Selection of Low-Torque Operation -- Range: 0-2, Default: 0, Manual p.4-48 */
  '08-18': {
    register: GROUP_08_Protection_Parameters['08-18'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-18',
      name: 'Selection of Low-Torque Operation',
      range: '0-2 (0:Decel to stop / 1:Warning only / 2:Coast to stop)',
      default: '0',
      unit: '-',
      page: p448,
    },
  },

  /** @param 08-19 Level of Low-Torque Detection -- Range: 0~300, Default: 30, Unit: %, Manual p.4-48 */
  '08-19': {
    register: GROUP_08_Protection_Parameters['08-19'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-19',
      name: 'Level of Low-Torque Detection',
      range: '0~300',
      default: '30',
      unit: '%',
      page: p448,
    },
  },

  /** @param 08-20 Time of Low-Torque Detection -- Range: 0.0~10.0, Default: 0.1, Unit: Sec, Manual p.4-49 */
  '08-20': {
    register: GROUP_08_Protection_Parameters['08-20'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-20',
      name: 'Time of Low-Torque Detection',
      range: '0.0~10.0',
      default: '0.1',
      unit: 'Sec',
      page: p449,
    },
  },

  /** @param 08-21 Limit of Stall Prevention in Acc over Base Speed -- Range: 1~100, Default: 50, Unit: %, Manual p.4-49 */
  '08-21': {
    register: GROUP_08_Protection_Parameters['08-21'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-21',
      name: 'Limit of Stall Prevention in Acc over Base Speed',
      range: '1~100',
      default: '50',
      unit: '%',
      page: p449,
    },
  },

  /** @param 08-22 Stall Prevention Detection Time in Operation -- Range: 2~100, Default: 100, Unit: ms, Manual p.4-49 */
  '08-22': {
    register: GROUP_08_Protection_Parameters['08-22'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-22',
      name: 'Stall Prevention Detection Time in Operation',
      range: '2~100',
      default: '100',
      unit: 'ms',
      page: p449,
    },
  },

  /** @param 08-23 Ground Fault (GF) Selection -- Range: 0-1, Default: 0, Manual p.4-49 */
  '08-23': {
    register: GROUP_08_Protection_Parameters['08-23'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-23',
      name: 'Ground Fault (GF) Selection',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p449,
    },
  },

  /** @param 08-24 External Fault Operation Selection -- Range: 0-2, Default: 0, Manual p.4-49 */
  '08-24': {
    register: GROUP_08_Protection_Parameters['08-24'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-24',
      name: 'External Fault Operation Selection',
      range: '0-2 (0:Decel to stop / 1:Coast to stop / 2:Continuous operation)',
      default: '0',
      unit: '-',
      page: p449,
    },
  },

  /** @param 08-25 Detection Selection of External Fault -- Range: 0-1, Default: 0, Manual p.4-49 */
  '08-25': {
    register: GROUP_08_Protection_Parameters['08-25'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-25',
      name: 'Detection Selection of External Fault',
      range: '0-1 (0:Immediately / 1:When operation started)',
      default: '0',
      unit: '-',
      page: p449,
    },
  },

  /** @param 08-30 Run Permissive Function Selection -- Range: 0-1, Default: 0, Manual p.4-49 */
  '08-30': {
    register: GROUP_08_Protection_Parameters['08-30'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-30',
      name: 'Run Permissive Function Selection',
      range: '0-1 (0:Decel to stop / 1:Coast to stop)',
      default: '0',
      unit: '-',
      page: p449,
    },
  },

  /** @param 08-35 Motor Overheating Fault Selection -- Range: 0-3, Default: 0, Manual p.4-49 */
  '08-35': {
    register: GROUP_08_Protection_Parameters['08-35'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-35',
      name: 'Motor Overheating Fault Selection',
      range: '0-3 (0:Disable / 1:Decel to stop / 2:Coast to stop / 3:Continue running)',
      default: '0',
      unit: '-',
      page: p449,
    },
  },

  /** @param 08-36 PTC Input Filter Time Constant -- Range: 0.00~5.00, Default: 2.00, Unit: Sec, Manual p.4-49 */
  '08-36': {
    register: GROUP_08_Protection_Parameters['08-36'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '08-36',
      name: 'PTC Input Filter Time Constant',
      range: '0.00~5.00',
      default: '2.00',
      unit: 'Sec',
      page: p449,
    },
  },

  /** @param 08-37 Fan Control Function -- Range: 0-2, Default: 0, Manual p.4-49 */
  '08-37': {
    register: GROUP_08_Protection_Parameters['08-37'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-37',
      name: 'Fan Control Function',
      range: '0-2 (0:Start in operation / 1:Permanent start / 2:Start in high temp)',
      default: '0',
      unit: '-',
      page: p449,
    },
  },

  /** @param 08-38 Delay Time of Fan Off -- Range: 0~600, Default: 60, Unit: s, Manual p.4-49 */
  '08-38': {
    register: GROUP_08_Protection_Parameters['08-38'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-38',
      name: 'Delay Time of Fan Off',
      range: '0~600',
      default: '60',
      unit: 's',
      page: p449,
    },
  },

  /** @param 08-39 Delay Time of Motor Overheat Protection -- Range: 1~300, Default: 60, Unit: sec, Manual p.4-49 */
  '08-39': {
    register: GROUP_08_Protection_Parameters['08-39'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-39',
      name: 'Delay Time of Motor Overheat Protection',
      range: '1~300',
      default: '60',
      unit: 'sec',
      page: p449,
    },
  },

  /** @param 08-40 Motor2 Acceleration Stall Prevention Level -- Range: 20~200, Default: HD:150 ND:120, Unit: %, Manual p.4-49 */
  '08-40': {
    register: GROUP_08_Protection_Parameters['08-40'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-40',
      name: 'Motor2 Acceleration Stall Prevention Level',
      range: '20~200',
      default: 'HD:150 / ND:120',
      unit: '%',
      page: p449,
    },
  },

  /** @param 08-41 Motor2 Acceleration Stall Prevention Limit -- Range: 1~100, Default: 50, Unit: %, Manual p.4-50 */
  '08-41': {
    register: GROUP_08_Protection_Parameters['08-41'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-41',
      name: 'Motor2 Acceleration Stall Prevention Limit',
      range: '1~100',
      default: '50',
      unit: '%',
      page: p450,
    },
  },

  /** @param 08-42 PTC Protection Level -- Range: 0.1~10.0, Default: 0.7, Unit: V, Manual p.4-50 */
  '08-42': {
    register: GROUP_08_Protection_Parameters['08-42'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-42',
      name: 'PTC Protection Level',
      range: '0.1~10.0',
      default: '0.7',
      unit: 'V',
      page: p450,
    },
  },

  /** @param 08-43 PTC Restart Level -- Range: 0.1~10.0, Default: 0.3, Unit: V, Manual p.4-50 */
  '08-43': {
    register: GROUP_08_Protection_Parameters['08-43'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-43',
      name: 'PTC Restart Level',
      range: '0.1~10.0',
      default: '0.3',
      unit: 'V',
      page: p450,
    },
  },

  /** @param 08-44 PTC Warning Level -- Range: 0.1~10.0, Default: 0.5, Unit: V, Manual p.4-50 */
  '08-44': {
    register: GROUP_08_Protection_Parameters['08-44'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-44',
      name: 'PTC Warning Level',
      range: '0.1~10.0',
      default: '0.5',
      unit: 'V',
      page: p450,
    },
  },

  /**
   * @param 08-46 Temperature Agree Level -- Range: 0~254, Default: 0, Unit: degree C, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-46': {
    register: GROUP_08_Protection_Parameters['08-46'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-46',
      name: 'Temperature Agree Level',
      range: '0~254',
      default: '0',
      unit: 'degree C',
      page: p450,
    },
  },

  /**
   * @param 08-47 Temperature Reset Level -- Range: 0~254, Default: 0, Unit: degree C, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-47': {
    register: GROUP_08_Protection_Parameters['08-47'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-47',
      name: 'Temperature Reset Level',
      range: '0~254',
      default: '0',
      unit: 'degree C',
      page: p450,
    },
  },

  /**
   * @param 08-48 Selection of Fire Mode -- Range: 0-1, Default: 0, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-48': {
    register: GROUP_08_Protection_Parameters['08-48'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-48',
      name: 'Selection of Fire Mode',
      range: '0-1 (0:Disable / 1:Enable)',
      default: '0',
      unit: '-',
      page: p450,
    },
  },

  /**
   * @param 08-49 Multi-Function Input Terminal Status of Fire Mode -- Range: 0-1, Default: 0, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-49': {
    register: GROUP_08_Protection_Parameters['08-49'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-49',
      name: 'Multi-Function Input Terminal Status of Fire Mode',
      range: '0-1 (0:Reset after power off / 1:Reset after terminal removed)',
      default: '0',
      unit: '-',
      page: p450,
    },
  },

  /**
   * @param 08-50 Multi-Function Terminal Status of Fire Mode -- Bit field, Default: 0000b, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-50': {
    register: GROUP_08_Protection_Parameters['08-50'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-50',
      name: 'Multi-Function Terminal Status of Fire Mode',
      range: 'bit0:S6 A/B contact (0:A / 1:B)',
      default: '0000b (0)',
      unit: '-',
      page: p450,
    },
  },

  /**
   * @param 08-51 Motor Speed Setting Source of Fire Mode -- Range: 0-2, Default: 0, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-51': {
    register: GROUP_08_Protection_Parameters['08-51'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-51',
      name: 'Motor Speed Setting Source of Fire Mode',
      range: '0-2 (0:Fire speed / 1:PID / 2:AI2)',
      default: '0',
      unit: '-',
      page: p450,
    },
  },

  /**
   * @param 08-52 Motor Speed of Fire Mode -- Range: 0.00~100.00, Default: 100.00, Unit: %, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-52': {
    register: GROUP_08_Protection_Parameters['08-52'],
    kind: ParamKind.Scaled,
    factor: 0.01,
    meta: {
      group,
      code: '08-52',
      name: 'Motor Speed of Fire Mode',
      range: '0.00~100.00',
      default: '100.00',
      unit: '%',
      page: p450,
    },
  },

  /**
   * @param 08-53 PID Detection Level of Fire Mode -- Range: 0~100, Default: 0, Unit: %, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-53': {
    register: GROUP_08_Protection_Parameters['08-53'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-53',
      name: 'PID Detection Level of Fire Mode',
      range: '0~100',
      default: '0',
      unit: '%',
      page: p450,
    },
  },

  /**
   * @param 08-54 Delay Time of Fire Mode PID Loss -- Range: 0.0~10.0, Default: 1.0, Unit: s, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-54': {
    register: GROUP_08_Protection_Parameters['08-54'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-54',
      name: 'Delay Time of Fire Mode PID Loss',
      range: '0.0~10.0',
      default: '1.0',
      unit: 's',
      page: p450,
    },
  },

  /**
   * @param 08-55 PID Feedback Loss Detection Selection of Fire Mode -- Range: 0-2, Default: 1, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-55': {
    register: GROUP_08_Protection_Parameters['08-55'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-55',
      name: 'PID Feedback Loss Detection Selection of Fire Mode',
      range: '0-2 (0:Keep running / 1:Fire speed / 2:Max output freq)',
      default: '1',
      unit: '-',
      page: p450,
    },
  },

  /**
   * @param 08-56 Detection Level of Fire Mode AI2 Signal -- Range: 0.0~100.0, Default: 80.0, Unit: %, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-56': {
    register: GROUP_08_Protection_Parameters['08-56'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-56',
      name: 'Detection Level of Fire Mode AI2 Signal',
      range: '0.0~100.0',
      default: '80.0',
      unit: '%',
      page: p450,
    },
  },

  /**
   * @param 08-57 Delay Time of Fire Mode AI2 Signal Loss -- Range: 0.0~10.0, Default: 1.0, Unit: s, Manual p.4-50
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-57': {
    register: GROUP_08_Protection_Parameters['08-57'],
    kind: ParamKind.Scaled,
    factor: 0.1,
    meta: {
      group,
      code: '08-57',
      name: 'Delay Time of Fire Mode AI2 Signal Loss',
      range: '0.0~10.0',
      default: '1.0',
      unit: 's',
      page: p450,
    },
  },

  /**
   * @param 08-58 Selection of Fire Mode AI2 Signal Loss -- Range: 0-2, Default: 1, Manual p.4-51
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-58': {
    register: GROUP_08_Protection_Parameters['08-58'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-58',
      name: 'Selection of Fire Mode AI2 Signal Loss',
      range: '0-2 (0:Keep running / 1:Fire speed / 2:Max output freq)',
      default: '1',
      unit: '-',
      page: p451,
    },
  },

  /**
   * @param 08-59 Fire Mode Motor Direction -- Range: 0-1, Default: 0, Manual p.4-51
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-59': {
    register: GROUP_08_Protection_Parameters['08-59'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-59',
      name: 'Fire Mode Motor Direction',
      range: '0-1 (0:Forward / 1:Reverse)',
      default: '0',
      unit: '-',
      page: p451,
    },
  },

  /**
   * @param 08-60 Fire Mode Password -- Range: 00000~65534, Default: 0, Manual p.4-51
   * @remarks Not listed in the A510 communication addendum (Group 8 register map ends at 08-40).
   *          Returned Modbus exception 2 (Illegal Data Address) on test device.
   *          Retained for completeness per the instruction manual parameter table.
   */
  '08-60': {
    register: GROUP_08_Protection_Parameters['08-60'],
    kind: ParamKind.UInt16,
    meta: {
      group,
      code: '08-60',
      name: 'Fire Mode Password',
      range: '0~65534',
      default: '0',
      unit: '-',
      page: p451,
    },
  },
} as const satisfies Record<string, ParamConfig<InverterRegisterMeta>>;

export const group08Params = all;
