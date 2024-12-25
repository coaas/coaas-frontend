import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { Overlay as OverlayComponent } from '@radix-ui/react-dialog';

import { cn } from '@utils/styles';

export const Overlay = forwardRef<
  ElementRef<typeof OverlayComponent>,
  ComponentPropsWithoutRef<typeof OverlayComponent>
>(({ className, ...props }, ref) => (
  <OverlayComponent
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
