import { FC } from 'react';

import { Table as TableComponent } from '@components/Table';

import { TableProps } from './types';
import { COLUMNS } from './constants';
import { getTableData } from './getTableData';

export const Table: FC<TableProps> = ({ projects, ...props }) => (
  <TableComponent COLUMNS={COLUMNS} data={getTableData(projects)} {...props} />
);
