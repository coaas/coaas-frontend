import { faker } from '@faker-js/faker';
import { tourMode } from '../../../../../utils/tourMode';

import { ServiceData } from '@globalTypes/services';

import { RequestParams, ResponseData } from './types';

const services: ServiceData[] = (() =>
  Array.from({ length: 50 }).map(() => ({
    name: faker.string.alpha(15),
    description: faker.word.words(20),
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
  })))();

export const getMockData = async ({
  after,
  limit = 20,
}: RequestParams): Promise<ResponseData> => {
  const dbServices = [...services];

  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 1500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const firstNewItemIdx =
    (dbServices.findIndex(({ id }) => id === after?.id) || -1) + 1;
  const hasMore = firstNewItemIdx + limit < dbServices.length;
  const newPageServices = dbServices.slice(
    firstNewItemIdx,
    firstNewItemIdx + limit,
  );

  return {
    services: newPageServices,
    hasMore,
    nextKey: {
      id: newPageServices[newPageServices.length - 1].id,
    },
  };
};
