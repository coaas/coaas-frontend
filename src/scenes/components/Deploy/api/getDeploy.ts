import { queryOptions } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import clusters from './mock-cluster.json';
import { Cluster, OrchEngine } from '../model/cluster.types.ts';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';
import { ServerType } from '@scenes/components/Deploy/model/dataCenter.types.ts';

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

const DEPLOY_ENDPOINT_ADD = 'DeployService/AddProjectDeploy';
export type AddProjectDeployRequest = {
  type: ServerType;
  orchestration_engine: OrchEngine;
};
export const addProjectDeploy = (body: AddProjectDeployRequest) =>
  IS_MOCK_ACTIVE
    ? successMock(`Project deploy added successfully, ${JSON.stringify(body)}`)
    : api
        .post<Success>(DEPLOY_ENDPOINT_ADD, { body: JSON.stringify(body) })
        .json();
