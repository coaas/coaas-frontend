import { queryOptions } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import clusters from './mock-cluster.json';
import { Cluster, ClusterType, OrchEngine } from '../model/cluster.types.ts';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';
import { tourMode, mockDeployData } from '@utils/tourMode.ts';

const DEPLOY_ENDPOINT = 'DeployService/GetProjectDeploy';
export type ClustersResponse = {
  type: number;
  orchestration_engine: number;
  clusters: Cluster[];
};

const getDeploy = () => {
  // Check if tour mode is active
  if (tourMode.isActive()) {
    return new Promise<ClustersResponse>(resolve => {
      // Add a short delay to simulate API call during tour
      setTimeout(() => {
        resolve(mockDeployData as ClustersResponse);
      }, 100);
    });
  }

  return IS_MOCK_ACTIVE
    ? new Promise<ClustersResponse>(r => {
        r(clusters as unknown as ClustersResponse);
      })
    : api
        .post(DEPLOY_ENDPOINT, { 
          body: JSON.stringify({}),
          timeout: 60000 // 60 seconds timeout
        })
        .json<ClustersResponse>();
};

export const clusterOptions = queryOptions({
  queryFn: getDeploy,
  queryKey: ['clusters'],
});

// Function to create cluster options with tour mode support
export const createClusterOptions = (isTourMode: boolean) =>
  queryOptions({
    queryFn: getDeploy,
    queryKey: ['clusters', isTourMode],
  });

const DEPLOY_ENDPOINT_ADD = 'DeployService/AddProjectDeploy';
export type AddProjectDeployRequest = {
  type: ClusterType;
  orchestration_engine: OrchEngine;
};
export const addProjectDeploy = (body: AddProjectDeployRequest) =>
  IS_MOCK_ACTIVE
    ? successMock(`Project deploy added successfully, ${JSON.stringify(body)}`)
    : api
        .post<Success>(DEPLOY_ENDPOINT_ADD, { body: JSON.stringify(body) })
        .json();
