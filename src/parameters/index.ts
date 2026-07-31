/**
 * @fileoverview Re-exports all parameter groups (Groups 00–22).
 *
 * Each group is a record of {@link ParamConfig} objects keyed by parameter code
 * (e.g. `p00_01`, `p01_00`). The schema engine lives in the `@flux-control/modbus-schema`
 * package; configs are converted into {@link ParamCallableOfEntry} bundles by
 * {@link TecoInverterService} at service construction time.
 *
 * @example
 * import { group00 } from "./parameters";
 * const config = group00.p00_01; // ParamConfig
 *
 * @module
 */

export { group00Params as group00 } from './group-00';
export { group01Params as group01 } from './group-01';
export { group02Params as group02 } from './group-02';
export { group03Params as group03 } from './group-03';
export { group04Params as group04 } from './group-04';
export { group05Params as group05 } from './group-05';
export { group06Params as group06 } from './group-06';
export { group07Params as group07 } from './group-07';
export { group08Params as group08 } from './group-08';
export { group09Params as group09 } from './group-09';
export { group10Params as group10 } from './group-10';
export { group11Params as group11 } from './group-11';
export { group12Params as group12 } from './group-12';
export { group13Params as group13 } from './group-13';
export { group14Params as group14 } from './group-14';
export { group15Params as group15 } from './group-15';
export { group16Params as group16 } from './group-16';
export { group17Params as group17 } from './group-17';
export { group18Params as group18 } from './group-18';
export { group19Params as group19 } from './group-19';
export { group20Params as group20 } from './group-20';
export { group21Params as group21 } from './group-21';
export { group22Params as group22 } from './group-22';
