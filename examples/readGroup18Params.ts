/**
 * Reads all parameters from Group 18 (Slip Compensation Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup18Params.ts
 */

import { readGroup } from './readGroup';

readGroup('Group 18: Slip Compensation Parameters', (parameters) => parameters.group18);
