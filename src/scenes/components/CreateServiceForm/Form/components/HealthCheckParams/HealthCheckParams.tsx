import { FC } from 'react';

import { NumField, TextField } from '../common';
import { HealthCheckParamsProps } from './types';

export const HealthCheckParams: FC<HealthCheckParamsProps> = ({
  test,
  interval,
  timeout,
  retries,
  startPeriod,
}) => (
  <div className="flex flex-col gap-5 w-full">
    <h3 className="font-semibold text-xl text-white">Configure service</h3>
    <TextField label="Test" value={test.value} onChange={test.onChange} />
    <NumField
      label="Interval"
      value={interval.value}
      onChange={interval.onChange}
    />
    <NumField
      label="Timeout"
      value={timeout.value}
      onChange={timeout.onChange}
    />
    <NumField
      label="Retries"
      value={retries.value}
      onChange={retries.onChange}
    />
    <NumField
      label="Start Period"
      value={startPeriod.value}
      onChange={startPeriod.onChange}
    />
  </div>
);
