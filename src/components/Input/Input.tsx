import { forwardRef } from 'react';

import { cn } from '@utils/styles';

import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      className={cn(
        'w-full text-white dark:text-white text-gray-900 text-base font-normal outline-none bg-background dark:bg-background bg-white border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300 focus:text-white dark:focus:text-white focus:text-gray-900 border-[1px] rounded-md px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors',
        {
          'border-error': invalid,
        },
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
