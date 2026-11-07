'use client';

import { useEffect, useState } from 'react';

export default function CvModal({ cv }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    const key = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('open-cv', show);
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('open-cv', show);
      window.removeEventListener('keydown', key);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="cvm" onClick={() => setOpen(false)}>
      <div className="cvm-box" role="dialog" aria-label="Faith Wekesa CV" onClick={(e) => e.stopPropagation()}>
        <div className="cvm-top">
          <strong>Faith Wekesa, CV</strong>
          <div>
            <button type="button" className="cvm-x" onClick={() => setOpen(false)} aria-label="Close">Close</button>
          </div>
        </div>
        <iframe className="cvm-frame" src={`${cv}#toolbar=0&navpanes=0&view=FitH`} title="CV" />
        <p className="cvm-note">Not showing? <a href={cv} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
      </div>
    </div>
  );
}
