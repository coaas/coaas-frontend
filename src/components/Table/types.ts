import { RowData, UseTableParams } from './useTable';

export type TableProps = WithClassname &
  UseTableParams & {
    onRowClick?: (row: RowData) => void;
  };
