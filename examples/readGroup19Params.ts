/**
 * Reads all parameters from Group 19 (Wobble Frequency Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup19Params.ts
 */

import { readGroup } from './readGroup';

readGroup('Group 19: Wobble Frequency Parameters', (parameters) => parameters.group19);
