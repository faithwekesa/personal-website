'use client';

import { useState } from 'react';

const MENU = [
  { id: 'loaf', name: 'Sourdough loaf', note: 'Slow risen and crusty', color: '#f1c27a' },
  { id: 'cake', name: 'Honey cake', note: 'Soft layers with honey cream', color: '#f7d56a' },
  { id: 'croissant', name: 'Butter croissants', note: 'Flaky and warm', color: '#f4a36a' },
  { id: 'roll', name: 'Cinnamon rolls', note: 'Sticky and sweet', color: '#e8a58a' },
];

function Icon({ id }) {
  if (id === 'loaf') {
    return (
      <svg viewBox="0 0 80 80">
        <ellipse cx="40" cy="46" rx="32" ry="20" fill="#c98a43" />
        <ellipse cx="40" cy="42" rx="32" ry="19" fill="#e0a45a" />
        <path d="M24 34 L32 50 M38 30 L46 48 M52 32 L58 50" stroke="#fff4dc" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'cake') {
    return (
      <svg viewBox="0 0 80 80">
        <rect x="14" y="40" width="52" height="24" rx="6" fill="#b9762f" />
        <rect x="14" y="30" width="52" height="16" rx="6" fill="#f3b94a" />
        <path d="M14 36 Q22 52 30 36 Q38 52 46 36 Q54 52 66 36 L66 30 L14 30 Z" fill="#fff4dc" />
        <circle cx="40" cy="22" r="5" fill="#e3a22f" />
      </svg>
    );
  }
  if (id === 'croissant') {
    return (
      <svg viewBox="0 0 80 80">
        <path d="M8 52 C10 30 28 20 40 20 C52 20 70 30 72 52 C60 46 52 46 40 52 C28 46 20 46 8 52 Z" fill="#e59a52" />
        <path d="M28 24 L32 48 M40 20 L40 50 M52 24 L48 48" stroke="#c97a35" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="42" r="30" fill="#d9915a" />
      <path d="M40 42 m0 0 a5 5 0 1 1 5 5 a10 10 0 1 1 -10 -10 a16 16 0 1 1 16 16" fill="none" stroke="#fff4dc" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function BakeApp({ scale }) {
  const [cart, setCart] = useState({});
  const [sent, setSent] = useState(false);

  const lines = MENU.filter((m) => cart[m.id] > 0);
  const total = lines.reduce((n, m) => n + cart[m.id], 0);

  const change = (id, by) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + by) }));

  const message = `Hi Hearth and Honey, I would like ${lines.map((m) => `${cart[m.id]} ${m.name}`).join(' and ')}.`;

  const reset = () => {
    setCart({});
    setSent(false);
  };

  return (
    <div className="bk" style={{ transform: `scale(${scale * 1.3333})` }} onClick={(e) => e.stopPropagation()}>
      <header className="bk-top">
        <b>Hearth and Honey</b>
        <nav>
          <span>Menu</span>
          <span>About</span>
          <span>Visit</span>
        </nav>
        <span className="bk-cart">Order <em>{total}</em></span>
      </header>
      <div className="bk-main">
        <section>
          <p className="bk-kick">Baked this morning</p>
          <h4>Fresh from the oven</h4>
          <div className="bk-grid">
            {MENU.map((m) => (
              <div key={m.id} className="bk-card">
                <div className="bk-ic" style={{ background: m.color }}>
                  <Icon id={m.id} />
                </div>
                <div className="bk-tx">
                  <b>{m.name}</b>
                  <small>{m.note}</small>
                  {cart[m.id] > 0 ? (
                    <div className="bk-step">
                      <button type="button" onClick={() => change(m.id, -1)} aria-label={`Remove one ${m.name}`}>
                        -
                      </button>
                      <span>{cart[m.id]}</span>
                      <button type="button" onClick={() => change(m.id, 1)} aria-label={`Add one ${m.name}`}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="bk-add" onClick={() => change(m.id, 1)}>
                      Add to order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="bk-panel">
          {sent ? (
            <div className="bk-chat">
              <div className="bk-wh">
                <i />
                Hearth and Honey
              </div>
              <div className="bk-msg">{message}</div>
              <small>Sent</small>
              <button type="button" className="bk-reset" onClick={reset}>
                Start a new order
              </button>
            </div>
          ) : (
            <>
              <h5>Your order</h5>
              {lines.length === 0 ? (
                <p className="bk-empty">Add something tasty and it will appear here.</p>
              ) : (
                <ul>
                  {lines.map((m) => (
                    <li key={m.id}>
                      <span>{m.name}</span>
                      <b>{cart[m.id]}</b>
                    </li>
                  ))}
                </ul>
              )}
              <button type="button" className="bk-wa" disabled={total === 0} onClick={() => setSent(true)}>
                Send order on WhatsApp
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
