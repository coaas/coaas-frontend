import * as jose from 'jose';
import { authApi } from './constants';

const ACCESS_TOKEN_KEY = 'access_token';

export const checkAccess = (): boolean =>
  localStorage.getItem(ACCESS_TOKEN_KEY) !== undefined;

export const isAccessExpired = (): boolean => {
  const data = jose.decodeJwt(getAccess());
  return data.exp === undefined || data.exp > Date.now() / 1000;
};

export const getAccess = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) as string;
};

export const setAccess = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const obtainAccess = async () => {
  const REFRESH_PATH = 'auth/refresh';
  try {
    const resp = await authApi.put(REFRESH_PATH, {
      credentials: 'same-origin',
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

export default {
  getAccess,
  checkAccess,
  setAccess,
  isAccessExpired,
  obtainAccess,
};
