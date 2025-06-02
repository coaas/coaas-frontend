import { Info } from '@globalTypes/templates.draft.get';

import { RequestParams, ResponseData } from './types';

// Database templates for the databases category
const databaseTemplates: Info[] = [
  {
    id: 'postgresql-template',
    name: 'PostgreSQL',
    description: 'PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development.',
    created_at: new Date().toISOString(),
    type: 1, // service type
    status: 1, // published status
    categories: ['databases'],
    languages: ['sql'],
    docs: '',
    author: {
      id: 'system',
      username: 'system',
    },
    downloads: 1250,
    stars: 98,
  },
  {
    id: 'mysql-template',
    name: 'MySQL',
    description: 'MySQL is an open-source relational database management system. Fast, reliable, and easy to use.',
    created_at: new Date().toISOString(),
    type: 1,
    status: 1,
    categories: ['databases'],
    languages: ['sql'],
    docs: '',
    author: {
      id: 'system',
      username: 'system',
    },
    downloads: 980,
    stars: 87,
  },
  {
    id: 'mongodb-template',
    name: 'MongoDB',
    description: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database.',
    created_at: new Date().toISOString(),
    type: 1,
    status: 1,
    categories: ['databases'],
    languages: ['javascript'],
    docs: '',
    author: {
      id: 'system',
      username: 'system',
    },
    downloads: 756,
    stars: 92,
  },
  {
    id: 'redis-template',
    name: 'Redis',
    description: 'Redis is an open source, in-memory data structure store, used as a database, cache, and message broker.',
    created_at: new Date().toISOString(),
    type: 1,
    status: 1,
    categories: ['databases'],
    languages: ['redis'],
    docs: '',
    author: {
      id: 'system',
      username: 'system',
    },
    downloads: 634,
    stars: 85,
  },
];

// Fallback templates for other categories
const defaultTemplates: Info[] = Array.from({ length: 10 }).map((_, index) => ({
  id: `template-${index + 1}`,
  name: `Service Template ${index + 1}`,
  description: `Description for service template ${index + 1}`,
  created_at: new Date().toISOString(),
  type: 1,
  status: 1,
  categories: ['general'],
  languages: ['docker'],
  docs: '',
  author: {
    id: 'system',
    username: 'system',
  },
  downloads: 100 + index * 10,
  stars: 50 + index * 5,
}));

export const getMockData = async ({
  category,
}: RequestParams): Promise<ResponseData> => {
  // Check if we're in the databases category
  const isDatabaseCategory = category === 'databases' || window.location.pathname.includes('/databases');
  const templates = isDatabaseCategory ? databaseTemplates : defaultTemplates;

  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    templates,
  };
};
