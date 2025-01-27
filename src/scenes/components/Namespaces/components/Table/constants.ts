import { ColumnData } from '@components/Table';

export const SLUG_ID = 'slug';

export const COLUMNS: ColumnData[] = [
  {
    title: 'Name',
    id: 'name',
    size: 180,
  },
  {
    title: 'Description',
    id: 'description',
    size: 200,
  },
  {
    title: 'Slug',
    id: SLUG_ID,
    size: 180,
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
