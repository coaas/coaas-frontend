import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CellContent, CellData } from '../CellContent';
import { ResponseData, RowData, UseTableParams } from './types';
import { OVERSCAN, ROW_HEIGHT, SCROLL_POS_TO_FETCH } from './constants';

export const useTable = ({ COLUMNS, queryFn, queryKey }: UseTableParams) => {
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

  const { data, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery<ResponseData>({
      queryKey,
      queryFn,
      initialPageParam: 0,
      getNextPageParam: (_lastGroup, groups) => groups.length,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    });

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.rows) || [],
    [data],
  );
  const totalDBRowCount = data?.pages?.[0]?.totalRowsCount || 0;
  const totalFetched = flatData.length;

  const fetchMore = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        // как только остается меньше SCROLL_POS_TO_FETCH до нижней части, запрашиваем новые данные
        if (
          scrollHeight - scrollTop - clientHeight < SCROLL_POS_TO_FETCH &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  // при монтировании на всякий чекаем, нужно ли получить данные
  useEffect(() => fetchMore(tableWrapperRef.current), [fetchMore]);

  const table = useReactTable({
    data: flatData,
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
    isFetching,
  };
};
