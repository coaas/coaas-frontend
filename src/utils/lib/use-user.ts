import { getCurrentUserData } from '@api/queries';
import { useApiQuery } from './use-api-query';

export const useUser = () => {
  const { data } = useApiQuery({
    request: getCurrentUserData,
  });

  return data;
};
