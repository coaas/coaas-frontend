import { ReactNode } from 'react';

export type NotifiCationVariant = 'success' | 'error';

export type NotificationState = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: NotifiCationVariant;
};

export interface NotificationContextProps {
  open: (message: NotificationState, autoCloseMs?: number) => void;
  close: () => void;
  state: NotificationState | null;
  animateIn: () => void;
}
