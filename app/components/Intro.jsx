'use client';

import { useEffect, useRef, useState } from 'react';

const LINES = [
  [['const ', 'k'], ['me ', 'v'], ['= ', ''], ['{', '']],
  [['  name', 'v'], [': ', ''], ['"Faith Wekesa"', 's'], [',', '']],
  [['  role', 'v'], [': ', ''], ['"Software engineer"', 's'], [',', '']],
  [['  city', 'v'], [': ', ''], ['"Nairobi"', 's'], [',', '']],
  [['};', '']],
  [['me', 'v'], ['.say', 'f'], ['(', ''], ['"Welcome in"', 's'], [');', '']],
];

const LENS = LINES.map((l) => l.reduce((n, s) => n + s[0].length, 0));
const TOTAL = LENS.reduce((a, b) => a + b, 0);
const KEYS = 56;
const ENTER = 41;

function Typed({ count }) {
  let caretLine = LINES.length - 1;
  let acc = 0;
  for (let i = 0; i < LENS.length; i += 1) {
    if (count <= acc + LENS[i]) {
      caretLine = i;
      break;
    }
    acc += LENS[i];
  }
  let before = 0;
  return LINES.map((line, li) => {
    const local = Math.max(0, Math.min(LENS[li], count - before));
    before += LENS[li];
    let left = local;
    const parts = line.map(([text, cls], si) => {
      const take = text.slice(0, left);
      left -= take.length;
      return (
        <span key={si} className={cls}>
          {take}
        </span>
      );
    });
    return (
      <div className="code-line" key={li}>
        {parts}
        {li === caretLine && <span className="caret" />}
      </div>
    );
  });
}

function finish() {
  document.documentElement.dataset.intro = 'done';
  window.dispatchEvent(new Event('intro-done'));
}

export default function Intro() {
  const [phase, setPhase] = useState('wait');
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const [down, setDown] = useState([]);
  const timers = useRef([]);

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const leave = () => {
    setPhase('leave');
    finish();
    later(() => setGone(true), 1500);
  };

  const skip = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    leave();
  };

  useEffect(() => {
    const quiet =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      new URLSearchParams(window.location.search).get('intro') === '0';
    if (quiet) {
      setGone(true);
      finish();
      return undefined;
    }
    later(() => setPhase('typing'), 800);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== 'typing') return undefined;
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setCount(i);
      setDown([Math.floor(Math.random() * KEYS), Math.floor(Math.random() * KEYS)]);
      if (i >= TOTAL) {
        clearInterval(iv);
        setDown([ENTER]);
        later(() => setPhase('ran'), 350);
        later(() => setPhase('wipe'), 1900);
        later(leave, 3300);
      }
    }, 36);
    return () => clearInterval(iv);
  }, [phase === 'typing']);

  if (gone) return null;

  const ran = phase === 'ran' || phase === 'wipe' || phase === 'leave';

  return (
    <div className={`opening phase-${phase}`} aria-hidden="true">
      <div className="stage">
        <div className="ed">
          <div className="ed-top">
            <i />
            <i />
            <i />
            <span>hello.js</span>
            <b className={ran ? 'press' : ''}>Run</b>
          </div>
          <div className="ed-body">
            <Typed count={count} />
          </div>
          <div className={`ed-out ${ran ? 'on' : ''}`}>
            <em>&gt;</em> Welcome in
          </div>
        </div>
        <div className="kbd">
          {Array.from({ length: KEYS }, (_, i) => (
            <i key={i} className={`${down.includes(i) ? 'down' : ''} ${i === ENTER ? 'enter' : ''}`} />
          ))}
        </div>
      </div>
      <div className="curtain">
        <span />
        <span />
        <span />
      </div>
      <button type="button" className="skip" onClick={skip}>
        Skip intro
      </button>
    </div>
  );
}
