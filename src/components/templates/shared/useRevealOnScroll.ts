import { useEffect, useRef, useState } from 'react';

/**
 * Fades/slides an element in the first time it scrolls into view.
 * Works correctly inside a scrolling container (not just the window),
 * since IntersectionObserver accounts for clipping by ancestor scroll
 * containers regardless of `root`.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
