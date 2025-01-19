import { ReactNode } from 'react';

export type SceneWithTabsProps = {
  TableView: ReactNode;
  CardsView: ReactNode;
  button: {
    title: string;
    onClick: () => void;
  };
};
