/**
 * Shared driver for the per-group examples.
 *
 * Reads every parameter in one group from an A510 inverter over RTU and prints
 * the results as a Markdown table. A parameter that fails to read is reported
 * and left out of the table, so one unreadable register does not end the run.
 *
 * Group 00 also supplies a read window to demonstrate concurrent batching.
 */

import { BunRuntime } from '@effect/platform-bun';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Console, type Duration, Effect, Layer, Option, References } from 'effect';

import type { TecoInverterApi } from '../src/TecoInverterService';
import { TecoInverterService } from '../src/TecoInverterService';
/**
 * One group's parameters, as `TecoInverterService.parameters.groupNN` exposes
 * them, narrowed to what this driver uses: call with a device id, then `read`.
 * The value and error types are left open because they differ per parameter,
 * and this only prints them.
 */
type ParameterGroup = Readonly<
  Record<
    string,
    ((deviceId: number) => {
      readonly read: () => Effect.Effect<unknown, unknown>;
    }) & { readonly meta: { readonly name: string } }
  >
>;

interface ParameterRow {
  readonly key: string;
  readonly description: string;
  readonly value: string;
}

const deviceId = 1;

const serialPort = {
  portPath: '/dev/tty.usbserial-A10OFLK2',
  baudRate: 19200,
  stopBits: 1,
  dataBits: 8,
  parity: 'none',
} as const;

/**
 * Reads and prints one parameter group.
 *
 * @param title - Table heading, e.g. `'Group 05: Multi-Speed Parameters'`.
 * @param selectGroup - Picks the group off the service's `parameters` record.
 * @param readWindow - Collect concurrent reads within this window; omit for sequential reads.
 */
export const readGroup = (
  title: string,
  selectGroup: (parameters: TecoInverterApi['parameters']) => ParameterGroup,
  readWindow?: Duration.Input,
): void => {
  const program = Effect.gen(function* () {
    const inverter = yield* TecoInverterService;
    const rows = yield* Effect.forEach(
      Object.entries(selectGroup(inverter.parameters)),
      ([key, param]) =>
        Effect.gen(function* () {
          const read = yield* param(deviceId)
            .read()
            .pipe(
              Effect.map(Option.some<unknown>),
              Effect.catch((err) =>
                Console.error(`FAILED reading ${key} (${param.meta.name}): ${String(err)}`).pipe(
                  Effect.as(Option.none<unknown>()),
                ),
              ),
            );

          return Option.map(
            read,
            (value): ParameterRow => ({ key, description: param.meta.name, value: String(value) }),
          );
        }),
      { concurrency: readWindow === undefined ? 1 : 'unbounded' },
    );

    yield* Console.log(`=== ${title} ===`);
    yield* Console.log('| Command Param | Description | Current Value |');
    yield* Console.log('| --- | --- | --- |');

    for (const row of rows) {
      if (Option.isNone(row)) continue;
      const { key, description, value } = row.value;
      yield* Console.log(`| ${key} | ${description} | ${value} |`);
    }
  });

  const layerLive = Layer.provideMerge(
    TecoInverterService.make({ reads: { window: readWindow ?? 0 } }),
    SerialTransportService.fromRtu(serialPort),
  );

  program.pipe(
    Effect.provide(layerLive),
    Effect.provideService(References.MinimumLogLevel, 'Debug'),
    BunRuntime.runMain,
  );
};
