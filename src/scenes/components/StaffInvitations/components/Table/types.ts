import { TableProps as TableComponentProps } from '@components/Table';

import { Invitation } from '../../useIvitations/useData/types';

export type TableProps = Pick<
  TableComponentProps,
  'fetchNextPage' | 'isLoading' | 'isLoadingNextPage'
> & {
  invitations: Invitation[];
  resendInvitation: (i: Invitation) => void;
};
