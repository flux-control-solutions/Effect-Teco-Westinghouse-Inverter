/**
 * Reads the operation command register from an A510 inverter.
 *
 * Demonstrates reading a command register using read-modify-write semantics.
 *
 * @example bun run examples/readOpsRegister.ts
 */

import { BunRuntime } from '@effect/platform-bun';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Console, Effect, Layer, Logger, LogLevel } from 'effect';

import { formattedCommandWord } from '../src/schemas';
import { TecoInverterService } from '../src/TecoInverterService';

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const ops = yield* inverter.operationCommand(1).read();

  yield* Console.log(formattedCommandWord(ops));
});

const TecoLayer = TecoInverterService.Default(true);
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
  // @ts-ignore
  Logger.withMinimumLogLevel(LogLevel.Debug),
  BunRuntime.runMain,
);
