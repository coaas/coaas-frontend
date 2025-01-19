import { FC } from 'react';

import {
  Card,
  CardType,
  SimpleInfoCardProps,
  CardWrapper,
} from '@components/Card';
import { cn } from '@utils/styles';

import { CardGridItemProps } from './types';

export const CardGridItem: FC<CardGridItemProps> = ({
  className,
  idx,
  projects,
}) => {
  const { name, description } = projects[idx];

  const cardPropsData: SimpleInfoCardProps = {
    data: {
      title: name,
      subtitle: description,
    },
  };

  const CardWrapperComponent: CardWrapper = ({
    className: innerClassName,
    children,
  }) => <div className={cn(className, innerClassName)}>{children}</div>;

  return (
    <Card
      type={CardType.simpleInfo}
      props={cardPropsData}
      Wrapper={CardWrapperComponent}
    />
  );
};
