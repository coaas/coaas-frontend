import { FC } from 'react';

import { Button } from '@components/Button';

import { KeyValueFieldsProps } from './types';
import { Field } from './Field';

export const KeyValueFields: FC<KeyValueFieldsProps> = ({
  fields,
  label,
  onChange,
}) => (
  <div className="flex w-full justify-between">
    <label className="text-white font-medium text-sm">{label}</label>
    <div className="w-[484px] flex flex-col gap-3">
      <>
        {fields.map((_, idx) => (
          <Field fields={fields} onChange={onChange} idx={idx} />
        ))}
      </>
      <Button
        variant="secondary"
        className="w-[160px]"
        onClick={() => onChange([...fields, { key: '', value: '' }])}
      >
        Add var
      </Button>
    </div>
  </div>
);
