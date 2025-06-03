import { FC } from 'react';

import { SquareIconProps } from '@components/Icon/types';

export const LogoutIcon: FC<SquareIconProps> = ({
  size,
  className,
  color = '#507EF5',
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.33334 5.83333V4.16667C8.33334 3.72464 8.50894 3.30072 8.82151 2.98816C9.13407 2.67559 9.55799 2.5 10 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0119 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0119 17.0119C16.6993 17.3244 16.2754 17.5 15.8333 17.5H10C9.55799 17.5 9.13407 17.3244 8.82151 17.0119C8.50894 16.6993 8.33334 16.2754 8.33334 15.8333V14.1667M12.5 10H2.5M2.5 10L5.83334 6.66667M2.5 10L5.83334 13.3333"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
); 