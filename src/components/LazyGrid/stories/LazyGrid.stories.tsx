import { FC } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { cn } from '@utils/styles';
import { Card, CardType } from '@components/Card';

import { LazyGrid } from '../LazyGrid';
import { LazyGridItemProps } from '../types';
import { getMockData } from './makeData';
import { RequestParams } from './types';

const BASE_REQUEST_PARAMS: RequestParams = {
  limit: 10,
};

const Component: FC = () => {
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['cardsWithLazy'],
    queryFn: ({ pageParam }) => getMockData(pageParam),
    initialPageParam: BASE_REQUEST_PARAMS,
    getNextPageParam: ({ nextKey, hasMore }) =>
      hasMore
        ? {
            ...BASE_REQUEST_PARAMS,
            after: nextKey,
          }
        : undefined,
  });

  const pages = data?.pages || [];
  const items = pages.flatMap(({ namespaces }) => namespaces);

  const Item: FC<LazyGridItemProps> = ({ className: itemClassName, idx }) => (
    <Card
      type={CardType.simpleInfo}
      props={{
        data: { title: items[idx].name, subtitle: items[idx].description },
      }}
      Wrapper={({ children, className }) => (
        <div className={cn(className, itemClassName)}>{children}</div>
      )}
    />
  );

  return (
    <div className="py-10 px-8 bg-background">
      <LazyGrid
        gap={16}
        minItemWidth={260}
        itemHeight={157}
        Item={Item}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        count={items.length}
      />
    </div>
  );
};

const queryClient = new QueryClient();

export const LazyCards = () => (
  <QueryClientProvider client={queryClient}>
    <Component />
  </QueryClientProvider>
);

const meta = {
  title: 'components/LazyGrid',
  component: LazyCards,
};

export default meta;
