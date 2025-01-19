import { FC, useState } from 'react';

import { LazyGrid } from '@components/LazyGrid';

import { Table, Modal } from './components';
import { useNamespaces } from './useNamespaces';
import { SceneWithTabs } from '../SceneWithTabs';

export const Namespaces: FC = () => {
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    GridItem,
    dataCount,
    namespaces,
    onFormSubmit,
  } = useNamespaces();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCreateNamespaceBtnClick = () => setIsModalOpen(true);

  const buttonData = {
    title: 'Create namespace',
    onClick: onCreateNamespaceBtnClick,
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onIsOpenChange={setIsModalOpen}
        onFormSubmit={onFormSubmit}
      />
      <SceneWithTabs
        button={buttonData}
        TableView={
          <Table
            isLoading={isFetching}
            isLoadingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            namespaces={namespaces}
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
    </>
  );
};
