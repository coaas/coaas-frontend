import { CellData } from '../CellContent';

export type RowData = {
  cells: CellData[];
  isMarked?: boolean;
};

export type ColumnData = WithId & {
  title: string;
  size?: number;
};

export type TableData = {
  rows: RowData[];
};

export type UseTableParams<TData extends TableData> = {
  /**
   * стабильный массив столбцов
   */
  COLUMNS: ColumnData[];
  fetchNextPage: () => void;
  isLoading: boolean;
  data?: TData;
};
