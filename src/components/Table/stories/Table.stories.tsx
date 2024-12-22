import { FC } from 'react';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { Table } from '../Table';
import { ColumnData, TableData } from '../useTable';
import { CellType } from '../CellContent';
import { fetchData } from './makeData';

const COLUMNS: ColumnData[] = [
  {
    title: 'Name',
    id: 'name',
    size: 160,
  },
  {
    title: 'Description',
    id: 'description',
    size: 180,
  },
  {
    title: 'Slug',
    id: 'slug',
    size: 150,
  },
  {
    title: 'Scope',
    id: 'scope',
  },
  {
    title: 'Members',
    id: 'members',
  },
  {
    title: 'Created at',
    id: 'createdAt',
  },
];

const FETCH_SIZE = 50;

const Component: FC = () => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['testTable'],
    queryFn: async ({ pageParam }) => {
      const start = pageParam * FETCH_SIZE;
      const responseData = await fetchData(start, FETCH_SIZE);

      return responseData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const parsedData: TableData = {
    rows:
      data?.pages.flatMap(page =>
        page.data.map(
          ({
            name,
            description,
            slug,
            scope,
            members,
            isExpired,
            createdAt,
          }) => ({
            isMarked: isExpired,
            cells: [
              {
                type: CellType.text,
                data: {
                  title: name,
                },
              },
              {
                type: CellType.text,
                data: {
                  title: description,
                },
              },
              {
                type: CellType.text,
                data: {
                  title: slug,
                },
              },
              {
                type: CellType.tag,
                data: {
                  title: scope,
                  type: scope === 'Personal' ? 'activeTransparent' : 'active',
                },
              },
              {
                type: CellType.number,
                data: {
                  value: members,
                },
              },
              {
                type: CellType.date,
                data: {
                  date: createdAt,
                },
              },
            ],
          }),
        ),
      ) || [],
  };

  return (
    <div className="bg-background p-10">
      <Table
        COLUMNS={COLUMNS}
        data={parsedData}
        isLoading={isFetching}
        fetchNextPage={fetchNextPage}
        onRowClick={() => {}}
      />
    </div>
  );
};

const queryClient = new QueryClient();

export const Default = () => (
  <QueryClientProvider client={queryClient}>
    <Component />
  </QueryClientProvider>
);

const meta = {
  title: 'components/Table',
  component: Default,
};

export default meta;
