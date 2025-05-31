import { useState } from 'react';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';

import { getMockData } from './mocks';
import { RequestParams, ResponseData, SlugsParams } from './types';
import { BASE_REQUEST_PARAMS, ENDPOINT } from './constants';

const getServices = (
  params: RequestParams,
  { namespace_slug, project_slug }: SlugsParams,
) =>
  IS_MOCK_ACTIVE
    ? getMockData(params)
    : api
        .post(ENDPOINT, {
          prefixUrl: '/api',
          body: JSON.stringify(params),
          headers: {
            'x-namespace-slug': namespace_slug,
            'x-project-slug': project_slug,
          },
        })
        .json<ResponseData>();

export const useData = () => {
  const { namespace_slug, project_slug } = useParams();

  const [searchValue, setSearchValue] = useState('');

  const queryKey = [namespace_slug, project_slug, 'services', searchValue];

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
        await getServices(
          { ...pageParam, query: searchValue },
          { namespace_slug, project_slug },
        ),
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
