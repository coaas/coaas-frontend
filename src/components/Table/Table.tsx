import { flexRender } from '@tanstack/react-table';

import { cn } from '@utils/styles';

import { TableProps } from './types';
import { RowData, TableData, useTable } from './useTable';

export const Table = <TOnClickData, TData extends TableData<TOnClickData>>({
  className,
  onRowClick,
  ...props
}: TableProps<TOnClickData, TData>) => {
  const {
    isLoadingFullTable,
    isLoadingNextPage,
    onScroll,
    tableWrapperRef,
    table,
    rowVirtualizer,
    rows,
  } = useTable(props);

  if (isLoadingFullTable) {
    // TODO: заменить на скелетоны, когда они появятся
    return <div ref={tableWrapperRef}>Loading...</div>;
  }

  return (
    <div className={className}>
      <div
        onScroll={onScroll}
        ref={tableWrapperRef}
        className="overflow-auto relative h-[500px]"
      >
        <table className="grid">
          <thead className="grid sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                className="flex w-full px-4 py-3 rounded-md border-stroke-gray-dark border-[1px] bg-background"
                key={headerGroup.id}
              >
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="flex px-2"
                    // tailwind не умеет динамические выражения обрабатывать, поэтому инлайним
                    style={{ width: header.getSize() }}
                  >
                    <div className="text-gray font-medium text-sm text-nowrap">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="grid relative"
            // tailwind не умеет динамические выражения обрабатывать, поэтому инлайним
            style={{ height: rowVirtualizer.getTotalSize() }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index];
              const originalRow = row.original as RowData<TOnClickData>;
              const { isMarked } = originalRow;

              const onClick = () => onRowClick?.(originalRow);

              return (
                <tr
                  // необходимо для корректной работы
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  key={row.id}
                  onClick={onClick}
                  className={cn(
                    'px-4 py-5 flex absolute w-full rounded-md box-border border-[1px]',
                    {
                      'cursor-pointer': onRowClick,
                      'bg-background border-background hover:bg-background/70':
                        !isMarked,
                      'bg-stroke-gray-dark/90 border-stroke-gray-dark hover:bg-stroke-gray-dark/70':
                        isMarked,
                    },
                  )}
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="flex px-2"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* TODO: заменить на скелетоны, когда они появятся */}
      {isLoadingNextPage && <div>Fetching More...</div>}
    </div>
  );
};
