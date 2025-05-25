import { ServiceType } from './service.types.ts';
import { Instance } from './cluster.types.ts';

export enum DeployMode {
  FIXED = 0,
  AUTO_SELECTION = 1,
  AUTO_SCALE = 2,
}

type Optional<T> = T | null;
export type FixedRule = {
  id: Optional<string>;
  node: {
    id: string;
    name: string;
    region: string;
  };
  replicas: number;
  cpu: number;
  ram: number;
  disk: number;
};

export type DeployedService = {
  info: {
    type: ServiceType;
  } & Record<'id' | 'name' | 'description' | 'created_at', string>;
  clusters: [
    {
      info: Record<
        'availability_zone' | 'provider' | 'country' | 'city' | 'address',
        Optional<string>
      > &
        Record<'id' | 'name' | 'region', string>;
      mode: DeployMode;
      instances: Instance[];
      fixed_rules: {
        rules: FixedRule[];
      };
      selection_deploy_rule: {
        id: Optional<string>;
      } & Record<'replicas' | 'cpu' | 'ram' | 'disk', number>;
      auto_scale_rule: {
        id: Optional<string>;
        vertical_scaling: boolean;
        horizontal_scaling: boolean;
        minimum_replicas: number;
        maximum_replicas: Optional<number>;
      };
    },
  ];
};
