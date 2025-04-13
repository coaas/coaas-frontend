import { Icon, IconType } from '@components/Icon';
import { SquareIconProps } from '@components/Icon/types';
import { Popover } from '@components/Popover';
import { useToggle } from '@utils/lib/use-toggle';
import { cn } from '@utils/styles';
import { ReactNode } from 'react';

interface Props {
  hint: ReactNode;
  className?: string;
  triggerStyles?: string;
  iconProps?: SquareIconProps;
}

export const Hint = ({ hint, className, triggerStyles, iconProps }: Props) => {
  const {
    state: hintOpened,
    setState: setHintOpen,
    off: closeHint,
  } = useToggle();

  return (
    <Popover
      placement="right-start"
      open={hintOpened}
      setOpen={setHintOpen}
      close={closeHint}
      openOnHover
      render={() => (
        <div
          className={cn(
            'rounded-md p-2 border-stroke-gray border bg-area',
            className,
          )}
        >
          {hint}
        </div>
      )}
    >
      <button className={triggerStyles} type="button">
        <Icon type={IconType.hint} props={iconProps || { size: 14 }} />
      </button>
    </Popover>
  );
};
