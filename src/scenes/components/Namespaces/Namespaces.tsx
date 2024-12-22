import { FC } from 'react';

import { Button } from '@components/Button';
import { LazyGrid } from '@components/LazyGrid';
import { Tabs, TabsType } from '@components/Tabs';

import { Table } from './Table';
import { TabId, useNamespaces } from './useNamespaces';

export const Namespaces: FC = () => {
  const {
    tabsProps,
    containerRef,
    currentTab,
    isFetching,
    fetchNextPage,
    GridItem,
    dataCount,
    namespaces,
  } = useNamespaces();

  return (
    <section className="p-10 flex justify-center">
      <div className="w-[1500px] max-w-[80%]">
        <div className="flex justify-between items-center">
          <Button>Create namespace</Button>
          <Tabs {...tabsProps} type={TabsType.icon} />
        </div>
        <div className="mt-6" ref={containerRef}>
          {currentTab.id === TabId.tableView ? (
            <Table
              isLoading={isFetching}
              fetchNextPage={fetchNextPage}
              namespaces={namespaces}
            />
          ) : (
            <LazyGrid
              gap={16}
              minItemWidth={260}
              itemHeight={157}
              Item={GridItem}
              isFetchingNextPage={isFetching}
              fetchNextPage={fetchNextPage}
              count={dataCount}
            />
          )}
        </div>
      </div>
    </section>
  );
};
