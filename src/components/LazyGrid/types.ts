import { FC } from 'react';

import { UseLazyGridParams } from './useLazyGrid';

export type LazyGridItemProps = WithClassname & {
  idx: number;
};

export type LazyGridProps = UseLazyGridParams &
  WithClassname & {
    Item: FC<LazyGridItemProps>;
  };
