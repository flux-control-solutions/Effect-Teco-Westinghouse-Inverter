/**
 * # @flux-control/effect-teco-westinghouse-inverter
 *
 * Effect service, register constants, schemas, errors, and utilities for Teco/Westinghouse A510 Modbus communication.
 *
 * ## Exports
 *
 * - {@link TecoInverterService} — Scoped Effect.Service for A510 communication
 * - {@link COMMAND_REGISTERS} / {@link MONITOR_REGISTERS} — Modbus register address constants
 * - {@link readOnlyEncodeFailure} — Error helper for read-only register writes
 * - All schemas and domain types exported by `src/schemas.ts`
 * - {@link bit} — Bit manipulation utility
 *
 * @module
 */

export * from './src/Registers.js';
export * from './src/errors.js';
export * from './src/schemas.js';
export * from './src/TecoInverterService.js';
export * from './src/utils.js';
