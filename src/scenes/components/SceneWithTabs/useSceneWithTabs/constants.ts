import { IconType } from '@components/Icon';
import { IconTabData } from '@components/Tabs';
import { AnimationConfig } from '@utils/animations';

import { TabId } from './types';

export const TABS: IconTabData[] = [
  { id: TabId.cardsView, iconType: IconType.layers },
  { id: TabId.tableView, iconType: IconType.metrics },
];

export const ANIMATIONS: AnimationConfig = {
  appear: {
    duration: 0.2,
    delay: 0,
  },
  disappear: {
    duration: 0.2,
  },
};
