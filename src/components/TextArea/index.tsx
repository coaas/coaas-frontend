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
          'text-sm text-white dark:text-white text-gray-900 placeholder:text-gray dark:placeholder:text-gray placeholder:text-gray-500 border bg-transparent dark:bg-transparent bg-white rounded-md border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300 p-2 outline-none resize-none transition-colors',
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
