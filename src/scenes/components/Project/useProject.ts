import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getProject } from '@api/queries';
import { tourMode } from '../../../utils/tourMode';
import { getProjectMockData } from './mocks';

export const useProject = () => {
  const { project_slug } = useParams<{ project_slug: string }>();
  const [isTourMode, setIsTourMode] = useState(tourMode.isActive());

  // Subscribe to tour mode changes
  useEffect(() => {
    const unsubscribe = tourMode.subscribe(setIsTourMode);
    return unsubscribe;
  }, []);

  // Use mock data in tour mode
  const mockQuery = useQuery({
    queryKey: ['project', project_slug, 'mock'],
    queryFn: getProjectMockData,
    enabled: isTourMode && !!project_slug,
    staleTime: 0,
  });

  // Use real API in normal mode
  const apiQuery = useApiQuery({
    request: getProject,
    payload: {},
    options: {
      enabled: !isTourMode && !!project_slug,
    },
    requestOptions: {
      prefixUrl: '/api',
    },
  });

  // Return appropriate query based on tour mode
  if (isTourMode) {
    return mockQuery;
  }

  return apiQuery;
};
