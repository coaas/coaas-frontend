import { FC } from 'react';

import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';

export const useServices = () => {
  const { templates, isFetching } = useData();

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} templates={templates} />
  );

  const dataCount = templates.length;

  return {
    dataCount,
    isFetching,
    GridItem,
  };
};
