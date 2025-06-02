import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { UseFadeInOutParams } from './types';

export const useFadeInOut = <TData extends WithId>({
  data,
  animations,
}: UseFadeInOutParams<TData>) => {
  const [animatedData, setAnimatedData] = useState(data);
  const containerRef = useRef(null);

  // On each update of passed data, run fade-in-out effect:
  // Reset opacity to zero
  // Update data for display
  // Return original opacity
  useEffect(() => {
    // run transitions only when data changes
    if (animatedData.id === data.id || !containerRef.current) {
      return;
    }

    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      opacity: 0,
      duration: animations.disappear.duration,
      ease: 'power3.out',
      onComplete: () => setAnimatedData(data),
    }).to(containerRef.current, {
      delay: animations.appear.delay,
      opacity: 1,
      ease: 'power3.in',
      duration: animations.appear.duration,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { containerRef, animatedData };
};
