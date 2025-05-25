import { clsx } from 'clsx';

import { Status } from '../../model/cluster.types.ts';
import { ServerType } from '../../model/dataCenter.types.ts';

type AchieveProps = {
  size: 'xxs' | 'lg';
  children: React.ReactNode;
  rounded?: 'sm' | 'md';
} & (
  | { status: Status }
  | { serverType: ServerType }
  | { color: 'blue' | 'gray' | 'red' }
);

export const Achieve = ({
  children,
  size,
  rounded = 'sm',
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
    color: {
      blue: 'text-blue bg-blue/20 border-blue',
      gray: 'text-stroke-gray-darker bg-stroke-gray-darker/20 border-stroke-gray-darker',
      red: 'text-error bg-error/20 border-error',
    },
    size: {
      xxs: 'text-xxs',
      lg: 'text-xs',
    },
    rounded: {
      sm: 'rounded-sm border-2 font-bold',
      md: 'rounded-md border-[1px] font-medium',
    },
  };

  return (
    <p
      className={clsx(
        'px-2 py-0.5 border-solid uppercase',
        'status' in props
          ? variants.status[props.status]
          : 'serverType' in props
            ? variants.serverType[props.serverType]
            : variants.color[props.color],
        variants.size[size],
        variants.rounded[rounded],
      )}
    >
      {children}
    </p>
  );
};
