import { RuleTemplate } from "@/types/rule-templates/rule-template";
import { createApiResource } from "./base/crud-factory";
import { baseApi } from "./base/base-api";

export const ruleTemplatesApi = {
  ...createApiResource<RuleTemplate>("/rule-templates"),

    getParameters: async (id: number): Promise<{ sensors: string[]; devices: string[] }> => {
      const res = await baseApi.get(`/rule-templates/${id}/parameters`);
      return res.data;
    },
};
