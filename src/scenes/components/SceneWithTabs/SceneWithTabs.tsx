import { FC } from 'react';

import { Tabs, TabsType } from '@components/Tabs';

import { SceneWithTabsProps } from './types';
import { TabId, useSceneWithTabs } from './useSceneWithTabs';

export const SceneWithTabs: FC<SceneWithTabsProps> = ({
  Button,
  TableView,
  CardsView,
}) => {
  const { tabsProps, containerRef, currentTab } = useSceneWithTabs();

  return (
    <section className="p-10 flex justify-center">
      <div className="w-full">
        <div className="flex justify-between items-center">
          {Button}
          <Tabs {...tabsProps} type={TabsType.icon} />
        </div>
        <div className="mt-6" ref={containerRef}>
          {currentTab.id === TabId.tableView ? TableView : CardsView}
        </div>
      </div>
    </section>
  );
};
