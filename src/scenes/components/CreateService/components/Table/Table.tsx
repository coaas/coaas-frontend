import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { RowData, Table as TableComponent } from '@components/Table';

import { TableProps } from './types';
import { COLUMNS } from './constants';
import { getTableData } from './getTableData';

export const Table: FC<TableProps> = ({ services, ...props }) => {
  const navigate = useNavigate();

  const onRowClick = ({ onClickInfo }: RowData<WithId>) => {
    if (onClickInfo?.id) {
      navigate(onClickInfo.id);
    }
  };

  return (
    <TableComponent
      COLUMNS={COLUMNS}
      data={getTableData(services)}
      onRowClick={onRowClick}
      {...props}
    />
  );
};
