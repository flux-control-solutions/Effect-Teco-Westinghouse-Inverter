import { Console, Effect, Layer, Logger, LogLevel } from "effect";
import { TecoInverterService } from "../src/TecoInverterService";
import { RtuTransportService } from "effect-modbus-rs";
import { BunRuntime } from "@effect/platform-bun";
import * as P from "../src/parameters";

const deviceId = 1;

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const params = inverter.parameters.group00;

  const keys = Object.keys(P.group00.group00Params);

  const reads: Record<string, Effect.Effect<any, any, any>> = {};
  for (const key of keys) {
    reads[key] = params[key](deviceId).read;
  }

  const values = yield* Effect.all(reads, { concurrency: "unbounded" });

  yield* Console.log("=== Group 00: Basic Parameters ===");
  for (const key of keys) {
    const formatted = P.group00[`formatted${key.replace("-", "_")}` as keyof typeof P.group00] as (v: any) => string;
    yield* Console.log(`  ${key}: ${formatted(values[key])}`);
  }
});

const TecoLayer = TecoInverterService.Default("Rtu");
const RtuLayer = RtuTransportService.Default({
  portPath: "/dev/tty.usbserial-A10OFLK2",
  baudRate: 19200,
  stopBits: 1,
  dataBits: 8,
  parity: "None",
});

const layerLive = Layer.provideMerge(TecoLayer, RtuLayer);

program.pipe(
  Effect.provide(layerLive),
  // @ts-expect-error - Logger.withMinimumLogLevel produces type mismatch in pipe chain
  Logger.withMinimumLogLevel(LogLevel.Debug),
  BunRuntime.runMain,
);
