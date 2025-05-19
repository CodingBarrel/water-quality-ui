import { Checkpoint } from "@/types/checkpoint";
import { createApiResource } from "./base/crud-factory";

export const checkpointsApi = {
  ...createApiResource<Checkpoint>("/checkpoints"),
};
