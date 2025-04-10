import { FC } from 'react';

import { cn } from '@utils/styles';

import { CellContentProps, CellType } from './types';

const COMMON_STYLES =
  'font-medium text-sm whitespace-nowrap text-white text-ellipsis overflow-hidden';

export const CellContent: FC<CellContentProps> = ({ cell }) => {
  switch (cell.type) {
    case CellType.text: {
      const { title } = cell.data;

      return (
        <p title={title} className={COMMON_STYLES}>
          {title}
        </p>
      );
    }

    case CellType.tag: {
      const { type, title } = cell.data;

      return (
        <p
          title={title}
          className={cn(
            'py-1 px-2 rounded-md border-[1px] font-medium text-xs whitespace-nowrap border-stroke-blue',
            {
              'text-background bg-stroke-blue': type === 'active',
              'text-stroke-blue': type === 'activeTransparent',
            },
          )}
        >
          {title}
        </p>
      );
    }

    case CellType.number: {
      const { value } = cell.data;
      const title = `${Number((value || 0).toFixed(2))}`;

      return (
        <p
          title={title}
          className={cn(COMMON_STYLES, 'font-normal text-stroke-blue')}
        >
          {title}
        </p>
      );
    }

    case CellType.date: {
      const { date } = cell.data;
      const title = date.toLocaleString();

      return (
        <p title={title} className={COMMON_STYLES}>
          {title}
        </p>
      );
    }

    default: {
      return null;
    }
  }
};
