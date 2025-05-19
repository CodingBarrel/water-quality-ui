import { Configuration } from "@/types/configuration";
import { Checkpoint } from "../checkpoint";

export type Controller = {
  id: number;
  serialNumber: string;
  firmwareVersion: string;
  ip?: string;
  checkpoint?: Checkpoint;
  configuration?: Configuration;
  status: any;
  createdAt: string;
  updatedAt: string;
  lastSyncedAt?: string;
};
