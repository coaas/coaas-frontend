import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';

import Auth from './auth';

const PREFIX_URL = 'http://api.coaas.ru';

export const IS_MOCK_ACTIVE = false;

export const authApi = ky.create({
  prefixUrl: 'http://auth.coaas.ru/api',
});

export const api = ky.create({
  prefixUrl: PREFIX_URL,
  hooks: {
    beforeRequest: [
      async request => {
        if (!Auth.checkAccess() || Auth.isAccessExpired()) {
          Auth.obtainAccess();
        }
        request.headers.set('Authorization', `Bearer ${Auth.getAccess()}`);
      },
    ],
  },
});

export const queryClient = new QueryClient();
