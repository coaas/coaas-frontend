import debounce from 'debounce';
import { useEffect, useRef } from 'react';

interface Props {
  scrollCb: () => void;
  scrollThreshold: number;
  isFetchingNextPage?: boolean;
  delay?: number;
}

export const useTemplatesList = <
  TElement extends HTMLElement = HTMLDivElement,
>({
  scrollCb,
  scrollThreshold,
  isFetchingNextPage,
  delay = 500,
}: Props) => {
  const elementRef = useRef<TElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const handleScroll = (e: Event) => {
      const { currentTarget } = e;
      if (!(currentTarget instanceof HTMLElement) || isFetchingNextPage) return;
      const { scrollHeight, scrollTop } = currentTarget;
      const shouldExecute = scrollHeight - scrollTop <= scrollThreshold;
      if (shouldExecute) {
        scrollCb();
      }
    };

    const debouncedScroll = debounce(handleScroll, delay);

    element.addEventListener('scroll', debouncedScroll);

    return () => element.removeEventListener('scroll', debouncedScroll);
  }, [scrollThreshold, scrollCb, isFetchingNextPage, delay]);

  return { elementRef };
};
