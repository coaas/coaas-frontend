import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import { clusterKeys } from '../components/DataCenters/static.ts';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';

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
