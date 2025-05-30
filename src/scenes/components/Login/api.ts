import { api } from '@api/constants.ts';

export const checkLogin = async () => {
  const path = 'UserService/GetCurrentUserData';
  const resp = await api.post(path, {
    credentials: 'include',
    json: {},
  });
  if (!resp.ok) {
    alert('Login first');
    return;
  }
  console.log('Current user:', await resp.json());
};
