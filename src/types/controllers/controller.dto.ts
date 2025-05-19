export type CreateControllerDto = {
  serialNumber: string;
  firmwareVersion: string;
  ip?: string;
  checkpointId?: number;
  configurationId?: number;
  status?: string;
};

export type UpdateControllerDto = {
  checkpointId?: number;
  configurationId?: number;
  status?: string;
};
