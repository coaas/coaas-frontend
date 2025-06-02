import { faker } from '@faker-js/faker';
import { tourMode } from '../../../../../utils/tourMode';

import { MemberData } from '@globalTypes/members';

import { RequestParams, ResponseData } from './types';

const members: MemberData[] = (() =>
  Array.from({ length: 50 }).map(() => ({
    user: {
      first_name: faker.string.alpha(15),
      last_name: faker.string.alpha(15),
      username: faker.string.uuid(),
      email: faker.string.alpha(20),
      id: faker.string.uuid(),
    },
    joined_at: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
    is_fired: faker.datatype.boolean(),
  })))();

export const getMockData = async ({
  after,
  limit = 20,
}: RequestParams): Promise<ResponseData> => {
  const dbMembers = [...members];

  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 1500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const firstNewItemIdx =
    (dbMembers.findIndex(({ id }) => id === after?.id) || -1) + 1;
  const hasMore = firstNewItemIdx + limit < dbMembers.length;
  const newPageMembers = dbMembers.slice(
    firstNewItemIdx,
    firstNewItemIdx + limit,
  );

  const nextItem = newPageMembers[newPageMembers.length - 1];

  return {
    members: newPageMembers,
    hasMore,
    nextKey: {
      id: nextItem.id,
      joined_at: nextItem.joined_at,
    },
  };
};
