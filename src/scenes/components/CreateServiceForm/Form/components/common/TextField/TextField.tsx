import { FC } from 'react';

import { TextFieldProps } from './types';
import { cn } from '@utils/styles';
import { Input } from '@components/Input';

export const TextField: FC<TextFieldProps> = ({
  onChange,
  label,
  value,
  orientation = 'horizontal',
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn('w-full flex', {
        'justify-between items-center': isHorizontal,
        'flex-col gap-1': !isHorizontal,
      })}
    >
      <label className="text-white font-medium text-sm">{label}</label>
      <Input
        className={cn({
          'w-[484px]': isHorizontal,
          'w-full': !isHorizontal,
        })}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </div>
  );
};
