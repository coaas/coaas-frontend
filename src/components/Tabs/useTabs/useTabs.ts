import { useState } from 'react';

import { BaseTabData } from '../types';
import { OnTabChange, UseTabsParams } from './types';

export const useTabs = <TTabData extends BaseTabData>({
  tabs,
  onTabChange: onTabChangeCore,
  defaultCurrentTab = tabs[0],
}: UseTabsParams<TTabData>) => {
  const [currentTab, setCurrentTab] = useState(defaultCurrentTab);

  const onTabChange: OnTabChange<TTabData> = newCurrentTab => {
    onTabChangeCore?.(newCurrentTab);
    setCurrentTab(newCurrentTab);
  };

  return { tabs, currentTab, onTabChange };
};
