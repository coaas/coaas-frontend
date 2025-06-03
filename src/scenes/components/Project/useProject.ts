import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getProject } from '@api/queries';
import { tourMode } from '../../../utils/tourMode';
import { getProjectMockData } from './mocks';

export const useProject = () => {
  const { namespace_slug, project_slug } = useParams<{ 
    namespace_slug: string; 
    project_slug: string; 
  }>();
  const [isTourMode, setIsTourMode] = useState(tourMode.isActive());

  // Subscribe to tour mode changes
  useEffect(() => {
    const unsubscribe = tourMode.subscribe(setIsTourMode);
    return unsubscribe;
  }, []);

  // Use mock data in tour mode
  const mockQuery = useQuery({
    queryKey: ['project', namespace_slug, project_slug, 'mock'],
    queryFn: getProjectMockData,
    enabled: isTourMode && !!project_slug && !!namespace_slug,
    staleTime: 0,
  });

  // Use real API in normal mode
  const apiQuery = useApiQuery({
    request: getProject,
    payload: { namespace_slug, project_slug },
    options: {
      enabled: !isTourMode && !!project_slug && !!namespace_slug,
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
