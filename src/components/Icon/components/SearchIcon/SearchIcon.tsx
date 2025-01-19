import { FC } from 'react';

import { SquareIconProps } from '../../types';

export const SearchIcon: FC<SquareIconProps> = ({
  className,
  color = '#fff',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    className={className}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9.167 15.833a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM17.5 17.5l-3.625-3.625"
    />
  </svg>
);
