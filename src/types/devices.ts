import { Controller } from "./controllers/controller";
import { DeviceFunction } from "./device-function";

export type Device = {
  id: number;
  localId: string;
  pin: string;
  function: DeviceFunction;
  controller: Controller;
  isEnabled: boolean;
};
