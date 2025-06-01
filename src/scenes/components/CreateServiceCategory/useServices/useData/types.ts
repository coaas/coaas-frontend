import { Info } from '@globalTypes/templates.draft.get';

export type ResponseData = {
  templates: Info[];
};

export type RequestParams = {
  category?: string;
};

export type SlugsParams = {
  namespace_slug?: string;
  project_slug?: string;
};
