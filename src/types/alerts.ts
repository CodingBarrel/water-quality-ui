import { Controller } from "./controllers/controller";

export type Alert = {
  id: number;
  message: string;
  level: string;
  controller: Controller;
  relatedData: Record<string, any>;
  createdAt: string;
  readAt: string;
};
