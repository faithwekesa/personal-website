'use client';

import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data';
import { highlight } from './highlight';

const CODE = `const me = {
  name: "${PROFILE.name}",
  role: "${PROFILE.role}",
  base: "${PROFILE.base}",
  stack: ["React", "Next.js"],
};

export default () => (
  <main>
    <h1>Hi, I'm {me.name}</h1>
    <p>{me.role}</p>
    <Contact via="WhatsApp" />
  </main>
);`;

const KEYS = 56;
const ENTER = 41;
const DURATION = 6000;

export default function Opening() {
  const [n, setN] = useState(0);
  const [down, setDown] = useState([]);
  const [ran, setRan] = useState(false);
  const [phase, setPhase] = useState('type');
  const [move, setMove] = useState(null);
  const win = useRef(null);
  const state = useRef('type');
  const timers = useRef([]);

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const expand = () => {
    if (state.current === 'expand') return;
    state.current = 'expand';
    const s = win.current.getBoundingClientRect();
    const cx = s.left + s.width / 2;
    const cy = s.top + s.height / 2;
    const k = Math.max(window.innerWidth / s.width, window.innerHeight / s.height) * 1.02;
    setMove({ transform: `translate(${window.innerWidth / 2 - cx}px, ${window.innerHeight / 2 - cy}px) scale(${k})` });
    setPhase('expand');
    later(() => {
      setPhase('done');
      document.documentElement.dataset.intro = 'done';
      window.scrollTo(0, 0);
    }, 1300);
  };

  useEffect(() => {
    let raf;
    let start;
    const tick = (t) => {
      if (state.current !== 'type') return;
      if (start === undefined) start = t + 500;
      const p = Math.min(Math.max((t - start) / DURATION, 0), 1);
      const count = Math.floor(p * CODE.length);
      setN((prev) => {
        if (prev !== count) setDown([Math.floor(Math.random() * KEYS), Math.floor(Math.random() * KEYS)]);
        return count;
      });
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDown([ENTER]);
        later(() => setRan(true), 350);
        later(() => setDown([]), 500);
        later(expand, 2600);
      }
    };
    raf = requestAnimationFrame(tick);
    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      pending.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  const typed = CODE.slice(0, n);
  const lines = typed.split('\n').length;

  return (
    <div className={`opening ${phase} ${ran ? 'ran' : ''}`} aria-hidden="true">
      <div className="stage">
        <div className="win" ref={win} style={move || undefined}>
          <div className="bar">
            <i /><i /><i />
            <span>Faith.jsx</span>
            <b className={ran || down.includes(ENTER) ? 'press' : ''}>Run</b>
          </div>
          <div className="panes">
            <div className="code">
              <div className="editor">
                <div className="gutter">
                  {Array.from({ length: lines }, (_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <pre>{highlight(typed)}<b className="caret" /></pre>
              </div>
            </div>
            <div className="pv">
              <div className="page">
                <p className="pv-top">{PROFILE.role} · {PROFILE.base}</p>
                <h4>Hi, I&apos;m {PROFILE.name}</h4>
                <p className="pv-role">I build calm and useful web products.</p>
                <div className="pv-tags"><span>React</span><span>Next.js</span><span>TypeScript</span></div>
                <span className="pv-btn">Contact me</span>
              </div>
            </div>
          </div>
        </div>
        <div className="kbd">
          {Array.from({ length: KEYS }, (_, i) => (
            <i key={i} className={`${down.includes(i) ? 'down' : ''} ${i === ENTER ? 'enter' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
