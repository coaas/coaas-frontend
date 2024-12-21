import { faker } from '@faker-js/faker';

const getNewData = () =>
  Array.from({ length: 1000 }).map(() => ({
    name: faker.string.alpha(15),
    description: faker.word.words(20),
    slug: faker.string.uuid(),
    members: faker.number.int(1000),
    scope: faker.helpers.arrayElement(['Personal', 'Work']),
    createdAt: faker.date.anytime(),
    isExpired: faker.helpers.arrayElement([true, false]),
  }));

const data = getNewData();

export const fetchData = async (start: number, size: number) => {
  const dbData = [...data];

  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    data: dbData.slice(start, start + size),
    totalRowsCount: dbData.length,
  };
};
