import { Status } from '@scenes/components/Deploy/model/cluster.types.ts';
import { clsx } from 'clsx';
import type { Instance as InstanceType } from '../../model/cluster.types.ts';

export const Instance = ({
  status,
  cpu,
  ram,
  service: { name },
}: InstanceType) => {
  const variants = {
    color: {
      [Status.ACTIVE]: 'bg-green/20 border-green',
      [Status.LOADED]: 'bg-orange/20 border-orange',
      [Status.DIED]: 'bg-error/20 border-error',
      [Status.UNKNOWN]: 'bg-gray/20 border-gray',
    },
    text: {
      [Status.ACTIVE]: 'text-green',
      [Status.LOADED]: 'text-orange',
      [Status.DIED]: 'text-error',
      [Status.UNKNOWN]: 'text-gray',
    },
  };

  return (
    <div
      className={clsx(
        'w-[334px] h-[52px] py-4 px-6 rounded-lg border',
        variants.color[status],
      )}
    >
      <div className="flex justify-between items-center">
        <p className={variants.text[status]}>{name}</p>
        <div className="flex gap-2 text-sm">
          <p>CPU: {cpu}</p>
          <p>RAM: {ram}</p>
        </div>
      </div>
    </div>
  );
};
