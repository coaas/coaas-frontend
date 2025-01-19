import { ChangeEvent, FC, useState } from 'react';

import { Input } from '../Input';

export const Default: FC = () => {
  const [value, setValue] = useState('');

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setValue(value);

  const invalid = value.length > 3;

  return (
    <div className="p-10 bg-background">
      <Input value={value} onChange={onChange} invalid={invalid} />
    </div>
  );
};

const meta = {
  title: 'components/Input',
  component: Default,
};

export default meta;
