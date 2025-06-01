import { LazyGridItemProps } from '@components/LazyGrid';
import { ServiceData } from '@globalTypes/services';

export type CardGridItemProps = LazyGridItemProps & {
  services: ServiceData[];
};
