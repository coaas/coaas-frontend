type NextKey = WithId & {
  joined_at: Timestamp;
};

export type Invitation = WithId & {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  expires_at: Timestamp;
};

export type RequestParams = {
  query?: string;
  limit?: number;
  after?: NextKey;
};

export type ResponseData = {
  invitations: Invitation[];
  nextKey: NextKey;
  hasMore?: boolean | null;
};
