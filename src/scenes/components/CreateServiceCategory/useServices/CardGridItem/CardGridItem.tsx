import { FC } from 'react';
import { useParams } from 'react-router-dom';

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
  templates,
}) => {
  const { namespace_slug, project_slug } = useParams();
  const { name, description, id } = templates[idx];

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
      data-template={id}
      {...(id === 'postgresql-template' && {
        'data-tour': 'postgresql-template',
      })}
    >
      <NavLink
        to={`/namespaces/${namespace_slug}/projects/${project_slug}/services/new/${id}`}
      >
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
