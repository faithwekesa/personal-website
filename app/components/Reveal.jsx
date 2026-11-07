'use client';

import { useEffect, useRef } from 'react';

export default function Reveal({ children, delay = 0, className = '', from = 'up', stagger = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rv from-${from} ${stagger ? 'stagger' : ''} ${className}`} style={{ '--dl': `${delay}s` }}>
      {children}
    </div>
  );
}
