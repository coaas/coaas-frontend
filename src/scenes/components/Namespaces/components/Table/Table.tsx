import { FC } from 'react';

import { Table as TableComponent } from '@components/Table';

import { TableProps } from './types';
import { COLUMNS } from './constants';
import { getTableData } from './getTableData';

export const Table: FC<TableProps> = ({ namespaces, ...props }) => (
  <TableComponent
    COLUMNS={COLUMNS}
    data={getTableData(namespaces)}
    {...props}
  />
);
