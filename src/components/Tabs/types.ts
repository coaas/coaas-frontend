import { IconTabData } from './components';
import { OnTabChange } from './useTabs';

type GenericTabs<
  TType,
  TTabData extends BaseTabData,
> = CommonTabsProps<TTabData> & {
  type: TType;
};

export type BaseTabData = WithId;

export type CommonTabsProps<TTabData extends BaseTabData> = WithClassname & {
  tabs: TTabData[];
  currentTab: TTabData;
  onTabChange: OnTabChange<TTabData>;
};

export enum TabsType {
  icon = 'icon',
}

export type TabsProps = GenericTabs<TabsType.icon, IconTabData>;
