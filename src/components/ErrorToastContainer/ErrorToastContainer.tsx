import { FC } from 'react';
import { ErrorToast, ApiError } from '@components/ErrorToast';
import styles from './ErrorToastContainer.module.css';

interface ErrorToastItem extends ApiError {
  id: string;
}

interface ErrorToastContainerProps {
  errors: ErrorToastItem[];
  onRemoveError: (id: string) => void;
}

export const ErrorToastContainer: FC<ErrorToastContainerProps> = ({
  errors,
  onRemoveError,
}) => {
  if (errors.length === 0) return null;

  return (
    <div className={styles.container}>
      {errors.map((error, index) => (
        <div
          key={error.id}
          className={styles.toastWrapper}
          style={{ top: `${index * 80}px` }}
        >
          <ErrorToast error={error} onClose={() => onRemoveError(error.id)} />
        </div>
      ))}
    </div>
  );
};
