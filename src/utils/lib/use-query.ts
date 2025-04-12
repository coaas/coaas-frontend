import { api } from '@api/constants';
import {
  useQuery,
  useInfiniteQuery,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  QueryKey,
  InfiniteData,
} from '@tanstack/react-query';

export const useApiQuery = <TData, TPayload = undefined>({
  request,
  payload,
  options,
}: ApiQueryParams<TData, TPayload>) => {
  const { endpoint, method = 'POST' } = request;

  const queryKey: QueryKey = [
    endpoint,
    payload && JSON.stringify(payload),
  ].filter(Boolean);

  return useQuery({
    queryKey,
    queryFn: () => api(endpoint, { method, json: payload || {} }).json<TData>(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
    ...options,
  });
};

type InfiniteApiQueryResult<
  TData extends PaginatedResponse<TItem>,
  TItem = TData extends PaginatedResponse<infer Item> ? Item : never,
> = ReturnType<
  typeof useInfiniteQuery<
    TData,
    Error,
    InfiniteData<TData>,
    QueryKey,
    NextKey | null
  >
> & {
  entries: TItem[];
};

export const useInfiniteApiQuery = <
  TData extends PaginatedResponse<TItem>,
  TPayload = unknown,
  TItem = TData extends PaginatedResponse<infer Item> ? Item : never,
>(
  params: InfiniteApiQueryParams<TData, TPayload, TItem>,
): InfiniteApiQueryResult<TData, TItem> => {
  const { request, payload, options } = params;
  const { endpoint, method = 'POST' } = request;

  const queryKey: QueryKey = [
    endpoint,
    payload && JSON.stringify(payload),
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      const requestPayload = {
        ...payload,
        after_key: pageParam,
        limit: 20,
      };

      return api(endpoint, { method, json: requestPayload }).json<TData>();
    },
    getNextPageParam: lastPage =>
      lastPage.has_more ? lastPage.next_key : undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
    ...options,
  });

  const entries = query.data?.pages.flatMap(page => page.items ?? []) ?? [];

  return {
    ...query,
    entries,
  };
};

type NextKey = {
  id: string;
  created_at: string;
};

type PaginationParams = {
  limit?: number;
  after_key?: NextKey | null;
};

type ApiQueryParams<TData, TPayload> = {
  request: ApiRequest<TData, TPayload>;
  payload?: TPayload;
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;
};

type InfiniteApiQueryParams<
  TData extends PaginatedResponse<TItem>,
  TPayload,
  TItem = unknown,
> = {
  request: ApiRequest<TData, TPayload & PaginationParams>;
  payload?: TPayload;
  options?: Omit<
    UseInfiniteQueryOptions<
      TData,
      Error,
      InfiniteData<TData>,
      TData,
      QueryKey,
      NextKey | null
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >;
};
