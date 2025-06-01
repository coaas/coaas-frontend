import { CategoryData } from '@globalTypes/categories';

export type ResponseData = {
  categories: CategoryData[];
};

export type SlugsParams = {
  namespace_slug?: string;
  project_slug?: string;
};
