import { FC } from 'react';

import { useTabs } from '@components/Tabs';
import { useFadeInOut } from '@utils/animations';
import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData } from './getParsedData';
import { ANIMATIONS, TABS } from './constants';
import { fetcher } from '@utils/lib/use-query';
import { CreateNamespaceDto } from '@globalTypes/namespaces';
import { createNamespace, getUserNamespacesAndProjects } from '@api/queries';
import { useQueryClient } from '@tanstack/react-query';

export const useNamespaces = () => {
  const { data, isFetching, fetchNextPage, isFetchingNextPage } = useData();

  const queryClient = useQueryClient();

  const tabsProps = useTabs({ tabs: TABS });

  const { containerRef, animatedData: currentTab } = useFadeInOut({
    animations: ANIMATIONS,
    data: tabsProps.currentTab,
  });

  const { namespaces } = getParsedData(data);

  const GridItem: FC<LazyGridItemProps> = props => (
    <CardGridItem {...props} namespaces={namespaces} />
  );

  const dataCount = namespaces.length;

  const handleCreateNamespace = async (
    dto: CreateNamespaceDto,
    cb?: () => void,
  ) => {
    try {
      await fetcher(createNamespace, { method: 'POST' }, dto);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => {
          const firstKey = queryKey[0];
          return (
            firstKey === getUserNamespacesAndProjects.endpoint ||
            firstKey === 'namespaces'
          );
        },
      });
      cb?.();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dataCount,
    tabsProps,
    currentTab,
    containerRef,
    isFetching,
    GridItem,
    fetchNextPage,
    isFetchingNextPage,
    namespaces,
    handleCreateNamespace,
  };
};
