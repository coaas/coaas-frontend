import { useMutation } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants';

import { ResponseData, UseCheckSlugMutationParams } from './types';

const ENDPOINT = 'NamespacesManager/NamespaceSlugExists';

const mutationFn = (slug: string): Promise<ResponseData> => {
  if (IS_MOCK_ACTIVE) {
    return new Promise(resolve =>
      setTimeout(() => resolve({ success: Math.random() > 0.5 }), 1000),
    );
  }

  return api
    .post(ENDPOINT, {
      body: JSON.stringify({ slug }),
    })
    .json<ResponseData>();
};

export const useCheckSlugMutation = ({
  setIsSlugValid,
}: UseCheckSlugMutationParams) =>
  useMutation({
    mutationFn,
    onSuccess: ({ success }) => setIsSlugValid(!success),
    onError: () => setIsSlugValid(false),
  });
