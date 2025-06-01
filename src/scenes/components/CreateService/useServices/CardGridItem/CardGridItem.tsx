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
  categories,
}) => {
  const { key: id, value: title } = categories[idx];

  const cardPropsData: SimpleInfoCardProps = {
    data: {
      title,
    },
  };

  const CardWrapperComponent: CardWrapper = ({
    className: innerClassName,
    children,
  }) => (
    <div className={cn(className, innerClassName)}>
      <NavLink to={id} state={{ title }}>
        {children}
      </NavLink>
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
