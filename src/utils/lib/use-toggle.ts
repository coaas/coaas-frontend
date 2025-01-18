import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState(state => !state);
  }, []);

  const on = useCallback(() => {
    setState(true);
  }, []);

  const off = useCallback(() => {
    setState(false);
  }, []);

  return { state, toggle, on, off, setState };
}

export type UseToggle = ReturnType<typeof useToggle>;
