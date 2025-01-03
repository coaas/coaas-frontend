import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';
import Auth, { obtainAccess } from '@api/auth.ts';

const PREFIX_URL = 'http://api.coaas.ru';

export const IS_MOCK_ACTIVE = false;

export const auth_api = ky.create({
  prefixUrl: 'http://auth.coaas.ru/api',
});

export const api = ky.create({
  prefixUrl: PREFIX_URL,
  hooks: {
    beforeRequest: [
      async request => {
        if (!Auth.checkAccess() || Auth.isAccessExpired()) {
          console.log(Auth.checkAccess(), Auth.isAccessExpired());
          obtainAccess();
        }
        request.headers.set('Authorization', `Bearer ${Auth.getAccess()}`);
      },
    ],
  },
});

export const queryClient = new QueryClient();
