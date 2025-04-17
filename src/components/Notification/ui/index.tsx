import { forwardRef, useEffect } from 'react';
import { useNotificationContext } from '..';
import { Check, TriangleAlert } from 'lucide-react';
import { cn } from '@utils/styles';
import { NotificationVariants } from './styles';
import { NotificationState } from '../types';

interface Props {
  onMount: () => void;
  state: NotificationState;
}

export const Notification = forwardRef<HTMLDivElement, Props>(
  ({ onMount, state }, ref) => {
    const { close } = useNotificationContext();
    const { description, title, variant } = state;

    const isError = variant === 'error';
    const isSuccess = variant === 'success';

    useEffect(() => {
      onMount();
    }, [onMount]);

    return (
      <div
        className={cn(NotificationVariants({ variant }))}
        ref={ref}
        onClick={close}
      >
        <div>
          {title && (
            <h1 className="font-inter font-medium text-lg text-white">
              {title}
            </h1>
          )}
          {description && <p className="text-white text-sm">{description}</p>}
        </div>

        <span
          className={cn(
            'rounded-full p-2 self-start flex items-center justify-center',
            {
              'bg-stroke': isSuccess,
              'bg-error': isError,
            },
          )}
        >
          {isSuccess && <Check />}
          {isError && <TriangleAlert />}
        </span>
      </div>
    );
  },
);
