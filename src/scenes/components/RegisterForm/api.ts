import { authApi } from '@api/constants';
import { setAccess } from '@api/index';
import { RouteMap } from '@components/Layout/components/types';

import type { ResponseAuthRegisterJson } from './types';

export default async function registerUser(
  username: string,
  password: string,
  password_confirm: string,
) {
  const response = await authApi.post('auth/register', {
    json: {
      username,
      password,
      password_confirm,
    },
  });

  if (response.ok) {
    const data = await response.json<ResponseAuthRegisterJson>();
    setAccess(data.access_token);
    window.location.href = RouteMap.home;
  }
  // Если response.ok = false, то ky автоматически бросит ошибку
  // которая будет обработана через apiErrorHandler
}
