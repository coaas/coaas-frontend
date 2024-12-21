import { SimpleInfoCardProps } from './components';

export enum CardType {
  /**
   * Простая карточка с информацией (как для проекта, неймспейса и тд)
   */
  simpleInfo = 'simpleInfo',
}

export type CardContentProps = GenericProps<
  CardType.simpleInfo,
  SimpleInfoCardProps
>;
