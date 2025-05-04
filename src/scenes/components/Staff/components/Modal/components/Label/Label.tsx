import { FC } from 'react';

import { LabelProps } from './types';

export const Label: FC<LabelProps> = ({ id, label }) => (
  <label htmlFor={id} className="mb-1 font-medium text-sm text-white">
    {label}
  </label>
);
