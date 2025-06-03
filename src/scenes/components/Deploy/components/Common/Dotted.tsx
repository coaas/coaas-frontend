import { ClusterType } from '../../model/cluster.types.ts';
import { HTMLAttributes } from 'react';

export const Dotted = ({
  children,
  isHidden,
  type = ClusterType.SERVERS,
  ...restProps
}: {
  children: React.ReactNode;
  type?: ClusterType;
  isHidden?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const variants = {
    strokeType: {
      [ClusterType.REGIONS]: 'white',
      [ClusterType.SERVERS]: '#507EF5',
    },
  };

  if (isHidden) {
    return (
      <div className="w-full flex flex-col items-start gap-4" {...restProps}>
        {children}
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-sm p-8 flex flex-col items-start gap-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${encodeURIComponent(variants.strokeType[type])}' stroke-width='2' stroke-dasharray='54%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};
