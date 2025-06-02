import { faker } from '@faker-js/faker';
import { tourMode } from '../../../../../utils/tourMode';

import { Invitation } from './types';
import { RequestParams, ResponseData } from './types';

const invitations: Invitation[] = (() =>
  Array.from({ length: 50 }).map(() => ({
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    expires_at: faker.date.future().toISOString(),
  })))();

export const getMockData = async ({
  after,
  limit = 20,
}: RequestParams): Promise<ResponseData> => {
  const dbInvitations = [...invitations];

  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 1500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const firstNewItemIdx =
    (dbInvitations.findIndex(({ id }) => id === after?.id) || -1) + 1;
  const hasMore = firstNewItemIdx + limit < dbInvitations.length;
  const newPageInvitations = dbInvitations.slice(
    firstNewItemIdx,
    firstNewItemIdx + limit,
  );

  const nextItem = newPageInvitations[newPageInvitations.length - 1];

  return {
    invitations: newPageInvitations,
    hasMore,
    nextKey: {
      id: nextItem.id,
      joined_at: nextItem.expires_at,
    },
  };
};
