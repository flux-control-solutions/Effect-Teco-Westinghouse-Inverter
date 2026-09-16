/**
 * Reads all parameters from Group 09 (Communication Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup09Params.ts
 */

import { readGroup } from './readGroup';

readGroup('Group 09: Communication Parameters', (parameters) => parameters.group09);
