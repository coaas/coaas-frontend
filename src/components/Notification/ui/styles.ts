import { cva } from 'class-variance-authority';
import { NotifiCationVariant } from '../types';

export const NotifiCationVariantDict: Record<NotifiCationVariant, string> = {
  success: 'bg-area border border-blue',
  error: 'bg-error border ',
};

export const NotificationVariants = cva(
  'w-full max-w-[300px] p-5 rounded-2xl flex justify-between  gap-5 fixed top-14 right-0',
  {
    variants: {
      variant: NotifiCationVariantDict,
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);
