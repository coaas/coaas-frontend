import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { LazyGrid } from '@components/LazyGrid';

import { useServices } from './useServices';

export const CreateService: FC = () => {
  const { isFetching, GridItem, dataCount } = useServices();

  return (
    <section className="p-10">
      <h3 className="font-semibold text-2xl text-white mb-5">
        Managed Services Categories
      </h3>
      <LazyGrid
        gap={16}
        minItemWidth={260}
        itemHeight={157}
        Item={GridItem}
        isFetching={isFetching}
        isFetchingNextPage={false}
        fetchNextPage={() => {}}
        count={dataCount}
        className="overflow-visible"
      />
    </section>
  );
};
