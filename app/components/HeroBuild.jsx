'use client';

import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data';
import { highlight } from './highlight';

const SNIPPET = `export default function Hero() {
  return (
    <section>
      <h1>Hi, I'm Faith</h1>
      <p>Software Engineer</p>
      <Button>Contact me</Button>
    </section>
  );
}`;

const FIG = 7200;
const SW1 = 1000;
const CODE = 7000;
const SW2 = 1000;
const VER = 8000;
const T1 = FIG;
const T2 = T1 + SW1;
const T3 = T2 + CODE;
const T4 = T3 + SW2;
const TOTAL = T4 + VER;

const PATH = [
  [0, 62, 66],
  [400, 30, 17],
  [1700, 66, 73],
  [2200, 36, 27],
  [3000, 37, 35],
  [4200, 38, 47],
  [5000, 39, 54],
  [5800, 41, 63],
  [6600, 47, 91],
  [7600, 50, 91],
  [8600, 64, 52],
  [15200, 64, 52],
  [15700, 57, 91],
  [16600, 72, 46],
  [20400, 72, 46],
  [20900, 86, 72],
  [22600, 86, 72],
  [23800, 70, 40],
];
const CLICKS = [450, 2300, 3000, 4300, 5100, 5900, 7650, 15750, 21400];
const TASKS = ['Cloning faithwekesa/personal-website', 'Installing dependencies', 'Building the Next.js app', 'Deploying to production'];
const TASK_AT = [500, 1400, 2700, 3700];
const KEYS = 52;

const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const clamp = (x) => Math.max(0, Math.min(1, x));

function cursorAt(t) {
  if (t <= PATH[0][0]) return [PATH[0][1], PATH[0][2]];
  for (let i = 1; i < PATH.length; i += 1) {
    if (t <= PATH[i][0]) {
      const a = PATH[i - 1];
      const b = PATH[i];
      const k = ease(clamp((t - a[0]) / (b[0] - a[0])));
      return [a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
    }
  }
  const l = PATH[PATH.length - 1];
  return [l[1], l[2]];
}

function MiniPage() {
  return (
    <div className="mp">
      <p className="a">{PROFILE.role} · {PROFILE.base}</p>
      <h4 className="b">Hi, I&apos;m {PROFILE.name}</h4>
      <p className="c">I build calm and useful web products.</p>
      <div className="d"><span>React</span><span>Next.js</span><span>TypeScript</span></div>
      <span className="e">Contact me</span>
    </div>
  );
}

function Dock({ app, bounce }) {
  return (
    <div className="dock">
      <i className={`ic fg ${app === 0 ? 'on' : ''} ${bounce === 0 ? 'bn' : ''}`}><b /><b /><b /><b /><b /></i>
      <i className={`ic vs ${app === 1 ? 'on' : ''} ${bounce === 1 ? 'bn' : ''}`}><b /></i>
      <i className={`ic vc ${app === 2 ? 'on' : ''} ${bounce === 2 ? 'bn' : ''}`}><b /></i>
    </div>
  );
}

function Figma({ lt, cx, cy }) {
  const dragging = lt >= 400 && lt < 1700;
  const fw = lt < 400 ? 0 : lt < 1700 ? Math.max(0, cx - 30) : 36;
  const fh = lt < 400 ? 0 : lt < 1700 ? Math.max(0, cy - 17) : 56;
  const show = (s, d = 700) => clamp((lt - s) / d);
  const sel = (s) => lt >= s && lt < s + 800;
  const layers = ['Frame', 'Eyebrow', 'Heading', 'Text', 'Tags', 'Button'];
  const counts = [lt > 1700 ? 1 : 0, lt > 2300 ? 2 : 0, lt > 3000 ? 3 : 0, lt > 4300 ? 4 : 0, lt > 5100 ? 5 : 0, lt > 5900 ? 6 : 0];
  const n = Math.max(...counts);
  return (
    <>
      <div className="w fgw">
        <div className="tb"><i /><i /><i /><span>Portfolio — Figma</span></div>
        <div className="fgb">
          <div className="lp">
            <p>Layers</p>
            {layers.slice(0, n).map((l) => <span key={l}>{l}</span>)}
          </div>
          <div className="cv" />
          <div className="rp">
            <p>Design</p>
            <span>W <b>{Math.round(fw * 10)}</b></span>
            <span>H <b>{Math.round(fh * 10)}</b></span>
            <span>Fill <em /></span>
          </div>
        </div>
      </div>
      <div className={`frame ${dragging ? 'drag' : ''}`} style={{ left: '30%', top: '17%', width: `${fw}%`, height: `${fh}%` }}>
        <div className="fi">
          <p className={`e1 ${sel(2300) ? 'sel' : ''}`} style={{ opacity: show(2300) }}>{PROFILE.role} · Nairobi</p>
          <h4 className={`e2 ${sel(3000) ? 'sel' : ''}`} style={{ clipPath: `inset(0 ${100 - show(3000, 900) * 100}% 0 0)` }}>Hi, I&apos;m Faith Wekesa</h4>
          <p className={`e3 ${sel(4300) ? 'sel' : ''}`} style={{ opacity: show(4300) }}>I build calm and useful web products.</p>
          <div className={`e4 ${sel(5100) ? 'sel' : ''}`} style={{ opacity: show(5100) }}><span>React</span><span>Next.js</span><span>TypeScript</span></div>
          <span className={`e5 ${sel(5900) ? 'sel' : ''}`} style={{ opacity: show(5900, 300), background: lt > 6200 ? 'var(--gold)' : '#dcdcdc', color: lt > 6200 ? '#ffffff' : 'transparent' }}>Contact me</span>
        </div>
      </div>
    </>
  );
}

function Code({ lt }) {
  const n = Math.floor(clamp((lt - 500) / 5500) * SNIPPET.length);
  const lines = SNIPPET.slice(0, n).split('\n').length;
  return (
    <div className="w vsw">
      <div className="tb"><i /><i /><i /><span>page.jsx — personal-website</span></div>
      <div className="vsb">
        <div className="side">
          <p>EXPLORER</p>
          <span>app</span>
          <span className="in">layout.js</span>
          <span className="in act">page.jsx</span>
          <span className="in">globals.css</span>
          <span>public</span>
        </div>
        <div className="ed">
          <div className="tabs"><span>page.jsx</span></div>
          <div className="code">
            <div className="gut">{Array.from({ length: Math.max(lines, 1) }, (_, i) => <span key={i}>{i + 1}</span>)}</div>
            <pre>{highlight(SNIPPET.slice(0, n))}<b className="caret" /></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function Vercel({ lt }) {
  const done = TASK_AT.filter((x) => lt > x + 700).length;
  const ready = lt > 4200;
  const live = lt > 5600;
  if (live) {
    return (
      <div className="w lvw">
        <div className="tb"><i /><i /><i /><span className="url">personal-website.vercel.app</span></div>
        <div className="lvb"><MiniPage /></div>
      </div>
    );
  }
  return (
    <>
      <div className="w vcw">
        <div className="tb"><i /><i /><i /><span>personal-website — Vercel</span></div>
        <div className="vcb">
          <div className="vh"><b className="tri" /><strong>personal-website</strong><em className={ready ? 'ok' : ''}>{ready ? 'Ready' : 'Building'}</em></div>
          <ul>
            {TASKS.map((t, i) => (
              <li key={t} className={i < done ? 'd' : i === done ? 'r' : ''}><i />{t}</li>
            ))}
          </ul>
          <div className="bar2"><span style={{ width: `${(ready ? 1 : clamp(lt / 4000)) * 100}%` }} /></div>
        </div>
      </div>
      <div className={`pcard2 ${ready ? 'on' : ''}`}>
        <div className="th"><MiniPage /></div>
        <p>personal-website.vercel.app</p>
        <span className={`visit ${lt > 5000 ? 'press' : ''}`}>Visit</span>
      </div>
    </>
  );
}

export default function HeroBuild() {
  const [T, setT] = useState(0);
  const root = useRef(null);

  useEffect(() => {
    let raf;
    let last = 0;
    let start = performance.now();
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start = performance.now() - last; });
    if (root.current) io.observe(root.current);
    const tick = (now) => {
      if (visible) {
        const t = (now - start) % TOTAL;
        if (Math.abs(t - last) > 33 || t < last) { last = t; setT(t); }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const [cx, cy] = cursorAt(T);
  const app = T < T2 - 500 ? 0 : T < T4 - 500 ? 1 : 2;
  const names = ['Figma', 'Code', 'Vercel'];
  const clickIdx = CLICKS.findIndex((c) => T >= c && T < c + 380);
  const bounce = clickIdx === 6 ? 1 : clickIdx === 7 ? 2 : -1;
  const typing = T >= T2 + 500 && T < T2 + 6000;
  const lit = typing ? (Math.floor((T - T2) / 38) * 7 + 3) % KEYS : -1;
  const hide = T >= T2 + 600 && T < T3 - 900;

  return (
    <div className="lap" ref={root} aria-hidden="true">
      <div className="lid">
        <span className="cam" />
        <div className="scr">
          <div className="mb"><span className="ap" /><b>{names[app]}</b><span>File</span><span>Edit</span><span>View</span><em>9:41</em></div>
          <div key={app === 0 ? 'f' : app === 1 ? 'c' : 'v'} className="appwrap">
            {app === 0 && <Figma lt={T} cx={cx} cy={cy} />}
            {app === 1 && <Code lt={T - T2} />}
            {app === 2 && <Vercel lt={T - T4} />}
          </div>
          <Dock app={app} bounce={bounce} />
          <svg className={`cur ${hide ? 'rest' : ''}`} style={{ left: `${cx}%`, top: `${cy}%` }} viewBox="0 0 16 22" width="16" height="22">
            <path d="M1 1 L1 17 L5.2 13.2 L8 20 L10.6 18.9 L7.8 12.2 L13.5 12 Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          {clickIdx >= 0 && <i key={clickIdx} className="rip" style={{ left: `${cx}%`, top: `${cy}%` }} />}
        </div>
      </div>
      <div className="hinge" />
      <div className="deckwrap">
        <div className="deck">
          <div className="keys">
            {Array.from({ length: KEYS }, (_, i) => <i key={i} className={i === lit ? 'dn' : ''} />)}
          </div>
          <div className="space"><i className={typing && (T % 300) < 60 ? 'dn' : ''} /></div>
          <div className="pad" />
        </div>
      </div>
    </div>
  );
}
