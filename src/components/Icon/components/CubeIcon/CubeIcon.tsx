import { FC } from 'react';

import { SquareIconProps } from '@components/Icon/types';

export const CubeIcon: FC<SquareIconProps> = ({
  size,
  className,
  color = '#507EF5',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 35 35"
    className={className}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M28.436 7.87 20.56 3.427a6.25 6.25 0 0 0-6.122 0L6.564 7.872A5.97 5.97 0 0 0 3.5 13.057v8.883a5.97 5.97 0 0 0 3.064 5.189l7.875 4.443a6.25 6.25 0 0 0 6.122 0l7.875-4.445a5.97 5.97 0 0 0 3.064-5.184V13.06a5.97 5.97 0 0 0-3.064-5.19M15.752 5.653a3.57 3.57 0 0 1 3.496 0l7.875 4.443q.205.115.389.254L18.2 15.038a1.79 1.79 0 0 1-1.642-.009L7.47 10.364q.19-.15.408-.27L15.75 5.65zM6.157 12.6a4 4 0 0 0-.032.459v8.883c0 1.223.667 2.353 1.75 2.964l7.875 4.445q.155.084.311.154V18.708a1.72 1.72 0 0 0-.922-1.507zm12.53 17.005q.29-.102.561-.256l7.875-4.443a3.41 3.41 0 0 0 1.752-2.964v-8.883q0-.236-.033-.47l-9.21 4.615a1.72 1.72 0 0 0-.946 1.521z"
      clipRule="evenodd"
    ></path>
  </svg>
);
