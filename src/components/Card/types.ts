import { FC, PropsWithChildren } from 'react';

import { CardContentProps } from './CardContent';

export type ColorMode = 'transparent' | 'standart';

type CardSettings = {
  /**
   * @default: 'standart'
   */
  colorMode?: ColorMode | null;
};

export type CardWrapper = FC<PropsWithChildren<{ className?: string }>>;

export type CardProps = CardContentProps & {
  /**
   * Компонент-обертка карточки
   * Контент карточки будет прокидываться в children, а с помощью className накладываться необходимые стили
   */
  Wrapper: CardWrapper;
  /**
   * Общие настройки визуализации карточки
   *
   * @default { colorMode: 'standart' }
   */
  settings?: CardSettings | null;
  className?: string;
};
