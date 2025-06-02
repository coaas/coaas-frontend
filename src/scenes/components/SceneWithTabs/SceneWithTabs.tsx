import { FC } from 'react';

import { Search } from '@components/Search';
import { Tabs, TabsType } from '@components/Tabs';

import { SceneWithTabsProps } from './types';
import { TabId, useSceneWithTabs } from './useSceneWithTabs';

export const SceneWithTabs: FC<SceneWithTabsProps> = ({
  Button,
  TableView,
  CardsView,
  onChangeSearch,
  searchPlaceholder,
}) => {
  const { tabsProps, containerRef, currentTab } = useSceneWithTabs();

  return (
    <section className="p-10 items-center">
      <div data-tour="search-section">
        <Search
          onChange={onChangeSearch}
          config={{
            placeholder: searchPlaceholder,
            delay: 1000,
          }}
          className="mb-4"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div data-tour="create-namespace-btn">
            {Button}
          </div>
          <Tabs {...tabsProps} type={TabsType.icon} />
        </div>
        <div className="mt-6" ref={containerRef} data-tour="namespace-grid">
          {currentTab.id === TabId.tableView ? TableView : CardsView}
        </div>
      </div>
    </section>
  );
};
