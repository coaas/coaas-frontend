import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import { cloneElement, Dispatch, ReactElement, SetStateAction } from 'react';

type RenderProps = {
  close: () => void;
};

interface PopoverProps {
  children: ReactElement;
  render: (props: RenderProps) => ReactElement;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  close: () => void;
  placement?: Placement;
  offsetNum?: number;
}

export const Popover = ({
  children,
  render,
  open,
  setOpen,
  close,
  placement = 'bottom-start',
  offsetNum = 10,
}: PopoverProps) => {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(offsetNum), flip(), shift()],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
    placement: placement,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context}>
            {cloneElement(render({ close }), {
              ...getFloatingProps(),
              ref: refs.setFloating,
              style: floatingStyles,
            })}
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
