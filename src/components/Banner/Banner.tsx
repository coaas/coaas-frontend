import { FC } from 'react';

import { cn } from '@utils/styles';
import { Button } from '@components/Button';

import { BannerProps } from './types';

export const Banner: FC<BannerProps> = ({
  title,
  subtitle,
  className,
  buttons,
}) => (
  <div
    className={cn(
      'bg-area-dark rounded-lg p-7 border-stroke border-[1.5px]',
      className,
    )}
  >
    <div className="bg-net bg-right bg-no-repeat">
      <h4 className="font-semibold text-3xl text-blue">{title}</h4>
      {!!subtitle && (
        <p className="font-normal text-base text-white whitespace-pre mt-3 max-w-[70%]">
          {subtitle}
        </p>
      )}
      {!!buttons?.length && (
        <div className="flex gap-3 mt-6">
          {buttons.map((buttonData, idx) => (
            <Button
              key={idx}
              onClick={buttonData.onClick}
              variant={buttonData.variant}
            >
              {buttonData.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  </div>
);
