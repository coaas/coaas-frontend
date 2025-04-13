import { cn } from '@utils/styles';
import { X } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { ButtonVariant, ButtonVariants } from './styles';

export const TagLikeButton = ({
  className,
  onClick,
  children,
  variant = 'slate',
  ...rest
}: ComponentPropsWithoutRef<'button'> & { variant?: ButtonVariant }) => {
  return (
    <button
      className={cn(ButtonVariants({ variant }), className)}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <span className="whitespace-nowrap text-ellipsis overflow-hidden">
        {children}
      </span>
      <X className="size-[20px] stroke-1 " />
    </button>
  );
};
