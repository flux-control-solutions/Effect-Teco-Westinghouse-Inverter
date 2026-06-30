import { ParseResult, Pretty, Schema } from "effect";
import { Int16, UInt16 } from "../schemas";

/**
 * Structured metadata for a parameter extracted from the A510 instruction manual.
 */
export interface ParamMeta {
  readonly group: number
  readonly code: string
  readonly name: string
  readonly range: string
  readonly default: string
  readonly unit: string
  readonly page: number
}

const formatRegister = (register: number): string => `0x${register.toString(16).toUpperCase().padStart(4, "0")}`

const formatMeta = (register: number, meta: ParamMeta): string =>
  [
    `${meta.code} ${meta.name}`,
    `Register: ${formatRegister(register)}`,
    `Setting Range: ${meta.range}`,
    `Default: ${meta.default}`,
    `Unit: ${meta.unit}`,
    `Manual Page: ${meta.page}`,
  ].join("\n")

const formatScaledMeta = (register: number, meta: ParamMeta, factor: number): string =>
  [
    `${meta.code} ${meta.name}`,
    `Register: ${formatRegister(register)}`,
    `Wire format: raw × ${factor}`,
    `Setting Range: ${meta.range}`,
    `Default: ${meta.default}`,
    `Unit: ${meta.unit}`,
    `Manual Page: ${meta.page}`,
  ].join("\n")

const formatEnumMeta = (register: number, meta: ParamMeta, labels: Record<number, string>): string =>
  [
    `${meta.code} ${meta.name}`,
    `Register: ${formatRegister(register)}`,
    `Options:`,
    ...Object.entries(labels).map(([k, v]) => `  ${k} = ${v}`),
    `Default: ${meta.default}`,
    `Unit: ${meta.unit}`,
    `Manual Page: ${meta.page}`,
  ].join("\n")

// ── Factories ──────────────────────────────────────────────

/**
 * Simple UInt16 pass-through parameter.
 * The wire value IS the parameter value (no scaling).
 */
export const makeParam = <A extends number, I extends number>(
  register: number,
  meta: ParamMeta,
): Schema.Schema<A, I> =>
  UInt16.pipe(
    Schema.annotations({ description: formatMeta(register, meta) }),
  ) as unknown as Schema.Schema<A, I>

/**
 * Scaled parameter where wire = domain / factor.
 * Example: 0.01 Hz → wire value 5000 decodes to 50.00 Hz
 */
export const makeScaledParam = (
  register: number,
  factor: number,
  meta: ParamMeta,
): Schema.Schema<number, number> =>
  UInt16.pipe(
    Schema.annotations({ description: formatScaledMeta(register, meta, factor) }),
    Schema.transformOrFail(UInt16, {
      decode: (raw) => ParseResult.succeed(raw * factor),
      encode: (value) => ParseResult.succeed(Math.round(value / factor)),
      strict: false,
    }),
  ) as unknown as Schema.Schema<number, number>

/**
 * Signed scaled parameter where wire = domain / factor.
 * Uses Int16 to support negative wire values.
 * Example: -100.0~100.0 % × 0.1 → wire range -1000~1000
 */
export const makeSignedScaledParam = (
  register: number,
  factor: number,
  meta: ParamMeta,
): Schema.Schema<number, number> =>
  Int16.pipe(
    Schema.annotations({ description: formatScaledMeta(register, meta, factor) }),
    Schema.transformOrFail(Int16, {
      decode: (raw) => ParseResult.succeed(raw * factor),
      encode: (value) => ParseResult.succeed(Math.round(value / factor)),
      strict: false,
    }),
  ) as unknown as Schema.Schema<number, number>

/**
 * Enum selection parameter.
 * Maps wire integers to human-readable labels and back.
 */
export const makeEnumParam = <Domain extends string>(
  register: number,
  labels: Record<number, Domain>,
  meta: ParamMeta,
): Schema.Schema<Domain, number> => {
  const values = [...new Set(Object.values(labels))] as [Domain, ...Domain[]]
  return UInt16.pipe(
    Schema.annotations({ description: formatEnumMeta(register, meta, labels) }),
    Schema.transformOrFail(Schema.Literal(...values), {
      decode: (raw, _, ast) => {
        const label = labels[raw as number]
        return label !== undefined
          ? ParseResult.succeed(label)
          : ParseResult.fail(
              new ParseResult.Type(ast, raw, `Unknown enum value ${raw} for ${meta.code}`),
            )
      },
      encode: (value, _, ast) => {
        const entry = Object.entries(labels).find(([, v]) => v === value)
        return entry
          ? ParseResult.succeed(Number(entry[0]))
          : ParseResult.fail(new ParseResult.Type(ast, value, `Invalid value "${value}" for ${meta.code}`))
      },
      strict: false,
    }),
  ) as unknown as Schema.Schema<Domain, number>
}

// ── Convenience helpers ────────────────────────────────────

export const makeDecode = (schema: Schema.Schema<any, any>) => Schema.decodeUnknown(schema)
export const makeEncode = (schema: Schema.Schema<any, any>) => Schema.encode(schema)
export const makeFormatted = (schema: Schema.Schema<any, any>) => Pretty.make(schema)
