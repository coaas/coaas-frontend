import { useParams } from 'react-router-dom';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getService } from '@api/queries';

export const useService = () => {
  const { service_id } = useParams<{ service_id: string }>();

  return useApiQuery({
    request: getService,
    payload: {
      service_id: service_id || '',
    },
    options: {
      enabled: !!service_id,
    },
    requestOptions: {
      prefixUrl: '/api',
    },
  });
};
