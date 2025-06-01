import { authApi } from '@api/constants';
import { deleteAccess } from '@api/deleteAccess/deleteAccess';

import type { ResponseLogoutUser } from './types';

export async function LogoutUser(): Promise<ResponseLogoutUser> {
  try {
    const response = await authApi.delete('auth/logout');
    if (response.ok) {
      deleteAccess();
      window.location.href = '/login';
    }

    return {
      success: response.ok,
      data: await response.json(),
    } as ResponseLogoutUser;
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}
