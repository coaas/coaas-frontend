import { useMutation } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';
import { CreateProjectParams } from '@scenes/components/CreateProject/types';

import { UseCreateProjectParams, CreatedProject } from './types';
import { mockCreateProject } from './mocks';

const ENDPOINT = 'ProjectsManager/CreateProject';

const mutationFn = (params: CreateProjectParams, namespaceSlug?: string) =>
  IS_MOCK_ACTIVE
    ? mockCreateProject()
    : api
        .post(ENDPOINT, {
          body: JSON.stringify(params),
          headers: {
            'x-namespace-slug': namespaceSlug,
          },
        })
        .json<CreatedProject>();

export const useCreateProject = ({
  onError,
  onSuccess,
  namespaceSlug,
}: UseCreateProjectParams) => {
  const createProjectMutation = useMutation({
    onSuccess: async (createdProject: CreatedProject) => {
      console.log('Project created successfully:', createdProject);
      
      // Инвалидируем кеш навигации чтобы обновить список проектов в navbar
      console.log('Invalidating navbar cache...');
      await queryClient.invalidateQueries({ 
        queryKey: ['NamespacesManager/GetUserNamespacesAndProjectsList'],
        exact: true
      });
      
      // Также инвалидируем кеш списка проектов для текущего namespace
      if (namespaceSlug) {
        console.log(`Invalidating projects cache for namespace: ${namespaceSlug}`);
        await queryClient.invalidateQueries({ 
          predicate: (query) => {
            return query.queryKey[0] === `${namespaceSlug}_projects`;
          }
        });
      }
      
      console.log('Cache invalidation completed');
      onSuccess(createdProject);
    },
    onError,
    mutationFn: (params: CreateProjectParams) =>
      mutationFn(params, namespaceSlug),
  });

  return createProjectMutation;
};
