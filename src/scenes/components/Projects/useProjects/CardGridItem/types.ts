import { LazyGridItemProps } from '@components/LazyGrid';
import { ProjectData } from '@globalTypes/projects';

export type CardGridItemProps = LazyGridItemProps & {
  projects: ProjectData[];
};
