import { SimpleInfoCardProps } from './components';

export enum CardType {
  /**
   * Simple card with information (for project, namespace, etc.)
   */
  simpleInfo = 'simpleInfo',
}

export type CardContentProps = GenericProps<
  CardType.simpleInfo,
  SimpleInfoCardProps
>;
