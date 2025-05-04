import { MemberData } from '@globalTypes/members';

type NextKey = WithId & {
  joined_at: Timestamp;
};

export type RequestParams = {
  is_fired: boolean;
  query?: string;
  limit?: number;
  after?: NextKey;
};

export type ResponseData = {
  members: MemberData[];
  nextKey: NextKey;
  hasMore?: boolean | null;
};
