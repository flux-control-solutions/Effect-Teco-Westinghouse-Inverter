import { Console, Effect, Layer, Logger, LogLevel } from "effect";
import { TecoInverterService } from "../src/TecoInverterService";
import { RtuTransportService } from "effect-modbus-rs";
import { BunRuntime } from "@effect/platform-bun";

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
    readonly description: Group00Params[K]["meta"]["name"];
    readonly value: EffectValue<
      ReturnType<ReturnType<Group00Params[K]>["read"]>
    >;
  };
  type AnyGroup00Row = {
    [K in keyof Group00Params]: Group00Row<K>;
  }[keyof Group00Params];

  const rows: AnyGroup00Row[] = [];
  for (const [key, param] of typedEntries(params)) {
    const value = yield* param(deviceId).read();
    rows.push({
      key,
      description: param.meta.name,
      value,
    } as AnyGroup00Row);
  }

  yield* Console.log("=== Group 00: Basic Parameters ===");
  yield* Console.log("| Command Param | Description | Current Value |");
  yield* Console.log("| --- | --- | --- |");

  for (const { key, description, value } of rows) {
    yield* Console.log(`| ${key} | ${description} | ${String(value)} |`);
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
  // @ts-ignore
  Logger.withMinimumLogLevel(LogLevel.Debug),
  BunRuntime.runMain,
);
