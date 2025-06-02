import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { LazyGridItemProps } from '@components/LazyGrid';
import { useTourMode } from '../../../../utils/tourMode';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData } from './utils';

export const useServices = () => {
  const { namespace_slug, project_slug } = useParams();
  const { isActive: isTourMode, mockData } = useTourMode();

  const {
    data,
    isFetching,
    onChangeSearch,
    fetchNextPage,
    isFetchingNextPage,
  } = useData();

  // Use mock data in tour mode, otherwise use real data
  const { services } =
    isTourMode &&
    namespace_slug === 'tour-demo-workspace' &&
    project_slug === 'web-app'
      ? { services: mockData.getDemoServices() }
      : getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} services={services} />
  );

  const dataCount = services.length;

  return {
    dataCount,
    isFetching: isTourMode ? false : isFetching,
    GridItem,
    fetchNextPage,
    isFetchingNextPage: isTourMode ? false : isFetchingNextPage,
    services,
    onChangeSearch: isTourMode ? () => {} : onChangeSearch,
  };
};
