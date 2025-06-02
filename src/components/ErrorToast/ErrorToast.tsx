import { FC, useEffect } from 'react';
import styles from './ErrorToast.module.css';

export interface ApiError {
  code: string;
  default: string;
  kwargs?: Record<string, any>;
}

interface ErrorToastProps {
  error: ApiError;
  onClose: () => void;
  autoHide?: boolean;
  duration?: number;
}

export const ErrorToast: FC<ErrorToastProps> = ({ 
  error, 
  onClose, 
  autoHide = true, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onClose]);

  // Подставляем kwargs в текст ошибки
  const formatErrorMessage = (message: string, kwargs?: Record<string, any>) => {
    if (!kwargs) return message;
    
    return Object.entries(kwargs).reduce((text, [key, value]) => {
      return text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    }, message);
  };

  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <div className={styles.icon}>⚠️</div>
        <div className={styles.message}>
          <div className={styles.title}>Error</div>
          <div className={styles.text}>
            {formatErrorMessage(error.default, error.kwargs)}
          </div>
          {error.code && (
            <div className={styles.code}>Code: {error.code}</div>
          )}
        </div>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}; 