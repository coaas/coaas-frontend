import { getUser } from '@api/queries';
import { useQuery } from './use-query';

export const useUser = () => {
  const { data } = useQuery({
    query: getUser,
    body: { login: 'string', method: 1 },
  });

  return data;
};
