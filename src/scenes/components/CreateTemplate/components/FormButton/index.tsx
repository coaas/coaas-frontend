import { cn } from '@utils/styles';
import { ComponentProps } from 'react';
import { ButtonSize, ButtonVariant, ButtonVariants } from './styles';

interface Props extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
}

export const FormButton = ({
  className,
  children,
  variant = 'blue',
  size = 'lg',
  isLoading,
  loadingText,
  ...restProps
}: Props) => {
  const contentToDisplay = isLoading ? (
    <>
      <p className="text-white flex gap-1 items-center justify-center">
        {loadingText || 'loading...'}
        <span className="rounded-full border-white border-2 border-b-transparent size-5 animate-spin" />
      </p>
    </>
  ) : (
    children
  );

  return (
    <button
      className={cn(ButtonVariants({ variant, size }), className)}
      {...restProps}
    >
      {contentToDisplay}
    </button>
  );
};
