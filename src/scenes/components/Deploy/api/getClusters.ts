import clusters from './mock-deploy.json';
import { Cluster } from '@scenes/components/Deploy/model/types.ts';
import { queryOptions } from '@tanstack/react-query';

export type Clusters = {
  type: number;
  orchestration_engine: number;
  clusters: Cluster[];
};

const getClusters = () => {
  return new Promise<Clusters>(r => {
    r(clusters as unknown as Clusters);
  });
};

export const clusterOptions = queryOptions({
  queryFn: getClusters,
  queryKey: ['clusters'],
});
