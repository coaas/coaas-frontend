import { SimpleInfoCardProps } from './components';

type GenericCardContentProps<TType, TProps> = {
  type: TType;
  props: TProps;
};

export enum CardType {
  /**
   * Простая карточка с информацией (как для проекта, неймспейса и тд)
   */
  simpleInfo = 'simpleInfo',
}

export type CardContentProps = GenericCardContentProps<
  CardType.simpleInfo,
  SimpleInfoCardProps
>;
