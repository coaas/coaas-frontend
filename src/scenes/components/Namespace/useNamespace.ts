import { useParams } from 'react-router-dom';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getNamespace } from '@api/queries';

export const useNamespace = () => {
  const { namespace_slug } = useParams<{ namespace_slug: string }>();

  return useApiQuery({
    request: getNamespace,
    payload: { namespace_slug },
    options: {
      enabled: !!namespace_slug,
    },
    requestOptions: {
      prefixUrl: '/api',
    },
  });
};
