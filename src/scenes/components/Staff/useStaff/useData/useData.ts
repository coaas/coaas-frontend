import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE, queryClient } from '@api/constants';
import { tourMode } from '../../../../../utils/tourMode';

import { getMockData } from './mocks';
import { RequestParams, ResponseData } from './types';
import { BASE_REQUEST_PARAMS, ENDPOINT } from './constants';

const getProjects = (params: RequestParams, namespaceSlug?: string) => {
  // Always use mock data in tour mode
  if (tourMode.isActive()) {
    return getMockData(params);
  }

  return IS_MOCK_ACTIVE
    ? getMockData(params)
    : api
        .post(ENDPOINT, {
          body: JSON.stringify(params),
          headers: {
            'x-namespace-slug': namespaceSlug,
          },
        })
        .json<ResponseData>();
};

export const useData = () => {
  const { namespace_slug } = useParams();
  const [isFiredChecked, setIsFiredChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isTourMode, setIsTourMode] = useState(tourMode.isActive());

  // Subscribe to tour mode changes
  useEffect(() => {
    const unsubscribe = tourMode.subscribe(setIsTourMode);
    return unsubscribe;
  }, []);

  const queryKey = [
    namespace_slug,
    'staff',
    searchValue,
    isFiredChecked,
    isTourMode,
  ];

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
