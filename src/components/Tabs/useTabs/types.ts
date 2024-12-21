import { BaseTabData } from '../types';

export type OnTabChange<TTabData extends BaseTabData> = (
  newCurrentTab: TTabData,
) => void;

export type UseTabsParams<TTabData extends BaseTabData> = {
  tabs: TTabData[];
  onTabChange?: OnTabChange<TTabData>;
  /**
   * @default tabs[0]
   */
  defaultCurrentTab?: TTabData;
};
