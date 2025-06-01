import { FC } from 'react';
import { X } from 'lucide-react';

import { Input } from '@components/Input';

import { FieldProps } from './types';

export const Field: FC<FieldProps> = ({ fields, idx, onChange }) => {
  const onDelete = () => onChange(fields.filter((_, i) => i !== idx));

  const onKeyChange = (newValue: string) =>
    onChange(
      fields.map((field, i) =>
        i === idx ? { key: newValue, value: field.value } : field,
      ),
    );

  const onValueChange = (newValue: string) =>
    onChange(
      fields.map((field, i) =>
        i === idx ? { key: field.key, value: newValue } : field,
      ),
    );

  const currentField = fields[idx];

  return (
    <div className="flex gap-3">
      <div className="flex gap-1 items-center">
        <Input
          value={currentField.key}
          onChange={({ target: { value } }) => onKeyChange(value)}
        />
        <div className="font-medium text-sm text-white">=</div>
        <Input
          value={currentField.value}
          onChange={({ target: { value } }) => onValueChange(value)}
        />
      </div>
      <div
        onClick={onDelete}
        className="border-stroke-gray-dark border-[1px] rounded-md min-w-[42px] h-[42px] flex justify-center items-center cursor-pointer"
      >
        <X color="#B6B6B6" className="h-3 w-3" />
      </div>
    </div>
  );
};
