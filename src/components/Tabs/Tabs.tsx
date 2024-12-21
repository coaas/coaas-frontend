import { FC } from 'react';

import { TabsProps, TabsType } from './types';
import { IconTabs } from './components';

export const Tabs: FC<TabsProps> = props => {
  switch (props.type) {
    case TabsType.icon: {
      return <IconTabs {...props} />;
    }

    default: {
      return null;
    }
  }
};
