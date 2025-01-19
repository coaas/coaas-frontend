export type ProjectData = WithId & {
  name: string;
  slug: string;
  description: string;
  membersCount: number;
  createdAt: Timestamp;
};
