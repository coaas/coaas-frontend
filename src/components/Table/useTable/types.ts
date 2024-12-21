import { QueryFunction, QueryKey } from '@tanstack/react-query';

import { CellData } from '../CellContent';

export type RowData = {
  cells: CellData[];
  isMarked?: boolean;
};

export type ColumnData = {
  title: string;
  id: string;
  size?: number;
};

export type ResponseData = {
  rows: RowData[];
  totalRowsCount: number;
};

export type TableQueryFn = QueryFunction<ResponseData, QueryKey, unknown>;

export type UseTableParams = {
  /**
   * стабильный массив столбцов
   */
  COLUMNS: ColumnData[];
  /**
   * уникальный в приложении ключ для кэширования запросов
   */
  queryKey: QueryKey;
  /**
   * Функция, возвращающая новую порци данных
   */
  queryFn: TableQueryFn;
};
