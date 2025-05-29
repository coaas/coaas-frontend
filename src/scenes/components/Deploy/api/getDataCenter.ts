import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';
import mockClusterNodes from './mock-clusterNodes.json';
import mockToken from './mock-jsonToke.json';

import { clusterKeys } from '../components/DataCenters/static.ts';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';
import {
  ServerRole,
  ServerType,
} from '@scenes/components/Deploy/model/dataCenter.types.ts';
import { queryOptions } from '@tanstack/react-query';

const DEPLOY_SERVICE_ENDPOINT = 'DeployService/AddProjectDeployCluster';
type ProjectDeployClusterRequest = Record<
  (typeof clusterKeys)[number],
  string | null
>;
export const addProjectDeployCluster = (data: ProjectDeployClusterRequest) =>
  IS_MOCK_ACTIVE
    ? successMock(`add project ${JSON.stringify(data)}`)
    : api
        .post<Success>(DEPLOY_SERVICE_ENDPOINT, { body: JSON.stringify(data) })
        .json();

type Optional<T> = T | null;
const ADD_SERVER_TO_CLUSTER_ENDPOINT = 'DeployService/AddServerToCluster';
type AddServerToClusterRequest = {
  cluster_id: string;
  type: ServerType;
  region: string;
  availability_zone: Optional<string>;
  provider: Optional<string>;
  name: string;
  ip: string;
  cpu: number;
  ram: number;
  disk: number;
  docker_engine: {
    is_manager: boolean;
    docker_api: Optional<{
      url: string;
      token: string;
    }>;
    node_id: Optional<string>;
  };
};
export const addServerToCluster = (body: AddServerToClusterRequest) =>
  IS_MOCK_ACTIVE
    ? successMock(`add server to cluster ${JSON.stringify(body)}`)
    : api
        .post<Success>(ADD_SERVER_TO_CLUSTER_ENDPOINT, {
          body: JSON.stringify(body),
        })
        .json();

const GET_CLUSTER_NODES_ENDPOINT = 'DockerManager/GetClusterNewNodes';
export type GetClusterNodesResponse = {
  new_nodes: Record<
    'node_id' | 'hostname' | 'status' | 'availability' | 'role',
    string
  >[];
};
export const getClusterNodes = (cluster_id: string) =>
  IS_MOCK_ACTIVE
    ? new Promise<GetClusterNodesResponse>(resolve => {
        console.log('sv getClusterNodes', cluster_id);
        resolve(mockClusterNodes as GetClusterNodesResponse);
      })
    : api
        .post<GetClusterNodesResponse>(GET_CLUSTER_NODES_ENDPOINT, {
          body: JSON.stringify({ cluster_id }),
        })
        .json();
export const clusterNodesOptions = (clusterId?: string) =>
  queryOptions({
    queryFn: () => getClusterNodes(clusterId ?? ''),
    queryKey: ['clusterNodes', clusterId],
    enabled: !!clusterId,
  });

const GET_CLUSTER_JSON_TOKEN_ENDPOINT = 'DockerManager/GetClusterJoinNodeToken';
export const getClusterJsonToken = (body: {
  cluster_id: string;
  role: ServerRole;
}) =>
  IS_MOCK_ACTIVE
    ? new Promise<{ value: string }>(r => {
        r(mockToken);
      })
    : api
        .post<{
          value: string;
        }>(GET_CLUSTER_JSON_TOKEN_ENDPOINT, { body: JSON.stringify(body) })
        .json();
