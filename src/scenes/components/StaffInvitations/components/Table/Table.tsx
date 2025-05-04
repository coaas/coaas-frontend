import { FC } from 'react';

import { Table as TableComponent } from '@components/Table';

import { TableProps } from './types';
import { COLUMNS } from './constants';
import { getTableData } from './getTableData';

export const Table: FC<TableProps> = ({
  invitations,
  resendInvitation,
  ...props
}) => (
  <TableComponent
    COLUMNS={COLUMNS}
    data={getTableData(invitations, resendInvitation)}
    {...props}
  />
);
