import { Console, Effect, Layer, Logger, LogLevel } from "effect";
import { TecoInverterService } from "../src/TecoInverterService";
import { RtuTransportService } from "effect-modbus-rs";
import { BunRuntime } from "@effect/platform-bun";
import {
  formattedCommandWord,
  formattedFrequencyCommand,
  formattedStateMonitor,
  type FrequencyHz,
} from "../src/schemas";

const deviceId = 1;

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;

  // Read command registers — all return factory defaults (0 / stopped)
  const opCmd = yield* inverter.operationCommand(deviceId).read();
  const freqCmd = yield* inverter.frequencyCommand(deviceId).read();

  yield* Console.log("=== Initial (default) values ===");
  yield* Console.log(`  Operation Command:  ${formattedCommandWord(opCmd)}`);
  yield* Console.log(
    `  Frequency Command:  ${formattedFrequencyCommand(freqCmd)}`,
  );

  // Write a frequency command and verify the mock persists it
  yield* inverter.frequencyCommand(deviceId).update(50 as FrequencyHz);
  const freqCmdAfter = yield* inverter.frequencyCommand(deviceId).read();
  yield* Console.log(
    `  After write:        ${formattedFrequencyCommand(freqCmdAfter)}`,
  );

  // Read a parameter register (group 00, param 00-00: Control Mode Selection, default 0 -> "V/F")
  const param00 = yield* inverter.parameters.group00["00-00"](deviceId).read();
  yield* Console.log(`  00-00 Control Mode: ${param00}`);

  // Read a monitor register (default 0)
  const stateMon = yield* inverter.stateMonitor(deviceId).read();
  yield* Console.log(
    `  State Monitor:      ${formattedStateMonitor(stateMon)}`,
  );
});

const TecoLayer = TecoInverterService.Default("Rtu");
const mockRtuLayer = RtuTransportService.makeMockTransport([
  TecoInverterService.mockDevice(1),
  TecoInverterService.mockDevice(2),
])({
  portPath: "/dev/null",
  baudRate: 9600,
  stopBits: 1,
  dataBits: 8,
  parity: "None",
});

const layerLive = Layer.provideMerge(TecoLayer, mockRtuLayer);

program.pipe(
  Effect.provide(layerLive),
  // @ts-ignore
  Logger.withMinimumLogLevel(LogLevel.Debug),
  BunRuntime.runMain,
);
