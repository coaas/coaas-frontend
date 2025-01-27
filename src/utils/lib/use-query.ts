import { api } from '@api/constants';
import {
  useQuery as useQueryBase,
  UseQueryOptions,
} from '@tanstack/react-query';

type UseQueryParams<TData, TBody> = {
  query: Query<TData, TBody>;
  body?: TBody;
  options?: Omit<UseQueryOptions<TData, TBody>, 'queryKey' | 'queryFn'>;
};

export const fetcher = async <TData, TBody>(
  endpoint: string,
  request: RequestInit,
  body?: TBody,
) => {
  const response = await api(endpoint, { ...request, json: body || {} });

  if (response.ok && response.body) {
    const data = await response.json<TData>();
    return data as TData;
  }
};

export const useQuery = <TData, TBody>({
  query,
  body,
  options,
}: UseQueryParams<TData, TBody>) => {
  const { endpoint, method = 'POST' } = query;

  const queryKeys = [endpoint, body && JSON.stringify(body)].filter(Boolean);

  const queryResult = useQueryBase({
    queryKey: queryKeys,
    queryFn: async () => {
      const response = await fetcher<TData, TBody>(endpoint, { method }, body);

      return response as TData;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
    ...options,
  });

  return queryResult;
};
