import { cn } from '@utils/styles';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface Props extends ComponentPropsWithRef<'input'> {
  error?: string;
  label?: string;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, ...rest }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1 w-full', className)}>
        <label className=" cursor-pointer flex flex-col gap-[6px] text-sm font-medium font-inter text-white">
          {label}
          <input
            className="bg-background border-stroke-gray-dark border-[1px] rounded-md py-2 px-3 text-base font-normal font-inter text-gray"
            {...rest}
            ref={ref}
          />
        </label>
        {error && (
          <span className="text-error text-xs font-inter font-medium">
            {error}
          </span>
        )}
      </div>
    );
  },
);
