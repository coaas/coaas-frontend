import { ReactNode } from 'react';

export type SceneWithTabsProps = {
  TableView: ReactNode;
  CardsView: ReactNode;
  Button: ReactNode;
  onChangeSearch: (search: string) => void;
  searchPlaceholder?: string;
};
