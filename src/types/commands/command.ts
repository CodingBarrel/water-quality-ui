import { Controller } from "@/types/controllers/controller";

export type Command = {
  id: number;
  deviceLocalId: string;
  level: number;
  action: string;
  delaysMs: number;
  controller: Controller;
  createdAt: string;
  sentAt: string;
};
