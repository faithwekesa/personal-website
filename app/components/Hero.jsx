'use client';

import { useEffect, useRef, useState } from 'react';
import { Character, Cloud, Hills, Pine, RoundTree } from './Art';

const WORDS = [
  { t: 'I' },
  { t: 'design' },
  { t: 'and' },
  { t: 'build' },
  { t: 'calm,', em: true },
  { t: 'useful' },
  { t: 'software.' },
];

const PATH = 'M -60 640 C 260 560, 470 180, 820 250 S 1260 110, 1520 30';

export default function Hero() {
  const [ran, setRan] = useState(false);
  const pathRef = useRef(null);
  const jetRef = useRef(null);
  const drawRef = useRef(null);
  const artRef = useRef(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' }).format(new Date()));
    tick();
    const t = setInterval(tick, 20000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = artRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const move = (e) => {
      el.style.setProperty('--mx', String((e.clientX / window.innerWidth - 0.5) * 2));
      el.style.setProperty('--my', String((e.clientY / window.innerHeight - 0.5) * 2));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    const on = () => setRan(true);
    if (document.documentElement.dataset.intro === 'done') setRan(true);
    window.addEventListener('intro-done', on);
    return () => window.removeEventListener('intro-done', on);
  }, []);

  useEffect(() => {
    if (!ran) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const path = pathRef.current;
    const jet = jetRef.current;
    const draw = drawRef.current;
    if (!path || !jet || !draw) return undefined;
    const len = path.getTotalLength();
    const dur = 4200;
    const t0 = performance.now();
    let raf = 0;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
      const at = len * e;
      const a = path.getPointAtLength(at);
      const b = path.getPointAtLength(Math.min(len, at + 1));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      jet.setAttribute('transform', `translate(${a.x} ${a.y}) rotate(${ang})`);
      draw.style.strokeDashoffset = String(1 - e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [ran]);

  return (
    <section className="hero" id="top">
      <div className="hero-bar">
        <span>Faith Wekesa</span>
        <span className="clock">Nairobi {time}</span>
        <span className="status">
          <i />
          Open to junior roles
        </span>
      </div>

      <div className="hero-body">
        <p className={`hello ${ran ? 'on' : ''}`}>Hello there</p>
        <h1 className={`headline ${ran ? 'on' : ''}`}>
          {WORDS.map((w, i) => (
            <span key={i} className={`w ${w.em ? 'em' : ''}`} style={{ '--i': i }}>
              {w.t}{' '}
            </span>
          ))}
        </h1>

        <p className={`intro ${ran ? 'on' : ''}`}>
          Junior software engineer in Nairobi. I turn ideas into interfaces people enjoy using and the services that power them.
        </p>

        <div className={`cta ${ran ? 'on' : ''}`}>
          <a href="#work" className="vbtn">
            Walk through my work
          </a>
          <a href="#contact" className="ln-link soft">
            Get in touch
          </a>
        </div>
      </div>

      <div className="hsky" aria-hidden="true">
        <i className="vsun" />
        <Cloud className="c1" />
        <Cloud className="c2" />
        <Cloud className="c3" />
      </div>
      <div className="hland" aria-hidden="true">
        <Hills className="h1" color="#e8c6d9" seed={1} amp={45} base={110} />
        <Hills className="h2" color="#a9dcae" seed={3} amp={40} base={120} freq={1.5} />
        <Hills className="h3" color="#7cc58c" seed={5} amp={30} base={130} freq={1} />
        <Pine className="ht t1" />
        <RoundTree className="ht t2" />
        <Pine className="ht t3" />
        <Character wave className={`hchar ${ran ? 'on' : ''}`} />
      </div>

      {ran && (
        <svg className="plane" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <mask id="trail" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="810">
              <path ref={drawRef} d={PATH} fill="none" stroke="#fff" strokeWidth="8" pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: 1 }} />
            </mask>
          </defs>
          <path ref={pathRef} d={PATH} fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 9" mask="url(#trail)" />
          <g ref={jetRef} transform="translate(-200 -200)">
            <path d="M20 0 L-18 -12 L-10 0 L-18 12 Z" fill="currentColor" />
            <path d="M20 0 L-10 0 L-18 12 Z" fill="#ffffff" opacity="0.45" />
          </g>
        </svg>
      )}

    </section>
  );
}
