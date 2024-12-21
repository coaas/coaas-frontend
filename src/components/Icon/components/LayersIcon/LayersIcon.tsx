import { FC } from 'react';

import { SquareIconProps } from '@components/Icon/types';

export const LayersIcon: FC<SquareIconProps> = ({
  size,
  className,
  color = '#B6B6B6',
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
      fillRule="evenodd"
      d="M8.656 1.408 2.59 5.455c-1.453.97-1.453 3.12 0 4.09l.683.455-.683.456c-1.453.97-1.453 3.119 0 4.088l6.066 4.048a2.42 2.42 0 0 0 2.688 0l6.066-4.047c1.453-.97 1.453-3.12 0-4.09L16.727 10l.683-.456c1.453-.97 1.453-3.119 0-4.089l-6.066-4.047a2.42 2.42 0 0 0-2.688 0Zm6.72 9.494-4.032 2.69a2.42 2.42 0 0 1-2.688 0l-4.032-2.69-1.201.801a.964.964 0 0 0 0 1.594l6.065 4.047a.92.92 0 0 0 1.024 0l6.065-4.047a.962.962 0 0 0 0-1.594l-1.201-.801ZM3.423 8.297a.962.962 0 0 1 0-1.594l6.065-4.047a.92.92 0 0 1 1.024 0l6.065 4.047a.963.963 0 0 1 0 1.594l-6.065 4.047a.92.92 0 0 1-1.024 0L3.423 8.297Z"
      clipRule="evenodd"
    />
  </svg>
);
