import * as jose from 'jose';
import { auth_api } from '@api/constants.ts';

export const check_access = (): boolean => {
  return localStorage.getItem('access_token') !== undefined;
};

export const is_access_expired = (): boolean => {
  const data = jose.decodeJwt(get_access());
  console.log(data);
  return data.exp === undefined || data.exp > Date.now() / 1000;
};

export const get_access = (): string => {
  return localStorage.getItem('access_token') as string;
};

export const set_access = (token: string): void => {
  localStorage.setItem('access_token', token);
};

export const obtain_access = async () => {
  try {
    const resp = await auth_api.put('auth/refresh', {
      credentials: 'same-origin',
    });
    if (resp.ok) {
      const data = (await resp.json()) as {
        access_token: string;
      };
      set_access(data['access_token']);
      return data['access_token'];
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  get_access,
  check_access,
  set_access,
  is_access_expired,
  obtain_access,
};
