import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData } from './utils';

export const useProjects = () => {
  const { namespace_slug } = useParams();

  const {
    data,
    isFetching,
    onChangeSearch,
    fetchNextPage,
    isFetchingNextPage,
  } = useData(namespace_slug);

  const { projects } = getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} projects={projects} />
  );

  const dataCount = projects.length;

  return {
    dataCount,
    isFetching,
    GridItem,
    fetchNextPage,
    isFetchingNextPage,
    projects,
    onChangeSearch,
  };
};
