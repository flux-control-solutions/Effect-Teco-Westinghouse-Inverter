import { describe, expect, test } from "bun:test";
import { Effect, ParseResult, Schema } from "effect";
import {
  decodeCommandWord,
  encodeCommandWord,
  CommandWordFlags,
  CommandWordPatch,
  mergeCommandWordPatch,
  commandWord,
  decodeFrequencyCommand,
  encodeFrequencyCommand,
  FrequencyHz,
  decodeTorqueCommand,
  encodeTorqueCommand,
  TorquePercent,
  decodeSpeedLimitCommand,
  encodeSpeedLimitCommand,
  decodeAnalogOut1Command,
  decodeAnalogOut2Command,
  encodeAnalogOut1Command,
  encodeAnalogOut2Command,
  DigitalOutCommandFlags,
  decodeDigitalOutCommand,
  encodeDigitalOutCommand,
  DigitalOutCommandPatch,
  mergeDigitalOutCommandPatch,
  StateMonitorSchema,
  decodeStateMonitor,
  ErrorDescriptionMonitorSchema,
  decodeErrorDescriptionMonitor,
  decodeDigitalInStateMonitor,
  decodeFrequencyCommandMonitor,
  decodeOutputFrequencyMonitor,
  decodeDCBusVoltageCommandMonitor,
  decodeOutputCurrentMonitor,
  decodeWarningDescriptionMonitor,
  decodeDigitalOutStateMonitor,
  decodeAnalogOut1Monitor,
  decodeAnalogOut2Monitor,
  decodeAnalogIn1Monitor,
  decodeAnalogIn2Monitor,
  decodeA510CheckMonitor,
  UInt16,
} from "./schemas";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Branded types are phantom (no-op at runtime);
// return `any` from helpers so `.toBe()` comparisons don't
// fire branded-type overload errors.
const decodeOk = (
  decoder: (u: unknown) => Effect.Effect<any, ParseResult.ParseError>,
  input: unknown,
): any => Effect.runSync(decoder(input));

const encodeOk = (
  encoder: (a: any) => Effect.Effect<any, ParseResult.ParseError>,
  value: any,
): any => Effect.runSync(encoder(value));

const encodeFail = (
  encoder: (a: any) => Effect.Effect<any, ParseResult.ParseError>,
  value: any,
): ParseResult.ParseError => Effect.runSync(Effect.flip(encoder(value)));

// ---------------------------------------------------------------------------
// UInt16
// ---------------------------------------------------------------------------

describe("UInt16", () => {
  test("accepts valid values", () => {
    expect(Effect.runSync(Schema.decodeUnknown(UInt16)(0))).toBe(0 as any);
    expect(Effect.runSync(Schema.decodeUnknown(UInt16)(65535))).toBe(
      65535 as any,
    );
    expect(Effect.runSync(Schema.decodeUnknown(UInt16)(32768))).toBe(
      32768 as any,
    );
  });

  test("rejects negative values", () => {
    const err = Effect.runSync(Effect.flip(Schema.decodeUnknown(UInt16)(-1)));
    expect(err).toBeInstanceOf(ParseResult.ParseError);
  });

  test("rejects non-integers", () => {
    const err = Effect.runSync(Effect.flip(Schema.decodeUnknown(UInt16)(1.5)));
    expect(err).toBeInstanceOf(ParseResult.ParseError);
  });

  test("rejects values over 65535", () => {
    const err = Effect.runSync(
      Effect.flip(Schema.decodeUnknown(UInt16)(70000)),
    );
    expect(err).toBeInstanceOf(ParseResult.ParseError);
  });

  test("encodes values within range", () => {
    expect(Effect.runSync(Schema.encode(UInt16)(0 as any))).toBe(0 as any);
    expect(Effect.runSync(Schema.encode(UInt16)(65535 as any))).toBe(
      65535 as any,
    );
  });
});

// ---------------------------------------------------------------------------
// CommandWordFlags / CommandWordSchema
// ---------------------------------------------------------------------------

describe("CommandWordFlags", () => {
  test("empty has all flags false", () => {
    const f = CommandWordFlags.empty;
    expect(f.run).toBe(false);
    expect(f.reverse).toBe(false);
    expect(f.externalFault).toBe(false);
    expect(f.faultReset).toBe(false);
    expect(f.inverterMode).toBe(false);
    expect(f.torqueByComm).toBe(false);
  });

  test("runForward sets run only", () => {
    const f = CommandWordFlags.runForward;
    expect(f.run).toBe(true);
    expect(f.reverse).toBe(false);
  });

  test("runReverse sets run and reverse", () => {
    const f = CommandWordFlags.runReverse;
    expect(f.run).toBe(true);
    expect(f.reverse).toBe(true);
  });

  test("stop is identical to empty", () => {
    expect(CommandWordFlags.stop).toEqual(CommandWordFlags.empty);
  });

  test("resetFaultPulse sets faultReset only", () => {
    const f = CommandWordFlags.resetFaultPulse;
    expect(f.faultReset).toBe(true);
    expect(f.run).toBe(false);
  });
});

describe("commandWord helpers", () => {
  test("stop", () => {
    expect(commandWord.stop()).toEqual(CommandWordFlags.empty);
  });

  test("runForward", () => {
    expect(commandWord.runForward()).toEqual(CommandWordFlags.runForward);
  });

  test("runReverse", () => {
    expect(commandWord.runReverse()).toEqual(CommandWordFlags.runReverse);
  });

  test("resetFaultPulse", () => {
    expect(commandWord.resetFaultPulse()).toEqual(
      CommandWordFlags.resetFaultPulse,
    );
  });

  test("withInverterMode sets inverterMode on base", () => {
    const base = CommandWordFlags.runForward;
    const result = commandWord.withInverterMode(base);
    expect(result.run).toBe(true);
    expect(result.inverterMode).toBe(true);
  });
});

describe("CommandWordSchema", () => {
  // ---- decode ----

  test("decode 0x0000 → all flags false", () => {
    const flags = decodeOk(decodeCommandWord, 0);
    expect(flags.run).toBe(false);
    expect(flags.reverse).toBe(false);
    expect(flags.externalFault).toBe(false);
    expect(flags.faultReset).toBe(false);
    expect(flags.commS1).toBe(false);
    expect(flags.commS2).toBe(false);
    expect(flags.commS3).toBe(false);
    expect(flags.commS4).toBe(false);
    expect(flags.commS5).toBe(false);
    expect(flags.commS6).toBe(false);
    expect(flags.commS7).toBe(false);
    expect(flags.commS8).toBe(false);
    expect(flags.inverterMode).toBe(false);
    expect(flags.torqueByComm).toBe(false);
  });

  test("decode bit 0 → run", () => {
    expect(decodeOk(decodeCommandWord, 0x0001).run).toBe(true);
  });

  test("decode bit 1 → reverse", () => {
    expect(decodeOk(decodeCommandWord, 0x0002).reverse).toBe(true);
  });

  test("decode bit 2 → externalFault", () => {
    expect(decodeOk(decodeCommandWord, 0x0004).externalFault).toBe(true);
  });

  test("decode bit 3 → faultReset", () => {
    expect(decodeOk(decodeCommandWord, 0x0008).faultReset).toBe(true);
  });

  test("decode all 14 flags with pattern 0xffcf", () => {
    const flags = decodeOk(decodeCommandWord, 0xffcf);
    expect(flags.run).toBe(true);
    expect(flags.reverse).toBe(true);
    expect(flags.externalFault).toBe(true);
    expect(flags.faultReset).toBe(true);
    expect(flags.commS1).toBe(true);
    expect(flags.commS2).toBe(true);
    expect(flags.commS3).toBe(true);
    expect(flags.commS4).toBe(true);
    expect(flags.commS5).toBe(true);
    expect(flags.commS6).toBe(true);
    expect(flags.commS7).toBe(true);
    expect(flags.commS8).toBe(true);
    expect(flags.inverterMode).toBe(true);
    expect(flags.torqueByComm).toBe(true);
  });

  test("decode bits 6-15", () => {
    const bits_6_15 = 0b1111111111 << 6; // bits 6-15 set
    const flags = decodeOk(decodeCommandWord, bits_6_15);
    expect(flags.commS1).toBe(true);
    expect(flags.commS2).toBe(true);
    expect(flags.commS3).toBe(true);
    expect(flags.commS4).toBe(true);
    expect(flags.commS5).toBe(true);
    expect(flags.commS6).toBe(true);
    expect(flags.commS7).toBe(true);
    expect(flags.commS8).toBe(true);
    expect(flags.inverterMode).toBe(true);
    expect(flags.torqueByComm).toBe(true);
    expect(flags.run).toBe(false);
  });

  // ---- encode ----

  test("encode empty → 0", () => {
    expect(encodeOk(encodeCommandWord, CommandWordFlags.empty)).toBe(0);
  });

  test("encode run only → 0x0001", () => {
    expect(encodeOk(encodeCommandWord, CommandWordFlags.runForward)).toBe(
      0x0001,
    );
  });

  test("encode run+reverse → 0x0003", () => {
    expect(encodeOk(encodeCommandWord, CommandWordFlags.runReverse)).toBe(
      0x0003,
    );
  });

  test("encode faultReset → 0x0008", () => {
    expect(encodeOk(encodeCommandWord, CommandWordFlags.resetFaultPulse)).toBe(
      0x0008,
    );
  });

  test("encode all flags set → 0xffcf", () => {
    const all = new CommandWordFlags({
      run: true,
      reverse: true,
      externalFault: true,
      faultReset: true,
      commS1: true,
      commS2: true,
      commS3: true,
      commS4: true,
      commS5: true,
      commS6: true,
      commS7: true,
      commS8: true,
      inverterMode: true,
      torqueByComm: true,
    });
    expect(encodeOk(encodeCommandWord, all)).toBe(0xffcf);
  });

  test("encode inverterMode+torqueByComm only", () => {
    const flags = new CommandWordFlags({
      ...CommandWordFlags.empty,
      inverterMode: true,
      torqueByComm: true,
    });
    expect(encodeOk(encodeCommandWord, flags)).toBe(0xc000);
  });

  // ---- round-trip ----

  test("round-trip known values", () => {
    const cases = [
      0x0000, 0x0001, 0x0003, 0x0008, 0x000c, 0xffcf, 0xc000, 0x3fc0, 0x0fc0,
      0x004f, 0x0842, 0x8080, 0x1249,
    ];
    for (const word of cases) {
      const flags = decodeOk(decodeCommandWord, word);
      const encoded = encodeOk(encodeCommandWord, flags);
      expect(encoded).toBe(word);
    }
  });
});

// ---------------------------------------------------------------------------
// CommandWordPatch / mergeCommandWordPatch
// ---------------------------------------------------------------------------

describe("CommandWordPatch / mergeCommandWordPatch", () => {
  test("merge with all fields overrides everything", () => {
    const base = CommandWordFlags.empty;
    const patch = new CommandWordPatch({ run: true, reverse: true });
    const result = mergeCommandWordPatch(base, patch);
    expect(result.run).toBe(true);
    expect(result.reverse).toBe(true);
    expect(result.externalFault).toBe(false);
  });

  test("merge with empty patch returns base unchanged", () => {
    const base = CommandWordFlags.runForward;
    const patch = new CommandWordPatch({});
    const result = mergeCommandWordPatch(base, patch);
    expect(result).toEqual(base);
  });

  test("merge partial patch: only run changes", () => {
    const base = CommandWordFlags.stop;
    const patch = new CommandWordPatch({ run: true });
    const result = mergeCommandWordPatch(base, patch);
    expect(result.run).toBe(true);
    expect(result.reverse).toBe(false);
    expect(result.externalFault).toBe(false);
    expect(result.faultReset).toBe(false);
  });

  test("patch round-trips through encode → decode → merge", () => {
    const base = CommandWordFlags.empty;
    const patch = new CommandWordPatch({ run: true, inverterMode: true });
    const merged = mergeCommandWordPatch(base, patch);
    const encoded = encodeOk(encodeCommandWord, merged);
    const decoded = decodeOk(decodeCommandWord, encoded);
    expect(decoded).toEqual(merged);
  });
});

// ---------------------------------------------------------------------------
// FrequencyCommandSchema
// ---------------------------------------------------------------------------

describe("FrequencyCommandSchema", () => {
  test("decode 0 → 0 Hz", () => {
    expect(decodeOk(decodeFrequencyCommand, 0)).toBe(0);
  });

  test("decode 100 → 1.00 Hz", () => {
    expect(decodeOk(decodeFrequencyCommand, 100)).toBe(1);
  });

  test("decode 6000 → 60.00 Hz", () => {
    expect(decodeOk(decodeFrequencyCommand, 6000)).toBe(60);
  });

  test("encode 0 Hz → 0", () => {
    expect(encodeOk(encodeFrequencyCommand, 0 as FrequencyHz)).toBe(0);
  });

  test("encode 50 Hz → 5000", () => {
    expect(encodeOk(encodeFrequencyCommand, 50 as FrequencyHz)).toBe(5000);
  });

  test("encode 60 Hz → 6000", () => {
    expect(encodeOk(encodeFrequencyCommand, 60 as FrequencyHz)).toBe(6000);
  });

  test("round-trip", () => {
    const hzValues = [0, 0.01, 1, 30, 50, 60, 99.99, 600];
    for (const hz of hzValues) {
      const encoded = encodeOk(encodeFrequencyCommand, hz as FrequencyHz);
      const decoded = decodeOk(decodeFrequencyCommand, encoded);
      expect(Math.abs(decoded - hz)).toBeLessThanOrEqual(0.005);
    }
  });
});

// ---------------------------------------------------------------------------
// TorqueCommandSchema
// ---------------------------------------------------------------------------

describe("TorqueCommandSchema", () => {
  test("decode 0 → 0%", () => {
    expect(decodeOk(decodeTorqueCommand, 0)).toBe(0);
  });

  test("decode 8192 → 100%", () => {
    expect(decodeOk(decodeTorqueCommand, 8192)).toBeCloseTo(100, 1);
  });

  test("decode -8192 → -100%", () => {
    expect(decodeOk(decodeTorqueCommand, -8192)).toBeCloseTo(-100, 1);
  });

  test("encode 0% → 0", () => {
    expect(encodeOk(encodeTorqueCommand, 0 as TorquePercent)).toBe(0);
  });

  test("encode 100% → 8192", () => {
    expect(encodeOk(encodeTorqueCommand, 100 as TorquePercent)).toBe(8192);
  });

  test("encode -100% → -8192", () => {
    expect(encodeOk(encodeTorqueCommand, -100 as TorquePercent)).toBe(-8192);
  });

  test("round-trip", () => {
    const values = [-100, -50, 0, 25, 50, 100];
    for (const pct of values) {
      const encoded = encodeOk(encodeTorqueCommand, pct as TorquePercent);
      const decoded = decodeOk(decodeTorqueCommand, encoded);
      expect(Math.abs(decoded - pct)).toBeLessThanOrEqual(0.02);
    }
  });
});

// ---------------------------------------------------------------------------
// SpeedLimitCommandSchema
// ---------------------------------------------------------------------------

describe("SpeedLimitCommandSchema", () => {
  test("decode 0 → 0%", () => {
    expect(decodeOk(decodeSpeedLimitCommand, 0)).toBe(0);
  });

  test("decode 120 → 120%", () => {
    expect(decodeOk(decodeSpeedLimitCommand, 120)).toBe(120);
  });

  test("decode -120 → -120%", () => {
    expect(decodeOk(decodeSpeedLimitCommand, -120)).toBe(-120);
  });

  test("encode round-trip identity", () => {
    const values = [-120, -50, 0, 50, 120];
    for (const v of values) {
      const encoded = encodeOk(encodeSpeedLimitCommand, v as any);
      const decoded = decodeOk(decodeSpeedLimitCommand, encoded);
      expect(decoded).toBe(v);
    }
  });
});

// ---------------------------------------------------------------------------
// AnalogOut Command Schemas
// ---------------------------------------------------------------------------

describe("AnalogOut Command Schemas", () => {
  test("AnalogOut1 decode 0 → 0V", () => {
    expect(decodeOk(decodeAnalogOut1Command, 0)).toBe(0);
  });

  test("AnalogOut1 decode 1000 → 10V", () => {
    expect(decodeOk(decodeAnalogOut1Command, 1000)).toBe(10);
  });

  test("AnalogOut1 encode 5V → 500", () => {
    expect(encodeOk(encodeAnalogOut1Command, 5 as any)).toBe(500);
  });

  test("AnalogOut1 round-trip", () => {
    const voltages = [0, 2.5, 5, 7.5, 10];
    for (const v of voltages) {
      const encoded = encodeOk(encodeAnalogOut1Command, v as any);
      const decoded = decodeOk(decodeAnalogOut1Command, encoded);
      expect(Math.abs(decoded - v)).toBeLessThanOrEqual(0.005);
    }
  });

  test("AnalogOut2 decode 500 → 5V", () => {
    expect(decodeOk(decodeAnalogOut2Command, 500)).toBe(5);
  });

  test("AnalogOut2 encode 10V → 1000", () => {
    expect(encodeOk(encodeAnalogOut2Command, 10 as any)).toBe(1000);
  });
});

// ---------------------------------------------------------------------------
// DigitalOutCommandSchema
// ---------------------------------------------------------------------------

describe("DigitalOutCommandSchema", () => {
  test("decode 0 → all flags false", () => {
    const flags = decodeOk(decodeDigitalOutCommand, 0);
    expect(flags.ry1).toBe(false);
    expect(flags.ry2).toBe(false);
    expect(flags.pulse).toBe(false);
  });

  test("decode bit 0 → ry1", () => {
    expect(decodeOk(decodeDigitalOutCommand, 0x0001).ry1).toBe(true);
  });

  test("decode bit 1 → ry2", () => {
    expect(decodeOk(decodeDigitalOutCommand, 0x0002).ry2).toBe(true);
  });

  test("decode bit 2 → pulse", () => {
    expect(decodeOk(decodeDigitalOutCommand, 0x0004).pulse).toBe(true);
  });

  test("encode empty → 0", () => {
    expect(
      encodeOk(encodeDigitalOutCommand, DigitalOutCommandFlags.empty),
    ).toBe(0);
  });

  test("encode all flags → 0x0007", () => {
    const all = new DigitalOutCommandFlags({
      ry1: true,
      ry2: true,
      pulse: true,
    });
    expect(encodeOk(encodeDigitalOutCommand, all)).toBe(0x0007);
  });

  test("round-trip", () => {
    for (const word of [0x0000, 0x0001, 0x0002, 0x0004, 0x0007]) {
      const flags = decodeOk(decodeDigitalOutCommand, word);
      expect(encodeOk(encodeDigitalOutCommand, flags)).toBe(word);
    }
  });
});

describe("mergeDigitalOutCommandPatch", () => {
  test("overrides specified fields", () => {
    const base = DigitalOutCommandFlags.empty;
    const patch = new DigitalOutCommandPatch({ ry1: true });
    const result = mergeDigitalOutCommandPatch(base, patch);
    expect(result.ry1).toBe(true);
    expect(result.ry2).toBe(false);
  });

  test("empty patch returns base", () => {
    const base = new DigitalOutCommandFlags({
      ry1: true,
      ry2: true,
      pulse: true,
    });
    expect(
      mergeDigitalOutCommandPatch(base, new DigitalOutCommandPatch({})),
    ).toEqual(base);
  });
});

// ---------------------------------------------------------------------------
// StateMonitorSchema (decode-only)
// ---------------------------------------------------------------------------

describe("StateMonitorSchema", () => {
  test("decode 0 → all flags false", () => {
    const flags = decodeOk(decodeStateMonitor, 0);
    expect(flags.operation).toBe(false);
    expect(flags.direction).toBe(false);
    expect(flags.inverterReady).toBe(false);
    expect(flags.fault).toBe(false);
    expect(flags.warning).toBe(false);
    expect(flags.zeroSpeed).toBe(false);
    expect(flags.is440V).toBe(false);
    expect(flags.frequencyAgree).toBe(false);
    expect(flags.setFrequencyAgree).toBe(false);
    expect(flags.frequencyDetection1).toBe(false);
    expect(flags.frequencyDetection2).toBe(false);
    expect(flags.underVoltage).toBe(false);
    expect(flags.baseblock).toBe(false);
    expect(flags.freqRefNotFromComm).toBe(false);
    expect(flags.seqNotFromComm).toBe(false);
    expect(flags.overTorque).toBe(false);
  });

  test("decode flag bits", () => {
    expect(decodeOk(decodeStateMonitor, 0x0001).operation).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0002).direction).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0004).inverterReady).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0008).fault).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0010).warning).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0020).zeroSpeed).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0040).is440V).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0080).frequencyAgree).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0100).setFrequencyAgree).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0200).frequencyDetection1).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0400).frequencyDetection2).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x0800).underVoltage).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x1000).baseblock).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x2000).freqRefNotFromComm).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x4000).seqNotFromComm).toBe(true);
    expect(decodeOk(decodeStateMonitor, 0x8000).overTorque).toBe(true);
  });

  test("all flags set", () => {
    const flags = decodeOk(decodeStateMonitor, 0xffff);
    expect(flags.operation).toBe(true);
    expect(flags.overTorque).toBe(true);
  });

  test("encode fails with read-only error", () => {
    const decoder = Schema.decodeUnknown(StateMonitorSchema);
    const encoder = Schema.encode(StateMonitorSchema);
    const flags = decodeOk(decoder, 0);
    const err = encodeFail(encoder, flags);
    expect(err.message || err.toString()).toContain("read only");
  });
});

// ---------------------------------------------------------------------------
// ErrorDescriptionMonitorSchema
// ---------------------------------------------------------------------------

describe("ErrorDescriptionMonitorSchema", () => {
  test("decode known error codes", () => {
    expect(decodeOk(decodeErrorDescriptionMonitor, 1)).toBe(
      "UV (Under-voltage)",
    );
    expect(decodeOk(decodeErrorDescriptionMonitor, 2)).toBe(
      "OC (Over-current)",
    );
    expect(decodeOk(decodeErrorDescriptionMonitor, 28)).toBe(
      "CE (Communication error)",
    );
    expect(decodeOk(decodeErrorDescriptionMonitor, 29)).toBe(
      "STO (Safe torque off)",
    );
  });

  test("decode unknown error code returns fallback", () => {
    expect(decodeOk(decodeErrorDescriptionMonitor, 99)).toBe("Unknown (99)");
    expect(decodeOk(decodeErrorDescriptionMonitor, 255)).toBe("Unknown (255)");
  });

  test("decode 0 returns unknown", () => {
    const result = decodeOk(decodeErrorDescriptionMonitor, 0);
    expect(result).toBe("Unknown (0)");
  });

  test("encode fails with read-only error", () => {
    const encoder = Schema.encode(ErrorDescriptionMonitorSchema);
    const err = encodeFail(encoder, "test" as any);
    expect(err.message || err.toString()).toContain("read only");
  });
});

// ---------------------------------------------------------------------------
// DigitalInStateMonitorSchema
// ---------------------------------------------------------------------------

describe("DigitalInStateMonitorSchema", () => {
  test("decode 0 → all false", () => {
    const flags = decodeOk(decodeDigitalInStateMonitor, 0);
    expect(flags.s1).toBe(false);
    expect(flags.s8).toBe(false);
  });

  test("decode individual bits", () => {
    expect(decodeOk(decodeDigitalInStateMonitor, 0x01).s1).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x02).s2).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x04).s3).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x08).s4).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x10).s5).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x20).s6).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x40).s7).toBe(true);
    expect(decodeOk(decodeDigitalInStateMonitor, 0x80).s8).toBe(true);
  });

  test("decode 0xff → all true", () => {
    const flags = decodeOk(decodeDigitalInStateMonitor, 0xff);
    expect(flags.s1).toBe(true);
    expect(flags.s8).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Frequency/Output monitor schemas (decode-only)
// ---------------------------------------------------------------------------

describe("FrequencyCommandMonitorSchema", () => {
  test("decode 0 → 0 Hz", () => {
    expect(decodeOk(decodeFrequencyCommandMonitor, 0)).toBe(0);
  });
  test("decode 5000 → 50 Hz", () => {
    expect(decodeOk(decodeFrequencyCommandMonitor, 5000)).toBe(50);
  });
  test("decode 6000 → 60 Hz", () => {
    expect(decodeOk(decodeFrequencyCommandMonitor, 6000)).toBe(60);
  });
});

describe("OutputFrequencyMonitorSchema", () => {
  test("decode 0 → 0 Hz", () => {
    expect(decodeOk(decodeOutputFrequencyMonitor, 0)).toBe(0);
  });
  test("decode 5000 → 50 Hz", () => {
    expect(decodeOk(decodeOutputFrequencyMonitor, 5000)).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// DCBusVoltageCommandMonitorSchema
// ---------------------------------------------------------------------------

describe("DCBusVoltageCommandMonitorSchema", () => {
  test("decode 0 → 0V", () => {
    expect(decodeOk(decodeDCBusVoltageCommandMonitor, 0)).toBe(0);
  });
  test("decode 3000 → 300.0V", () => {
    expect(decodeOk(decodeDCBusVoltageCommandMonitor, 3000)).toBe(300);
  });
  test("decode 10000 → 1000.0V", () => {
    expect(decodeOk(decodeDCBusVoltageCommandMonitor, 10000)).toBe(1000);
  });
});

// ---------------------------------------------------------------------------
// OutputCurrentMonitorSchema
// ---------------------------------------------------------------------------

describe("OutputCurrentMonitorSchema", () => {
  test("decode 0 → 0A", () => {
    expect(decodeOk(decodeOutputCurrentMonitor, 0)).toBe(0);
  });
  test("decode 100 → 10.0A", () => {
    expect(decodeOk(decodeOutputCurrentMonitor, 100)).toBe(10);
  });
  test("decode 65535 → 6553.5A", () => {
    expect(decodeOk(decodeOutputCurrentMonitor, 65535)).toBe(6553.5);
  });
});

// ---------------------------------------------------------------------------
// WarningDescriptionMonitorSchema
// ---------------------------------------------------------------------------

describe("WarningDescriptionMonitorSchema", () => {
  test("decode known warning codes", () => {
    expect(decodeOk(decodeWarningDescriptionMonitor, 0)).toBe("No alarm");
    expect(decodeOk(decodeWarningDescriptionMonitor, 1)).toBe(
      "OV (Overvoltage)",
    );
    expect(decodeOk(decodeWarningDescriptionMonitor, 13)).toBe(
      "CE (Communication error)",
    );
    expect(decodeOk(decodeWarningDescriptionMonitor, 65)).toBe(
      "OH1 (Overheat 1)",
    );
  });

  test("decode unknown warning code returns fallback", () => {
    expect(decodeOk(decodeWarningDescriptionMonitor, 999)).toBe(
      "Unknown warning (999)",
    );
  });
});

// ---------------------------------------------------------------------------
// DigitalOutStateMonitorSchema
// ---------------------------------------------------------------------------

describe("DigitalOutStateMonitorSchema", () => {
  test("decode 0 → all false", () => {
    const flags = decodeOk(decodeDigitalOutStateMonitor, 0);
    expect(flags.ry1).toBe(false);
    expect(flags.ry2).toBe(false);
    expect(flags.pulse).toBe(false);
  });
  test("decode 0x01 → ry1", () => {
    expect(decodeOk(decodeDigitalOutStateMonitor, 0x01).ry1).toBe(true);
  });
  test("decode 0x02 → ry2", () => {
    expect(decodeOk(decodeDigitalOutStateMonitor, 0x02).ry2).toBe(true);
  });
  test("decode 0x04 → pulse", () => {
    expect(decodeOk(decodeDigitalOutStateMonitor, 0x04).pulse).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// AnalogOut Monitor Schemas
// ---------------------------------------------------------------------------

describe("AnalogOut Monitor Schemas", () => {
  test("AnalogOut1 decode 0 → 0V", () => {
    expect(decodeOk(decodeAnalogOut1Monitor, 0)).toBe(0);
  });
  test("AnalogOut1 decode 500 → 5V", () => {
    expect(decodeOk(decodeAnalogOut1Monitor, 500)).toBe(5);
  });
  test("AnalogOut2 decode 1000 → 10V", () => {
    expect(decodeOk(decodeAnalogOut2Monitor, 1000)).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// AnalogIn Monitor Schemas
// ---------------------------------------------------------------------------

describe("AnalogIn Monitor Schemas", () => {
  test("AnalogIn1 decode 0 → 0%", () => {
    expect(decodeOk(decodeAnalogIn1Monitor, 0)).toBe(0);
  });
  test("AnalogIn1 decode 1000 → 100%", () => {
    expect(decodeOk(decodeAnalogIn1Monitor, 1000)).toBe(100);
  });
  test("AnalogIn2 decode 500 → 50%", () => {
    expect(decodeOk(decodeAnalogIn2Monitor, 500)).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// A510CheckMonitorSchema
// ---------------------------------------------------------------------------

describe("A510CheckMonitorSchema", () => {
  test("decode known model codes", () => {
    expect(decodeOk(decodeA510CheckMonitor, 0x03)).toBe("A510(s)");
    expect(decodeOk(decodeA510CheckMonitor, 0x01)).toBe("L510(s)");
    expect(decodeOk(decodeA510CheckMonitor, 0x02)).toBe("E510(s)");
    expect(decodeOk(decodeA510CheckMonitor, 0x04)).toBe("F510");
  });

  test("decode unknown model code returns fallback", () => {
    expect(decodeOk(decodeA510CheckMonitor, 0x05)).toBe("Unknown (0x5)");
    expect(decodeOk(decodeA510CheckMonitor, 0xff)).toBe("Unknown (0xff)");
  });
});
