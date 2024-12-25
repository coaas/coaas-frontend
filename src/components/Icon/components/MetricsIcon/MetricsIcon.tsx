import { FC } from 'react';

import { SquareIconProps } from '@components/Icon/types';

export const MetricsIcon: FC<SquareIconProps> = ({
  className,
  size,
  color = '#fff',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    className={className}
  >
    <path
      fill={color}
      d="M15.06 8.498a.75.75 0 0 0-1.12-.996l-2.358 2.776a.25.25 0 0 1-.347.026L9.681 9.008a1.75 1.75 0 0 0-2.358.107L4.97 11.47a.75.75 0 1 0 1.06 1.06l2.355-2.354a.25.25 0 0 1 .336-.015l1.555 1.295a1.75 1.75 0 0 0 2.428-.182l2.356-2.776Z"
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M15.5 2h-11A3.5 3.5 0 0 0 1 5.5v9A3.5 3.5 0 0 0 4.5 18h11a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 15.5 2Zm-13 3.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Z"
      clipRule="evenodd"
    />
  </svg>
);
