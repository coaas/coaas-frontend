import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import { clusterKeys } from '../components/DataCenters/static.ts';

const DEPLOY_SERVICE_ENDPOINT = 'DeployService/AddProjectDeployCluster';
type ProjectDeployClusterRequest = Record<
  (typeof clusterKeys)[number],
  string | null
>;
type Success = { success: boolean };
export const addProjectDeployCluster = (data: ProjectDeployClusterRequest) =>
  IS_MOCK_ACTIVE
    ? new Promise<Success>(r => {
        console.log('add project', data);
        r({ success: true });
      })
    : api
        .post(DEPLOY_SERVICE_ENDPOINT, { body: JSON.stringify(data) })
        .json<Success>();
