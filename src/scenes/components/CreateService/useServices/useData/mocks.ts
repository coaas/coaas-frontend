import { CategoryData } from '@globalTypes/categories';
import { tourMode } from '../../../../../utils/tourMode';

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
  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  return {
    categories,
  };
};

export const getMockCategories = async (): Promise<ResponseData> => {
  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  return {
    categories,
  };
};
