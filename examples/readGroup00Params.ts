/**
 * Reads all parameters from Group 00 (Basic Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name,
 * code), and reading each parameter value. See `readGroup.ts` for the driver
 * these examples share.
 *
 * @example bun run examples/readGroup00Params.ts
 */

import { readGroup } from './readGroup';

// The window and concurrent reads let the transport batch the group's three
// contiguous register runs. Tune the window for the actual serial segment.
readGroup('Group 00: Basic Parameters', (parameters) => parameters.group00, '5 millis');
