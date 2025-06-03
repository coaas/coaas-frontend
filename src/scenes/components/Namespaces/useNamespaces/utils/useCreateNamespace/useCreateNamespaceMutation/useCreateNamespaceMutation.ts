import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';
import { useMutation } from '@tanstack/react-query';

import { CreateNamespaceParams } from '@scenes/components/Namespaces/types';

import { UseCreateNamespaceParams, CreatedNamespace } from './types';
import { mockCreateNamespace } from './mocks';

const ENDPOINT = 'NamespacesManager/CreateNamespace';

const mutationFn = (params: CreateNamespaceParams) =>
  IS_MOCK_ACTIVE
    ? mockCreateNamespace()
    : api
        .post(ENDPOINT, {
          body: JSON.stringify(params),
        })
        .json<CreatedNamespace>();

export const useCreateNamespaceMutation = ({
  onError,
  onSuccess,
}: UseCreateNamespaceParams) => {
  const createNamespaceMutation = useMutation({
    onSuccess: async (createdNamespace: CreatedNamespace) => {
      console.log('Namespace created successfully:', createdNamespace);
      
      // Инвалидируем кеш навигации чтобы обновить список namespace'ов в navbar
      console.log('Invalidating navbar cache...');
      await queryClient.invalidateQueries({ 
        queryKey: ['NamespacesManager/GetUserNamespacesAndProjectsList'],
        exact: true
      });
      
      // Также инвалидируем кеш списка namespace'ов
      console.log('Invalidating namespaces cache...');
      await queryClient.invalidateQueries({ 
        predicate: (query) => {
          return query.queryKey[0] === 'namespaces';
        }
      });
      
      console.log('Cache invalidation completed');
      onSuccess(createdNamespace);
    },
    onError,
    mutationFn,
  });

  return createNamespaceMutation;
};
