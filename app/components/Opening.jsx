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

const DURATION = 6500;

const k = (b, u = 1, id, t) => ({ b, u, id: id || b, t });

const ROWS = [
  [k('esc', 1.5), ...Array.from({ length: 12 }, (_, i) => k('F' + (i + 1))), k('', 1.5, 'power')],
  [
    k('`', 1, '`', '~'),
    ...[['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')']].map(([b, t]) => k(b, 1, b, t)),
    k('-', 1, '-', '_'),
    k('=', 1, '=', '+'),
    k('delete', 2, 'backspace'),
  ],
  [
    k('tab', 1.5),
    ...'qwertyuiop'.split('').map((c) => k(c.toUpperCase(), 1, c)),
    k('[', 1, '[', '{'),
    k(']', 1, ']', '}'),
    k('\\', 1.5, '\\', '|'),
  ],
  [
    k('caps lock', 1.75, 'caps'),
    ...'asdfghjkl'.split('').map((c) => k(c.toUpperCase(), 1, c)),
    k(';', 1, ';', ':'),
    k("'", 1, "'", '"'),
    k('return', 2.25, 'enter'),
  ],
  [
    k('shift', 2.25, 'shiftL'),
    ...'zxcvbnm'.split('').map((c) => k(c.toUpperCase(), 1, c)),
    k(',', 1, ',', '<'),
    k('.', 1, '.', '>'),
    k('/', 1, '/', '?'),
    k('shift', 2.75, 'shiftR'),
  ],
  [
    k('ctrl', 1.25, 'ctrl'),
    k('win', 1.25),
    k('alt', 1.25, 'alt'),
    k('', 5.5, 'space'),
    k('alt', 1.25, 'altR'),
    k('ctrl', 1.25, 'ctrlR'),
    k('\u25c0', 1.08, 'left'),
    k('\u25b2\u25bc', 1.08, 'updown'),
    k('\u25b6', 1.08, 'right'),
  ],
];

const SHIFTED = { '~': '`', '!': '1', '@': '2', '#': '3', $: '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', _: '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/' };

function keysFor(ch) {
  if (ch === ' ') return ['space'];
  if (ch === '\n') return ['enter'];
  if (/[a-z]/.test(ch)) return [ch];
  if (/[A-Z]/.test(ch)) return [ch.toLowerCase(), 'shiftL'];
  if (SHIFTED[ch]) return [SHIFTED[ch], 'shiftR'];
  return [ch];
}

let played = false;

export default function Opening() {
  const [n, setN] = useState(0);
  const [down, setDown] = useState([]);
  const [ran, setRan] = useState(false);
  const [runKey, setRunKey] = useState(false);
  const [phase, setPhase] = useState('type');
  const [move, setMove] = useState(null);
  const win = useRef(null);
  const state = useRef('type');
  const timers = useRef([]);
  const last = useRef(0);

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const expand = () => {
    if (state.current === 'expand' || !win.current) return;
    state.current = 'expand';
    const s = win.current.getBoundingClientRect();
    const cx = s.left + s.width / 2;
    const cy = s.top + s.height / 2;
    const kk = Math.max(window.innerWidth / s.width, window.innerHeight / s.height) * 1.02;
    setMove({ transform: `translate(${window.innerWidth / 2 - cx}px, ${window.innerHeight / 2 - cy}px) scale(${kk})` });
    setPhase('expand');
    later(() => {
      setPhase('done');
      played = true;
      document.documentElement.dataset.intro = 'done';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1300);
  };

  useEffect(() => {
    if (played) {
      state.current = 'expand';
      setPhase('done');
      document.documentElement.dataset.intro = 'done';
      return undefined;
    }
    let raf;
    let start;
    const tick = (t) => {
      if (state.current !== 'type') return;
      if (start === undefined) start = t + 500;
      const p = Math.min(Math.max((t - start) / DURATION, 0), 1);
      const count = Math.floor(p * CODE.length);
      if (count !== last.current) {
        last.current = count;
        setN(count);
        const ch = CODE[count - 1];
        if (ch !== undefined) {
          const token = count;
          setDown((d) => [...d.slice(-8), ...keysFor(ch).map((id) => ({ id, token }))]);
          later(() => setDown((d) => d.filter((x) => x.token !== token)), 110);
        }
      }
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setRunKey(true);
        later(() => setRan(true), 350);
        later(() => setRunKey(false), 520);
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
  const isDown = (id) => down.some((d) => d.id === id) || (id === 'enter' && runKey);

  return (
    <div className={`opening ${phase} ${ran ? 'ran' : ''}`}>
      <button type="button" className="skip" onClick={expand}>Skip intro</button>
      <div className="stage" aria-hidden="true">
        <div className="win" ref={win} style={move || undefined}>
          <div className="bar">
            <i /><i /><i />
            <span>Faith.jsx</span>
            <b className={ran || runKey ? 'press' : ''}>Run</b>
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
          {ROWS.map((row, r) => (
            <div className="lp-row" key={r}>
              {row.map((key, i) => (
                <span
                  key={i}
                  className={`lp-key${isDown(key.id) ? ' down' : ''}${key.id === 'enter' ? ' enter' : ''}${key.id === 'space' ? ' space' : ''}${r === 0 ? ' fn' : ''}`}
                  style={{ flex: `${key.u} 1 0` }}
                >
                  {key.t && <em>{key.t}</em>}
                  {key.id === 'updown' ? <><b>{'\u25b2'}</b><b>{'\u25bc'}</b></> : <b>{key.b}</b>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
