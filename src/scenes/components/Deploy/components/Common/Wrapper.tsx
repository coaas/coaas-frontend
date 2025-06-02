import { HTMLAttributes } from 'react';

export const Wrapper = ({ 
  children, 
  ...restProps 
}: { 
  children: React.ReactNode 
} & HTMLAttributes<HTMLDivElement>) => {
  return <div className="flex flex-col w-full gap-10" {...restProps}>{children}</div>;
};
