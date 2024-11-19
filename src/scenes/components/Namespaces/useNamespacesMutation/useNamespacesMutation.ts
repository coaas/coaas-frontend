import { useMutation } from '@tanstack/react-query';

import { api } from '@api/constants';

import { ResponseData } from './types';

const ENDPOINT = 'health/check';

const mutationFn = () => api.get<ResponseData>(ENDPOINT).json();

export const useNamespacesMutation = () => {
  const { isPending, data, error, mutate } = useMutation({ mutationFn });

  return { mutate, isPending, data, error };
};
