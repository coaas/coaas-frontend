import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api, IS_MOCK_ACTIVE } from '@api/constants';
import { tourMode } from '../../../../../utils/tourMode';

import { getMockData } from './mocks';
import { RequestParams, ResponseData } from './types';
import { ENDPOINT } from './constants';

const getTemplates = (params: RequestParams) => {
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
        })
        .json<ResponseData>();
};

export const useData = () => {
  const { template_id } = useParams();
  const [isTourMode, setIsTourMode] = useState(tourMode.isActive());

  // Subscribe to tour mode changes
  useEffect(() => {
    const unsubscribe = tourMode.subscribe(setIsTourMode);
    return unsubscribe;
  }, []);

  const queryKey = [template_id, 'getTemplate', isTourMode];

  const { isFetching, data } = useQuery<ResponseData>({
    queryFn: () => getTemplates({ id: template_id }),
    queryKey,
    staleTime: 0,
  });

  return {
    data,
    isFetching,
  };
};
