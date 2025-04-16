import { cva } from 'class-variance-authority';

export type ButtonVariant = 'red' | 'blue' | 'preview';

export const ButtonVariantDict: Record<ButtonVariant, string> = {
  red: 'border-error text-error hover:bg-error hover:text-white',
  blue: 'border-stroke-blue bg-blue text-white  hover:bg-blue-lighter hover:border-blue-lighter',
  preview: 'border-area bg-area text-white cursor-initial',
};

export const ButtonVariants = cva(
  'border-[1.5px] py-2 w-full font-inter font-medium text-sm leading-6 rounded-md transition-colors text-center',
  {
    variants: {
      variant: ButtonVariantDict,
    },
    defaultVariants: {
      variant: 'blue',
    },
  },
);
