/**
 * # @flux-control/effect-teco-westinghouse-inverter
 *
 * Bidirectional schema transformers for Teco/Westinghouse A510 inverter Modbus parameters.
 *
 * ## Exports
 *
 * - {@link TecoInverterService} — Scoped Effect.Service for A510 communication
 * - {@link COMMAND_REGISTERS} / {@link MONITOR_REGISTERS} — Modbus register address constants
 * - {@link readOnlyEncodeFailure} — Error helper for read-only register writes
 * - All schemas from {@link schemas} (CommandWord, FrequencyCommand, StateMonitor, etc.)
 * - {@link bit} — Bit manipulation utility
 *
 * @module
 */

export * from './src/Registers.js';
export * from './src/errors.js';
export * from './src/schemas.js';
export * from './src/TecoInverterService.js';
export * from './src/utils.js';
