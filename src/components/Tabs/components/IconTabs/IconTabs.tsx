import { FC } from 'react';

import { cn } from '@utils/styles';
import { Icon } from '@components/Icon';

import { IconTabsProps } from './types';
import { ICON_SIZE } from './constants';

export const IconTabs: FC<IconTabsProps> = ({
  tabs,
  currentTab,
  onTabChange,
  className,
}) => (
  <div
    className={cn(className, 'rounded-md inline-flex gap-1 p-1 bg-[#3C3A46]')}
  >
    {tabs.map(tabData => {
      const { id, iconType } = tabData;

      const isCurrent = id === currentTab.id;
      // TODO: разобраться, может ли tailwind работать с svg
      const iconColor = isCurrent ? '#fff' : '#B6B6B6';

      const onTabClick = () => !isCurrent && onTabChange(tabData);

      return (
        <button
          key={id}
          onClick={onTabClick}
          className={cn('p-2 rounded-sm transition duration-250 ease-in-out', {
            'cursor-pointer bg-[transparent]': !isCurrent,
            'cursor-default bg-[#4C4958]': isCurrent,
          })}
        >
          <Icon type={iconType} props={{ size: ICON_SIZE, color: iconColor }} />
        </button>
      );
    })}
  </div>
);
