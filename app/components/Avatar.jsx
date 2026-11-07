'use client';

import { useEffect, useRef } from 'react';

const SKIN = '#8d5a3b';
const SKIN_DARK = '#7a4c31';
const HAIR = '#1a1311';
const HAIR_LIGHT = '#33261f';
const BLAZER = '#1e2945';
const BLAZER_DARK = '#151e36';
const GOLD = '#d9b873';

function Hand({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="25" ry="28" fill={SKIN} />
      <rect x="-26" y="-58" width="11" height="40" rx="5.5" fill={SKIN} transform="rotate(-14 -20 -18)" />
      <rect x="-14" y="-66" width="11" height="46" rx="5.5" fill={SKIN} transform="rotate(-5 -8 -20)" />
      <rect x="-1" y="-68" width="11" height="48" rx="5.5" fill={SKIN} transform="rotate(4 4 -20)" />
      <rect x="11" y="-60" width="10" height="42" rx="5" fill={SKIN} transform="rotate(14 16 -18)" />
      <rect x="18" y="-12" width="30" height="12" rx="6" fill={SKIN} transform="rotate(-38 20 -4)" />
      <ellipse cx="-20.5" cy="-56" rx="4" ry="5" fill="#fff" transform="rotate(-14 -20 -18)" />
      <ellipse cx="-8.5" cy="-64" rx="4" ry="5" fill="#fff" transform="rotate(-5 -8 -20)" />
      <ellipse cx="4.5" cy="-66" rx="4" ry="5" fill="#fff" transform="rotate(4 4 -20)" />
      <ellipse cx="16" cy="-58" rx="3.6" ry="4.6" fill="#fff" transform="rotate(14 16 -18)" />
    </g>
  );
}

export default function Avatar({ pose = 'idle', talk = false, crop = false, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = svg.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.4;
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.5)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5)));
        svg.style.setProperty('--ex', String(dx * 3.6));
        svg.style.setProperty('--ey', String(dy * 2.6));
        svg.style.setProperty('--hx', String(dx * 4));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className={`avatar pose-${pose} ${talk ? 'talk' : ''} ${className}`}
      viewBox={crop ? '170 70 180 210' : '0 0 520 480'}
      role="img"
      aria-label="Illustration of Faith"
    >
      <g className="av-body">
        <path d="M100 480 L100 408 C100 356 170 334 220 326 L300 326 C350 334 420 356 420 408 L420 480 Z" fill={BLAZER} />
        <rect x="232" y="280" width="56" height="62" rx="18" fill={SKIN_DARK} />
        <path d="M222 322 L260 396 L298 322 Z" fill="#ece9e4" />
        <path d="M222 322 C238 340 282 340 298 322 L298 330 C282 350 238 350 222 330 Z" fill={SKIN_DARK} />
        <path d="M216 326 L260 404 L238 480 L190 480 L176 372 Z" fill={BLAZER_DARK} />
        <path d="M304 326 L260 404 L282 480 L330 480 L344 372 Z" fill={BLAZER_DARK} />
        <path d="M222 326 Q260 358 298 326" fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(260 356)">
          <circle cx="-6" cy="-5" r="6.4" fill={GOLD} />
          <circle cx="6" cy="-5" r="6.4" fill={GOLD} />
          <circle cx="-6" cy="7" r="6.4" fill={GOLD} />
          <circle cx="6" cy="7" r="6.4" fill={GOLD} />
          <circle cx="0" cy="1" r="3.4" fill="#111" />
        </g>
      </g>

      {pose === 'wave' && (
        <g className="av-arm">
          <path d="M138 404 L80 372" stroke={BLAZER} strokeWidth="48" strokeLinecap="round" fill="none" />
          <g className="av-fore">
            <rect x="56" y="262" width="48" height="120" rx="22" fill={BLAZER} />
            <rect x="56" y="258" width="48" height="12" rx="6" fill="#ece9e4" />
            <Hand x={80} y={236} />
          </g>
        </g>
      )}

      <g className="av-head">
        <path d="M172 214 C158 124 200 78 262 78 C326 78 364 124 350 214 Z" fill={HAIR} />
        <path d="M182 205 C182 140 220 118 260 118 C300 118 338 140 338 205 C338 262 304 306 260 306 C216 306 182 262 182 205 Z" fill={SKIN} />
        <ellipse cx="181" cy="214" rx="9" ry="16" fill={SKIN} />
        <ellipse cx="339" cy="214" rx="9" ry="16" fill={SKIN} />
        <path d="M178 212 C174 134 214 100 262 100 C310 100 346 134 342 212 C336 176 320 154 296 146 C270 138 240 138 222 148 C198 160 184 182 178 212 Z" fill={HAIR} />
        <g className="av-bun">
          <circle cx="318" cy="68" r="42" fill={HAIR} />
          <path d="M290 70 C302 48 330 46 344 66" stroke={HAIR_LIGHT} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M296 88 C310 70 334 70 346 86" stroke={HAIR_LIGHT} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M312 44 C320 56 320 70 314 82" stroke={HAIR_LIGHT} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M214 118 C240 104 280 104 306 118" stroke={HAIR_LIGHT} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M200 134 C230 114 290 112 322 128" stroke={HAIR_LIGHT} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        <path d="M212 190 Q232 178 252 188" stroke={HAIR} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M268 188 Q288 178 308 190" stroke={HAIR} strokeWidth="5" fill="none" strokeLinecap="round" />

        <g className="av-face">
          <g className="av-eye">
            <path d="M212 212 Q232 197 252 212 Q232 226 212 212 Z" fill="#fff" />
            <circle className="av-pupil" cx="232" cy="212" r="7" fill="#1a1311" />
            <circle className="av-pupil-shine" cx="234" cy="209" r="2" fill="#fff" />
            <path d="M210 211 Q232 193 254 211" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <g className="av-eye">
            <path d="M268 212 Q288 197 308 212 Q288 226 268 212 Z" fill="#fff" />
            <circle className="av-pupil" cx="288" cy="212" r="7" fill="#1a1311" />
            <circle className="av-pupil-shine" cx="290" cy="209" r="2" fill="#fff" />
            <path d="M266 211 Q288 193 310 211" stroke={HAIR} strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <path d="M256 226 Q252 246 258 252 Q264 256 270 252" stroke={SKIN_DARK} strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <ellipse cx="214" cy="248" rx="15" ry="9" fill="#c77a62" opacity="0.38" />
          <ellipse cx="306" cy="248" rx="15" ry="9" fill="#c77a62" opacity="0.38" />
          <g className="m-closed">
            <path d="M236 270 Q260 290 284 270 Q260 276 236 270 Z" fill="#7d3f43" />
            <path d="M238 270 Q260 284 282 270" stroke="#6a3338" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
          <g className="m-open">
            <path d="M238 268 Q260 266 282 268 Q280 292 260 292 Q240 292 238 268 Z" fill="#5a2a30" />
            <path d="M241 269 Q260 267.5 279 269 L278 274 Q260 272 242 274 Z" fill="#fff" />
            <ellipse cx="260" cy="287" rx="10" ry="4.5" fill="#c46a72" />
          </g>
        </g>
      </g>
    </svg>
  );
}
