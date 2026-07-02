import { Effect, Schema } from "effect";
import { describe, expect, it } from "bun:test";
import * as P from "./param-utils";
import { group00Params } from "./group-00";
import { group01Params } from "./group-01";
import { group03Params } from "./group-03";
import { group04Params } from "./group-04";

// ── Helpers ────────────────────────────────────────────────────

const decodeOk = (decode: any, wire: number): any =>
  Effect.runSync(decode(wire));

const decodeFail = (decode: any, wire: number): void => {
  expect(() => Effect.runSync(decode(wire))).toThrow();
};

const encodeOk = (encode: any, value: any): number =>
  Effect.runSync(encode(value)) as number;

const encodeFail = (encode: any, value: any): void => {
  expect(() => Effect.runSync(encode(value))).toThrow();
};

const roundTrip = <A>(
  entry: P.ParamEntry<Schema.Schema<A, number>>,
  value: A,
  wire: number,
) => {
  const decoded = decodeOk(entry.decode, wire);
  expect(decoded).toBe(value);
  const encoded = encodeOk(entry.encode, value);
  expect(encoded).toBe(wire);
};

// ── UInt16 param ───────────────────────────────────────────────

describe("UInt16Param", () => {
  const meta: P.ParamMeta = {
    group: 0, code: "00-41", name: "User Parameter 0",
    range: "00-01~22-31", default: "00-41", unit: "-", page: 421,
  };

  const config: P.UInt16ParamConfig = {
    register: 0x0029, kind: P.ParamKind.UInt16, meta,
  };

  const entry = P.fromConfig(config) as P.ParamEntry<Schema.Schema<number, number>>;

  it("decodes valid values", () => {
    expect(decodeOk(entry.decode, 0)).toBe(0);
    expect(decodeOk(entry.decode, 1)).toBe(1);
    expect(decodeOk(entry.decode, 65535)).toBe(65535);
  });

  it("rejects negative values", () => {
    decodeFail(entry.decode, -1);
  });

  it("rejects non-integers", () => {
    decodeFail(entry.decode, 1.5);
  });

  it("encodes values within range", () => {
    expect(encodeOk(entry.encode, 0)).toBe(0);
    expect(encodeOk(entry.encode, 1)).toBe(1);
    expect(encodeOk(entry.encode, 65535)).toBe(65535);
  });

  it("round-trips", () => {
    roundTrip(entry, 0, 0);
    roundTrip(entry, 42, 42);
    roundTrip(entry, 65535, 65535);
  });

  it("has formatted description", () => {
    const formatted = entry.formatted;
    expect(typeof formatted).toBe("function");
  });
});

// ── Scaled param ───────────────────────────────────────────────

describe("ScaledParam", () => {
  const meta: P.ParamMeta = {
    group: 1, code: "01-02", name: "Maximum Output Frequency of Motor 1",
    range: "4.8~599.0", default: "50.0/60.0", unit: "Hz", page: 422,
  };

  const config: P.ScaledParamConfig = {
    register: 0x0102, kind: P.ParamKind.Scaled, factor: 0.1, meta,
  };

  const entry = P.fromConfig(config) as P.ParamEntry<Schema.Schema<number, number>>;

  it("decodes wire → scaled value", () => {
    expect(decodeOk(entry.decode, 0)).toBe(0);
    expect(decodeOk(entry.decode, 500)).toBe(50.0);
    expect(decodeOk(entry.decode, 600)).toBe(60.0);
    expect(decodeOk(entry.decode, 10)).toBe(1.0);
  });

  it("encodes scaled value → wire", () => {
    expect(encodeOk(entry.encode, 0)).toBe(0);
    expect(encodeOk(entry.encode, 50.0)).toBe(500);
    expect(encodeOk(entry.encode, 60.0)).toBe(600);
  });

  it("round-trips typical values", () => {
    roundTrip(entry, 50.0, 500);
    roundTrip(entry, 0, 0);
    roundTrip(entry, 599.0, 5990);
  });

  it("with factor 0.01 decodes correctly", () => {
    const meta2: P.ParamMeta = {
      group: 0, code: "00-08", name: "Comm Freq Cmd Range",
      range: "0.00~599.00", default: "0.00", unit: "Hz", page: 420,
    };
    const cfg: P.ScaledParamConfig = {
      register: 0x0008, kind: P.ParamKind.Scaled, factor: 0.01, meta: meta2,
    };
    const e = P.fromConfig(cfg) as P.ParamEntry<Schema.Schema<number, number>>;
    expect(decodeOk(e.decode, 5000)).toBe(50.00);
    expect(encodeOk(e.encode, 50.00)).toBe(5000);
    roundTrip(e, 50.00, 5000);
  });

  it("rejects negative wire values since backed by UInt16", () => {
    decodeFail(entry.decode, -1);
  });
});

// ── SignedScaled param ─────────────────────────────────────────

describe("SignedScaledParam", () => {
  const meta: P.ParamMeta = {
    group: 3, code: "03-33", name: "Pulse Input Bias",
    range: "-100.0~100.0", default: "0.0", unit: "%", page: 431,
  };

  const config: P.SignedScaledParamConfig = {
    register: 0x0321, kind: P.ParamKind.SignedScaled, factor: 0.1, meta,
  };

  const entry = P.fromConfig(config) as P.ParamEntry<Schema.Schema<number, number>>;

  it("decodes positive wire values", () => {
    expect(decodeOk(entry.decode, 0)).toBe(0);
    expect(decodeOk(entry.decode, 1000)).toBe(100.0);
    expect(decodeOk(entry.decode, 500)).toBe(50.0);
  });

  it("decodes negative wire values via Int16", () => {
    expect(decodeOk(entry.decode, -500)).toBe(-50.0);
    expect(decodeOk(entry.decode, -1000)).toBe(-100.0);
  });

  it("encodes positive values", () => {
    expect(encodeOk(entry.encode, 0)).toBe(0);
    expect(encodeOk(entry.encode, 50.0)).toBe(500);
    expect(encodeOk(entry.encode, 100.0)).toBe(1000);
  });

  it("encodes negative values", () => {
    expect(encodeOk(entry.encode, -50.0)).toBe(-500);
    expect(encodeOk(entry.encode, -100.0)).toBe(-1000);
  });

  it("round-trips positive and negative", () => {
    roundTrip(entry, 0, 0);
    roundTrip(entry, 50.0, 500);
    roundTrip(entry, -50.0, -500);
  });

  it("with factor 0.01 decodes correctly", () => {
    const meta2: P.ParamMeta = {
      group: 0, code: "00-XX", name: "Test Signed Param",
      range: "-100.00~100.00", default: "0.00", unit: "%", page: 999,
    };
    const cfg: P.SignedScaledParamConfig = {
      register: 0x9999, kind: P.ParamKind.SignedScaled, factor: 0.01, meta: meta2,
    };
    const e = P.fromConfig(cfg) as P.ParamEntry<Schema.Schema<number, number>>;
    expect(decodeOk(e.decode, 5000)).toBe(50.00);
    expect(decodeOk(e.decode, -5000)).toBe(-50.00);
    expect(encodeOk(e.encode, 50.00)).toBe(5000);
    expect(encodeOk(e.encode, -50.00)).toBe(-5000);
  });
});

// ── Enum param ─────────────────────────────────────────────────

describe("EnumParam", () => {
  const meta: P.ParamMeta = {
    group: 0, code: "00-00", name: "Control Mode Selection",
    range: "0-6", default: "0", unit: "-", page: 419,
  };

  const config: P.EnumParamConfig<"V/F" | "V/F+PG" | "SLV" | "SV" | "PMSV" | "PMSLV" | "SLV2"> = {
    register: 0x0000, kind: P.ParamKind.Enum,
    labels: { 0: "V/F", 1: "V/F+PG", 2: "SLV", 3: "SV", 4: "PMSV", 5: "PMSLV", 6: "SLV2" } as const,
    meta,
  };

  const entry = P.fromConfig(config) as P.ParamEntry<
    Schema.Schema<"V/F" | "V/F+PG" | "SLV" | "SV" | "PMSV" | "PMSLV" | "SLV2", number>
  >;

  it("decodes known wire values → label", () => {
    expect(decodeOk(entry.decode, 0)).toBe("V/F");
    expect(decodeOk(entry.decode, 1)).toBe("V/F+PG");
    expect(decodeOk(entry.decode, 2)).toBe("SLV");
    expect(decodeOk(entry.decode, 3)).toBe("SV");
    expect(decodeOk(entry.decode, 6)).toBe("SLV2");
  });

  it("rejects unknown wire values on decode", () => {
    decodeFail(entry.decode, 99);
    decodeFail(entry.decode, 255);
  });

  it("encodes known label → wire", () => {
    expect(encodeOk(entry.encode, "V/F")).toBe(0);
    expect(encodeOk(entry.encode, "SLV")).toBe(2);
    expect(encodeOk(entry.encode, "SLV2")).toBe(6);
  });

  it("rejects invalid label on encode", () => {
    encodeFail(entry.encode, "INVALID" as any);
  });

  it("round-trips all known values", () => {
    roundTrip(entry, "V/F" as any, 0);
    roundTrip(entry, "V/F+PG" as any, 1);
    roundTrip(entry, "SLV" as any, 2);
    roundTrip(entry, "SV" as any, 3);
    roundTrip(entry, "PMSV" as any, 4);
    roundTrip(entry, "PMSLV" as any, 5);
    roundTrip(entry, "SLV2" as any, 6);
  });

  it("handles small enums (2 labels)", () => {
    const meta2: P.ParamMeta = {
      group: 0, code: "00-01", name: "Motor's Rotation Direction",
      range: "0-1", default: "0", unit: "-", page: 419,
    };
    const cfg: P.EnumParamConfig<"Forward" | "Reverse"> = {
      register: 0x0001, kind: P.ParamKind.Enum,
      labels: { 0: "Forward", 1: "Reverse" } as const,
      meta: meta2,
    };
    const e = P.fromConfig(cfg) as P.ParamEntry<
      Schema.Schema<"Forward" | "Reverse", number>
    >;
    expect(decodeOk(e.decode, 0)).toBe("Forward");
    expect(decodeOk(e.decode, 1)).toBe("Reverse");
    decodeFail(e.decode, 2);
    expect(encodeOk(e.encode, "Forward" as any)).toBe(0);
    expect(encodeOk(e.encode, "Reverse" as any)).toBe(1);
  });
});

// ── fromConfig dispatch ────────────────────────────────────────

describe("fromConfig", () => {
  it("returns undefined for unknown ParamKind", () => {
    const config = { register: 0, kind: "Unknown", meta: {} } as any;
    expect(P.fromConfig(config)).toBeUndefined();
  });

  it("returns entry with schema, decode, encode, formatted", () => {
    const entry = P.fromConfig({
      register: 0, kind: P.ParamKind.UInt16,
      meta: { group: 0, code: "test", name: "Test", range: "-", default: "-", unit: "-", page: 0 },
    });
    expect(entry).toHaveProperty("schema");
    expect(entry).toHaveProperty("decode");
    expect(entry).toHaveProperty("encode");
    expect(entry).toHaveProperty("formatted");
  });
});

// ── ParamKind enum ─────────────────────────────────────────────

describe("ParamKind", () => {
  it("has four values", () => {
    expect(P.ParamKind.UInt16).toBe("UInt16" as any);
    expect(P.ParamKind.Scaled).toBe("Scaled" as any);
    expect(P.ParamKind.SignedScaled).toBe("SignedScaled" as any);
    expect(P.ParamKind.Enum).toBe("Enum" as any);
  });
});

// ── Group configs: fromConfig round-trip ───────────────────────

describe("group configs resolve through fromConfig", () => {
  const testParam = (code: string, wire: number, expected: any) => {
    it(`${code} decodes ${wire} → ${JSON.stringify(expected)}`, () => {
      const param = (group00Params as any)[code] ?? (group01Params as any)[code]
        ?? (group03Params as any)[code] ?? (group04Params as any)[code];
      if (!param) { throw new Error(`Unknown param ${code}`); }
      const entry = P.fromConfig(param);
      const decoded = decodeOk(entry.decode, wire);
      if (typeof expected === "number") {
        expect(decoded).toBeCloseTo(expected, 10);
      } else {
        expect(decoded).toBe(expected);
      }
    });
  };

  // Group 00 — enum
  testParam("00-00", 0, "V/F");
  testParam("00-00", 1, "V/F+PG");
  // Group 00 — scaled (0.01 Hz)
  testParam("00-08", 5000, 50.00);
  testParam("00-08", 0, 0);
  // Group 00 — scaled (0.1)
  testParam("00-12", 1000, 100.0);
  testParam("00-14", 100, 10.0);
  // Group 00 — UInt16
  testParam("00-41", 0, 0);
  testParam("00-41", 42, 42);

  // Group 01 — scaled (0.1 Hz)
  testParam("01-02", 500, 50.0);
  // Group 01 — UInt16
  testParam("01-00", 0, 0);
  testParam("01-00", 15, 15);

  // Group 03 — SignedScaled (-100.0~100.0 × 0.1)
  testParam("03-33", 500, 50.0);
  testParam("03-33", -500, -50.0);

  // Group 04 — SignedScaled
  testParam("04-03", 500, 50.0);
  testParam("04-03", -500, -50.0);
});

// ── Group config structure verification ────────────────────────

describe("group param configs have consistent structure", () => {
  const checkGroup = (groupParams: Record<string, any>, group: number, label: string) => {
    describe(label, () => {
      const codes = Object.keys(groupParams);
      it(`has ${codes.length} params`, () => {
        expect(codes.length).toBeGreaterThan(0);
      });

      codes.forEach((code) => {
        it(`${code} has valid meta.group = ${group}`, () => {
          const p = groupParams[code];
          expect(p.meta.group).toBe(group);
          expect(p.meta.code).toBe(code);
          expect(p.meta.name).toBeTruthy();
          expect(p.meta.range).toBeTruthy();
          expect(p.meta.page).toBeGreaterThan(0);
          expect(p.register).toBeGreaterThanOrEqual(0);
          expect(p.register).toBeLessThanOrEqual(0xFFFF);
        });
      });
    });
  };

  checkGroup(group00Params, 0, "Group 00");
  checkGroup(group01Params, 1, "Group 01");
  checkGroup(group03Params, 3, "Group 03");
  checkGroup(group04Params, 4, "Group 04");
});

// ── Index re-exports ───────────────────────────────────────────

describe("parameters index", () => {
  it("re-exports group00 through group22", async () => {
    const idx = await import("./index");
    expect(idx.group00).toBeDefined();
    expect(idx.group01).toBeDefined();
    expect(idx.group22).toBeDefined();
    expect(idx.fromConfig).toBe(P.fromConfig);
    expect(idx.ParamKind).toBe(P.ParamKind);
  });
});
