import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';
import { beforeRequest } from '@api/authBeforeRequest/beforeRequest';

export const authApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_AUTH_PREFIX,
  credentials: 'include',
});

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_PREFIX,
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequest],
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export const IS_MOCK_ACTIVE = import.meta.env.VITE_IS_MOCK_ACTIVE;

export const queryClient = new QueryClient();
