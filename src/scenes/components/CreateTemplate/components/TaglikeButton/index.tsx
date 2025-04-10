import { cn } from '@utils/styles';
import { X } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

export const TagLikeButton = ({
  className,
  onClick,
  children,
  ...rest
}: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={cn(
        'px-3 py-[6px] flex items-center gap-[15px] border border-stroke-gray-dark rounded-[6px]',
        className,
      )}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <span className="whitespace-nowrap text-white text-ellipsis overflow-hidden">
        {children}
      </span>
      <X className="size-[20px] text-stroke-gray-dark" />
    </button>
  );
};
