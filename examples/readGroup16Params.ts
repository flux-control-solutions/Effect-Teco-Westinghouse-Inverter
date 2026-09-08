/**
 * Reads all parameters from Group 16 (LCD Function Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup16Params.ts
 */

import { readGroup } from './readGroup';

readGroup('Group 16: LCD Function Parameters', (parameters) => parameters.group16);
