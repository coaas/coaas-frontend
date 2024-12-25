import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { Title } from '@radix-ui/react-dialog';

import { cn } from '@utils/styles';

export const ModalTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn('text-white font-semibold text-2xl', className)}
    {...props}
  />
));
