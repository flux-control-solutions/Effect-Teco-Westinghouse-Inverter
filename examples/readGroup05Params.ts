/**
 * Reads all parameters from Group 05 (Multi-Speed Parameters) of an A510 inverter.
 *
 * Demonstrates iterating over a parameter group, accessing metadata (name, code),
 * and reading each parameter value concurrently.
 *
 * @example bun run examples/readGroup05Params.ts
 */

import { BunRuntime } from '@effect/platform-bun';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Console, Effect, Layer, Logger, LogLevel } from 'effect';

import { TecoInverterService } from '../src/TecoInverterService';

const deviceId = 1;

const typedEntries = <T extends Record<string, unknown>>(obj: T) =>
  Object.entries(obj) as {
    [K in keyof T]-?: [K, T[K]];
  }[keyof T][];

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const params = inverter.parameters.group05;

  type EffectValue<F> = F extends Effect.Effect<infer A, any, any> ? A : never;
  type Group05Params = typeof params;
  type Group05Row<K extends keyof Group05Params> = {
    readonly key: K;
    readonly description: Group05Params[K]['meta']['name'];
    readonly value: EffectValue<ReturnType<ReturnType<Group05Params[K]>['read']>>;
  };
  type AnyGroup05Row = {
    [K in keyof Group05Params]: Group05Row<K>;
  }[keyof Group05Params];

  const rows: AnyGroup05Row[] = [];
  for (const [key, param] of typedEntries(params)) {
    const value = yield* param(deviceId)
      .read()
      .pipe(
        Effect.catchAll((err) =>
          Effect.gen(function* () {
            yield* Console.error(`FAILED reading ${key} (${param.meta.name}): ${String(err)}`);
            return null as any;
          }),
        ),
      );
    if (value === null) continue;
    rows.push({
      key,
      description: param.meta.name,
      value,
    } as AnyGroup05Row);
  }

  yield* Console.log('=== Group 05: Multi-Speed Parameters ===');
  yield* Console.log('| Command Param | Description | Current Value |');
  yield* Console.log('| --- | --- | --- |');

  for (const { key, description, value } of rows) {
    yield* Console.log(`| ${key} | ${description} | ${String(value)} |`);
  }
});

const TecoLayer = TecoInverterService.Default(true);
const SerialLayer = SerialTransportService.fromRtu({
  portPath: '/dev/tty.usbserial-A10OFLK2',
  baudRate: 19200,
  stopBits: 1,
  dataBits: 8,
  parity: 'None',
});

const layerLive = Layer.provideMerge(TecoLayer, SerialLayer);

program.pipe(
  Effect.provide(layerLive),
  // @ts-ignore
  Logger.withMinimumLogLevel(LogLevel.Debug),
  BunRuntime.runMain,
);
