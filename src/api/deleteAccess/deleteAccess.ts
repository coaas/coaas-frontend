import { ACCESS_TOKEN_KEY } from '@api/authBeforeRequest/contants';

export const deleteAccess = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}