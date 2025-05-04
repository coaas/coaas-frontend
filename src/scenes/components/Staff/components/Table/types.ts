import { MemberData } from '@globalTypes/members';
import { TableProps as TableComponentProps } from '@components/Table';

export type TableProps = Pick<
  TableComponentProps,
  'fetchNextPage' | 'isLoading' | 'isLoadingNextPage'
> & {
  members: MemberData[];
};
