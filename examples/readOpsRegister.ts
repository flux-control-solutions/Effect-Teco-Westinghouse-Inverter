import { Console, Effect, Layer, Logger, LogLevel } from "effect";
import { TecoInverterService } from "../src/TecoInverterService";
import { RtuTransportService } from "effect-modbus-rs";
import { BunRuntime } from "@effect/platform-bun";
import { formattedCommandWord } from "../src/schemas";

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const ops = yield* inverter.readOperationRegister(1);

  yield* Console.log(formattedCommandWord(ops));
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
