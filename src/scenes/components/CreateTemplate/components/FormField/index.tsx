import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
import { useToggle } from '@utils/lib/use-toggle';
import { cn } from '@utils/styles';
import { ReactElement, ReactNode } from 'react';

interface Props {
  label?: string;
  error?: string;
  children: (error?: string) => ReactElement;
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
  const {
    state: hintOpened,
    setState: setHintOpen,
    off: closeHint,
  } = useToggle();

  const WrapperTag = clickable ? 'label' : 'div';

  return (
    <WrapperTag className={cn('flex justify-between g-4 w-full', className)}>
      {label && (
        <span
          className={cn(
            'text-sm font-medium font-inter text-white flex gap-[6px] items-center max-h-fit',
            {
              'text-error': error,
            },
          )}
        >
          {label}
          {hint && (
            <Popover
              placement="right-start"
              open={hintOpened}
              setOpen={setHintOpen}
              close={closeHint}
              openOnHover
              render={() => (
                <div className="rounded-md p-2 border-stroke-gray border bg-area">
                  {hint}
                </div>
              )}
            >
              <button type="button">
                <Icon type={IconType.hint} props={{ size: 14 }} />
              </button>
            </Popover>
          )}
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
