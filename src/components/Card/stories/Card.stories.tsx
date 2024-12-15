import { FC } from 'react';

import { Card } from '../Card';
import { CardType } from '../CardContent';
import { CardWrapper } from '../types';
import { rectData, squareData } from './mocks';

const Wrapper: CardWrapper = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SimpleInfoCard: FC = () => (
  <div className="py-10 px-8 bg-background">
    <Card
      Wrapper={Wrapper}
      settings={{ colorMode: 'transparent' }}
      type={CardType.simpleInfo}
      props={rectData}
    />
    <Card
      Wrapper={Wrapper}
      type={CardType.simpleInfo}
      props={squareData}
      className="mt-8 w-[300px]"
    />
  </div>
);

const meta = {
  title: 'components/Card',
  component: SimpleInfoCard,
};

export default meta;
