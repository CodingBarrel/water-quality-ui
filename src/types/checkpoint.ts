export type Checkpoint = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
};
