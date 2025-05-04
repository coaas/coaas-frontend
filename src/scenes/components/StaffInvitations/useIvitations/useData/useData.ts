import { useParams } from 'react-router-dom';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';

import { getMockData } from './mocks';
import { RequestParams, ResponseData } from './types';
import { BASE_REQUEST_PARAMS, ENDPOINT } from './constants';

const getInvitations = (params: RequestParams, namespaceSlug?: string) =>
  IS_MOCK_ACTIVE
    ? getMockData(params)
    : api
        .post(ENDPOINT, {
          prefixUrl: '/api',
          body: JSON.stringify(params),
          headers: {
            'x-namespace-slug': namespaceSlug,
          },
        })
        .json<ResponseData>();

export const useData = () => {
  const { namespace_slug } = useParams();

  const queryKey = [namespace_slug, 'staffInvitations'];

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<
      ResponseData,
      unknown,
      InfiniteData<ResponseData>,
      QueryKey,
      RequestParams
    >({
      queryKey,
      queryFn: async ({ pageParam }) =>
        await getInvitations({ ...pageParam }, namespace_slug),
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
      queryKey,
      (oldData?: InfiniteData<ResponseData>) =>
        oldData && {
          pages: oldData.pages.slice(0, 1),
          pageParams: oldData.pageParams.slice(0, 1),
        },
    );

    await queryClient.invalidateQueries({ queryKey });
  };

  return {
    data,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  };
};
