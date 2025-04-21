import { cva } from 'class-variance-authority';

export type ButtonVariant = 'red' | 'blue' | 'preview' | 'unfilled';

export type ButtonSize = 'sm' | 'lg';

export const ButtonVariantDict: Record<ButtonVariant, string> = {
  red: 'border-error text-error hover:bg-error hover:text-white',
  blue: 'border-stroke-blue bg-blue text-white  hover:bg-blue-lighter hover:border-blue-lighter',
  unfilled:
    'border-stroke-blue bg-transparent text-blue  hover:border-blue-lighter ',
  preview: 'border-area-dark bg-area-dark text-white cursor-initial',
};

export const ButtonSizes: Record<ButtonSize, string> = {
  lg: 'py-2 text-sm leading-6',
  sm: 'py-[4.5px] px-5 text-[12px] leading-none',
};

export const ButtonVariants = cva(
  'border-[1.5px]  w-full font-inter font-medium rounded-md transition-colors text-center',
  {
    variants: {
      variant: ButtonVariantDict,
      size: ButtonSizes,
    },
    defaultVariants: {
      variant: 'blue',
      size: 'lg',
    },
  },
);
