import { forwardRef, useEffect } from 'react';
import { useNotificationContext } from '..';
import { Check } from 'lucide-react';
import { cn } from '@utils/styles';
import { NotificationVariants } from './styles';

export const Notification = forwardRef<HTMLDivElement>((_, ref) => {
  const { animateIn, state, close } = useNotificationContext();

  useEffect(() => {
    animateIn();
  }, [animateIn]);

  return (
    <div
      className={cn(NotificationVariants({ variant: state?.variant }))}
      ref={ref}
      onClick={close}
    >
      {state && (
        <div>
          {state.title && (
            <h1 className="font-inter font-medium text-lg text-white">
              {state.title}
            </h1>
          )}
          {state.description && (
            <p className="text-white text-sm">{state.description}</p>
          )}
        </div>
      )}
      <span className="rounded-full p-2 bg-stroke self-center">
        <Check />
      </span>
    </div>
  );
});
