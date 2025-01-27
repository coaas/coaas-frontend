import { FC } from 'react';

import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData, useCreateNamespace } from './utils';

export const useNamespaces = () => {
  const {
    data,
    isFetching,
    onChangeSearch,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = useData();

  const { namespaces } = getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} namespaces={namespaces} />
  );

  const dataCount = namespaces.length;

  const { onFormSubmit } = useCreateNamespace({ refetch });

  return {
    dataCount,
    isFetching,
    GridItem,
    fetchNextPage,
    isFetchingNextPage,
    namespaces,
    onFormSubmit,
    onChangeSearch,
  };
};
