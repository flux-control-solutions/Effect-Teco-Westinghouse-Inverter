/**
 * @fileoverview Inverter-specific operation types that couple the generic
 * `@flux-control/modbus-schema` engine with the `@flux-control/effect-modbus-rs` transport layer.
 *
 * These types belong in the inverter package because they reference
 * {@link ModbusError} from the transport library. They are used by
 * {@link TecoInverterService} to type the read/write operations exposed on each
 * parameter callable.
 *
 * @module
 */

import type { ModbusError } from '@flux-control/effect-modbus-rs';
import type {
  ParamConfig,
  ParamEntry,
  ParamEntryOfConfig,
  ParamValueOfEntry,
  RegisterMeta,
} from '@flux-control/modbus-schema';
import type { Effect } from 'effect';

type EffectErrorOf<F> = F extends Effect.Effect<any, infer E, any> ? E : never;
type EffectRequirementsOf<F> = F extends Effect.Effect<any, any, infer R> ? R : never;

/**
 * Device-specific metadata shared by A510 parameter configs.
 * The group, code, and manual page fields identify each parameter in the drive's parameter list.
 */
export interface InverterRegisterMeta extends RegisterMeta {
  readonly group: number;
  readonly code: string;
  readonly page: number;
}

/**
 * Read and update operations for one parameter entry.
 * Reads can fail during decoding or Modbus access; updates can fail during encoding or Modbus access.
 */
export type ParamOperationOfEntry<E extends ParamEntry<any>> = {
  readonly read: () => Effect.Effect<
    ParamValueOfEntry<E>,
    EffectErrorOf<ReturnType<E['decode']>> | ModbusError,
    EffectRequirementsOf<ReturnType<E['decode']>>
  >;
  readonly update: (
    value: ParamValueOfEntry<E>,
  ) => Effect.Effect<
    void,
    EffectErrorOf<ReturnType<E['encode']>> | ModbusError,
    EffectRequirementsOf<ReturnType<E['encode']>>
  >;
};

/**
 * A parameter accessor that creates read and update operations for a device.
 * Its `meta` property exposes the parameter's register metadata.
 */
export type ParamCallableOfEntry<E extends ParamEntry<any>> = ((
  deviceId: number,
) => ParamOperationOfEntry<E>) & {
  readonly meta: RegisterMeta;
};

/**
 * Maps each config in a parameter group to a device-specific parameter accessor.
 */
export type GroupParamOps<C extends Record<string, ParamConfig>> = {
  readonly [K in keyof C]: ParamCallableOfEntry<ParamEntryOfConfig<C[K]>>;
};
