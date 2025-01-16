import {
  InfiniteData,
  keepPreviousData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants';

import { getMockData } from './mocks';
import { RequestParams, ResponseData } from './types';
import { BASE_REQUEST_PARAMS, ENDPOINT } from './constants';

const getNamespaces = (params: RequestParams) =>
  IS_MOCK_ACTIVE
    ? getMockData(params)
    : api
        .post(ENDPOINT, {
          body: JSON.stringify(params),
        })
        .json<ResponseData>();

export const useData = () => {
  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<
      ResponseData,
      unknown,
      InfiniteData<ResponseData>,
      QueryKey,
      RequestParams
    >({
      queryKey: ['namespaces'],
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
      placeholderData: keepPreviousData,
    });

  return { data, fetchNextPage, isFetching, isFetchingNextPage };
};
