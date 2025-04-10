import { useMutation } from '@tanstack/react-query';

import { IS_MOCK_ACTIVE } from '@api/constants';

import {
  GetIsSlugExist,
  ResponseData,
  UseCheckSlugMutationParams,
} from './types';

const mutationFn = (
  slug: string,
  getIsSlugExist: GetIsSlugExist,
): Promise<ResponseData> => {
  if (IS_MOCK_ACTIVE) {
    return new Promise(resolve =>
      setTimeout(() => resolve({ success: Math.random() > 0.5 }), 1000),
    );
  }

  return getIsSlugExist(slug);
};

export const useCheckSlugMutation = ({
  setIsSlugValid,
  getIsSlugExist,
}: UseCheckSlugMutationParams) =>
  useMutation({
    mutationFn: (slug: string) => mutationFn(slug, getIsSlugExist),
    onSuccess: ({ success }) => setIsSlugValid(!success),
    onError: () => setIsSlugValid(false),
  });
