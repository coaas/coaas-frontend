import { TableData, RowData, UseTableParams } from './useTable';

export type TableProps<
  TOnClickData,
  TData extends TableData<TOnClickData> = TableData<TOnClickData>,
> = WithClassname &
  UseTableParams<TOnClickData, TData> & {
    onRowClick?: (row: RowData<TOnClickData>) => void;
  };
