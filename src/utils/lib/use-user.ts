import { getCurrentUserData } from '@api/queries';
import { useQuery } from './use-query';

export const useUser = () => {
  const { data } = useQuery({
    query: getCurrentUserData,
  });

  return data;
};
