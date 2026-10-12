import { useEffect, useRef, useState } from "react";

const supportsIntersectionObserver =
  typeof IntersectionObserver !== "undefined";

/**
 * Reveal-on-scroll selektif: satu fade-up halus (16px, 500ms) saat elemen
 * masuk viewport, sekali saja. Tanpa JS/IntersectionObserver: konten
 * langsung terlihat. `prefers-reduced-motion` ditangani global di `src/index.css`.
 */
export function Reveal({
  as,
  delay = 0,
  className = "",
  children,
  ...props
}) {
  const Tag = as ?? "div";
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () => !supportsIntersectionObserver
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsIntersectionObserver) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "animate-in" : "translate-y-4 opacity-0"
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
