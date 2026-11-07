import { useEffect, useState } from 'react';

export function useTyper(text, start, speed = 32) {
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
    if (!start || !text) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length);
      return undefined;
    }
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, start, speed]);

  return { shown: text ? text.slice(0, n) : '', done: Boolean(text) && n >= text.length };
}
