import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
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
  openOnHover?: boolean;
  passWidth?: boolean;
}

export const Popover = ({
  children,
  render,
  open,
  setOpen,
  close,
  placement = 'bottom-start',
  offsetNum = 10,
  openOnHover = false,
  passWidth = true,
}: PopoverProps) => {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(offsetNum),
      flip(),
      shift(),
      size({
        apply: ({ elements }) => {
          if (passWidth) {
            elements.floating.style.maxWidth = `${elements.reference.getBoundingClientRect().width}px`;
          }
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
    placement: placement,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const hover = useHover(context, { enabled: openOnHover });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    hover,
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
