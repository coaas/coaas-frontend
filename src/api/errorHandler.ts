import { AfterResponseHook } from 'ky';
import { ApiError } from '@components/ErrorToast';

// Глобальная функция для показа ошибок
// Будет установлена из компонента приложения
let globalErrorHandler: ((error: ApiError) => void) | null = null;

export const setGlobalErrorHandler = (handler: (error: ApiError) => void) => {
  globalErrorHandler = handler;
};

export const apiErrorHandler: AfterResponseHook = async (
  _request,
  _options,
  response,
) => {
  // Обрабатываем только ошибки (статус >= 400)
  if (response.status >= 400 && globalErrorHandler) {
    try {
      const errorData = await response.clone().json();
      
      // Проверяем, что ошибка в ожидаемом формате
      if (isApiError(errorData)) {
        globalErrorHandler(errorData);
      }
    } catch (error) {
      // Если не удалось распарсить JSON или ошибка не в ожидаемом формате
      // показываем общую ошибку
      globalErrorHandler({
        code: `HTTP_${response.status}`,
        default: `Server error: ${response.status} ${response.statusText}`,
      });
    }
  }
};

// Проверяем, является ли объект API ошибкой в ожидаемом формате
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'default' in error &&
    typeof (error as any).code === 'string' &&
    typeof (error as any).default === 'string'
  );
} 