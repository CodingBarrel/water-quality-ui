import { createApiResource } from "./base/crud-factory";
import { Command } from "@/types/commands";

export const commandsApi = {
  ...createApiResource<Command>("/commands"),
};
