import { FC } from 'react';

import { NumFieldProps } from './types';
import { cn } from '@utils/styles';
import { Input } from '@components/Input';

export const NumField: FC<NumFieldProps> = ({
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
        type="number"
        min={0}
        onChange={({ target: { value } }) => onChange(+value)}
      />
    </div>
  );
};
