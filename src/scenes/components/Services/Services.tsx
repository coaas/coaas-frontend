import { FC } from 'react';

import { LazyGrid } from '@components/LazyGrid';
import { Button } from '@components/Button';

import { SceneWithTabs } from '../SceneWithTabs';
import { Table } from './components';
import { useServices } from './useServices';
import { useNavigate } from 'react-router-dom';

export const Services: FC = () => {
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    GridItem,
    dataCount,
    services,
    onChangeSearch,
  } = useServices();

  const navigate = useNavigate();

  const onCreateServiceBtnClick = () => navigate('new');

  return (
    <SceneWithTabs
      onChangeSearch={onChangeSearch}
      searchPlaceholder="Search services"
      Button={<Button onClick={onCreateServiceBtnClick}>Create service</Button>}
      TableView={
        <Table
          isLoading={isFetching}
          isLoadingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          services={services}
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
