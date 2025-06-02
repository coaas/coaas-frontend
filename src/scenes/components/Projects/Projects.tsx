import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@components/Button';
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
    onChangeSearch,
  } = useProjects();

  return (
    <SceneWithTabs
      onChangeSearch={onChangeSearch}
      searchPlaceholder="Search projects"
      tourGridId="projects-grid"
      Button={
        <NavLink to="create" data-tour="create-project-btn">
          <Button>Create project</Button>
        </NavLink>
      }
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
