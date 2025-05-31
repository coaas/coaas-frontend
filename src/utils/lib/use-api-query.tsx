import { api } from '@api/constants';
import { useNotificationContext } from '@components/Notification';
import { ErrorResponse } from '@globalTypes/templates.draft';
import {
  useQuery,
  useInfiniteQuery,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  QueryKey,
  InfiniteData,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query';
import { HTTPError, Options } from 'ky';

export const useApiQuery = <TData, TPayload = undefined>({
  request,
  payload,
  options,
  requestOptions,
}: ApiQueryParams<TData, TPayload>) => {
  const { endpoint, method = 'POST' } = request;

  const queryKey: QueryKey = [
    endpoint,
    payload && JSON.stringify(payload),
  ].filter(Boolean);

  return useQuery({
    queryKey,
    queryFn: () =>
      api(endpoint, {
        method,
        json: payload || {},
        ...requestOptions,
      }).json<TData>(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
    ...options,
  });
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
        after_key: pageParam,
        limit: 20,
        ...payload,
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

  const entries = query.data?.pages.flatMap(page => page.templates ?? []) ?? [];

  return {
    ...query,
    entries,
  };
};

export const useApiMutation = <TData, TPayload = undefined>({
  request,
  options,
}: ApiMutationParams<TData, TPayload>) => {
  const { open } = useNotificationContext();

  const { endpoint, method = 'POST' } = request;

  const onError = async (error: Error) => {
    if (error instanceof HTTPError) {
      const { response } = error;
      const { detail, default: defaultMsg } =
        await response.json<ErrorResponse>();
      const message = detail?.map(({ msg }, key) => (
        <span className="block mt-1 first:mt-0" key={key}>
          {msg}
        </span>
      ));
      open({ description: message || defaultMsg, variant: 'error' });
    }
  };

  return useMutation<TData, Error, TPayload>({
    mutationKey: [endpoint],
    mutationFn: payload => {
      const requestOptions =
        payload instanceof FormData ? { body: payload } : { json: payload };

      return api(endpoint, { method, ...requestOptions }).json<TData>();
    },
    onError,
    ...options,
  });
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
  requestOptions?: Options;
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

type ApiMutationParams<TData, TPayload> = {
  request: ApiRequest<TData, TPayload>;
  options?: Omit<
    UseMutationOptions<TData, Error, TPayload>,
    'mutationKey' | 'mutationFn'
  >;
};
