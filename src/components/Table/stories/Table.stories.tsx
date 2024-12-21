import { FC } from 'react';

import { Table } from '../Table';
import { ColumnData, TableQueryFn } from '../useTable';
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

const fetchSize = 50;

export const Default: FC = () => {
  const queryFn: TableQueryFn = async ({ pageParam = 0 }) => {
    const start = (pageParam as number) * fetchSize;
    const { data, totalRowsCount } = await fetchData(start, fetchSize);

    return {
      totalRowsCount,
      rows: data.map(
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
    };
  };

  return (
    <div className="bg-area-dark p-10">
      <Table
        queryKey={['testTable']}
        COLUMNS={COLUMNS}
        queryFn={queryFn}
        onRowClick={() => {}}
      />
    </div>
  );
};

const meta = {
  title: 'components/Table',
  component: Default,
};

export default meta;
