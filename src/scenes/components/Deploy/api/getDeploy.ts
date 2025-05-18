import { queryOptions } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import clusters from './mock-cluster.json';
import { Cluster } from '../model/cluster.types.ts';

const DEPLOY_ENDPOINT = 'DeployService/GetProjectDeploy';
export type ClustersResponse = {
  type: number;
  orchestration_engine: number;
  clusters: Cluster[];
};
const getDeploy = () => {
  return IS_MOCK_ACTIVE
    ? new Promise<ClustersResponse>(r => {
        r(clusters as unknown as ClustersResponse);
      })
    : api.post(DEPLOY_ENDPOINT).json<ClustersResponse>();
};
export const clusterOptions = queryOptions({
  queryFn: getDeploy,
  queryKey: ['clusters'],
});
