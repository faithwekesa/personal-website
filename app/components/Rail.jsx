'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  { id: 'top', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Rail() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <nav className="rail" aria-label="Sections">
      {ITEMS.map((i) => (
        <a key={i.id} href={`#${i.id}`} className={active === i.id ? 'on' : ''} aria-current={active === i.id ? 'true' : undefined}>
          <span>{i.label}</span>
          <i />
        </a>
      ))}
      </nav>
    </>
  );
}
