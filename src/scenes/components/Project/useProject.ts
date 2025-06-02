import { useParams } from 'react-router-dom';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getProject } from '@api/queries';

export const useProject = () => {
  const { project_slug } = useParams<{ project_slug: string }>();

  return useApiQuery({
    request: getProject,
    payload: {},
    options: {
      enabled: !!project_slug,
    },
    requestOptions: {
      prefixUrl: '/api',
    },
  });
}; 