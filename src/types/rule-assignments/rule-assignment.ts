import { Controller } from "../controllers/controller";
import { RuleTemplate } from "../rule-templates/rule-template";
import { ParameterMap } from "./parameter-map";

export type RuleAssignment = {
  id: number;
  template: RuleTemplate;
  controller: Controller;
  parameterMap: ParameterMap;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};
