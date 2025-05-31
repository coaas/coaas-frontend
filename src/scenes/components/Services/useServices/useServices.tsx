import { FC } from 'react';

import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData } from './utils';

export const useServices = () => {
  const {
    data,
    isFetching,
    onChangeSearch,
    fetchNextPage,
    isFetchingNextPage,
  } = useData();

  const { services } = getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} services={services} />
  );

  const dataCount = services.length;

  return {
    dataCount,
    isFetching,
    GridItem,
    fetchNextPage,
    isFetchingNextPage,
    services,
    onChangeSearch,
  };
};
