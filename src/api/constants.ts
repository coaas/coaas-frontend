import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';
import { beforeRequest } from '@api/authBeforeRequest/beforeRequest';
import { afterResponse } from '@api/authBeforeRequest/afterResponse.ts';
import { apiErrorHandler } from './errorHandler';

export const IS_PREFIX = import.meta.env.VITE_PROXY_BACK === 'True';

export const authApi = ky.create({
  prefixUrl: IS_PREFIX ? '/auth' : '/api',
  credentials: 'include',
  hooks: {
    afterResponse: [apiErrorHandler],
  },
});

export const api = ky.create({
  prefixUrl: '/api',
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [afterResponse, apiErrorHandler],
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export const IS_MOCK_ACTIVE = import.meta.env.VITE_IS_MOCK_ACTIVE;

export const queryClient = new QueryClient();
