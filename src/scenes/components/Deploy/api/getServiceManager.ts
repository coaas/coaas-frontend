import { queryOptions } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import { ServiceType } from '../model/service.types.ts';
import listServices from './mock-listServices.json';
import deployedServices from './mock-deployedServices.json';
import { executePages } from '../utils/pagination.ts';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';

type Service = {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  created_at: string;
};

const LIST_SERVICES_ENDPOINT = 'ServicesManager/ListServices';
export type ListServicesResponse = {
  services: Service[];
  has_more: boolean;
  next_key: {
    id: string;
    created_at: string;
  } | null;
};
export const getListServices = (
  after_key: null | Record<'id' | 'created_at', string> = null,
): Promise<ListServicesResponse> => {
  return IS_MOCK_ACTIVE
    ? new Promise(r => {
        r(listServices as ListServicesResponse);
      })
    : api(LIST_SERVICES_ENDPOINT, {
        body: JSON.stringify({
          query: '',
          filters: {
            types: [0, 1],
          },
          limit: 100,
          after_key,
        }),
      }).json<ListServicesResponse>();
};
export const listServicesOptions = queryOptions({
  queryFn: () =>
    executePages<ListServicesResponse, typeof getListServices>(
      getListServices,
    ).then(res => {
      return {
        services: res.flatMap(s => s.services),
      };
    }),
  queryKey: ['listServices'],
});

const DEPLOYED_SERVICES_ENDPOINT = 'DeployService/GetDeployedServices';
export type DeployedServicesResponse = {
  services: Service[];
};
export const getDeployedServices = (): Promise<DeployedServicesResponse> => {
  return IS_MOCK_ACTIVE
    ? new Promise(r => {
        r(deployedServices as DeployedServicesResponse);
      })
    : api.post(DEPLOYED_SERVICES_ENDPOINT, { body: JSON.stringify({}) }).json<DeployedServicesResponse>();
};
export const deployedServicesOptions = queryOptions({
  queryFn: getDeployedServices,
  queryKey: ['deployedServices'],
});

const DEPLOY_SERVICE_ENDPOINT = 'DeployService/DeployService';
export const deployService = (service_id: string): Promise<Success> =>
  IS_MOCK_ACTIVE
    ? successMock(`deploy service ${service_id}`)
    : api
        .post<Success>(DEPLOY_SERVICE_ENDPOINT, {
          body: JSON.stringify({ service_id }),
        })
        .json();
