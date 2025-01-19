import { faker } from '@faker-js/faker';

import { ProjectData } from '@globalTypes/projects';

import { RequestParams, ResponseData } from './types';

const projects: ProjectData[] = (() =>
  Array.from({ length: 50 }).map(() => ({
    name: faker.string.alpha(15),
    description: faker.word.words(20),
    slug: faker.string.uuid(),
    membersCount: faker.number.int(1000),
    createdAt: faker.date.anytime().toISOString(),
    id: faker.string.uuid(),
  })))();

export const getMockData = async ({
  after,
  limit = 20,
}: RequestParams): Promise<ResponseData> => {
  const dbProjects = [...projects];

  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 1500));

  const firstNewItemIdx =
    (dbProjects.findIndex(({ id }) => id === after?.id) || -1) + 1;
  const hasMore = firstNewItemIdx + limit < dbProjects.length;
  const newPageProjects = dbProjects.slice(
    firstNewItemIdx,
    firstNewItemIdx + limit,
  );

  const nextItem = newPageProjects[newPageProjects.length - 1];

  return {
    projects: newPageProjects,
    hasMore,
    nextKey: {
      id: nextItem.id,
      createdAt: nextItem.createdAt,
    },
  };
};
