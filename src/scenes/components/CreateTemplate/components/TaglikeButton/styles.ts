import { cva } from 'class-variance-authority';

export type ButtonVariant = 'slate' | 'blue';

export const ButtonVariantDict: Record<ButtonVariant, string> = {
  slate:
    'px-3 py-[6px] border border-stroke-gray-dark text-white [&_span]:text-white [&_svg]:text-stroke-gray-dark ',
  blue: 'px-3 py-[6px] bg-area  text-white [&_span]:text-blue-soft [&_svg]:text-blue-soft ',
};

export const ButtonVariants = cva(
  'flex items-center gap-[15px]  rounded-[6px]',
  {
    variants: {
      variant: ButtonVariantDict,
    },
    defaultVariants: {
      variant: 'slate',
    },
  },
);
