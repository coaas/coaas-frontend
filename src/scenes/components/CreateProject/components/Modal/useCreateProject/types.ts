import { CreateProjectParams } from '@scenes/components/CreateProject/types';

export type UseCreateProjectParams = {
  onSuccess: (params: CreateProjectParams) => void;
  onError: () => void;
  namespaceSlug?: string;
};
