import { FC } from 'react';

import { cn } from '@utils/styles';

import { CardProps } from './types';
import { CardContent } from './CardContent';
import { COLOR_MODE_MAP, DEFAULT_COLOR_MODE } from './constants';

export const Card: FC<CardProps> = ({
  Wrapper,
  settings,
  className,
  ...restProps
}) => {
  const colorMode = settings?.colorMode || DEFAULT_COLOR_MODE;

  return (
    <Wrapper
      className={cn('rounded-xl border', COLOR_MODE_MAP[colorMode], className)}
    >
      <CardContent {...restProps} />
    </Wrapper>
  );
};
