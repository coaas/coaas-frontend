import { FC } from 'react';

import {
  Card,
  CardType,
  SimpleInfoCardProps,
  CardWrapper,
} from '@components/Card';
import { cn } from '@utils/styles';

import { CardGridItemProps } from './types';
import { NavLink } from 'react-router-dom';

export const CardGridItem: FC<CardGridItemProps> = ({
  className,
  idx,
  services,
}) => {
  const { name, description, id } = services[idx];

  const cardPropsData: SimpleInfoCardProps = {
    data: {
      title: name,
      subtitle: description,
    },
  };

  const CardWrapperComponent: CardWrapper = ({
    className: innerClassName,
    children,
  }) => (
    <div className={cn(className, innerClassName)}>
      <NavLink to={id}>{children}</NavLink>
    </div>
  );

  return (
    <Card
      type={CardType.simpleInfo}
      props={cardPropsData}
      Wrapper={CardWrapperComponent}
    />
  );
};
