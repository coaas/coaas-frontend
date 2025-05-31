import { ServiceData } from '@globalTypes/services';

type NextKey = WithId;

export type RequestParams = {
  query?: string;
  limit?: number;
  after?: NextKey;
};

export type ResponseData = {
  services: ServiceData[];
  nextKey: NextKey;
  hasMore?: boolean | null;
};

export type SlugsParams = {
  namespace_slug?: string;
  project_slug?: string;
};
