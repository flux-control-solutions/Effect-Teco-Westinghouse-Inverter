import { describe, expect, it } from 'bun:test';

import { fromConfig } from '@flux-control/modbus-schema';
import { Effect } from 'effect';

import { group00Params } from './group-00';
import { group01Params } from './group-01';
import { group03Params } from './group-03';
import { group04Params } from './group-04';

// ── Helpers ────────────────────────────────────────────────────

const decodeOk = (decode: any, wire: number): any => Effect.runSync(decode(wire));

// ── Group configs: fromConfig round-trip ───────────────────────

describe('group configs resolve through fromConfig', () => {
  const testParam = (code: string, wire: number, expected: any) => {
    it(`${code} decodes ${wire} → ${JSON.stringify(expected)}`, () => {
      const param =
        (group00Params as any)[code] ??
        (group01Params as any)[code] ??
        (group03Params as any)[code] ??
        (group04Params as any)[code];
      if (!param) {
        throw new Error(`Unknown param ${code}`);
      }
      const entry = fromConfig(param);
      const decoded = decodeOk(entry.decode, wire);
      if (typeof expected === 'number') {
        expect(decoded).toBeCloseTo(expected, 10);
      } else {
        expect(decoded).toBe(expected);
      }
    });
  };

  // Group 00 — enum
  testParam('00-00', 0, 'V/F');
  testParam('00-00', 1, 'V/F+PG');
  // Group 00 — scaled (0.01 Hz)
  testParam('00-08', 5000, 50.0);
  testParam('00-08', 0, 0);
  // Group 00 — scaled (0.1)
  testParam('00-12', 1000, 100.0);
  testParam('00-14', 100, 10.0);
  // Group 00 — UInt16
  testParam('00-41', 0, 0);
  testParam('00-41', 42, 42);

  // Group 01 — scaled (0.1 Hz)
  testParam('01-02', 500, 50.0);
  // Group 01 — UInt16
  testParam('01-00', 0, 0);
  testParam('01-00', 15, 15);

  // Group 03 — SignedScaled (-100.0~100.0 × 0.1)
  testParam('03-33', 500, 50.0);
  testParam('03-33', 65036, -50.0); // 0xFE0C = -500 in two's complement

  // Group 04 — SignedScaled
  testParam('04-03', 500, 50.0);
  testParam('04-03', 65036, -50.0); // 0xFE0C = -500 in two's complement
});

// ── Group config structure verification ────────────────────────

describe('group param configs have consistent structure', () => {
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
