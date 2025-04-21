import { Hint } from '@components/Hint';
import { cn } from '@utils/styles';
import { ReactElement, ReactNode } from 'react';

interface Props {
  label?: string;
  error?: string;
  children: ((error?: string) => ReactElement) | ReactNode;
  className?: string;
  clickable?: boolean;
  hint?: ReactNode;
}

export const FormField = ({
  children,
  error,
  label,
  className,
  clickable,
  hint,
}: Props) => {
  const WrapperTag = clickable ? 'label' : 'div';

  return (
    <WrapperTag className={cn('flex justify-between gap-4 w-full', className)}>
      {label && (
        <span
          className={cn(
            'text-sm font-medium font-inter text-white flex gap-[6px] items-center max-h-fit text-nowrap',
            {
              'text-error': error,
              'cursor-pointer': clickable,
            },
          )}
        >
          {label}
          {hint && <Hint hint={hint} />}
        </span>
      )}
      <div className="w-full ">
        <div className={'w-full max-w-[511px] ml-auto flex flex-col gap-2'}>
          {children instanceof Function ? children(error) : children}
          {error && (
            <span
              className="text-error block text-xs "
              aria-invalid={Boolean(error)}
            >
              {error}
            </span>
          )}
        </div>
      </div>
    </WrapperTag>
  );
};
