import { DeviceFunction } from "@/types/device-function";
import { createApiResource } from "./base/crud-factory";

export const deviceFunctionsApi = {
  ...createApiResource<DeviceFunction>("/device-functions"),
};
