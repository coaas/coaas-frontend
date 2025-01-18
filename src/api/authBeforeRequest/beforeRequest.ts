import { KyRequest } from 'ky';
import * as jose from 'jose';

import { ACCESS_TOKEN_KEY } from '@api/authBeforeRequest/contants';
import { authApi } from '@api/constants';
import { setAccess } from '@api/setAccess/setAccess';

const checkAccess = (): boolean =>
  localStorage.getItem(ACCESS_TOKEN_KEY) !== undefined;

const getAccess = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) as string;
};

const isAccessExpired = (): boolean => {
  const data = jose.decodeJwt(getAccess());
  return data.exp === undefined || data.exp > Date.now() / 1000;
};

const obtainAccess = async () => {
  const REFRESH_PATH = 'auth/refresh';
  try {
    const resp = await authApi.post(REFRESH_PATH, {
      credentials: 'include',
    });
    if (resp.ok) {
      const data = await resp.json<{
        access_token: string;
      }>();
      setAccess(data.access_token);
      return data.access_token;
    }
  } catch (error) {
    console.error(error);
  }
};

export const beforeRequest = async (request: KyRequest) => {
  if (!checkAccess() || isAccessExpired()) {
    obtainAccess();
  }
  request.headers.set('Authorization', `Bearer ${getAccess()}`);
};
