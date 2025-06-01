import { CellData } from '../CellContent';

export type RowData<TOnClickData> = {
  cells: CellData[];
  isMarked?: boolean;
  onClickInfo?: TOnClickData;
};

export type ColumnData = WithId & {
  title: string;
  size?: number;
};

export type TableData<TOnClickData> = {
  rows: RowData<TOnClickData>[];
};

export type UseTableParams<
  TOnClickData,
  TData extends TableData<TOnClickData>,
> = {
  /**
   * стабильный массив столбцов
   */
  COLUMNS: ColumnData[];
  fetchNextPage: () => void;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  data?: TData;
};
