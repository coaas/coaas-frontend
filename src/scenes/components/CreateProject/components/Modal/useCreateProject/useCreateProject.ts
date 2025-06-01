import { useMutation } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants';
import { CreateProjectParams } from '@scenes/components/CreateProject/types';

import { UseCreateProjectParams } from './types';
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
        .json();

export const useCreateProject = ({
  onError,
  onSuccess,
  namespaceSlug,
}: UseCreateProjectParams) => {
  const createProjectMutation = useMutation({
    onSuccess: (_, params) => onSuccess(params),
    onError,
    mutationFn: (params: CreateProjectParams) =>
      mutationFn(params, namespaceSlug),
  });

  return createProjectMutation;
};
