import { FC } from 'react';

import { cn } from '@utils/styles';

import { CellContentProps, CellType } from './types';

const COMMON_STYLES =
  'font-medium text-sm whitespace-nowrap text-white text-ellipsis overflow-hidden';

export const CellContent: FC<CellContentProps> = ({ cell }) => {
  switch (cell.type) {
    case CellType.text: {
      return <p className={COMMON_STYLES}>{cell.data.title}</p>;
    }

    case CellType.tag: {
      const { type } = cell.data;

      return (
        <p
          className={cn(
            'py-1 px-2 rounded-md border-[1px] font-medium text-xs whitespace-nowrap border-stroke-blue',
            {
              'text-background bg-stroke-blue': type === 'active',
              'text-stroke-blue': type === 'activeTransparent',
            },
          )}
        >
          {cell.data.title}
        </p>
      );
    }

    case CellType.number: {
      return (
        <p className={cn(COMMON_STYLES, 'font-normal text-stroke-blue')}>
          {Number(cell.data.value.toFixed(2))}
        </p>
      );
    }

    case CellType.date: {
      return <p className={COMMON_STYLES}>{cell.data.date.toLocaleString()}</p>;
    }

    default: {
      return null;
    }
  }
};
