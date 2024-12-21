import { IconType } from '@components/Icon';
import { BaseTabData, CommonTabsProps } from '@components/Tabs/types';

export type IconTabData = BaseTabData & {
  iconType: IconType;
};

export type IconTabsProps = CommonTabsProps<IconTabData>;
