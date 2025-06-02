import { createContext, useContext, ReactNode, FC, useState, useCallback } from 'react';
import { ApiError } from '@components/ErrorToast';

interface ErrorToastItem extends ApiError {
  id: string;
}

interface ErrorContextValue {
  errors: ErrorToastItem[];
  showError: (error: ApiError) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorToastItem[]>([]);

  const showError = useCallback((error: ApiError) => {
    const errorWithId: ErrorToastItem = {
      ...error,
      id: crypto.randomUUID(),
    };
    
    setErrors(prev => [...prev, errorWithId]);
  }, []);

  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const value: ErrorContextValue = {
    errors,
    showError,
    removeError,
    clearErrors,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = (): ErrorContextValue => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
}; 