import { forwardRef } from 'react';

import { cn } from '@utils/styles';

import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      className={cn(
        'w-full text-gray text-base font-normal outline-none bg-background border-stroke-gray-dark focus:text-white border-[1px] rounded-md px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
