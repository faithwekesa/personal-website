'use client';

import { useState } from 'react';

export default function OpenBot({ whatsapp, name, role }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bot">
      {open && (
        <div className="bot-panel" role="dialog" aria-label="Open to work">
          <div className="bot-head">
            <span className="bot-av">F</span>
            <div>
              <strong>{name}</strong>
              <small>{role}</small>
            </div>
            <button type="button" className="bot-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <p className="bot-msg">Hi there. I&apos;m open to full-time roles and internships and freelance projects and collaborations. If you have an opportunity in mind I would love to hear about it.</p>
          <div className="bot-actions">
            <a className="btn gold" href="#contact" onClick={() => setOpen(false)}>Contact me</a>
            <a className="btn ghost" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      )}
      <button type="button" className="bot-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <i />Open to work
      </button>
    </div>
  );
}
