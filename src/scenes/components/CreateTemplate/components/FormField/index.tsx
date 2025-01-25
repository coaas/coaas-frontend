import { cn } from '@utils/styles';
import { ReactElement } from 'react';

interface Props {
  label?: string;
  error?: string;
  children: (error?: string) => ReactElement;
  className?: string;
  clickable?: boolean;
}

export const FormField = ({
  children,
  error,
  label,
  className,
  clickable,
}: Props) => {
  const WrapperTag = clickable ? 'label' : 'div';

  return (
    <WrapperTag className={cn('flex justify-between g-4 w-full', className)}>
      {label && (
        <span
          className={cn('text-sm font-medium font-inter text-white', {
            'text-error': error,
          })}
        >
          {label}
        </span>
      )}
      <div className="w-full flex flex-col gap-1">
        <div className={'w-full max-w-[511px] ml-auto'}>{children(error)}</div>
        {error && (
          <span
            className="text-error block text-xs"
            aria-invalid={Boolean(error)}
          >
            {error}
          </span>
        )}
      </div>
    </WrapperTag>
  );
};
