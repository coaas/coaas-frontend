import { useErrorContext } from '@global/ErrorContext';
import { ApiError } from '@components/ErrorToast';

interface UseApiErrorReturn {
  showError: (error: ApiError) => void;
  handleApiError: (error: unknown) => void;
}

export const useApiError = (): UseApiErrorReturn => {
  const { showError } = useErrorContext();

  const handleApiError = (error: unknown) => {
    if (isApiError(error)) {
      showError(error);
    } else {
      // If error is not in expected format, show general message
      showError({
        code: 'UNKNOWN_ERROR',
        default: 'An unknown error occurred. Please try again later.',
      });
    }
  };

  return {
    showError,
    handleApiError,
  };
};

// Check if error is an API error in expected format
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
