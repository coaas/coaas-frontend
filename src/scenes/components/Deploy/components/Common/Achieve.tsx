import { clsx } from 'clsx';
import { Status } from '@scenes/components/Deploy/model/types.ts';

type AchieveProps = {
  status: Status;
  size: 'xxs' | 'lg';
  children: React.ReactNode;
};

export const Achieve = ({ status, children, size }: Readonly<AchieveProps>) => {
  const variants = {
    status: {
      [Status.ACTIVE]: 'text-green bg-green/20 border-green',
      [Status.LOADED]: 'text-orange bg-orange/20 border-orange',
      [Status.DIED]: 'text-error bg-error/20 border-error',
      [Status.UNKNOWN]: 'text-gray bg-gray/20 border-gray',
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
        variants.status[status],
        variants.size[size],
      )}
    >
      {children}
    </p>
  );
};
