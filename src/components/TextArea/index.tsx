import { cn } from '@utils/styles';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface Props extends ComponentPropsWithRef<'textarea'> {
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, error, cols = 30, ...rest }, ref) => {
    return (
      <textarea
        className={cn(
          'text-sm text-white placeholder:text-gray border bg-transparent rounded-md border-stroke-gray-dark p-2 outline-none resize-none',
          { 'border-error': error },
          className,
        )}
        ref={ref}
        cols={cols}
        {...rest}
      />
    );
  },
);
