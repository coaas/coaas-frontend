import { CreateProjectParams } from '@scenes/components/CreateProject/types';

export type CreatedProject = {
  id: string;
  slug: string;
  name: string;
  description: string;
  members_count: number;
  created_at: string;
};

export type UseCreateProjectParams = {
  onSuccess: (createdProject: CreatedProject) => void;
  onError: () => void;
  namespaceSlug?: string;
};
