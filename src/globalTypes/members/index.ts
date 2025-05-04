type UserData = WithId & {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type MemberData = WithId & {
  user: UserData;
  is_fired: boolean;
  joined_at: Timestamp;
};
