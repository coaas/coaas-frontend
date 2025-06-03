import { OnFormSubmit } from '@scenes/components/Namespaces/components';

import { useCreateNamespaceMutation } from './useCreateNamespaceMutation';
import { UseCreateNamespaceParams } from './types';

export const useCreateNamespace = ({ refetch }: UseCreateNamespaceParams) => {
  const createNamespaceMutation = useCreateNamespaceMutation({
    onError: () => console.log('error'),
    onSuccess: createdNamespace => {
      console.log('newNamespace', createdNamespace);
      refetch();
    },
  });

  const onFormSubmit: OnFormSubmit = createNamespaceMutation.mutate;

  return { onFormSubmit };
};
