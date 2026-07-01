import { Effect, Schema } from "effect";
import { AsciiTransportService, RtuTransportService } from "effect-modbus-rs";
import {
  COMMAND_REGISTERS,
  MONITOR_REGISTERS,
  GROUP_00_Basic_Parameters,
  GROUP_01_VF_Control_Parameters,
  GROUP_02_IM_Motor_Parameters,
  GROUP_03_External_Digital_Input_and_Output_Parameters,
  GROUP_04_External_Analog_Input_and_Output_Parameters,
  GROUP_05_Multi_Speed_Parameters,
  GROUP_06_Automatic_Program_Operation_Parameters,
  GROUP_07_Start_Stop_Parameters,
  GROUP_08_Protection_Parameters,
  GROUP_09_Communication_Parameters,
  GROUP_10_PID_Parameters,
  GROUP_11_Auxiliary_Parameters,
  GROUP_12_Monitoring_Parameters,
  GROUP_13_Maintenance_Parameters,
  GROUP_14_PLC_Parameters,
  GROUP_15_PLC_Monitoring_Parameters,
  GROUP_16_LCD_Parameters,
  GROUP_17_Automatic_Tuning_Parameters,
  GROUP_18_Slip_Compensation_Parameters,
  GROUP_19_Wobble_Frequency_Parameters,
  GROUP_20_Speed_Control_Parameters,
  GROUP_21_Torque_And_Position_Control_Parameters,
  GROUP_22_PM_Motor_Parameters,
} from "./Registers";
import * as S from "./schemas";
import * as P from "./parameters";
import type { ParamEntry } from "./parameters/param-utils";

export class TecoInverterService extends Effect.Service<TecoInverterService>()(
  "TecoInverterService",
  {
    scoped: Effect.fnUntraced(function* (transportVariant: "Rtu" | "Ascii") {
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
          const read = readHolding(address, decode)(deviceId);
          const update = Effect.fnUntraced(function* (patch: P) {
            const current = yield* read;
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
          const read = readHolding(address, decode)(deviceId);
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
          read: readHolding(address, decode)(deviceId),
        });

      const makeGroupParamOps = <
        T extends Record<string, ParamEntry<any>>,
        P extends { readonly [K in keyof T]: number },
      >(
        params: T,
        registerMap: P,
      ) => {
        return Object.fromEntries(
          Object.entries(params).map(([key, entry]) => {
            const address = (registerMap as Record<string, number>)[key]!;
            return [key, makeReadWrite(address, entry.decode, entry.encode)];
          }),
        ) as unknown as {
          [K in keyof T]: T[K] extends { schema: Schema.Schema<infer A, any> }
            ? (deviceId: number) => {
                read: Effect.Effect<A, any, any>;
                update: (value: A) => Effect.Effect<void, any, any>;
              }
            : never;
        };
      };

      return {
        operationCommand: makeReadModifyWrite(
          COMMAND_REGISTERS.OPERATION_COMMAND,
          S.decodeCommandWord,
          S.encodeCommandWord,
          S.mergeCommandWordPatch,
        ),
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
          group00: makeGroupParamOps(
            P.group00.group00Params,
            GROUP_00_Basic_Parameters,
          ),
          group01: makeGroupParamOps(
            P.group01.group01Params,
            GROUP_01_VF_Control_Parameters,
          ),
          group02: makeGroupParamOps(
            P.group02.group02Params,
            GROUP_02_IM_Motor_Parameters,
          ),
          group03: makeGroupParamOps(
            P.group03.group03Params,
            GROUP_03_External_Digital_Input_and_Output_Parameters,
          ),
          group04: makeGroupParamOps(
            P.group04.group04Params,
            GROUP_04_External_Analog_Input_and_Output_Parameters,
          ),
          group05: makeGroupParamOps(
            P.group05.group05Params,
            GROUP_05_Multi_Speed_Parameters,
          ),
          group06: makeGroupParamOps(
            P.group06.group06Params,
            GROUP_06_Automatic_Program_Operation_Parameters,
          ),
          group07: makeGroupParamOps(
            P.group07.group07Params,
            GROUP_07_Start_Stop_Parameters,
          ),
          group08: makeGroupParamOps(
            P.group08.group08Params,
            GROUP_08_Protection_Parameters,
          ),
          group09: makeGroupParamOps(
            P.group09.group09Params,
            GROUP_09_Communication_Parameters,
          ),
          group10: makeGroupParamOps(
            P.group10.group10Params,
            GROUP_10_PID_Parameters,
          ),
          group11: makeGroupParamOps(
            P.group11.group11Params,
            GROUP_11_Auxiliary_Parameters,
          ),
          group12: makeGroupParamOps(
            P.group12.group12Params,
            GROUP_12_Monitoring_Parameters,
          ),
          group13: makeGroupParamOps(
            P.group13.group13Params,
            GROUP_13_Maintenance_Parameters,
          ),
          group14: makeGroupParamOps(
            P.group14.group14Params,
            GROUP_14_PLC_Parameters,
          ),
          group15: makeGroupParamOps(
            P.group15.group15Params,
            GROUP_15_PLC_Monitoring_Parameters,
          ),
          group16: makeGroupParamOps(
            P.group16.group16Params,
            GROUP_16_LCD_Parameters,
          ),
          group17: makeGroupParamOps(
            P.group17.group17Params,
            GROUP_17_Automatic_Tuning_Parameters,
          ),
          group18: makeGroupParamOps(
            P.group18.group18Params,
            GROUP_18_Slip_Compensation_Parameters,
          ),
          group19: makeGroupParamOps(
            P.group19.group19Params,
            GROUP_19_Wobble_Frequency_Parameters,
          ),
          group20: makeGroupParamOps(
            P.group20.group20Params,
            GROUP_20_Speed_Control_Parameters,
          ),
          group21: makeGroupParamOps(
            P.group21.group21Params,
            GROUP_21_Torque_And_Position_Control_Parameters,
          ),
          group22: makeGroupParamOps(
            P.group22.group22Params,
            GROUP_22_PM_Motor_Parameters,
          ),
        },
      };
    }),
  },
) {}
