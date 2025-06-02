import { FC } from 'react';
import { NavLink } from 'react-router-dom';

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
  const { name, description, slug } = projects[idx];

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
    <div
      className={cn(className, innerClassName)}
      data-tour={slug === 'web-app' ? 'demo-project-card' : undefined}
    >
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
