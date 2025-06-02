import { AfterResponseHook } from 'ky';
import { ApiError } from '@components/ErrorToast';

// Global function for showing errors
// Will be set from the application component
let globalErrorHandler: ((error: ApiError) => void) | null = null;

export const setGlobalErrorHandler = (handler: (error: ApiError) => void) => {
  globalErrorHandler = handler;
};

export const apiErrorHandler: AfterResponseHook = async (
  _request,
  _options,
  response,
) => {
  // Handle only errors (status >= 400)
  if (response.status >= 400 && globalErrorHandler) {
    try {
      const errorData = await response.clone().json();

      // Check that the error is in the expected format
      if (isApiError(errorData)) {
        globalErrorHandler(errorData);
      }
    } catch (error) {
      // If failed to parse JSON or error is not in expected format
      // show general error
      globalErrorHandler({
        code: `HTTP_${response.status}`,
        default: `Server error: ${response.status} ${response.statusText}`,
      });
    }
  }
};

// Check if the object is an API error in the expected format
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
