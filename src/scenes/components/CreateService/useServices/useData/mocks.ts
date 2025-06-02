import { CategoryData } from '@globalTypes/categories';

import { ResponseData } from './types';

const categories: CategoryData[] = [
  {
    key: 'web-applications',
    value: 'Web Applications',
  },
  {
    key: 'databases',
    value: 'Databases',
  },
  {
    key: 'messaging',
    value: 'Messaging & Queues',
  },
  {
    key: 'monitoring',
    value: 'Monitoring & Analytics',
  },
  {
    key: 'storage',
    value: 'Storage & File Systems',
  },
  {
    key: 'networking',
    value: 'Networking & Proxy',
  },
];

export const getMockData = async (): Promise<ResponseData> => {
  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    categories,
  };
};

export const getMockCategories = async (): Promise<ResponseData> => {
  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    categories,
  };
};
