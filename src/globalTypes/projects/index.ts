export type ProjectData = WithId & {
  name: string;
  slug: string;
  description: string;
  members_count: number;
  created_at: Timestamp;
};
