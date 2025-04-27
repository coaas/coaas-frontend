export enum Status {
  ACTIVE,
  LOADED,
  DIED,
  UNKNOWN,
}

export enum ClusterType {
  SERVERS,
  REGIONS,
}

export enum OrchEngine {
  DOCKER,
  KUBERNETES,
}

export type Instance = Record<'cpu' | 'ram' | 'memory', number> & {
  id: string;
  status: Status;
  service: Record<'id' | 'name' | 'description', string>;
};

export type Server = Record<
  'id' | 'region' | 'availability_zone' | 'provider' | 'name' | 'ip',
  string
> &
  Record<'cpu' | 'ram' | 'disk', number> & {
    instances: Instance[];
    status: Status;
    type: 1 | 0;
  };

export type Cluster = Record<
  | 'id'
  | 'name'
  | 'region'
  | 'availability_zone'
  | 'provider'
  | 'country'
  | 'city'
  | 'address',
  string
> & {
  servers: Server[];
};
