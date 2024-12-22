import { LazyGridItemProps } from '@components/LazyGrid';
import { NamespaceData } from '@globalTypes/namespaces';

export type CardGridItemProps = LazyGridItemProps & {
  namespaces: NamespaceData[];
};
