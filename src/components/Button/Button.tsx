import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import { cn } from '@utils/styles';

import { ButtonProps } from './types';
import { BUTTON_VARIANTS } from './constants';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(BUTTON_VARIANTS({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
