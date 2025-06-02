import { faker } from '@faker-js/faker';
import { tourMode } from '../../../../../utils/tourMode';

import { NamespaceData } from '@globalTypes/namespaces';

import { RequestParams, ResponseData } from './types';

const namespaces: NamespaceData[] = (() =>
  Array.from({ length: 50 }).map(() => ({
    name: faker.string.alpha(15),
    description: faker.word.words(20),
    slug: faker.string.uuid(),
    members_count: faker.number.int(1000),
    created_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
  })))();

export const getMockData = async ({
  after,
  limit = 20,
}: RequestParams): Promise<ResponseData> => {
  const dbNamespaces = [...namespaces];

  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 1500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const firstNewItemIdx =
    (dbNamespaces.findIndex(({ id }) => id === after?.id) || -1) + 1;
  const hasMore = firstNewItemIdx + limit < dbNamespaces.length;
  const newPageNamespaces = dbNamespaces.slice(
    firstNewItemIdx,
    firstNewItemIdx + limit,
  );

  return {
    namespaces: newPageNamespaces,
    hasMore,
    nextKey: {
      id: newPageNamespaces[newPageNamespaces.length - 1].id,
    },
  };
};
