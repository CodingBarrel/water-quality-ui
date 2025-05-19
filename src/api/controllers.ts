import { createApiResource } from "@/api/base/crud-factory";
import { Controller } from "@/types/controllers/controller";
import { baseApi } from "./base/base-api";
import { CreateControllerDto } from "@/types/controllers/controller.dto";
import { UpdateControllerDto } from "@/types/controllers/controller.dto";

export const controllersApi = {
  ...createApiResource<Controller, CreateControllerDto, UpdateControllerDto>(
    "/controllers"
  ),

  getBySN: async (sn: string): Promise<Controller> => {
    console.log(`sending ${sn}`);
    const res = await baseApi.get(`/controllers/${sn}`);
    return res.data;
  },

  getStatuses: async (): Promise<string[]> => {
    const res = await baseApi.get("/controllers/statuses");
    return res.data;
  },
};
