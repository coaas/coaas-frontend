import { FC, useState } from 'react';
import { ErrorProvider } from '@global/ErrorContext';
import { ErrorToastManager } from '@components/ErrorToastManager';
import { useApiError } from '@utils/useApiError';

const TestComponent: FC = () => {
  const { showError } = useApiError();

  const showTestError = () => {
    showError({
      code: 'PROJECT_DEPLOY_NOT_FOUND',
      default: 'Project {name} deploy not found.',
      kwargs: { name: 'alpha' },
    });
  };

  const showServerError = () => {
    showError({
      code: 'HTTP_500',
      default: 'Server error: 500 Internal Server Error',
    });
  };

  const showGenericError = () => {
    showError({
      code: 'VALIDATION_ERROR',
      default: 'Invalid input data provided.',
    });
  };

  const showLongError = () => {
    showError({
      code: 'VERY_LONG_ERROR_CODE_THAT_SHOULD_WRAP_PROPERLY_IN_THE_TOAST_NOTIFICATION',
      default:
        'This is a very long error message that should wrap properly within the toast notification boundaries and not overflow outside the card container.',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Error Toast Demo</h1>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={showTestError}
          style={{
            padding: '10px 15px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Show Project Error (with kwargs)
        </button>

        <button
          onClick={showServerError}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Show Server Error
        </button>

        <button
          onClick={showGenericError}
          style={{
            padding: '10px 15px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Show Generic Error
        </button>

        <button
          onClick={showLongError}
          style={{
            padding: '10px 15px',
            backgroundColor: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Show Long Error (overflow test)
        </button>
      </div>
    </div>
  );
};

export const ErrorToastDemo: FC = () => {
  return (
    <ErrorProvider>
      <TestComponent />
      <ErrorToastManager />
    </ErrorProvider>
  );
};
