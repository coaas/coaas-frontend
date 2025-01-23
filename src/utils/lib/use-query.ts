import { api } from '@api/constants';
import {
  useQuery as useQueryBase,
  useInfiniteQuery as useInfinityQueryBase,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

type UseQueryParams<TData, TBody> = {
  query: Query<TData, TBody>;
  body?: TBody;
  options?: Omit<UseQueryOptions<TData, TBody>, 'queryKey' | 'queryFn'>;
};

type UseInfinityQueryParams<TData, TBody> = {
  options?: Omit<UseInfiniteQueryOptions<TData, TBody>, 'queryKey' | 'queryFn'>;
};

export const fetcher = async <TData, TBody>(
  endpoint: string,
  request: RequestInit,
  body?: TBody,
) => api(endpoint, { ...request, json: body || {} }).json<TData>();

export function useQuery<TData, TBody>({
  query,
  body,
  options,
}: UseQueryParams<TData, TBody>) {
  const { endpoint, method = 'POST' } = query;

  const queryKeys = [endpoint, body && JSON.stringify(body)].filter(Boolean);

  const queryResult = useQueryBase({
    queryKey: queryKeys,
    queryFn: () => fetcher<TData, TBody>(endpoint, { method }, body),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
    ...options,
  });

  return queryResult;
}

type BaseMeta = {
  has_more: boolean;
  next_key: NextKey;
};

export function useIQuery<TBody, TData>(
  query: Query<TData, TBody>,
  body: TBody,
  options?: UseInfinityQueryParams<TData & BaseMeta, TBody>,
) {
  const { endpoint, method = 'POST' } = query;

  const queryKeys = [endpoint, body && JSON.stringify(body)].filter(Boolean);

  const queryResult = useInfinityQueryBase({
    queryKey: queryKeys,
    initialPageParam: { next_key: { id: '', created_at: '' } },
    queryFn: () => {
      const response = fetcher<TData & BaseMeta, TBody>(
        endpoint,
        { method },
        body,
      );
      return response;
    },

    getNextPageParam: ({ has_more, next_key }) =>
      has_more ? { next_key } : undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
    ...options,
  });

  return queryResult;
}
