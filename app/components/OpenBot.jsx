'use client';

import { useState } from 'react';

export default function OpenBot({ whatsapp, name, role }) {
  const [open, setOpen] = useState(false);
  const chat = whatsapp;
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
        <i /><svg className="bot-ico" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5Z" /><path d="M8.5 10.5h7M8.5 13.5h4" /></svg><span className="bot-lbl">Open to work</span>
      </button>
    </div>
  );
}
