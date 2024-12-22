import { NamespaceData } from '@globalTypes/namespaces';

type NextKey = WithId;

export type RequestParams = {
  query?: string;
  limit?: number;
  after?: NextKey;
};

export type ResponseData = {
  namespaces: NamespaceData[];
  nextKey: NextKey;
  hasMore?: boolean | null;
};
