import { CreateNamespaceParams } from '@scenes/components/Namespaces/types';

export type UseCreateNamespaceParams = {
  onSuccess: (namespaceParams: CreateNamespaceParams) => void;
  onError: () => void;
};
