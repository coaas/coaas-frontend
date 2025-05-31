import { TableProps as TableComponentProps } from '@components/Table';
import { ServiceData } from '@globalTypes/services';

export type TableProps = Pick<
  TableComponentProps,
  'fetchNextPage' | 'isLoading' | 'isLoadingNextPage'
> & {
  services: ServiceData[];
};
