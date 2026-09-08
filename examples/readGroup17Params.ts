/**
 * Reads all parameters from Group 17 (Automatic Tuning Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup17Params.ts
 */

import { readGroup } from './readGroup';

readGroup('Group 17: Automatic Tuning Parameters', (parameters) => parameters.group17);
