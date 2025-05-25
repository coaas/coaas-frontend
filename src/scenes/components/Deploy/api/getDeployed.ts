import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';
import { queryOptions } from '@tanstack/react-query';
import {
  DeployedService,
  DeployMode,
} from '@scenes/components/Deploy/model/deployed.types.ts';
import mockDeployedService from './mock-deployedService.json';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';

const DEPLOYED_ENDPOINT = 'DeployService/GetDeployedService';
export const getDeployedService = (
  service_id: string,
): Promise<DeployedService> =>
  IS_MOCK_ACTIVE
    ? new Promise<DeployedService>(r => {
        r(mockDeployedService as unknown as DeployedService);
      })
    : api
        .post<DeployedService>(DEPLOYED_ENDPOINT, {
          body: JSON.stringify({ service_id }),
        })
        .then(res => res.json());

export const deployedOptions = (serviceId: string) =>
  queryOptions({
    queryFn: () => getDeployedService(serviceId),
    queryKey: ['getDeployedService', serviceId],
  });

const DEPLOY_SERVICE_ENDPOINT = 'DeployService/AddServiceClusterDeployInfo';
export const addServiceClusterDeployInfo = (body: {
  cluster_id: string;
  service_id: string;
  mode: DeployMode;
}) =>
  IS_MOCK_ACTIVE
    ? successMock(`add service cluster deploy info ${JSON.stringify(body)}`)
    : api
        .post<Success>(DEPLOY_SERVICE_ENDPOINT, {
          body: JSON.stringify(body),
        })
        .json();

const ADD_DEPLOY_RULE_ENDPOINT = 'DeployService/AddDeployRule';
type AddDeployRuleRequest = {
  cluster_id: string;
  service_id: string;
  fixed_rule: {
    server_id: string;
    replicas: number;
    cpu: number;
    ram: number;
    disk: number;
  };
};
export const addDeployRule = (body: AddDeployRuleRequest) =>
  IS_MOCK_ACTIVE
    ? successMock(`add deploy rule ${JSON.stringify(body)}`)
    : api
        .post<Success>(ADD_DEPLOY_RULE_ENDPOINT, { body: JSON.stringify(body) })
        .json();
