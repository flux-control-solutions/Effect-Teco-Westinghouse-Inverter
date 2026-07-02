import { Effect, ParseResult, Pretty, Schema } from "effect";
import type { ModbusError } from "effect-modbus-rs";
import { Int16, UInt16 } from "../schemas";

/**
 * Structured metadata for a parameter extracted from the A510 instruction manual.
 */
export interface ParamMeta {
  readonly group: number;
  readonly code: string;
  readonly name: string;
  readonly range: string;
  readonly default: string;
  readonly unit: string;
  readonly page: number;
}

const formatRegister = (register: number): string =>
  `0x${register.toString(16).toUpperCase().padStart(4, "0")}`;

const formatMeta = (register: number, meta: ParamMeta): string =>
  [
    `${meta.code} ${meta.name}`,
    `Register: ${formatRegister(register)}`,
    `Setting Range: ${meta.range}`,
    `Default: ${meta.default}`,
    `Unit: ${meta.unit}`,
    `Manual Page: ${meta.page}`,
  ].join("\n");

const formatScaledMeta = (
  register: number,
  meta: ParamMeta,
  factor: number,
): string =>
  [
    `${meta.code} ${meta.name}`,
    `Register: ${formatRegister(register)}`,
    `Wire format: raw × ${factor}`,
    `Setting Range: ${meta.range}`,
    `Default: ${meta.default}`,
    `Unit: ${meta.unit}`,
    `Manual Page: ${meta.page}`,
  ].join("\n");

const formatEnumMeta = (
  register: number,
  meta: ParamMeta,
  labels: Record<number, string>,
): string =>
  [
    `${meta.code} ${meta.name}`,
    `Register: ${formatRegister(register)}`,
    `Options:`,
    ...Object.entries(labels).map(([k, v]) => `  ${k} = ${v}`),
    `Default: ${meta.default}`,
    `Unit: ${meta.unit}`,
    `Manual Page: ${meta.page}`,
  ].join("\n");

// ── Factories ──────────────────────────────────────────────

/**
 * Simple UInt16 pass-through parameter.
 * The wire value IS the parameter value (no scaling).
 */
const makeParam = <A extends number, I extends number>(
  register: number,
  meta: ParamMeta,
): Schema.Schema<A, I> =>
  UInt16.pipe(
    Schema.annotations({ description: formatMeta(register, meta) }),
  ) as unknown as Schema.Schema<A, I>;

/**
 * Scaled parameter where wire = domain / factor.
 * Example: 0.01 Hz → wire value 5000 decodes to 50.00 Hz
 */
const makeScaledParam = (
  register: number,
  factor: number,
  meta: ParamMeta,
): Schema.Schema<number, number> =>
  UInt16.pipe(
    Schema.annotations({
      description: formatScaledMeta(register, meta, factor),
    }),
    Schema.transformOrFail(UInt16, {
      decode: (raw) => ParseResult.succeed(raw * factor),
      encode: (value) => ParseResult.succeed(Math.round(value / factor)),
      strict: false,
    }),
  ) as unknown as Schema.Schema<number, number>;

/**
 * Signed scaled parameter where wire = domain / factor.
 * Uses Int16 to support negative wire values.
 * Example: -100.0~100.0 % × 0.1 → wire range -1000~1000
 */
const makeSignedScaledParam = (
  register: number,
  factor: number,
  meta: ParamMeta,
): Schema.Schema<number, number> =>
  Int16.pipe(
    Schema.annotations({
      description: formatScaledMeta(register, meta, factor),
    }),
    Schema.transformOrFail(Int16, {
      decode: (raw) => ParseResult.succeed(raw * factor),
      encode: (value) => ParseResult.succeed(Math.round(value / factor)),
      strict: false,
    }),
  ) as unknown as Schema.Schema<number, number>;

/**
 * Enum selection parameter.
 * Maps wire integers to human-readable labels and back.
 */
const makeEnumParam = <Domain extends string>(
  register: number,
  labels: Record<number, Domain>,
  meta: ParamMeta,
): Schema.Schema<Domain, number> => {
  const values = [...new Set(Object.values(labels))] as [Domain, ...Domain[]];
  return UInt16.pipe(
    Schema.annotations({ description: formatEnumMeta(register, meta, labels) }),
    Schema.transformOrFail(Schema.Literal(...values), {
      decode: (raw, _, ast) => {
        const label = labels[raw as number];
        return label !== undefined
          ? ParseResult.succeed(label)
          : ParseResult.fail(
              new ParseResult.Type(
                ast,
                raw,
                `Unknown enum value ${raw} for ${meta.code}`,
              ),
            );
      },
      encode: (value, _, ast) => {
        const entry = Object.entries(labels).find(([, v]) => v === value);
        return entry
          ? ParseResult.succeed(Number(entry[0]))
          : ParseResult.fail(
              new ParseResult.Type(
                ast,
                value,
                `Invalid value "${value}" for ${meta.code}`,
              ),
            );
      },
      strict: false,
    }),
  ) as unknown as Schema.Schema<Domain, number>;
};

// ── Convenience helpers ────────────────────────────────────

const makeDecode = <S extends Schema.Schema<any, any>>(schema: S) =>
  Schema.decodeUnknown(schema);
const makeEncode = <S extends Schema.Schema<any, any>>(schema: S) =>
  Schema.encode(schema);
const makeFormatted = <S extends Schema.Schema<any, any>>(schema: S) =>
  Pretty.make(schema);

// ── ParamKind enum ────────────────────────────────────────────
// Identifies which schema factory created/would create the ParamEntry.

export enum ParamKind {
  UInt16 = "UInt16",
  Scaled = "Scaled",
  SignedScaled = "SignedScaled",
  Enum = "Enum",
}

// ── Config object types ──────────────────────────────────────
// Group files now store these configuration objects instead of calling
// factories directly.  The factories in the section below consume
// these same parameters and produce the full ParamEntry bundle.

export interface ParamConfigBase {
  readonly register: number;
  readonly kind: ParamKind;
  readonly meta: ParamMeta;
}

export interface UInt16ParamConfig extends ParamConfigBase {
  readonly kind: ParamKind.UInt16;
}

export interface ScaledParamConfig extends ParamConfigBase {
  readonly kind: ParamKind.Scaled;
  readonly factor: number;
}

export interface SignedScaledParamConfig extends ParamConfigBase {
  readonly kind: ParamKind.SignedScaled;
  readonly factor: number;
}

export interface EnumParamConfig<Domain extends string = string>
  extends ParamConfigBase {
  readonly kind: ParamKind.Enum;
  readonly labels: Record<number, Domain>;
}

export type ParamConfig =
  | UInt16ParamConfig
  | ScaledParamConfig
  | SignedScaledParamConfig
  | EnumParamConfig;

// ── Bundle factories (produce schema + decode + encode + formatted) ──
// These replace the duplicated local `p()`/`sp()` helpers in group files.

export const p = <A extends number, I extends number>(
  addr: number,
  meta: ParamMeta,
) => {
  const schema = makeParam<A, I>(addr, meta);
  return {
    schema,
    decode: makeDecode(schema),
    encode: makeEncode(schema),
    formatted: makeFormatted(schema),
  };
};

export const sp = (addr: number, factor: number, meta: ParamMeta) => {
  const schema = makeScaledParam(addr, factor, meta);
  return {
    schema,
    decode: makeDecode(schema),
    encode: makeEncode(schema),
    formatted: makeFormatted(schema),
  };
};

export const spSigned = (addr: number, factor: number, meta: ParamMeta) => {
  const schema = makeSignedScaledParam(addr, factor, meta);
  return {
    schema,
    decode: makeDecode(schema),
    encode: makeEncode(schema),
    formatted: makeFormatted(schema),
  };
};

export const pe = <A extends string>(
  addr: number,
  labels: Record<number, A>,
  meta: ParamMeta,
) => {
  const schema = makeEnumParam<A>(addr, labels, meta);
  return {
    schema,
    decode: makeDecode(schema),
    encode: makeEncode(schema),
    formatted: makeFormatted(schema),
  };
};

export type ParamEntry<S extends Schema.Schema<any, any>> = {
  readonly schema: S;
  readonly decode: ReturnType<typeof makeDecode<S>>;
  readonly encode: ReturnType<typeof makeEncode<S>>;
  readonly formatted: ReturnType<typeof makeFormatted<S>>;
};

export type ParamEntryOfConfig<C extends ParamConfig> =
  C extends EnumParamConfig<infer Domain>
    ? ParamEntry<Schema.Schema<Domain, number>>
    : ParamEntry<Schema.Schema<number, number>>;

export type ParamValueOfEntry<E extends ParamEntry<any>> = E extends ParamEntry<
  Schema.Schema<infer A, any>
>
  ? A
  : never;

type EffectErrorOf<F> = F extends Effect.Effect<any, infer E, any> ? E : never;
type EffectRequirementsOf<F> = F extends Effect.Effect<any, any, infer R>
  ? R
  : never;

export type ParamOperationOfEntry<E extends ParamEntry<any>> = {
  readonly read: () => Effect.Effect<
    ParamValueOfEntry<E>,
    EffectErrorOf<ReturnType<E["decode"]>> | ModbusError,
    EffectRequirementsOf<ReturnType<E["decode"]>>
  >;
  readonly update: (
    value: ParamValueOfEntry<E>,
  ) => Effect.Effect<
    void,
    EffectErrorOf<ReturnType<E["encode"]>> | ModbusError,
    EffectRequirementsOf<ReturnType<E["encode"]>>
  >;
};

export type ParamCallableOfEntry<E extends ParamEntry<any>> = ((
  deviceId: number,
) => ParamOperationOfEntry<E>) & {
  readonly meta: ParamMeta;
};

export type GroupParamOps<C extends Record<string, ParamConfig>> = {
  readonly [K in keyof C]: ParamCallableOfEntry<ParamEntryOfConfig<C[K]>>;
};

export type GroupParamAccessor<C extends Record<string, ParamConfig>> = <
  K extends keyof C,
>(
  param: K,
) => ParamOperationOfEntry<ParamEntryOfConfig<C[K]>> & {
  readonly meta: C[K]["meta"];
};

export function fromConfig<C extends ParamConfig>(
  config: C,
): ParamEntryOfConfig<C>;
export function fromConfig(config: ParamConfig) {
  switch (config.kind) {
    case ParamKind.UInt16:
      return p(config.register, config.meta);
    case ParamKind.Scaled:
      return sp(config.register, config.factor, config.meta);
    case ParamKind.SignedScaled:
      return spSigned(config.register, config.factor, config.meta);
    case ParamKind.Enum:
      return pe(config.register, config.labels, config.meta);
  }
};
