import { FC, useState } from 'react';

import { Button } from '@components/Button';
import { LazyGrid } from '@components/LazyGrid';
import { Tabs, TabsType } from '@components/Tabs';

import { Table, Modal } from './components';
import { TabId, useNamespaces } from './useNamespaces';

export const Namespaces: FC = () => {
  const {
    tabsProps,
    containerRef,
    currentTab,
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onIsOpenChange={setIsModalOpen}
        onFormSubmit={onFormSubmit}
      />
      <section className="p-10 flex justify-center">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <Button onClick={onCreateNamespaceBtnClick}>
              Create namespace
            </Button>
            <Tabs {...tabsProps} type={TabsType.icon} />
          </div>
          <div className="mt-6" ref={containerRef}>
            {currentTab.id === TabId.tableView ? (
              <Table
                isLoading={isFetching}
                isLoadingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                namespaces={namespaces}
              />
            ) : (
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};
