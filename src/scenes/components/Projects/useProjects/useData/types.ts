import { ProjectData } from '@globalTypes/projects';

type NextKey = WithId & {
  created_at: Timestamp;
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
