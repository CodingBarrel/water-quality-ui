import { SensorParameter } from "@/types/sensor-parameter";
import { createApiResource } from "./base/crud-factory";

export const sensorParametersApi = {
  ...createApiResource<SensorParameter>("/sensor-parameters"),
};
