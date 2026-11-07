'use client';

import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../data';
import { BakeDemo, NailDemo, SafariDemo } from './Demos';
import BakeApp from './BakeApp';
import Reveal from './Reveal';

const DEMOS = { safari: SafariDemo, nail: NailDemo, bake: BakeDemo };
const SITE_W = 1280;

function Screen({ p, play, active }) {
  const wrap = useRef(null);
  const vid = useRef(null);
  const [scale, setScale] = useState(0.5);
  const [seen, setSeen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const Demo = DEMOS[p.id];

  useEffect(() => {
    const el = wrap.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / SITE_W));
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (play) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [play]);

  const real = Boolean(p.video || p.live);

  return (
    <div className="screen" ref={wrap}>
      {p.own ? (
        <BakeApp scale={scale} />
      ) : p.video ? (
        <video ref={vid} className="vid" src={p.video} muted loop playsInline preload="metadata" />
      ) : (
        <Demo play={play && !loaded} />
      )}
      {!p.video && p.live && seen && (
        <iframe
          className={`live ${loaded ? 'ready' : ''}`}
          src={p.live}
          title={`${p.title} live preview`}
          style={{ transform: `scale(${scale})`, pointerEvents: active ? 'auto' : 'none' }}
          onLoad={() => setLoaded(true)}
          tabIndex={-1}
        />
      )}
      {!p.own && <span className="hint">
        <span className="h">{real ? 'Live preview · click to try it' : 'Hover to see it run'}</span>
        <span className="t">{real ? 'Live preview · tap to try it' : 'Tap to see it run'}</span>
      </span>}
    </div>
  );
}

function Project({ p, index }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const flip = index % 2 === 1;
  const play = hover || active;

  return (
    <article className={`proj ${flip ? 'flip' : ''}`} style={{ '--tone': p.tone }}>
      <Reveal className="proj-copy" from={flip ? 'right' : 'left'} stagger>
        <span className="idx">{String(index + 1).padStart(2, '0')}</span>
        <h3>{p.title}</h3>
        <p className="proj-text">{p.text}</p>
        <p className="label">Skills used</p>
        <ul className="skills">
          {p.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="proj-links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="ln-link">
              Live site <i>{'↗'}</i>
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="ln-link soft">
              Code <i>{'↗'}</i>
            </a>
          )}
        </div>
      </Reveal>

      <Reveal className="proj-demo" from={flip ? 'left' : 'right'} delay={0.1}>
        <div
          className={`frame ${play ? 'play' : ''} ${active ? 'active' : ''} ${p.live || p.video ? 'real' : ''}`}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') {
              setHover(false);
              setActive(false);
            }
          }}
          onClick={p.own ? undefined : () => setActive((v) => !v)}
          role={p.own ? undefined : 'button'}
          tabIndex={p.own ? undefined : 0}
          aria-pressed={p.own ? undefined : active}
          aria-label={p.own ? undefined : `Preview ${p.title}`}
          onKeyDown={
            p.own
              ? undefined
              : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive((v) => !v);
                  }
                }
          }
        >
          <div className="fbar">
            <i />
            <i />
            <i />
            {p.host && <em>{p.host}</em>}
          </div>
          <Screen p={p} play={play} active={active} />
        </div>
        <p className="caption">{p.own ? 'A working mini version. Add items and send the order.' : 'Live preview of the real site'}</p>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="work" id="work">
      <Reveal>
        <p className="eyebrow">01 &mdash; Selected work</p>
        <h2>
          Projects I have <em>built</em>
        </h2>
      </Reveal>
      {PROJECTS.map((p, i) => (
        <Project key={p.id} p={p} index={i} />
      ))}
    </section>
  );
}
