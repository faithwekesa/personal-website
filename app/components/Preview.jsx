'use client';

import { useEffect, useRef, useState } from 'react';
import BakeApp from './BakeApp';

const SITE_W = 1280;

export default function Preview({ project, onClose }) {
  const wrap = useRef(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / SITE_W));
    ro.observe(el);
    const key = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => {
      ro.disconnect();
      window.removeEventListener('keydown', key);
    };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.title} preview`}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()} style={{ '--tone': project.tone }}>
        <div className="fbar">
          <i />
          <i />
          <i />
          {project.host && <em>{project.host}</em>}
          <button type="button" className="modal-x" onClick={onClose} aria-label="Close preview">
            Close
          </button>
        </div>
        <div className="screen" ref={wrap}>
          {project.own ? (
            <BakeApp scale={scale} />
          ) : (
            <iframe
              className="live ready"
              src={project.live}
              title={`${project.title} live preview`}
              style={{ transform: `scale(${scale})` }}
            />
          )}
        </div>
        <p className="caption">
          {project.own ? 'A working mini version. Add items and send the order.' : 'The real site, running live. Go ahead and click around.'}
        </p>
      </div>
    </div>
  );
}
