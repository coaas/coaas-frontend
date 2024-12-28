import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';
import Auth, { obtain_access } from '@api/auth.ts';

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
        if (!Auth.check_access() || Auth.is_access_expired()) {
          console.log(Auth.check_access(), Auth.is_access_expired());
          obtain_access();
        }
        request.headers.set('Authorization', `Bearer ${Auth.get_access()}`);
      },
    ],
  },
});

export const queryClient = new QueryClient();
