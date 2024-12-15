import { FC } from 'react';

import { CardContentProps, CardType } from './types';
import { SimpleInfoCard } from './components';

export const CardContent: FC<CardContentProps> = props => {
  switch (props.type) {
    case CardType.simpleInfo:
      return <SimpleInfoCard {...props.props} />;

    default:
      return null;
  }
};
