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
  namespaces,
}) => {
  const { name, description, slug } = namespaces[idx];

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
      <NavLink to={slug}>{children}</NavLink>
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
