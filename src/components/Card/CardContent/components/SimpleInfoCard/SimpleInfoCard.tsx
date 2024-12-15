import { FC } from 'react';

import { cn } from '@utils/styles';
import { CubeIcon } from '@icons/CubeIcon';

import { DEFAULT_SHAPE } from './constants';
import { SimpleInfoCardProps } from './types';

export const SimpleInfoCard: FC<SimpleInfoCardProps> = ({ data, settings }) => {
  const { title, subtitle } = data;
  const shape = settings?.shape || DEFAULT_SHAPE;

  const isRect = shape == 'rect';
  const iconSize = isRect ? 52 : 30;

  return (
    <div
      className={cn('flex', {
        'py-6 px-8 items-center': isRect,
        'p-5 flex-col': !isRect,
      })}
    >
      <CubeIcon size={iconSize} />
      <div
        className={cn('flex flex-col gap-1', {
          'ml-8': isRect,
          'mt-7': !isRect,
        })}
      >
        <p className="text-xl font-semibold text-white">{title}</p>
        {!!subtitle && <p className="text-base text-gray">{subtitle}</p>}
      </div>
    </div>
  );
};
