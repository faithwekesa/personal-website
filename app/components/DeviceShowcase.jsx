'use client';

import { useState } from 'react';

const VIEWS = [
  ['all', 'All devices'],
  ['laptop', 'Laptop'],
  ['tablet', 'Tablet'],
  ['phone', 'Phone'],
];

function Screen({ name, src, alt, title, broken, onBroken }) {
  if (!src || broken) {
    return <div className="dev-empty">{title}</div>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => onBroken(name)} />
  );
}


export default function DeviceShowcase({ devices, title, host, live }) {
  const [view, setView] = useState('all');
  const [broken, setBroken] = useState({});
  const markBroken = (name) => setBroken((b) => ({ ...b, [name]: true }));
  const zoomable = view === 'all';

  const zoom = (id, label) =>
    zoomable
      ? {
          role: 'button',
          tabIndex: 0,
          'aria-label': `Show the ${label} view`,
          onClick: () => setView(id),
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setView(id);
            }
          },
        }
      : {};

  const screen = (name, label) => (
    <Screen name={name} src={devices[name]} alt={`${title} on a ${label}`} title={title} broken={broken[name]} onBroken={markBroken} />
  );

  return (
    <figure className="devs">
      <div className="dev-tabs" role="group" aria-label="Choose a device">
        {VIEWS.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={view === id} className={view === id ? 'on' : ''} onClick={() => setView(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="dev-stage" data-view={view} key={view}>
        <div className={zoomable ? 'dev dev-laptop zoomable' : 'dev dev-laptop'} {...zoom('laptop', 'laptop')}>
          <div className="dev-lid">
            <div className="dev-cam" aria-hidden="true" />
            <div className="dev-screen">{screen('laptop', 'laptop')}</div>
          </div>
          <div className="dev-base" aria-hidden="true" />
        </div>

        <div className={zoomable ? 'dev dev-tablet zoomable' : 'dev dev-tablet'} {...zoom('tablet', 'tablet')}>
          <div className="frame">
            <span className="dev-btn" aria-hidden="true" />
            <div className="bezel">
              <div className="dev-cam" aria-hidden="true" />
              <div className="dev-screen">{screen('tablet', 'tablet')}</div>
            </div>
          </div>
        </div>

        <div className={zoomable ? 'dev dev-phone zoomable' : 'dev dev-phone'} {...zoom('phone', 'phone')}>
          <span className="dev-btn b1" aria-hidden="true" />
          <span className="dev-btn b2" aria-hidden="true" />
          <span className="dev-btn b3" aria-hidden="true" />
          <span className="dev-btn b4" aria-hidden="true" />
          <div className="frame">
            <div className="bezel">
              <div className="dev-screen">
                {screen('phone', 'phone')}
                <i className="dev-island" aria-hidden="true" />
                <i className="dev-home" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption>
        <span>{host}</span>
        {live && (
          <a href={live} target="_blank" rel="noreferrer">
            Open the live site →
          </a>
        )}
      </figcaption>
    </figure>
  );
}
