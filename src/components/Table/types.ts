import { TableData, RowData, UseTableParams } from './useTable';

export type TableProps<TData extends TableData = TableData> = WithClassname &
  UseTableParams<TData> & {
    onRowClick?: (row: RowData) => void;
  };
