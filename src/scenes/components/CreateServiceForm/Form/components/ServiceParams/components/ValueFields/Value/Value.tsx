import { FC } from 'react';
import { X } from 'lucide-react';

import { Input } from '@components/Input';

import { ValueProps } from './types';

export const Value: FC<ValueProps> = ({ onValuesChange, values, idx }) => {
  const onDelete = () => onValuesChange(values.filter((_, i) => i !== idx));

  const onValueChange = (newValue: number) =>
    onValuesChange(values.map((value, i) => (i === idx ? newValue : value)));

  const currentValue = values[idx];

  return (
    <div className="flex gap-3">
      <Input
        type="number"
        min={0}
        value={currentValue}
        onChange={({ target: { value } }) => onValueChange(+value)}
      />
      <div
        onClick={onDelete}
        className="border-stroke-gray-dark border-[1px] rounded-md min-w-[42px] h-[42px] flex justify-center items-center cursor-pointer"
      >
        <X color="#B6B6B6" className="h-3 w-3" />
      </div>
    </div>
  );
};
