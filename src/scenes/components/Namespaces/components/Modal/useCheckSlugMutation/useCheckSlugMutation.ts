import { useMutation } from '@tanstack/react-query';

import { UseCheckSlugMutationParams } from './types';
import { api, IS_MOCK_ACTIVE } from '@api/constants';

const ENDPOINT = 'api/NamespacesManager/NamespaceSlugExists';

const mutationFn = (slug: string) => {
  if (IS_MOCK_ACTIVE) {
    return new Promise((resolve, reject) =>
      setTimeout(() => (Math.random() > 0.5 ? resolve({}) : reject()), 1000),
    );
  }

  return api.post(ENDPOINT, {
    body: JSON.stringify({ slug }),
  });
};

export const useCheckSlugMutation = ({
  onSuccess,
  onError,
}: UseCheckSlugMutationParams) =>
  useMutation({
    mutationFn,
    onSuccess,
    onError,
  });
