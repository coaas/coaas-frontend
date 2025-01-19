import { ProjectData } from '@globalTypes/projects';

type NextKey = WithId & {
  createdAt: Timestamp;
};

export type RequestParams = {
  query?: string;
  limit?: number;
  after?: NextKey;
};

export type ResponseData = {
  projects: ProjectData[];
  nextKey: NextKey;
  hasMore?: boolean | null;
};
