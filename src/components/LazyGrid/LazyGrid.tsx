import { FC } from 'react';
import { Grid } from '@virtual-grid/react';

import { cn } from '@utils/styles';

import { LazyGridProps } from './types';
import { useLazyGrid } from './useLazyGrid';

export const LazyGrid: FC<LazyGridProps> = ({ className, Item, ...props }) => {
  const { wrapperRef, onScroll, grid, isFetchingAllGrid, isFetchingNextPage } =
    useLazyGrid(props);

  // Extract data-tour and other data attributes
  const dataTour = (props as any)['data-tour'];
  const dataAttributes = Object.keys(props).reduce((acc, key) => {
    if (key.startsWith('data-')) {
      acc[key] = (props as any)[key];
    }
    return acc;
  }, {} as Record<string, any>);

  if (isFetchingAllGrid) {
    return <div ref={wrapperRef}>Loading...</div>;
  }

  return (
    <div
      ref={wrapperRef}
      className={cn('h-[500px] overflow-auto', className)}
      onScroll={onScroll}
      {...dataAttributes}
    >
      <Grid grid={grid}>
        {idx => <Item key={idx} className="h-full w-full" idx={idx} />}
      </Grid>
      {/* TODO: заменить на скелетоны, когда те появятся */}
      {isFetchingNextPage && <div>More items...</div>}
    </div>
  );
};
