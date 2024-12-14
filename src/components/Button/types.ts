import { ButtonHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';

import { BUTTON_VARIANTS } from './constants';

export type ButtonProps = {
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof BUTTON_VARIANTS>;
