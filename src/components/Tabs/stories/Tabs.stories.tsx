import { FC } from 'react';

import { IconType } from '@components/Icon';

import { Tabs } from '../Tabs';
import { TabsType } from '../types';
import { useTabs } from '../useTabs';
import { IconTabData } from '../components';

export const IconTabs: FC = () => {
  const tabsProps = useTabs<IconTabData>({
    tabs: [
      { id: 'layers', iconType: IconType.layers },
      { id: 'metrics', iconType: IconType.metrics },
    ],
  });

  return (
    <div>
      <Tabs type={TabsType.icon} {...tabsProps} />
    </div>
  );
};

const meta = {
  title: 'components/Tabs',
  component: IconTabs,
};

export default meta;
