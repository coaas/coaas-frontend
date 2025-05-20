export enum ServiceType {
  MANAGED,
  CUSTOM,
}

export type Service = {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  created_at: string;
};
