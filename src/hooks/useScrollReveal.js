import { useState, useEffect, useRef } from 'react';

export function useScrollReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el); // Stop observing after first trigger
      }
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold]); // re-run if threshold changes, though usually static

  return [ref, isVisible];
}
