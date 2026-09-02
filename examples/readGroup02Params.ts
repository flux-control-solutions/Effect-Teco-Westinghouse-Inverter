/**
 * Reads all parameters from Group 02 (IM Motor Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name, code),
 * and reading each parameter value concurrently.
 *
 * @example bun run examples/readGroup02Params.ts
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
  const params = inverter.parameters.group02;

  type EffectValue<F> = F extends Effect.Effect<infer A, any, any> ? A : never;
  type Group02Params = typeof params;
  type Group02Row<K extends keyof Group02Params> = {
    readonly key: K;
    readonly description: Group02Params[K]['meta']['name'];
    readonly value: EffectValue<ReturnType<ReturnType<Group02Params[K]>['read']>>;
  };
  type AnyGroup02Row = {
    [K in keyof Group02Params]: Group02Row<K>;
  }[keyof Group02Params];

  const rows: AnyGroup02Row[] = [];
  for (const [key, param] of typedEntries(params)) {
    const value = yield* param(deviceId).read();
    rows.push({
      key,
      description: param.meta.name,
      value,
    } as AnyGroup02Row);
  }

  yield* Console.log('=== Group 02: IM Motor Parameters ===');
  yield* Console.log('| Command Param | Description | Current Value |');
  yield* Console.log('| --- | --- | --- |');

  for (const { key, description, value } of rows) {
    yield* Console.log(`| ${key} | ${description} | ${String(value)} |`);
  }
});

const TecoLayer = TecoInverterService.make();
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
