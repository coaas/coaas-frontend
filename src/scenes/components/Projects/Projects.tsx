import { FC } from 'react';

import { LazyGrid } from '@components/LazyGrid';

import { SceneWithTabs } from '../SceneWithTabs';
import { useProjects } from './useProjects';
import { Table } from './Table';

export const Projects: FC = () => {
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    GridItem,
    dataCount,
    projects,
  } = useProjects();

  const buttonData = {
    title: 'Create project',
    onClick: () => {},
  };

  return (
    <SceneWithTabs
      button={buttonData}
      TableView={
        <Table
          isLoading={isFetching}
          isLoadingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          projects={projects}
        />
      }
      CardsView={
        <LazyGrid
          gap={16}
          minItemWidth={260}
          itemHeight={157}
          Item={GridItem}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          count={dataCount}
        />
      }
    />
  );
};
