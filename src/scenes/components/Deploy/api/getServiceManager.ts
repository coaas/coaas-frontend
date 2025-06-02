import { queryOptions } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants.ts';

import { ServiceType } from '../model/service.types.ts';
import listServices from './mock-listServices.json';
import deployedServices from './mock-deployedServices.json';
import { executePages } from '../utils/pagination.ts';
import { Success, successMock } from '@scenes/components/Deploy/api/common.ts';
import { tourMode } from '@utils/tourMode.ts';

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

// Mock data for tour mode list services
const tourMockListServices = {
  services: [
    {
      id: 'svc-frontend',
      name: 'Frontend App',
      description: 'React frontend application',
      type: 1, // ServiceType.CUSTOM
      created_at: '2024-01-22T10:30:00Z',
    },
    {
      id: 'svc-backend',
      name: 'Backend API',
      description: 'Node.js REST API server',
      type: 1, // ServiceType.CUSTOM
      created_at: '2024-01-22T11:00:00Z',
    },
    {
      id: 'svc-database',
      name: 'PostgreSQL',
      description: 'PostgreSQL database',
      type: 0, // ServiceType.MANAGED
      created_at: '2024-01-22T11:30:00Z',
    },
    {
      id: 'svc-cache',
      name: 'Redis Cache',
      description: 'Redis cache service',
      type: 0, // ServiceType.MANAGED
      created_at: '2024-01-22T12:00:00Z',
    },
    {
      id: 'svc-monitoring',
      name: 'Monitoring Service',
      description: 'Application monitoring and alerting',
      type: 1, // ServiceType.CUSTOM
      created_at: '2024-01-22T12:30:00Z',
    },
  ],
  has_more: false,
  next_key: null,
};

export const getListServices = (
  after_key: null | Record<'id' | 'created_at', string> = null,
): Promise<ListServicesResponse> => {
  // Check if tour mode is active
  if (tourMode.isActive()) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(tourMockListServices as ListServicesResponse);
      }, 100);
    });
  }

  return IS_MOCK_ACTIVE
    ? new Promise(r => {
        r(listServices as ListServicesResponse);
      })
    : api
        .post(LIST_SERVICES_ENDPOINT, {
          body: JSON.stringify({
            query: '',
            filters: {
              types: [],
            },
            limit: 100,
            // after_key,
          }),
        })
        .json<ListServicesResponse>();
};

export const listServicesOptions = queryOptions({
  queryFn: () =>
    executePages<ListServicesResponse, typeof getListServices>(getListServices)
      .then(res => {
        return {
          services: res.flatMap(s => s.services),
        };
      })
      .catch(err => {
        console.log('sv err', err);
      }),
  queryKey: ['listServices'],
});

export const createListServicesOptions = (isTourMode: boolean) =>
  queryOptions({
    queryFn: () =>
      executePages<ListServicesResponse, typeof getListServices>(
        getListServices,
      )
        .then(res => {
          return {
            services: res.flatMap(s => s.services),
          };
        })
        .catch(err => {
          console.log('sv err', err);
        }),
    queryKey: ['listServices', isTourMode],
  });

const DEPLOYED_SERVICES_ENDPOINT = 'DeployService/GetDeployedServices';
export type DeployedServicesResponse = {
  services: Service[];
};

// Mock data for tour mode deployed services
const tourMockDeployedServices = {
  services: [
    {
      id: 'svc-frontend',
      name: 'Frontend App',
      description: 'React frontend application',
      type: 1, // ServiceType.CUSTOM
      created_at: '2024-01-22T10:30:00Z',
    },
    {
      id: 'svc-backend',
      name: 'Backend API',
      description: 'Node.js REST API server',
      type: 1, // ServiceType.CUSTOM
      created_at: '2024-01-22T11:00:00Z',
    },
    {
      id: 'svc-database',
      name: 'PostgreSQL',
      description: 'PostgreSQL database',
      type: 0, // ServiceType.MANAGED
      created_at: '2024-01-22T11:30:00Z',
    },
  ],
};

export const getDeployedServices = (): Promise<DeployedServicesResponse> => {
  // Check if tour mode is active
  if (tourMode.isActive()) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(tourMockDeployedServices as DeployedServicesResponse);
      }, 100);
    });
  }

  return IS_MOCK_ACTIVE
    ? new Promise(r => {
        r(deployedServices as DeployedServicesResponse);
      })
    : api
        .post(DEPLOYED_SERVICES_ENDPOINT, { body: JSON.stringify({}) })
        .json<DeployedServicesResponse>();
};

export const deployedServicesOptions = queryOptions({
  queryFn: getDeployedServices,
  queryKey: ['deployedServices'],
});

export const createDeployedServicesOptions = (isTourMode: boolean) =>
  queryOptions({
    queryFn: getDeployedServices,
    queryKey: ['deployedServices', isTourMode],
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
