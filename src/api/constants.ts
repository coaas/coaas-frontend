import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';
import { beforeRequest } from '@api/authBeforeRequest/beforeRequest';

export const IS_MOCK_ACTIVE = false;

export const authApi = ky.create({
  prefixUrl: import.meta.env.VITE_AUTH_API_PREFIX,
  credentials: 'include',
});

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_PREFIX,
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequest],
  },
});

export const queryClient = new QueryClient();
