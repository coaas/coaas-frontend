import { cn } from '@utils/styles';
import { X } from 'lucide-react';
import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'input'> {
  error?: string;
  onDelete?: () => void;
  deleteDisabled?: boolean;
}

export const TaggedInput = forwardRef<HTMLInputElement, Props>(
  ({ error, onDelete, className, deleteDisabled, ...inputProps }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label
          className={cn(
            'w-full py-[6px] px-3 border-stroke-gray-dark border flex justify-between max-w-[100px] rounded-md gap-2 items-center transition-colors focus-within:border-blue disabled:border-stroke-gray-dark',
            { 'border-error focus-within:border-error': !!error },
          )}
        >
          <input
            className="bg-transparent text-white text-sm leading-6 w-full outline-none"
            {...inputProps}
            ref={ref}
          />
          <button
            type="button"
            className="bg-transparent border-none size-[20px] shrink-0 text-stroke-gray-dark hover:text-blue transition-colors disabled:text-stroke-gray-dark"
            onClick={onDelete}
            disabled={deleteDisabled}
          >
            <X className="text-current stroke-1 size-full " />
          </button>
        </label>
        {error && (
          <span className="text-xs text-error" aria-errormessage={error}>
            {error}
          </span>
        )}
      </div>
    );
  },
);
