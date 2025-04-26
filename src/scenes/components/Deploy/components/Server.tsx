import { Instance, Status } from '@scenes/components/Deploy/model/types.ts';
import { useMemo } from 'react';
import { clsx } from 'clsx';
import { convertStatus } from '@scenes/components/Deploy/model/static.ts';
import { Dollar } from '@scenes/components/Deploy/components/icons';
import type { Server as ServerType } from '../model/types.ts';

export const Server = ({
  status,
  name,
  cpu,
  ram,
  disk,
  id,
  instances,
  renderInstance,
}: {
  renderInstance: (instance: Instance) => React.ReactNode;
} & ServerType) => {
  const variants = {
    status: {
      [Status.ACTIVE]: 'text-green bg-green/20 border-green',
      [Status.LOADED]: 'text-orange bg-orange/20 border-orange',
      [Status.DIED]: 'text-error bg-error/20 border-error',
      [Status.UNKNOWN]: 'text-gray bg-gray/20 border-gray',
    },
  };

  const usage = useMemo(
    () =>
      instances.reduce(
        (acc, val) => {
          acc.cpu += val.cpu;
          acc.ram += val.ram;
          acc.disk += val.memory;
          return acc;
        },
        { cpu: 0, disk: 0, ram: 0 },
      ),
    [instances],
  );

  return (
    <div
      className="px-6 py-4 border border-stroke-gray-dark flex flex-col gap-2 rounded-lg"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(50,53,72,0.7), rgba(50,53,72,0.2))',
      }}
    >
      <div className="flex justify-between">
        <p>{id}</p>
        <div className="flex gap-1 items-center">
          <p
            className={clsx(
              'px-2 py-0.5  text-xxs border-solid border-2 rounded-sm font-bold uppercase',
              variants.status[status],
            )}
          >
            {convertStatus[status]}
          </p>
          <Dollar />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-blue text-xl font-bold">{name}</p>
        <div className="flex gap-2 text-blue-light text-xs">
          <p>
            CPU: {usage.cpu}/{cpu}
          </p>
          <p>
            RAM: {usage.ram}/{ram} GB
          </p>
          <p>
            Memory: {usage.disk}/{disk} GB
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">{instances.map(renderInstance)}</div>
    </div>
  );
};
