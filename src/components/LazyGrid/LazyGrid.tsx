import { FC } from 'react';
import { Grid } from '@virtual-grid/react';

import { cn } from '@utils/styles';

import { LazyGridProps } from './types';
import { useLazyGrid } from './useLazyGrid';

export const LazyGrid: FC<LazyGridProps> = ({ className, Item, ...props }) => {
  const { wrapperRef, onScroll, grid, isFetchingNextPage } = useLazyGrid(props);

  return (
    <div
      ref={wrapperRef}
      className={cn('h-[500px] overflow-auto', className)}
      onScroll={onScroll}
    >
      <Grid grid={grid}>
        {idx => <Item key={idx} className="h-full w-full" idx={idx} />}
      </Grid>
      {/* TODO: заменить на скелетоны, когда те появятся */}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
};
