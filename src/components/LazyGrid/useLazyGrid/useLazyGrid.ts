import { useCallback } from 'react';
import { useGrid } from '@virtual-grid/react';

import { UseLazyGridParams } from './types';
import { SCROLL_POS_TO_FETCH } from './constants';
import { useElementSizes } from '@utils/layout';

export const useLazyGrid = ({
  fetchNextPage,
  isFetchingNextPage,
  count,
  gap,
  minItemWidth,
  itemHeight,
}: UseLazyGridParams) => {
  const {
    ref: wrapperRef,
    sizes: { width: wrapperWidth },
  } = useElementSizes<HTMLDivElement>();

  const colsCount = wrapperWidth
    ? Math.floor((wrapperWidth + gap) / (minItemWidth + gap))
    : 0;

  const fetchMore = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        // как только остается меньше SCROLL_POS_TO_FETCH до нижней части, запрашиваем новые данные
        if (
          !isFetchingNextPage &&
          scrollHeight - scrollTop - clientHeight < SCROLL_POS_TO_FETCH
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetchingNextPage],
  );

  const grid = useGrid({
    scrollRef: wrapperRef,
    count,
    columns: colsCount,
    gap,
    size: {
      height: itemHeight,
    },
    onLoadMore: fetchMore,
  });

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) =>
    fetchMore(e.target as HTMLDivElement);

  return { wrapperRef, grid, onScroll, isFetchingNextPage };
};
