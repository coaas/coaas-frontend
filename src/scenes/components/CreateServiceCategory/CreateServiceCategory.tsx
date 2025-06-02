import { FC } from 'react';

import { LazyGrid } from '@components/LazyGrid';

import { useServices } from './useServices';
import { useLocation } from 'react-router-dom';

export const CreateServiceCategory: FC = () => {
  const location = useLocation();
  const title = location.state?.title || 'Templates';
  const { isFetching, GridItem, dataCount } = useServices();

  return (
    <section className="p-10" data-tour="database-templates">
      <h3 className="font-semibold text-2xl text-white mb-5">{title}</h3>
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
