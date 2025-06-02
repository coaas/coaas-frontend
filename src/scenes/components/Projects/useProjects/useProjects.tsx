import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { LazyGridItemProps } from '@components/LazyGrid';
import { useTourMode } from '../../../../utils/tourMode';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData } from './utils';

export const useProjects = () => {
  const { namespace_slug } = useParams();
  const { isActive: isTourMode, mockData } = useTourMode();

  const {
    data,
    isFetching,
    onChangeSearch,
    fetchNextPage,
    isFetchingNextPage,
  } = useData(namespace_slug);

  // Use mock data in tour mode, otherwise use real data
  const { projects } =
    isTourMode && namespace_slug === 'tour-demo-workspace'
      ? { projects: mockData.getDemoProjects() }
      : getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} projects={projects} />
  );

  const dataCount = projects.length;

  return {
    dataCount,
    isFetching: isTourMode ? false : isFetching,
    GridItem,
    fetchNextPage,
    isFetchingNextPage: isTourMode ? false : isFetchingNextPage,
    projects,
    onChangeSearch: isTourMode ? () => {} : onChangeSearch,
  };
};
