import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getProjectTeam } from '@api/queries';
import { tourMode } from '../../../utils/tourMode';
import { getProjectTeamMockData } from './mocks';

export const useProjectTeam = () => {
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
    queryKey: ['projectTeam', namespace_slug, project_slug, 'mock'],
    queryFn: getProjectTeamMockData,
    enabled: isTourMode && !!namespace_slug && !!project_slug,
    staleTime: 0,
  });

  // Use real API in normal mode
  const apiQuery = useApiQuery({
    request: getProjectTeam,
    payload: {},
    options: {
      enabled: !isTourMode && !!namespace_slug && !!project_slug,
    },
    requestOptions: {
      prefixUrl: '/api',
      headers: {
        'x-namespace-slug': namespace_slug,
        'x-project-slug': project_slug,
      },
    },
  });

  // Return appropriate query based on tour mode
  if (isTourMode) {
    return mockQuery;
  }

  return apiQuery;
}; 