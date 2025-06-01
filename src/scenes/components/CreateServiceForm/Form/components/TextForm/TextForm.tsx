import { FC } from 'react';

import { TextFormProps } from './types';
import { TextField } from '../common';

export const TextForm: FC<TextFormProps> = ({ name, description }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <TextField label="Name" {...name} />
      <TextField label="Description" {...description} />
    </div>
  );
};
