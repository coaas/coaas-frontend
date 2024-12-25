import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@utils/styles';

export const ModalHeader: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ className, ...props }) => (
  <div className={cn('sm:text-left mb-5', className)} {...props} />
);
