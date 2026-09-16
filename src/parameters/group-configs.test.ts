import { describe, expect, it } from 'bun:test';

import { type ParamConfig, fromConfig } from '@flux-control/modbus-schema';
import { Effect, Schema } from 'effect';

import { group00Params } from './group-00';
import { group01Params } from './group-01';
import { group03Params } from './group-03';
import { group04Params } from './group-04';
import type { InverterRegisterMeta } from './operations';

// ── Helpers ────────────────────────────────────────────────────

/** A parameter config as the group modules declare them. */
type InverterParamConfig = ParamConfig<InverterRegisterMeta>;

const decodeOk = <A>(
  decode: (raw: number) => Effect.Effect<A, Schema.SchemaError>,
  wire: number,
): A => Effect.runSync(decode(wire));

// ── Group configs: fromConfig round-trip ───────────────────────

describe('group configs resolve through fromConfig', () => {
  /** Every group under test, so a parameter code resolves in one lookup. */
  const allParams = new Map<string, InverterParamConfig>(
    Object.entries({ ...group00Params, ...group01Params, ...group03Params, ...group04Params }),
  );

  /** What an A510 parameter decodes to: a scaled reading or an enum label. */
  const ParameterValue = Schema.Union([Schema.Number, Schema.String]);
  type ParameterValue = typeof ParameterValue.Type;

  const decodeParam = (code: string, wire: number): ParameterValue => {
    const param = allParams.get(code);
    if (!param) {
      throw new Error(`Unknown param ${code}`);
    }
    // Every config under test decodes to a number or a label; parsing here is
    // what lets the two helpers below take the type each of them expects.
    return Schema.decodeUnknownSync(ParameterValue)(decodeOk(fromConfig(param).decode, wire));
  };

  /** Scaled and signed-scaled parameters, compared with a tolerance. */
  const testNumeric = (code: string, wire: number, expected: number) => {
    it(`${code} decodes ${wire} → ${expected}`, () => {
      expect(decodeParam(code, wire)).toBeCloseTo(expected, 10);
    });
  };

  /** Enum parameters, compared exactly. */
  const testLabel = (code: string, wire: number, expected: string) => {
    it(`${code} decodes ${wire} → ${JSON.stringify(expected)}`, () => {
      expect(decodeParam(code, wire)).toBe(expected);
    });
  };

  // Group 00 — enum
  testLabel('00-00', 0, 'V/F');
  testLabel('00-00', 1, 'V/F+PG');
  // Group 00 — scaled (0.01 Hz)
  testNumeric('00-08', 5000, 50.0);
  testNumeric('00-08', 0, 0);
  // Group 00 — scaled (0.1)
  testNumeric('00-12', 1000, 100.0);
  testNumeric('00-14', 100, 10.0);
  // Group 00 — UInt16
  testNumeric('00-41', 0, 0);
  testNumeric('00-41', 42, 42);

  // Group 01 — scaled (0.1 Hz)
  testNumeric('01-02', 500, 50.0);
  // Group 01 — UInt16
  testNumeric('01-00', 0, 0);
  testNumeric('01-00', 15, 15);

  // Group 03 — SignedScaled (-100.0~100.0 × 0.1)
  testNumeric('03-33', 500, 50.0);
  testNumeric('03-33', 65036, -50.0); // 0xFE0C = -500 in two's complement

  // Group 04 — SignedScaled
  testNumeric('04-03', 500, 50.0);
  testNumeric('04-03', 65036, -50.0); // 0xFE0C = -500 in two's complement
});

// ── Group config structure verification ────────────────────────

describe('group param configs have consistent structure', () => {
  const checkGroup = (
    groupParams: Readonly<Record<string, InverterParamConfig>>,
    group: number,
    label: string,
  ) => {
    describe(label, () => {
      const codes = Object.keys(groupParams);
      it(`has ${codes.length} params`, () => {
        expect(codes.length).toBeGreaterThan(0);
      });

      codes.forEach((code) => {
        it(`${code} has valid meta.group = ${group}`, () => {
          const p = groupParams[code]!;
          expect(p.meta.group).toBe(group);
          expect(p.meta.code).toBe(code);
          expect(p.meta.name).toBeTruthy();
          expect(p.meta.range).toBeTruthy();
          expect(p.meta.page).toBeGreaterThan(0);
          expect(p.register).toBeGreaterThanOrEqual(0);
          expect(p.register).toBeLessThanOrEqual(0xffff);
        });
      });
    });
  };

  checkGroup(group00Params, 0, 'Group 00');
  checkGroup(group01Params, 1, 'Group 01');
  checkGroup(group03Params, 3, 'Group 03');
  checkGroup(group04Params, 4, 'Group 04');
});

// ── Index re-exports ───────────────────────────────────────────

describe('parameters index', () => {
  it('re-exports group00 through group22', async () => {
    const idx = await import('./index');
    expect(idx.group00).toBeDefined();
    expect(idx.group01).toBeDefined();
    expect(idx.group22).toBeDefined();
  });
});
