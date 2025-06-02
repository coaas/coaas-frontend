import { FC } from 'react';

import { LazyGridItemProps } from '@components/LazyGrid';
import { useTourMode } from '../../../../utils/tourMode';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData, useCreateNamespace } from './utils';

export const useNamespaces = () => {
  const { isActive: isTourMode, mockData } = useTourMode();

  const {
    data,
    isFetching,
    onChangeSearch,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
  } = useData();

  // Use mock data in tour mode, otherwise use real data
  const { namespaces } = isTourMode
    ? { namespaces: mockData.namespaces }
    : getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} namespaces={namespaces} />
  );

  const dataCount = namespaces.length;

  const { onFormSubmit } = useCreateNamespace({ refetch });

  // Mock form submit in tour mode
  const handleFormSubmit = isTourMode
    ? async (formData: any) => {
        // Simulate form submission in tour mode
        await mockData.createNamespace(formData.name, formData.description);
        return Promise.resolve();
      }
    : onFormSubmit;

  return {
    dataCount,
    isFetching: isTourMode ? false : isFetching, // No loading in tour mode
    GridItem,
    fetchNextPage,
    isFetchingNextPage: isTourMode ? false : isFetchingNextPage,
    namespaces,
    onFormSubmit: handleFormSubmit,
    onChangeSearch: isTourMode ? () => {} : onChangeSearch, // Disable search in tour mode
  };
};
