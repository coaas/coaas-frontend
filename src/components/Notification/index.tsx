import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import { NotificationState, NotificationContextProps } from './types';
import gsap from 'gsap';
import { FloatingPortal } from '@floating-ui/react';
import { Notification } from './ui';

const NotificationContext = createContext({} as NotificationContextProps);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<NotificationState | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const notificationRef = useRef<null | HTMLDivElement>(null);

  const animateIn = () => {
    gsap.fromTo(
      notificationRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: -50, duration: 0.5 },
    );
  };

  const close = () => {
    gsap.to(notificationRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      onComplete: () => setState(null),
    });
  };

  const open = (state: NotificationState, autoCloseMs = 3000) => {
    clearTimeout(timeoutRef.current);
    setState({ ...state, variant: state.variant || 'success' });
    timeoutRef.current = setTimeout(close, autoCloseMs);
  };

  return (
    <NotificationContext.Provider value={{ open, close }}>
      {children}
      {state && (
        <FloatingPortal>
          <Notification
            ref={notificationRef}
            state={state}
            onMount={animateIn}
          />
        </FloatingPortal>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  return context;
};
