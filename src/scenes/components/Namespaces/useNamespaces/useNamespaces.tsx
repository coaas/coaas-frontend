import { FC } from 'react';

import { useTabs } from '@components/Tabs';
import { useFadeInOut } from '@utils/animations';
import { LazyGridItemProps } from '@components/LazyGrid';

import { useData } from './useData';
import { CardGridItem } from './CardGridItem';
import { getParsedData } from './getParsedData';
import { ANIMATIONS, TABS } from './constants';

export const useNamespaces = () => {
  const { data, isFetching, fetchNextPage, isFetchingNextPage } = useData();

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
  };
};
