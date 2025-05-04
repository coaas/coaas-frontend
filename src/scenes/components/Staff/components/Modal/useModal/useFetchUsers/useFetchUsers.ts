import { useMutation } from '@tanstack/react-query';

import { api, IS_MOCK_ACTIVE } from '@api/constants';

import {
  FetchUsersRequestParams,
  FetchUsersResponse,
  UseFetchUsersParams,
} from './types';

const ENDPOINT = 'UserService/GlobalUsersSearch';

const mockFetchUsers = async () => {
  await new Promise(resolve => setTimeout(() => resolve({}), 1500));

  return Math.random() > 0.5
    ? {
        users: [{ username: '123' }, { username: 'kdlalkale' }],
      }
    : { users: [] };
};

const fetchUsers = (params: FetchUsersRequestParams) =>
  IS_MOCK_ACTIVE
    ? mockFetchUsers()
    : api
        .post(ENDPOINT, {
          prefixUrl: '/api',
          body: JSON.stringify(params),
        })
        .json<FetchUsersResponse>();

export const useFetchUsers = ({ onSuccess }: UseFetchUsersParams) => {
  const mutation = useMutation({
    mutationFn: fetchUsers,
    onSuccess,
  });

  return mutation;
};
