'use client';

import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../data';
import { Acacia, Bakery, Bush, Character, Cloud, Hills, Mountains, NailStudio, Pine, RoundTree, SafariLodge, SignPost } from './Art';
import Preview from './Preview';

const STOPS = [0.2, 0.507, 0.813];
const HOUSES = { safari: SafariLodge, nail: NailStudio, bake: Bakery };
const HOUSE_X = [112, 204, 296];

export default function Village() {
  const section = useRef(null);
  const stage = useRef(null);
  const last = useRef(0);
  const idle = useRef(0);
  const [walking, setWalking] = useState(false);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(null);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const s = section.current;
      const st = stage.current;
      if (!s || !st) return;
      const r = s.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / span));
      st.style.setProperty('--p', String(p));
      if (Math.abs(p - last.current) > 0.0004) {
        setWalking(true);
        clearTimeout(idle.current);
        idle.current = setTimeout(() => setWalking(false), 180);
      }
      last.current = p;
      let near = -1;
      STOPS.forEach((c, i) => {
        if (Math.abs(p - c) < 0.1) near = i;
      });
      setActive(near);
      setIntro(p < 0.07);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
      clearTimeout(idle.current);
    };
  }, []);

  const proj = active >= 0 ? PROJECTS[active] : null;

  return (
    <section className="village" id="work" ref={section}>
      <div className="vstage" ref={stage}>
        <div className="vsky">
          <i className="vsun" />
          <div className="vclouds">
            <Cloud className="c1" />
            <Cloud className="c2" />
            <Cloud className="c3" />
          </div>
        </div>

        <div className="layer l-far">
          <Mountains color="#e6c4d8" seed={2} />
        </div>
        <div className="layer l-mid">
          <Mountains color="#d3a9cf" seed={5} />
          <Hills className="hl" color="#9fd6a6" seed={2} amp={55} base={130} freq={2} />
        </div>

        <div className="layer l-track">
          <div className="vground" />
          <div className="vpath" />
          <SignPost text="WORK" className="obj sign" style={{ left: '38vw' }} />
          <Pine className="obj" style={{ left: '8vw', bottom: '24%', height: '30vh' }} />
          <RoundTree className="obj" style={{ left: '62vw', bottom: '24%', height: '28vh' }} />
          <Pine className="obj" style={{ left: '84vw', bottom: '24%', height: '26vh' }} />
          <Acacia className="obj" style={{ left: '146vw', bottom: '24%', height: '26vh' }} />
          <RoundTree className="obj" style={{ left: '158vw', bottom: '24%', height: '24vh' }} />
          <Pine className="obj" style={{ left: '244vw', bottom: '24%', height: '30vh' }} />
          <Pine className="obj" style={{ left: '254vw', bottom: '24%', height: '24vh' }} />
          <RoundTree className="obj" style={{ left: '336vw', bottom: '24%', height: '28vh' }} />
          <Pine className="obj" style={{ left: '352vw', bottom: '24%', height: '32vh' }} />
          {PROJECTS.map((p, i) => {
            const House = HOUSES[p.id];
            return (
              <button
                key={p.id}
                type="button"
                className={`house ${active === i ? 'on' : ''}`}
                style={{ left: `${HOUSE_X[i]}vw` }}
                onClick={() => setOpen(p)}
                aria-label={`Open ${p.title} preview`}
              >
                <House className="hs" />
                <span className="hsign">{p.title}</span>
              </button>
            );
          })}
          <SignPost text="ABOUT" className="obj sign" style={{ left: '372vw' }} />
        </div>

        <Character walking={walking} className="vchar" />

        <div className="layer l-fore">
          {[4, 30, 58, 92, 130, 166, 200, 238, 270, 310, 348, 384, 420].map((x, i) => (
            <Bush key={x} className="obj" style={{ left: `${x}vw`, height: `${7 + (i % 3) * 2}vh`, bottom: `${-1 - (i % 2)}%` }} />
          ))}
        </div>

        <div className={`vhint ${intro ? 'on' : ''}`}>
          <span>Scroll to walk through my work</span>
          <i />
        </div>

        <div className={`vcard ${proj ? 'on' : ''}`} style={{ '--tone': proj ? proj.tone : '#ffc83d' }}>
          {proj && (
            <>
              <span className="idx">{String(active + 1).padStart(2, '0')}</span>
              <h3>{proj.title}</h3>
              <p className="proj-text">{proj.text}</p>
              <ul className="skills">
                {proj.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="proj-links">
                <button type="button" className="vbtn" onClick={() => setOpen(proj)}>
                  Try it here
                </button>
                {proj.live && (
                  <a href={proj.live} target="_blank" rel="noreferrer" className="ln-link">
                    Live site <i>{'↗'}</i>
                  </a>
                )}
                {proj.repo && (
                  <a href={proj.repo} target="_blank" rel="noreferrer" className="ln-link soft">
                    Code <i>{'↗'}</i>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {open && <Preview project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
