import { baseApi } from "@/api/base/base-api";
import { Sensor } from "@/types/sensors/sensor";
import { createApiResource } from "./base/crud-factory";

export const sensorsApi = {
  ...createApiResource<Sensor>("/sensors"),
  // READ all by controller sn
  getByControllerSN: async (sn: string): Promise<Sensor[]> => {
    const res = await baseApi.get(`/controllers/${sn}/sensors`);
    return res.data;
  },
  getByControllerSNAndLocalId: async (
    sn: string,
    localId: string
  ): Promise<Sensor> => {
    const res = await baseApi.get(`/controllers/${sn}/sensors/${localId}`);
    return res.data;
  },

  // UPDATE by controller sn
  updateByControllerSNAndLocalId: async (
    sn: string,
    localId: string,
    data: Partial<Sensor>
  ) => {
    const res = await baseApi.patch(
      `/controllers/${sn}/sensors/${localId}`,
      data
    );
    return res.data;
  },
};
