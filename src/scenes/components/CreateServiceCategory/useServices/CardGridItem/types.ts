import { LazyGridItemProps } from '@components/LazyGrid';
import { Info } from '@globalTypes/templates.draft.get';

export type CardGridItemProps = LazyGridItemProps & {
  templates: Info[];
};
