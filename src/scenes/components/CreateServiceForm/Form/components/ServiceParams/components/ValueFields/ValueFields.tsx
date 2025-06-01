import { FC } from 'react';

import { Button } from '@components/Button';

import { ValueFieldsProps } from './types';
import { Value } from './Value';

export const ValueFields: FC<ValueFieldsProps> = ({
  label,
  onValuesChange,
  values,
}) => (
  <div className="flex w-full justify-between">
    <label className="text-white font-medium text-sm">{label}</label>
    <div className="w-[484px] flex flex-col gap-3">
      <>
        {values.map((_, idx) => (
          <Value values={values} onValuesChange={onValuesChange} idx={idx} />
        ))}
      </>
      <Button
        variant="secondary"
        className="w-[160px]"
        onClick={() => onValuesChange([...values, '3000'])}
      >
        Add port
      </Button>
    </div>
  </div>
);
