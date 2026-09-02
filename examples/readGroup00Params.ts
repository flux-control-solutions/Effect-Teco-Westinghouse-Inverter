/**
 * Reads all parameters from Group 00 (Basic Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name, code),
 * and reading the group in as few transactions as the register map allows.
 *
 * Group 00 is 49 parameters, and each accessor names one register. Read one
 * after another they cost 49 round trips. Read together, under a window, the
 * transport packs them into one span per contiguous run of the group — three
 * transactions.
 *
 * Both halves are load-bearing. `concurrency: 'unbounded'` is what puts the
 * reads in flight at the same moment, and the window is what holds the first
 * one long enough for the rest to arrive. Drop either and this is 49
 * transactions again.
 *
 * @example bun run examples/readGroup00Params.ts
 */

import { BunRuntime } from '@effect/platform-bun';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Console, Effect, Layer, References } from 'effect';

import { TecoInverterService } from '../src/TecoInverterService';

const deviceId = 1;

const typedEntries = <T extends Record<string, unknown>>(obj: T) =>
  Object.entries(obj) as {
    [K in keyof T]-?: [K, T[K]];
  }[keyof T][];

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const params = inverter.parameters.group00;

  type EffectValue<F> = F extends Effect.Effect<infer A, any, any> ? A : never;
  type Group00Params = typeof params;
  type Group00Row<K extends keyof Group00Params> = {
    readonly key: K;
    readonly description: Group00Params[K]['meta']['name'];
    readonly value: EffectValue<ReturnType<ReturnType<Group00Params[K]>['read']>>;
  };
  type AnyGroup00Row = {
    [K in keyof Group00Params]: Group00Row<K>;
  }[keyof Group00Params];

  const rows = yield* Effect.forEach(
    typedEntries(params),
    ([key, param]): Effect.Effect<AnyGroup00Row, any> =>
      Effect.map(
        // Every accessor in the group has its own value type, so the entries
        // are a union of signatures rather than one. `AnyGroup00Row` carries
        // the real types back out.
        param(deviceId).read() as Effect.Effect<unknown, any>,
        (value) =>
          ({
            key,
            description: param.meta.name,
            value,
          }) as AnyGroup00Row,
      ),
    { concurrency: 'unbounded' },
  );

  yield* Console.log('=== Group 00: Basic Parameters ===');
  yield* Console.log('| Command Param | Description | Current Value |');
  yield* Console.log('| --- | --- | --- |');

  for (const { key, description, value } of rows) {
    yield* Console.log(`| ${key} | ${description} | ${String(value)} |`);
  }
});

// 5 ms is roughly one short frame at 19200 baud, which is arithmetic rather
// than a measurement. Time a transaction on the segment you are on before
// settling on a value for it.
const TecoLayer = TecoInverterService.make({ reads: { window: '5 millis' } });
const SerialLayer = SerialTransportService.fromRtu({
  portPath: '/dev/tty.usbserial-A10OFLK2',
  baudRate: 19200,
  stopBits: 1,
  dataBits: 8,
  parity: 'none',
});

const layerLive = Layer.provideMerge(TecoLayer, SerialLayer);

program.pipe(
  Effect.provide(layerLive),
  Effect.provideService(References.MinimumLogLevel, 'Debug'),
  BunRuntime.runMain,
);
