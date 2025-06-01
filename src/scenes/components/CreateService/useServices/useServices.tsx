import { FC } from 'react';

import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';

export const useServices = () => {
  const { categories, isFetching } = useData();

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} categories={categories} />
  );

  const dataCount = categories.length;

  return {
    dataCount,
    isFetching,
    GridItem,
  };
};
