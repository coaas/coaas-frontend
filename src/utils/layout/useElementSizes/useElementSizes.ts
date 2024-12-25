import { flushSync } from 'react-dom';
import { useLayoutEffect, useRef, useState } from 'react';

export const useElementSizes = <TElement extends HTMLElement>() => {
  const ref = useRef<TElement>(null);
  const [sizes, setSizes] = useState({ height: 0, width: 0 });

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([element]) => {
      const { width, height } = element.target.getBoundingClientRect();

      flushSync(() => setSizes({ width, height }));
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, sizes };
};
