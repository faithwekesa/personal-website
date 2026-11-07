'use client';

import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import { useTyper } from '../lib/useTyper';

export default function Guide() {
  const [ready, setReady] = useState(false);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(true);
  const [away, setAway] = useState(true);
  const { shown, done } = useTyper(open ? text : '', Boolean(text), 22);

  useEffect(() => {
    const on = () => setReady(true);
    if (document.documentElement.dataset.intro === 'done') setReady(true);
    window.addEventListener('intro-done', on);
    return () => window.removeEventListener('intro-done', on);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const hero = document.getElementById('top');
    const heroIo = new IntersectionObserver(([e]) => setAway(!e.isIntersecting || e.intersectionRatio < 0.35), {
      threshold: [0, 0.2, 0.35, 0.5, 1],
    });
    if (hero) heroIo.observe(hero);

    const els = Array.from(document.querySelectorAll('[data-say]'));
    const visible = new Map();
    const pick = () => {
      let best = null;
      let bestD = Infinity;
      visible.forEach((_, el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
        if (d < bestD) {
          bestD = d;
          best = el;
        }
      });
      if (best) setText(best.getAttribute('data-say'));
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target, true);
          else visible.delete(e.target);
        });
        pick();
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      heroIo.disconnect();
      io.disconnect();
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <div className={`guide ${away ? 'on' : ''}`}>
      <div className={`gbubble ${open && text ? 'open' : ''}`} role="status" aria-live="polite">
        {shown}
        {!done && <span className="gcaret" />}
      </div>
      <button type="button" className="gface" onClick={() => setOpen((v) => !v)} aria-label="Toggle Faith's tour guide">
        <Avatar crop talk={open && Boolean(text) && !done} pose="idle" />
      </button>
    </div>
  );
}
