import { FC, useState } from 'react';

import { Search } from '../Search';

export const Default: FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="bg-background p-10">
      <Search
        initValue={value}
        onChange={setValue}
        config={{
          placeholder: 'Можно передать кастомный placeholder',
          delay: 1000 * 1.5,
        }}
      />
      <p className="text-2xl font-semibold text-white mt-5">{`Debounced value: ${value}`}</p>
    </div>
  );
};

const meta = {
  title: 'components/Search',
  component: Default,
};

export default meta;
