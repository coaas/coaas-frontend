import { TableProps as TableComponentProps } from '@components/Table';
import { ProjectData } from '@globalTypes/projects';

export type TableProps = Pick<
  TableComponentProps,
  'fetchNextPage' | 'isLoading' | 'isLoadingNextPage'
> & {
  projects: ProjectData[];
};
