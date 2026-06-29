import { Brand, ParseResult, Pretty, Schema } from "effect";
import { bit } from "./utils";

/**
 * Branded 16-bit unsigned word for Modbus register values.
 */
export type UInt16 = number & Brand.Brand<"UInt16">;

export const UInt16 = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative(),
  Schema.lessThanOrEqualTo(0xffff),
  Schema.brand("UInt16"),
);

/**
 * Human-readable command word shape.
 */
export class CommandWordFlags extends Schema.Class<CommandWordFlags>(
  "CommandWordFlags",
)({
  run: Schema.Boolean,
  reverse: Schema.Boolean,
  externalFault: Schema.Boolean,
  faultReset: Schema.Boolean,
  jog: Schema.Boolean,
  commS1: Schema.Boolean,
  commS2: Schema.Boolean,
  commS3: Schema.Boolean,
  commS4: Schema.Boolean,
  commS5: Schema.Boolean,
  inverterMode: Schema.Boolean,
  torqueByComm: Schema.Boolean,
}) {
  static empty = new CommandWordFlags({
    run: false,
    reverse: false,
    externalFault: false,
    faultReset: false,
    jog: false,
    commS1: false,
    commS2: false,
    commS3: false,
    commS4: false,
    commS5: false,
    inverterMode: false,
    torqueByComm: false,
  });

  static runForward = new CommandWordFlags({
    ...CommandWordFlags.empty,
    run: true,
  });

  static runReverse = new CommandWordFlags({
    ...CommandWordFlags.empty,
    run: true,
    reverse: true,
  });

  static stop = CommandWordFlags.empty;

  static resetFaultPulse = new CommandWordFlags({
    ...CommandWordFlags.empty,
    faultReset: true,
  });
}

/**
 * Bidirectional transformation:
 * wire format = UInt16
 * domain format = CommandWordFlags
 */
export const CommandWordSchema = UInt16.pipe(
  Schema.transformOrFail(CommandWordFlags, {
    decode: (word) =>
      ParseResult.succeed(
        new CommandWordFlags({
          run: (word & bit(0)) !== 0,
          reverse: (word & bit(1)) !== 0,
          externalFault: (word & bit(2)) !== 0,
          faultReset: (word & bit(3)) !== 0,
          jog: (word & bit(4)) !== 0,
          commS1: (word & bit(5)) !== 0,
          commS2: (word & bit(6)) !== 0,
          commS3: (word & bit(7)) !== 0,
          commS4: (word & bit(8)) !== 0,
          commS5: (word & bit(9)) !== 0,
          inverterMode: (word & bit(10)) !== 0,
          torqueByComm: (word & bit(11)) !== 0,
        }),
      ),
    encode: (flags, _, ast) => {
      const word =
        (flags.run ? bit(0) : 0) |
        (flags.reverse ? bit(1) : 0) |
        (flags.externalFault ? bit(2) : 0) |
        (flags.faultReset ? bit(3) : 0) |
        (flags.jog ? bit(4) : 0) |
        (flags.commS1 ? bit(5) : 0) |
        (flags.commS2 ? bit(6) : 0) |
        (flags.commS3 ? bit(7) : 0) |
        (flags.commS4 ? bit(8) : 0) |
        (flags.commS5 ? bit(9) : 0) |
        (flags.inverterMode ? bit(10) : 0) |
        (flags.torqueByComm ? bit(11) : 0);

      return Number.isInteger(word) && word >= 0 && word <= 0xffff
        ? ParseResult.succeed(word as UInt16)
        : ParseResult.fail(
            new ParseResult.Type(
              ast,
              flags,
              "Command word is out of UInt16 range",
            ),
          );
    },
  }),
);

/**
 * Decoders / encoders
 */
export const decodeCommandWord = Schema.decodeUnknown(CommandWordSchema);
export const encodeCommandWord = Schema.encode(CommandWordSchema);
export const formattedCommandWord = Pretty.make(CommandWordSchema);

/**
 * Patch-friendly input for library ergonomics.
 */
export class CommandWordPatch extends Schema.Class<CommandWordPatch>(
  "CommandWordPatch",
)({
  run: Schema.optional(Schema.Boolean),
  reverse: Schema.optional(Schema.Boolean),
  externalFault: Schema.optional(Schema.Boolean),
  faultReset: Schema.optional(Schema.Boolean),
  jog: Schema.optional(Schema.Boolean),
  commS1: Schema.optional(Schema.Boolean),
  commS2: Schema.optional(Schema.Boolean),
  commS3: Schema.optional(Schema.Boolean),
  commS4: Schema.optional(Schema.Boolean),
  commS5: Schema.optional(Schema.Boolean),
  inverterMode: Schema.optional(Schema.Boolean),
  torqueByComm: Schema.optional(Schema.Boolean),
}) {}

export const mergeCommandWordPatch = (
  base: CommandWordFlags,
  patch: CommandWordPatch,
): CommandWordFlags =>
  new CommandWordFlags({
    run: patch.run ?? base.run,
    reverse: patch.reverse ?? base.reverse,
    externalFault: patch.externalFault ?? base.externalFault,
    faultReset: patch.faultReset ?? base.faultReset,
    jog: patch.jog ?? base.jog,
    commS1: patch.commS1 ?? base.commS1,
    commS2: patch.commS2 ?? base.commS2,
    commS3: patch.commS3 ?? base.commS3,
    commS4: patch.commS4 ?? base.commS4,
    commS5: patch.commS5 ?? base.commS5,
    inverterMode: patch.inverterMode ?? base.inverterMode,
    torqueByComm: patch.torqueByComm ?? base.torqueByComm,
  });

/**
 * Intent-level constructors
 */
export const commandWord = {
  stop: (): CommandWordFlags => CommandWordFlags.stop,
  runForward: (): CommandWordFlags => CommandWordFlags.runForward,
  runReverse: (): CommandWordFlags => CommandWordFlags.runReverse,
  jogForward: (): CommandWordFlags =>
    new CommandWordFlags({
      ...CommandWordFlags.empty,
      jog: true,
    }),
  resetFaultPulse: (): CommandWordFlags => CommandWordFlags.resetFaultPulse,
  withInverterMode: (base: CommandWordFlags): CommandWordFlags =>
    new CommandWordFlags({
      ...base,
      inverterMode: true,
    }),
};
