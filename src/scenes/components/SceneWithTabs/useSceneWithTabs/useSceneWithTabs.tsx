import { useTabs } from '@components/Tabs';
import { useFadeInOut } from '@utils/animations';

import { ANIMATIONS, TABS } from './constants';

export const useSceneWithTabs = () => {
  const tabsProps = useTabs({ tabs: TABS });

  const { containerRef, animatedData: currentTab } = useFadeInOut({
    animations: ANIMATIONS,
    data: tabsProps.currentTab,
  });

  return { containerRef, tabsProps, currentTab };
};
