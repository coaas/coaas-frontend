import { cva } from 'class-variance-authority';

import { ButtonVariant } from './types';

export const BUTTON_VARIANT_OBJ: Record<ButtonVariant, string> = {
  default: 'bg-blue text-white shadow hover:bg-blue/70',
  outline:
    'border-2 border-blue text-blue bg-background hover:border-blue-light hover:text-blue-light',
  secondary: 'bg-stroke-gray text-white hover:bg-gray hover:bg-stroke-gray/70',
};

export const BUTTON_VARIANTS = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: BUTTON_VARIANT_OBJ,
      size: {
        default: 'h-9 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
