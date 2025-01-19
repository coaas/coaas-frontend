import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';

import { getMockData } from './mocks';
import { RequestParams, ResponseData } from './types';
import { BASE_REQUEST_PARAMS, ENDPOINT, QUERY_KEY } from './constants';

const getNamespaces = (params: RequestParams) =>
  IS_MOCK_ACTIVE
    ? getMockData(params)
    : api.post(ENDPOINT, { json: params }).json<ResponseData>();

export const useData = () => {
  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<
      ResponseData,
      unknown,
      InfiniteData<ResponseData>,
      QueryKey,
      RequestParams
    >({
      queryKey: QUERY_KEY,
      queryFn: ({ pageParam }) => getNamespaces(pageParam),
      initialPageParam: BASE_REQUEST_PARAMS,
      getNextPageParam: ({ nextKey, hasMore }) =>
        hasMore
          ? {
              ...BASE_REQUEST_PARAMS,
              after: nextKey,
            }
          : undefined,
      refetchOnWindowFocus: false,
    });

  const refetch = async () => {
    // сбрасываем пагинацию на первую страницу
    queryClient.setQueryData(
      QUERY_KEY,
      (oldData?: InfiniteData<ResponseData>) =>
        oldData && {
          pages: oldData.pages.slice(0, 1),
          pageParams: oldData.pageParams.slice(0, 1),
        },
    );

    await queryClient.invalidateQueries({
      queryKey: QUERY_KEY,
    });
  };

  return { data, fetchNextPage, refetch, isFetching, isFetchingNextPage };
};
