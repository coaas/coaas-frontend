import { authApi, queryClient } from '@api/constants';
import { deleteAccess } from '@api/deleteAccess/deleteAccess';

import type { ResponseLogoutUser } from './types';

export async function LogoutUser(): Promise<ResponseLogoutUser> {
  try {
    const response = await authApi.delete('auth/logout');
    if (response.ok) {
      deleteAccess();
      // Инвалидируем только пользовательские запросы после логаута
      await queryClient.invalidateQueries({
        queryKey: ['UserService/GetCurrentUserData'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['NamespacesManager/GetUserNamespacesAndProjectsList'],
      });
      // Очищаем весь кэш для полной уверенности
      await queryClient.clear();
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
