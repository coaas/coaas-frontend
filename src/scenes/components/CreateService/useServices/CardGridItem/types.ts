import { LazyGridItemProps } from '@components/LazyGrid';
import { CategoryData } from '@globalTypes/categories';

export type CardGridItemProps = LazyGridItemProps & {
  categories: CategoryData[];
};
