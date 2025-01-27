import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { CellType, RowData, Table as TableComponent } from '@components/Table';

import { TableProps } from './types';
import { COLUMNS, SLUG_ID } from './constants';
import { getTableData } from './getTableData';

export const Table: FC<TableProps> = ({ namespaces, ...props }) => {
  const navigate = useNavigate();

  const onRowClick = ({ cells }: RowData) => {
    const slugCell = cells[COLUMNS.findIndex(({ id }) => id === SLUG_ID)];

    if (slugCell?.type === CellType.text) {
      navigate(slugCell.data.title);
    }
  };

  return (
    <TableComponent
      COLUMNS={COLUMNS}
      data={getTableData(namespaces)}
      onRowClick={onRowClick}
      {...props}
    />
  );
};
