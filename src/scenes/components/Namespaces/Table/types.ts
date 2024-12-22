import { TableProps as TableComponentProps } from '@components/Table';
import { NamespaceData } from '@globalTypes/namespaces';

export type TableProps = Pick<
  TableComponentProps,
  'fetchNextPage' | 'isLoading'
> & {
  namespaces: NamespaceData[];
};
