import {
  CreateRuleAssignmentDto,
  UpdateRuleAssignmentDto,
} from "@/types/rule-assignments/rule-assignment.dto";
import { createApiResource } from "./base/crud-factory";
import { RuleAssignment } from "@/types/rule-assignments/rule-assignment";

export const ruleAssignmentsApi = {
  ...createApiResource<
    RuleAssignment,
    CreateRuleAssignmentDto,
    UpdateRuleAssignmentDto
  >("/rule-assignments"),
};
