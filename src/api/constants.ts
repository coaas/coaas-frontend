import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';
import { beforeRequest } from '@api/authBeforeRequest/beforeRequest';
import { afterResponse } from '@api/authBeforeRequest/afterResponse.ts';

export const authApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_AUTH_PREFIX,
  credentials: 'include',
});

export const IS_PREFIX = import.meta.env.VITE_PROXY_BACK === 'True';
export const api = ky.create({
  prefixUrl: IS_PREFIX
    ? '/api/' + String(import.meta.env.VITE_API_PREFIX)
    : '/api',
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [afterResponse],
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export const IS_MOCK_ACTIVE = import.meta.env.VITE_IS_MOCK_ACTIVE;

export const queryClient = new QueryClient();
