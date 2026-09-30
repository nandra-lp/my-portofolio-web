import { useState, useEffect, useRef } from 'react';

const supportsIntersectionObserver =
  typeof IntersectionObserver !== 'undefined';

/**
 * @param {number} threshold - rasio visibilitas (primitif agar effect stabil)
 * @returns {[React.RefObject, boolean]}
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  // Tanpa IntersectionObserver (browser lama / SSR): langsung terlihat.
  const [isVisible, setIsVisible] = useState(() => !supportsIntersectionObserver);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsIntersectionObserver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Stop observing after first trigger
        }
      },
      { threshold },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}
