import { GetDraftTemplateResponse } from '@globalTypes/templates.draft.get';
import { tourMode } from '../../../../../utils/tourMode';

import { RequestParams } from './types';

// Mock data for PostgreSQL template
const postgresqlTemplateData: GetDraftTemplateResponse = {
  info: {
    id: 'postgresql-template',
    name: 'PostgreSQL',
    description:
      'PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development.',
    created_at: new Date().toISOString(),
    type: 1,
    status: 1,
    categories: ['databases'],
    languages: ['sql'],
    docs: 'https://www.postgresql.org/docs/',
    author: {
      id: 'system',
      username: 'system',
    },
    downloads: 1250,
    stars: 98,
  },
  managed: {
    url: 'postgres:15-alpine',
    versions: ['15', '14', '13', '12'],
  },
  custom: {
    dockerfiles: {
      development: '',
      test: '',
      production: '',
    },
  },
  settings: {
    secrets: [{ name: 'POSTGRES_PASSWORD' }, { name: 'POSTGRES_USER' }],
    configs: [{ path: '/etc/postgresql/postgresql.conf' }],
    env_vars: [
      { key: 'POSTGRES_DB', value: 'myapp_db' },
      { key: 'POSTGRES_USER', value: 'postgres' },
      { key: 'POSTGRES_PASSWORD', value: 'secure_password' },
    ],
    ports: ['5432'],
    health_check: {
      test: 'pg_isready -U postgres',
      interval: 30,
      timeout: 10,
      retries: 3,
      start_period: 40,
    },
    deployment: {
      restart_policy: {
        condition: 1,
        delay: 5,
        max_attempts: 3,
        window: 120,
      },
      update_config: {
        parallelism: 1,
        delay: 10,
        monitor: 10,
        max_failure_ratio: 0.3,
        order: 1,
        failure_action: 1,
      },
      rollback_config: {
        parallelism: 1,
        delay: 0,
        monitor: 10,
        max_failure_ratio: 0,
        order: 1,
        failure_action: 1,
      },
    },
  },
  dependencies: [],
  mapper: {
    type: 1,
    custom: {
      blocks: [
        {
          name: 'Database Configuration',
          fields: [
            {
              type: 1,
              label: 'Database Name',
              placeholder: 'Enter database name',
              variable: 'POSTGRES_DB',
            },
            {
              type: 1,
              label: 'Username',
              placeholder: 'Enter username',
              variable: 'POSTGRES_USER',
            },
            {
              type: 2,
              label: 'Password',
              placeholder: 'Enter password',
              variable: 'POSTGRES_PASSWORD',
            },
          ],
        },
      ],
    },
    external: {
      url: '',
    },
  },
};

export const getMockData = async ({
  id,
}: RequestParams): Promise<GetDraftTemplateResponse> => {
  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Return PostgreSQL template data for tour
  if (id === 'postgresql-template') {
    return postgresqlTemplateData;
  }

  // Fallback for other templates
  return {
    ...postgresqlTemplateData,
    info: {
      ...postgresqlTemplateData.info,
      id: id || 'unknown-template',
      name: 'Generic Template',
      description: 'A generic service template',
    },
  };
};
