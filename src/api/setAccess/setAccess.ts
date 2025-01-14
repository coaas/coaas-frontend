import { ACCESS_TOKEN_KEY } from '@api/authBeforeRequest/contants';

export const setAccess = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};
