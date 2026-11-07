'use client';

import { useEffect, useRef, useState } from 'react';

export default function LiveCover({ url, title }) {
  const box = useRef(null);
  const [size, setSize] = useState({ scale: 0.3, view: 1700 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      const scale = width / 1280;
      setSize({ scale, view: height / scale });
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="livecover" ref={box}>
      <div className="ph">{title}</div>
      {on && url && (
        <div className="slide" style={{ height: size.view, transform: `scale(${size.scale})` }}>
          <iframe src={url} title={`${title} live preview`} loading="lazy" tabIndex={-1} />
        </div>
      )}
    </div>
  );
}
