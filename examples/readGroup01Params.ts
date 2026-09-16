/**
 * Reads all parameters from Group 01 (V/F Control Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup01Params.ts
 */

import { readGroup } from './readGroup';

readGroup('Group 01: V/F Control Parameters', (parameters) => parameters.group01);
