/**
 * Reads all parameters from Group 04 (External Analog Input and Output Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup04Params.ts
 */

import { readGroup } from './readGroup';

readGroup(
  'Group 04: External Analog Input and Output Parameters',
  (parameters) => parameters.group04,
);
