import { useState } from 'react';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';

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
  const [searchValue, setSearchValue] = useState('');

  const queryKey = ['namespaces', searchValue];

  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<
      ResponseData,
      unknown,
      InfiniteData<ResponseData>,
      QueryKey,
      RequestParams
    >({
      queryKey: queryKey,
      queryFn: async ({ pageParam }) =>
        await getNamespaces({ ...pageParam, query: searchValue }),
      initialPageParam: {
        ...BASE_REQUEST_PARAMS,
        query: searchValue,
      },
      getNextPageParam: ({ nextKey, hasMore }) =>
        hasMore
          ? {
              ...BASE_REQUEST_PARAMS,
              query: searchValue,
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

    await queryClient.invalidateQueries({
      queryKey: queryKey,
    });
  };

  const onChangeSearch = (search: string) => {
    setSearchValue(search);
    refetch();
  };

  return {
    data,
    onChangeSearch,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  };
};
