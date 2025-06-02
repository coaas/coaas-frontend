import { FC, useEffect } from 'react';
import { useErrorContext } from '@global/ErrorContext';
import { ErrorToastContainer } from '@components/ErrorToastContainer';
import { setGlobalErrorHandler } from '../../api/errorHandler';

export const ErrorToastManager: FC = () => {
  const { errors, removeError, showError } = useErrorContext();

  // Устанавливаем глобальный обработчик ошибок API
  useEffect(() => {
    setGlobalErrorHandler(showError);
  }, [showError]);

  return (
    <ErrorToastContainer
      errors={errors}
      onRemoveError={removeError}
    />
  );
}; 