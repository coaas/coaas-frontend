import { FC } from 'react';

import { SquareIconProps } from '@components/Icon/types';

export const ChevronDown: FC<SquareIconProps> = ({
  size,
  className,
  color = '#B6B6B6',
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 9 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.54175L4.5 4.45842L8 1.54175"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);
