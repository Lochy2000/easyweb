import { RefObject, useEffect, useState } from 'react';

/**
 * Tracks whether a scroll container has been scrolled past `threshold`,
 * for the common "transparent nav becomes solid on scroll" pattern.
 *
 * Template demos render inside a scrollable wrapper div, not the browser
 * window, so this observes the container's own `scrollTop` via `containerRef`
 * rather than `window.scrollY` (which never fires inside the preview modal).
 */
export function useScrollNav(containerRef: RefObject<HTMLElement>, threshold = 40) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleScroll = () => setIsScrolled(node.scrollTop > threshold);
    handleScroll();

    node.addEventListener('scroll', handleScroll, { passive: true });
    return () => node.removeEventListener('scroll', handleScroll);
  }, [containerRef, threshold]);

  return isScrolled;
}
