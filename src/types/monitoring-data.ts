export type Reading = {
  localId: string;
  parameter: string | null;
  value: number;
  unit?: string;
  timestamp: string;
};

export type MonitoringCheckpoint = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  readings: Reading[];
};
