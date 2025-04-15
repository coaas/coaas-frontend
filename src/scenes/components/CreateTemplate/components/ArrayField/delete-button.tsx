import { cn } from '@utils/styles';
import { X } from 'lucide-react';
import { ComponentProps } from 'react';

export const DeleteButton = ({
  children,
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'py-[2px] px-2 rounded-md  border border-stroke-gray-dark',
        className,
      )}
      type={type}
      {...props}
    >
      {children}
      <X className="text-stroke-gray-dark stroke-1 w-5 h-5" />
    </button>
  );
};
