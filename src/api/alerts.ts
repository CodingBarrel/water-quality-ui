import { baseApi } from "./base/base-api";
import { createApiResource } from "./base/crud-factory";
import { Alert } from "@/types/alerts";

export const alertsApi = {
  ...createApiResource<Alert>("/alerts"),

    updateSeenAt: async (id: number): Promise<Alert> => {
      const res = await baseApi.patch(`/alerts/${id}`);
      return res.data;
    },
};
