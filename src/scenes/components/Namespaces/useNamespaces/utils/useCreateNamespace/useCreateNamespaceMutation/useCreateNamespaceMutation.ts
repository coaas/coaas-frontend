import { api, IS_MOCK_ACTIVE } from '@api/constants';
import { useMutation } from '@tanstack/react-query';

import { CreateNamespaceParams } from '@scenes/components/Namespaces/types';

import { UseCreateNamespaceParams } from './types';
import { mockCreateNamespace } from './mocks';

const ENDPOINT = 'api/NamespacesManager/CreateNamespace';

const mutationFn = (params: CreateNamespaceParams) =>
  IS_MOCK_ACTIVE
    ? mockCreateNamespace()
    : api
        .post(ENDPOINT, {
          body: JSON.stringify(params),
        })
        .json();

export const useCreateNamespaceMutation = ({
  onError,
  onSuccess,
}: UseCreateNamespaceParams) => {
  const createNamespaceMutation = useMutation({
    onSuccess: (_, params) => onSuccess(params),
    onError,
    mutationFn,
  });

  return createNamespaceMutation;
};
