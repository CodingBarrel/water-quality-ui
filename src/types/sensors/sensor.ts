import { Controller } from "../controllers/controller"
import { SensorParameter } from "../sensor-parameter"

export type Sensor = {
    id: number,
    localId: string,
    parameter?: SensorParameter,
    pin: string,
    delayMS: number,
    isEnabled: boolean,
    controller: Controller
}