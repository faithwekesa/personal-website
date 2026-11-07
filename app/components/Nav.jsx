'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Nav({ cv }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  return (
    <header className="nav">
      <div className="nav-right">
        <a className="cvbtn" href={cv} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-cv')); }}>View CV</a>
        <button type="button" className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
          <span /><span />
        </button>
      </div>
      {open && (
        <nav className="menu" onClick={() => setOpen(false)}>
          {LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
      )}
    </header>
  );
}
