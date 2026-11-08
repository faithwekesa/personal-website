'use client';

import { useState } from 'react';

export default function OpenBot({ whatsapp, name, role }) {
  const [open, setOpen] = useState(false);
  const chat = whatsapp.split('?')[0] + '?text=' + encodeURIComponent("Hi Faith, I saw your portfolio and I'd like to talk to you about an opportunity. When are you free for a quick chat?");
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
          <p className="bot-msg">Hi there. I&apos;m looking for junior software engineering roles, freelance gigs and collaborations. Got an assignment or an opening in mind? I would love to hear about it.</p>
          <div className="bot-actions">
            <a className="btn gold" href="#contact" onClick={() => setOpen(false)}>Contact me</a>
            <a className="btn ghost" href={chat} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      )}
      <button type="button" className="bot-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <i />Open to work
      </button>
    </div>
  );
}
