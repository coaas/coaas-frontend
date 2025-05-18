import { clsx } from 'clsx';

import { Status } from '../../model/cluster.types.ts';
import { ServerType } from '../../model/dataCenter.types.ts';

type AchieveProps = {
  size: 'xxs' | 'lg';
  children: React.ReactNode;
} & ({ status: Status } | { serverType: ServerType });

export const Achieve = ({
  children,
  size,
  ...props
}: Readonly<AchieveProps>) => {
  const variants = {
    status: {
      [Status.ACTIVE]: 'text-green bg-green/20 border-green',
      [Status.LOADED]: 'text-orange bg-orange/20 border-orange',
      [Status.DIED]: 'text-error bg-error/20 border-error',
      [Status.UNKNOWN]: 'text-gray bg-gray/20 border-gray',
    },
    serverType: {
      [ServerType.PURCHASED]: 'text-blue bg-blue/20 border-blue',
      [ServerType.PERSONAL]: 'text-violet bg-violet/20 border-violet',
      [ServerType.SHARED]:
        'text-stroke-gray-base bg-stroke-gray-base/20 border-stroke-gray-base',
    },
    size: {
      xxs: 'text-xxs',
      lg: 'text-xs',
    },
  };

  return (
    <p
      className={clsx(
        'px-2 py-0.5 border-solid border-2 rounded-sm font-bold uppercase',
        'status' in props
          ? variants.status[props.status]
          : variants.serverType[props.serverType],
        variants.size[size],
      )}
    >
      {children}
    </p>
  );
};
