import { useState } from 'react';
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

const getProjects = (params: RequestParams, namespaceSlug?: string) =>
  IS_MOCK_ACTIVE
    ? getMockData(params)
    : api
        .post(ENDPOINT, {
          body: JSON.stringify(params),
          headers: {
            'x-namespace-slug': namespaceSlug,
          },
        })
        .json<ResponseData>();

export const useData = () => {
  const { namespace_slug } = useParams();

  const [isFiredChecked, setIsFiredChecked] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const queryKey = [namespace_slug, 'staff', searchValue];

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
        await getProjects(
          { ...pageParam, is_fired: isFiredChecked, query: searchValue },
          namespace_slug,
        ),
      initialPageParam: {
        ...BASE_REQUEST_PARAMS,
        query: searchValue,
        is_fired: isFiredChecked,
      },
      getNextPageParam: ({ nextKey, hasMore }) =>
        hasMore
          ? {
              ...BASE_REQUEST_PARAMS,
              query: searchValue,
              is_fired: isFiredChecked,
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

  const onChangeSearch = (search: string) => {
    setSearchValue(search);
    refetch();
  };

  const onCheckboxClick = () => {
    setIsFiredChecked(prev => !prev);
    refetch();
  };

  return {
    data,
    fetchNextPage,
    onChangeSearch,
    refetch,
    isFiredChecked,
    onCheckboxClick,
    isFetching,
    isFetchingNextPage,
  };
};
