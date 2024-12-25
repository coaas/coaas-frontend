import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CellContent, CellData } from '../CellContent';
import { RowData, TableData, UseTableParams } from './types';
import { OVERSCAN, ROW_HEIGHT, SCROLL_POS_TO_FETCH } from './constants';

export const useTable = <TData extends TableData>({
  COLUMNS,
  data,
  fetchNextPage,
  isLoading,
}: UseTableParams<TData>) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const columns = useMemo<ColumnDef<RowData>[]>(
    () =>
      COLUMNS.map(({ id, title, size }, idx) => ({
        id,
        header: title,
        size,
        accessorFn: row => row.cells[idx],
        cell: info => <CellContent cell={info.getValue<CellData>()} />,
        // массив зависимостей оставил пустым намеренно - для корректной работы COLUMNS должен быть стабильным
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const rowsData = data?.rows || [];

  const fetchMore = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        // как только остается меньше SCROLL_POS_TO_FETCH до нижней части, запрашиваем новые данные
        if (
          scrollHeight - scrollTop - clientHeight < SCROLL_POS_TO_FETCH &&
          !isLoading
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isLoading],
  );

  // при монтировании на всякий чекаем, нужно ли получить данные
  useEffect(() => fetchMore(tableWrapperRef.current), [fetchMore]);

  const table = useReactTable({
    data: rowsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => tableWrapperRef.current,
    measureElement: element => element?.getBoundingClientRect().height,
    overscan: OVERSCAN,
  });

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) =>
    fetchMore(e.target as HTMLDivElement);

  return {
    isLoading,
    onScroll,
    tableWrapperRef,
    table,
    rowVirtualizer,
    rows,
  };
};
