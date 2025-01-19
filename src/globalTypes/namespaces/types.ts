export type NamespaceData = WithId & {
  name: string;
  slug: string;
  description: string;
  membersCount: number;
  createdAt: Timestamp;
};

export type CreateNamespaceDto = {
  slug: string;
  name: string;
  description: string;
};

export interface NamespaceWithProject {
  [key: string]: {
    id: string;
    name: string;
    projects: {
      [key: string]: {
        id: string;
        name: string;
      };
    };
  };
}
