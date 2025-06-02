import { FC } from 'react';
import { SquareIconProps } from '../../types';

export const MenuIcon: FC<SquareIconProps> = ({
  className,
  color = '#B6B6B6',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    className={className}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="6" r="2" fill={color} />
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="12" cy="18" r="2" fill={color} />
  </svg>
); 