import { createApiResource } from "@/api/base/crud-factory";
import { Configuration } from "@/types/configuration";

export const configurationsApi = {
  ...createApiResource<Configuration>("/configurations"),
};
