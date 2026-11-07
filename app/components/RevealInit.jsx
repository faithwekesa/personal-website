'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    const watch = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    watch();
    const t1 = setTimeout(watch, 300);
    const t2 = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    }, 1500);
    return () => { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  return null;
}
