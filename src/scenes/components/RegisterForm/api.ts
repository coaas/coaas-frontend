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

    // Set flag to indicate successful registration for auto-tour
    localStorage.setItem('just_registered', 'true');

    window.location.href = RouteMap.home;
  }
  // If response.ok = false, ky will automatically throw an error
  // which will be handled through apiErrorHandler
}
