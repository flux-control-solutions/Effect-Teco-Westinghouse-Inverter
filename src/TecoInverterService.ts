import { Effect, Record } from "effect";
import { AsciiTransportService, RtuTransportService, type SlaveDeviceDefinition } from "effect-modbus-rs";
import { COMMAND_REGISTERS, MONITOR_REGISTERS } from "./Registers";
import * as S from "./schemas";
import * as P from "./parameters";

const paramDefault = (config: P.ParamConfig): number => {
  const raw = Number(config.meta.default);
  if (Number.isNaN(raw)) return 0;
  switch (config.kind) {
    case P.ParamKind.UInt16:
    case P.ParamKind.Enum:
      return raw;
    case P.ParamKind.Scaled:
    case P.ParamKind.SignedScaled:
      return Math.round(raw / config.factor);
  }
};

const allParamGroups = [
  P.group00, P.group01, P.group02, P.group03, P.group04,
  P.group05, P.group06, P.group07, P.group08, P.group09,
  P.group10, P.group11, P.group12, P.group13, P.group14,
  P.group15, P.group16, P.group17, P.group18, P.group19,
  P.group20, P.group21, P.group22,
] as const;

const paramRegisterDefs: ReadonlyArray<{
  readonly address: number;
  readonly default: number;
}> = allParamGroups.flatMap((group) =>
  Object.values(group).map((config) => ({
    address: config.register,
    default: paramDefault(config),
  })),
);

export class TecoInverterService extends Effect.Service<TecoInverterService>()(
  "TecoInverterService",
  {
    scoped: Effect.fnUntraced(function* (
      transportVariant: "Rtu" | "Ascii",
      safeShutdown: boolean = true,
    ) {
      let transport: RtuTransportService | AsciiTransportService;

      if (transportVariant === "Rtu") {
        transport = yield* RtuTransportService;
      } else if (transportVariant === "Ascii") {
        transport = yield* AsciiTransportService;
      }

      const deviceCache = new Set<number>();
      const cacheDevice = (device: number) => deviceCache.add(device);

      const readHolding = <A, E, R>(
        address: number,
        decode: (raw: unknown) => Effect.Effect<A, E, R>,
      ) =>
        Effect.fnUntraced(function* (deviceId: number) {
          cacheDevice(deviceId);
          const client = yield* transport.withClient(deviceId);
          const [raw] = yield* client.readHoldingRegisters({
            address,
            quantity: 1,
          });
          return yield* decode(raw);
        });

      const makeReadModifyWrite =
        <T, P, E1, R1, E2, R2>(
          address: number,
          decode: (raw: unknown) => Effect.Effect<T, E1, R1>,
          encode: (value: T) => Effect.Effect<number, E2, R2>,
          merge: (base: T, patch: P) => T,
        ) =>
        (deviceId: number) => {
          const read = () => readHolding(address, decode)(deviceId);
          const update = Effect.fnUntraced(function* (patch: P) {
            const current = yield* read();
            const merged = merge(current, patch);
            const encoded = yield* encode(merged);
            cacheDevice(deviceId);
            const client = yield* transport.withClient(deviceId);
            yield* client.writeSingleRegister({ address, value: encoded });
          });
          return { read, update };
        };

      const makeReadWrite =
        <T, E1, R1, E2, R2>(
          address: number,
          decode: (raw: unknown) => Effect.Effect<T, E1, R1>,
          encode: (value: T) => Effect.Effect<number, E2, R2>,
        ) =>
        (deviceId: number) => {
          const read = () => readHolding(address, decode)(deviceId);
          const update = Effect.fnUntraced(function* (value: T) {
            cacheDevice(deviceId);
            const client = yield* transport.withClient(deviceId);
            const encoded = yield* encode(value);
            yield* client.writeSingleRegister({ address, value: encoded });
          });
          return { read, update };
        };

      const makeMonitor =
        <T, E, R>(
          address: number,
          decode: (raw: unknown) => Effect.Effect<T, E, R>,
        ) =>
        (deviceId: number) => ({
          read: () => readHolding(address, decode)(deviceId),
        });

      const makeParamOpsFromConfig = <C extends P.ParamConfig>(config: C) => {
        const { decode, encode } = P.fromConfig(config);
        const ops = makeReadWrite(config.register, decode, encode);
        return Object.assign((deviceId: number) => ops(deviceId), {
          meta: config.meta,
        }) as P.ParamCallableOfEntry<P.ParamEntryOfConfig<C>>;
      };

      const makeGroupParamOps = <C extends Record<string, P.ParamConfig>>(
        configs: C,
      ) => {
        const entries = (
          Object.keys(configs) as Array<Extract<keyof C, string>>
        ).map((key) => [key, makeParamOpsFromConfig(configs[key]!)] as const);

        return Record.fromEntries(entries) as P.GroupParamOps<C>;
      };

      const operationCommand = makeReadModifyWrite(
        COMMAND_REGISTERS.OPERATION_COMMAND,
        S.decodeCommandWord,
        S.encodeCommandWord,
        S.mergeCommandWordPatch,
      );

      if (safeShutdown) {
        yield* Effect.addFinalizer(() =>
          Effect.forEach(deviceCache, (deviceId) => {
            return operationCommand(deviceId)
              .update(new S.CommandWordPatch({ run: false }))
              .pipe(
                Effect.catchAll((err) =>
                  Effect.logWarning(
                    "Error while stopping fan on exit: ",
                    err,
                  ).pipe(Effect.asVoid),
                ),
              );
          }),
        );
      }

      return {
        operationCommand,
        frequencyCommand: makeReadWrite(
          COMMAND_REGISTERS.FREQUENCY_COMMAND,
          S.decodeFrequencyCommand,
          S.encodeFrequencyCommand,
        ),
        torqueCommand: makeReadWrite(
          COMMAND_REGISTERS.TORQUE_COMMAND,
          S.decodeTorqueCommand,
          S.encodeTorqueCommand,
        ),
        speedLimitCommand: makeReadWrite(
          COMMAND_REGISTERS.SPEED_LIMIT_COMMAND,
          S.decodeSpeedLimitCommand,
          S.encodeSpeedLimitCommand,
        ),
        analogOut1Command: makeReadWrite(
          COMMAND_REGISTERS.ANALOG_OUT_1_COMMAND,
          S.decodeAnalogOut1Command,
          S.encodeAnalogOut1Command,
        ),
        analogOut2Command: makeReadWrite(
          COMMAND_REGISTERS.ANALOG_OUT_2_COMMAND,
          S.decodeAnalogOut2Command,
          S.encodeAnalogOut2Command,
        ),
        digitalOutCommand: makeReadModifyWrite(
          COMMAND_REGISTERS.DIGITAL_OUT_COMMAND,
          S.decodeDigitalOutCommand,
          S.encodeDigitalOutCommand,
          S.mergeDigitalOutCommandPatch,
        ),
        stateMonitor: makeMonitor(
          MONITOR_REGISTERS.STATE_MONITOR,
          S.decodeStateMonitor,
        ),
        errorDescriptionMonitor: makeMonitor(
          MONITOR_REGISTERS.ERROR_DESCRIPTION_MONITOR,
          S.decodeErrorDescriptionMonitor,
        ),
        digitalInStateMonitor: makeMonitor(
          MONITOR_REGISTERS.DIGITAL_IN_STATE_MONITOR,
          S.decodeDigitalInStateMonitor,
        ),
        frequencyCommandMonitor: makeMonitor(
          MONITOR_REGISTERS.FREQUENCY_COMMAND_MONITOR,
          S.decodeFrequencyCommandMonitor,
        ),
        outputFrequencyMonitor: makeMonitor(
          MONITOR_REGISTERS.OUTPUT_FREQUENCY_MONITOR,
          S.decodeOutputFrequencyMonitor,
        ),
        dcBusVoltageCommandMonitor: makeMonitor(
          MONITOR_REGISTERS.DC_VOLTAGE_COMMAND_MONITOR,
          S.decodeDCBusVoltageCommandMonitor,
        ),
        outputCurrentMonitor: makeMonitor(
          MONITOR_REGISTERS.OUTPUT_CURRENT_MONITOR,
          S.decodeOutputCurrentMonitor,
        ),
        warningDescriptionMonitor: makeMonitor(
          MONITOR_REGISTERS.WARNING_DESCRIPTION_MONITOR,
          S.decodeWarningDescriptionMonitor,
        ),
        digitalOutStateMonitor: makeMonitor(
          MONITOR_REGISTERS.DIGITAL_OUTPUT_STATE_MONITOR,
          S.decodeDigitalOutStateMonitor,
        ),
        analogOut1Monitor: makeMonitor(
          MONITOR_REGISTERS.ANALOG_OUT_1_MONITOR,
          S.decodeAnalogOut1Monitor,
        ),
        analogOut2Monitor: makeMonitor(
          MONITOR_REGISTERS.ANALOG_OUT_2_MONITOR,
          S.decodeAnalogOut2Monitor,
        ),
        analogIn1Monitor: makeMonitor(
          MONITOR_REGISTERS.ANALOG_IN_1_MONITOR,
          S.decodeAnalogIn1Monitor,
        ),
        analogIn2Monitor: makeMonitor(
          MONITOR_REGISTERS.ANALOG_IN_2_MONITOR,
          S.decodeAnalogIn2Monitor,
        ),
        a510CheckMonitor: makeMonitor(
          MONITOR_REGISTERS.A510_CHECK_MONITOR,
          S.decodeA510CheckMonitor,
        ),
        parameters: {
          group00: makeGroupParamOps(P.group00),
          group01: makeGroupParamOps(P.group01),
          group02: makeGroupParamOps(P.group02),
          group03: makeGroupParamOps(P.group03),
          group04: makeGroupParamOps(P.group04),
          group05: makeGroupParamOps(P.group05),
          group06: makeGroupParamOps(P.group06),
          group07: makeGroupParamOps(P.group07),
          group08: makeGroupParamOps(P.group08),
          group09: makeGroupParamOps(P.group09),
          group10: makeGroupParamOps(P.group10),
          group11: makeGroupParamOps(P.group11),
          group12: makeGroupParamOps(P.group12),
          group13: makeGroupParamOps(P.group13),
          group14: makeGroupParamOps(P.group14),
          group15: makeGroupParamOps(P.group15),
          group16: makeGroupParamOps(P.group16),
          group17: makeGroupParamOps(P.group17),
          group18: makeGroupParamOps(P.group18),
          group19: makeGroupParamOps(P.group19),
          group20: makeGroupParamOps(P.group20),
          group21: makeGroupParamOps(P.group21),
          group22: makeGroupParamOps(P.group22),
        },
      };
    }),
  },
) {
  static mockDevice(deviceId: number): SlaveDeviceDefinition {
    return {
      unitId: deviceId,
      coils: [],
      discreteInputs: [],
      holdingRegisters: [
        ...Object.values(COMMAND_REGISTERS)
          .filter((v): v is number => typeof v === "number")
          .map((address) => ({ address, default: 0 })),
        ...Object.values(MONITOR_REGISTERS)
          .filter((v): v is number => typeof v === "number")
          .map((address) => ({ address, default: 0 })),
        ...paramRegisterDefs,
      ],
      inputRegisters: [],
    };
  }
}
