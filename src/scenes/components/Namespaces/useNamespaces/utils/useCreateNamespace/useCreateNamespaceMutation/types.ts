import { CreateNamespaceParams } from '@scenes/components/Namespaces/types';

export type CreatedNamespace = {
  id: string;
  slug: string;
  name: string;
  description: string;
  members_count: number;
  created_at: string;
};

export type UseCreateNamespaceParams = {
  onSuccess: (createdNamespace: CreatedNamespace) => void;
  onError: () => void;
};
