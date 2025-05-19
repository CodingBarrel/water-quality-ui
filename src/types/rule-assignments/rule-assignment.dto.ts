import { ParameterMap } from "./parameter-map";

export type CreateRuleAssignmentDto = {
  templateId: number;
  controllerId: number;
  parameterMap: ParameterMap;
  isEnabled: boolean;
};

export type UpdateRuleAssignmentDto = {
  templateId: number;
  controllerId: number;
  parameterMap: ParameterMap;
  isEnabled: boolean;
};
