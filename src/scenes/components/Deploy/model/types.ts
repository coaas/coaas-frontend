export enum Status {
  ACTIVE,
  LOADED,
  DIED,
  UNKNOWN,
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
  Record<'type' | 'cpu' | 'ram' | 'disk', number> & {
    instances: Instance[];
    status: Status;
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
