import { HTTPError, KyRequest } from 'ky';
import * as jose from 'jose';
import { Mutex } from 'async-mutex';

import cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '@api/authBeforeRequest/contants';
import { authApi } from '@api/constants';
import { setAccess } from '@api/setAccess/setAccess';

const mutex = new Mutex();

const checkAccess = () => localStorage.getItem(ACCESS_TOKEN_KEY) !== null;

const getAccess = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) as string;
};

const isAccessExpired = () => {
  const data = jose.decodeJwt(getAccess());
  return data.exp === undefined || data.exp < Date.now() / 1000;
};

export const obtainAccess = async () => {
  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
    return;
  }

  const release = await mutex.acquire();

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
    if (
      error instanceof HTTPError &&
      [404, 401].includes(error.response.status) &&
      window.location.pathname !== '/login'
    ) {
      window.location.href = '/login';
    }
    console.error(error);
  } finally {
    release();
  }
};

export const beforeRequest = async (request: KyRequest) => {
  if (!checkAccess() || isAccessExpired()) {
    await obtainAccess();
  }
  request.headers.set('Authorization', `Bearer ${getAccess()}`);

  request.headers.set('x-csrftoken', cookies.get('csrftoken') || '');
};
