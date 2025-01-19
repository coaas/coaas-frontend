import { FC, FormEvent } from 'react';

import { Button } from '@components/Button';
import { LazyGrid } from '@components/LazyGrid';
import { Tabs, TabsType } from '@components/Tabs';

import { Table } from './Table';
import { TabId, useNamespaces } from './useNamespaces';
import { useToggle } from '@utils/lib/use-toggle';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';
import { InputField } from '@components/InputField';
import { CreateNamespaceDto } from '@globalTypes/namespaces';
import { useQueryClient } from '@tanstack/react-query';

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
    handleCreateNamespace,
  } = useNamespaces();

  const { off, on, state, setState } = useToggle();

  const queryClient = useQueryClient();

  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().map(cache => cache.queryKey); // QueryKey[]

  const handSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(queryKeys);

    const formData = new FormData(e.currentTarget);
    const dto = Object.fromEntries([
      ...formData.entries(),
    ]) as CreateNamespaceDto;
    handleCreateNamespace(dto, off);
  };

  return (
    <section className="p-10 flex justify-center">
      <div className="w-[1500px] max-w-[80%]">
        <div className="flex justify-between items-center">
          <Button onClick={on}>Create namespace</Button>
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
      <Modal open={state} onOpenChange={setState}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>New namespace</ModalTitle>
          </ModalHeader>
          <form onSubmit={handSubmit} className="flex flex-col gap-5 mt-5">
            <InputField required label="Name" name="name" />
            <InputField required label="Description" name="description" />
            <InputField required label="Slug" name="slug" />
            <Button
              type="submit"
              className="w-full bg-area border-area text-white"
              variant="secondary"
            >
              Create namespace
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </section>
  );
};
