import { FC } from 'react';

import { ServiceParamsProps } from './types';
import { KeyValueFields, ValueFields } from './components';

export const ServiceParams: FC<ServiceParamsProps> = ({ vars, ports }) => (
  <div className="flex flex-col gap-5 w-full">
    <h3 className="font-semibold text-xl text-white">Configure service</h3>
    <KeyValueFields
      fields={vars.values}
      onChange={vars.onChange}
      label="Env variables"
    />
    <ValueFields
      label="Ports"
      values={ports.values}
      onValuesChange={ports.onChange}
    />
  </div>
);
