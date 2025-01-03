import * as jose from 'jose';
import { auth_api } from '@api/constants.ts';

export const checkAccess = (): boolean => {
  return localStorage.getItem('access_token') !== undefined;
};

export const isAccessExpired = (): boolean => {
  const data = jose.decodeJwt(getAccess());
  console.log(data);
  return data.exp === undefined || data.exp > Date.now() / 1000;
};

export const getAccess = (): string => {
  return localStorage.getItem('access_token') as string;
};

export const setAccess = (token: string): void => {
  localStorage.setItem('access_token', token);
};

export const obtainAccess = async () => {
  try {
    const resp = await auth_api.put('auth/refresh', {
      credentials: 'same-origin',
    });
    if (resp.ok) {
      const data = (await resp.json()) as {
        access_token: string;
      };
      setAccess(data['access_token']);
      return data['access_token'];
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
