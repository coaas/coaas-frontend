import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api, IS_MOCK_ACTIVE } from '@api/constants';
import { tourMode } from '../../../../../utils/tourMode';

import { getMockData } from './mocks';
import { RequestParams, ResponseData, SlugsParams } from './types';
import { ENDPOINT } from './constants';

const getTemplates = (
  params: RequestParams,
  { namespace_slug, project_slug }: SlugsParams,
) => {
  // Always use mock data in tour mode
  if (tourMode.isActive()) {
    return getMockData(params);
  }

  return IS_MOCK_ACTIVE
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
};

export const useData = () => {
  const { namespace_slug, project_slug, category_slug } = useParams();
  const [isTourMode, setIsTourMode] = useState(tourMode.isActive());

  // Subscribe to tour mode changes
  useEffect(() => {
    const unsubscribe = tourMode.subscribe(setIsTourMode);
    return unsubscribe;
  }, []);

  const queryKey = [
    namespace_slug,
    project_slug,
    category_slug,
    'createService',
    isTourMode,
  ];

  const { isFetching, data } = useQuery<ResponseData>({
    queryFn: () =>
      getTemplates(
        { category: category_slug },
        { namespace_slug, project_slug },
      ),
    queryKey,
    staleTime: 0,
  });

  const templates = data?.templates || [];

  return {
    templates,
    isFetching,
  };
};
