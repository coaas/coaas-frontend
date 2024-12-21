import { FC, PropsWithChildren } from 'react';

import { CardContentProps } from './CardContent';

export type ColorMode = 'transparent' | 'standart';

type CardSettings = {
  /**
   * @default: 'standart'
   */
  colorMode?: ColorMode | null;
};

export type CardWrapper = FC<PropsWithChildren<WithClassname>>;

export type CardProps = CardContentProps &
  WithClassname & {
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
  };
