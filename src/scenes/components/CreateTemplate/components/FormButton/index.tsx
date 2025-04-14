import { cn } from '@utils/styles';
import { ComponentProps } from 'react';
import { ButtonVariant, ButtonVariants } from './styles';

interface Props extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
}

export const FormButton = ({
  className,
  children,
  variant = 'blue',
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
      className={cn(ButtonVariants({ variant }), className)}
      {...restProps}
    >
      {contentToDisplay}
    </button>
  );
};
