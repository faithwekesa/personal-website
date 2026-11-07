const SKIN = '#8d5a3b';
const HAIR = '#1a1311';
const BLAZER = '#1e2945';

export function Character({ walking = false, wave = false, className = '' }) {
  return (
    <svg className={`char ${walking ? 'walking' : ''} ${wave ? 'waving' : ''} ${className}`} viewBox="0 0 70 130" aria-hidden="true">
      <ellipse cx="35" cy="126" rx="22" ry="3.5" fill="rgba(0,0,0,0.14)" />
      <g className="leg legB">
        <rect x="27" y="80" width="9" height="38" rx="4.5" fill="#2a2f3a" />
        <rect x="26" y="114" width="14" height="7" rx="3.5" fill="#fff" />
      </g>
      <g className="leg legF">
        <rect x="34" y="80" width="9" height="38" rx="4.5" fill="#333947" />
        <rect x="33" y="114" width="14" height="7" rx="3.5" fill="#fff" />
      </g>
      <g className="arm armB">
        <rect x="14" y="40" width="9" height="34" rx="4.5" fill="#18213a" />
        <circle cx="18.5" cy="76" r="4.6" fill={SKIN} />
      </g>
      <rect x="18" y="36" width="34" height="48" rx="13" fill={BLAZER} />
      <path d="M30 38 L35 56 L40 38 Z" fill="#ece9e4" />
      <circle cx="35" cy="58" r="2" fill="#d9b873" />
      <g className="arm armF">
        <rect x="47" y="40" width="9" height="34" rx="4.5" fill={BLAZER} />
        <circle cx="51.5" cy="76" r="4.6" fill={SKIN} />
      </g>
      <rect x="31" y="28" width="8" height="10" rx="3" fill="#7a4c31" />
      <circle cx="49" cy="10" r="9" fill={HAIR} />
      <circle cx="35" cy="22" r="13" fill={SKIN} />
      <path d="M21.5 22 C21 8 30 5 36 5 C44 5 49.5 11 48 22 C45 15 40 13 34 13 C28 13 24 16 21.5 22 Z" fill={HAIR} />
      <circle cx="41" cy="23" r="1.5" fill={HAIR} />
      <path d="M38 29 Q42 32 46 28" stroke="#6a3338" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Cloud({ className = '', style }) {
  return (
    <svg className={`cloud ${className}`} style={style} viewBox="0 0 160 70" aria-hidden="true">
      <g fill="#fff" opacity="0.92">
        <circle cx="45" cy="42" r="22" />
        <circle cx="78" cy="30" r="26" />
        <circle cx="112" cy="42" r="20" />
        <rect x="30" y="42" width="98" height="22" rx="11" />
      </g>
    </svg>
  );
}

export function Pine({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 120" aria-hidden="true">
      <rect x="26" y="90" width="8" height="28" fill="#7a5233" />
      <path d="M30 4 L52 44 H8 Z" fill="#4aa56f" />
      <path d="M30 28 L56 72 H4 Z" fill="#3f9763" />
      <path d="M30 52 L58 98 H2 Z" fill="#358a58" />
    </svg>
  );
}

export function RoundTree({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 90 130" aria-hidden="true">
      <rect x="39" y="70" width="12" height="58" rx="4" fill="#7a5233" />
      <circle cx="45" cy="42" r="34" fill="#6cbf84" />
      <circle cx="26" cy="58" r="22" fill="#5fb177" />
      <circle cx="64" cy="58" r="22" fill="#78c991" />
    </svg>
  );
}

export function Acacia({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 160 140" aria-hidden="true">
      <path d="M76 138 C76 100 80 84 72 62 L88 62 C84 84 88 100 88 138 Z" fill="#7a5233" />
      <ellipse cx="80" cy="50" rx="72" ry="22" fill="#6fae5c" />
      <ellipse cx="62" cy="40" rx="40" ry="16" fill="#86c46f" />
    </svg>
  );
}

export function Bush({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 50" aria-hidden="true">
      <ellipse cx="30" cy="34" rx="28" ry="16" fill="#4ea772" />
      <ellipse cx="62" cy="30" rx="34" ry="20" fill="#5ab97f" />
      <circle cx="40" cy="24" r="3" fill="#ffc83d" />
      <circle cx="72" cy="22" r="3" fill="#ff8aa8" />
      <circle cx="56" cy="36" r="3" fill="#fff" />
    </svg>
  );
}

export function SignPost({ text, className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 240 190" aria-hidden="true">
      <rect x="112" y="60" width="14" height="126" rx="3" fill="#8a5a33" />
      <path d="M20 40 H190 L224 70 L190 100 H20 Z" fill="#d9a05f" stroke="#8a5a33" strokeWidth="5" strokeLinejoin="round" />
      <text x="105" y="79" textAnchor="middle" fontSize="30" fontWeight="700" fill="#4a2e17" fontFamily="'Google Sans Flex', system-ui, sans-serif" letterSpacing="1">
        {text}
      </text>
    </svg>
  );
}

export function SafariLodge({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 300 260" aria-hidden="true">
      <rect x="52" y="130" width="196" height="120" rx="6" fill="#f6e6c8" />
      <path d="M26 144 L150 40 L274 144 Z" fill="#c8923f" />
      <path d="M60 130 L150 56 M92 134 L150 76 M120 138 L150 96 M240 130 L150 56 M208 134 L150 76 M180 138 L150 96" stroke="#a9742a" strokeWidth="4" strokeLinecap="round" />
      <path d="M26 144 Q38 158 52 144 Q64 158 78 144 Q90 158 104 144 Q118 158 132 144 Q146 158 160 144 Q174 158 188 144 Q202 158 216 144 Q230 158 244 144 Q258 158 274 144" fill="#b57d31" />
      <path d="M126 250 V196 a24 24 0 0 1 48 0 V250 Z" fill="#7a4a2b" />
      <circle cx="165" cy="226" r="2.6" fill="#ffd66b" />
      <circle cx="90" cy="188" r="20" fill="#ffd66b" stroke="#8a5a33" strokeWidth="5" />
      <path d="M70 188 H110 M90 168 V208" stroke="#8a5a33" strokeWidth="3" />
      <circle cx="210" cy="188" r="20" fill="#ffd66b" stroke="#8a5a33" strokeWidth="5" />
      <path d="M190 188 H230 M210 168 V208" stroke="#8a5a33" strokeWidth="3" />
      <rect x="112" y="104" width="76" height="26" rx="6" fill="#fff4dc" stroke="#8a5a33" strokeWidth="3" />
      <path d="M126 122 L136 110 L146 122 L158 108 L174 122" fill="none" stroke="#3f9b6a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NailStudio({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 300 260" aria-hidden="true">
      <rect x="40" y="70" width="220" height="180" rx="6" fill="#ffc2d6" />
      <rect x="32" y="60" width="236" height="22" rx="6" fill="#ff8fb3" />
      <path d="M36 112 H264 V132 Q250 150 236 132 Q222 150 208 132 Q194 150 180 132 Q166 150 152 132 Q138 150 124 132 Q110 150 96 132 Q82 150 68 132 Q54 150 40 132 Z" fill="#fff" />
      <path d="M36 112 H78 V132 Q64 150 50 132 Q40 150 36 132 Z M120 112 H162 V132 Q148 150 134 132 Z M204 112 H246 V132 Q232 150 218 132 Z" fill="#ff8fb3" />
      <rect x="62" y="152" width="124" height="88" rx="8" fill="#fff7fb" stroke="#ff8fb3" strokeWidth="5" />
      <rect x="92" y="190" width="22" height="34" rx="6" fill="#ff5a36" />
      <rect x="98" y="176" width="10" height="16" rx="3" fill="#2b2230" />
      <rect x="130" y="196" width="18" height="28" rx="6" fill="#ffc83d" />
      <rect x="135" y="184" width="8" height="14" rx="3" fill="#2b2230" />
      <rect x="156" y="204" width="16" height="20" rx="5" fill="#5b2a86" />
      <rect x="160" y="194" width="8" height="12" rx="3" fill="#2b2230" />
      <path d="M200 250 V176 a22 22 0 0 1 44 0 V250 Z" fill="#fff" stroke="#ff8fb3" strokeWidth="5" />
      <circle cx="232" cy="214" r="2.6" fill="#ff8fb3" />
      <text x="150" y="102" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="'Google Sans Flex', system-ui, sans-serif" letterSpacing="3">
        GLOSS
      </text>
    </svg>
  );
}

export function Bakery({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 300 260" aria-hidden="true">
      <rect x="150" y="30" width="26" height="50" fill="#a54a33" />
      <rect x="146" y="24" width="34" height="10" rx="3" fill="#7d3524" />
      <rect x="46" y="100" width="208" height="150" rx="6" fill="#ffd9b0" />
      <path d="M26 112 L150 40 L274 112 Z" fill="#c2573b" />
      <path d="M26 112 L150 40 L274 112" fill="none" stroke="#8d3a26" strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 122 H256 V144 H44 Z" fill="#fff" />
      <path d="M44 122 H70 V144 H44 Z M96 122 H122 V144 H96 Z M148 122 H174 V144 H148 Z M200 122 H226 V144 H200 Z" fill="#ff5a36" />
      <rect x="62" y="150" width="120" height="88" rx="8" fill="#fff4dc" stroke="#8d3a26" strokeWidth="5" />
      <ellipse cx="92" cy="216" rx="22" ry="12" fill="#e0a45a" />
      <path d="M80 212 L88 220 M92 208 L100 218 M104 212 L108 220" stroke="#fff4dc" strokeWidth="3" strokeLinecap="round" />
      <path d="M126 224 C128 204 146 198 156 202 C168 206 172 220 172 224 C162 218 152 218 142 224 C136 220 130 220 126 224 Z" fill="#e59a52" />
      <path d="M198 250 V178 a22 22 0 0 1 44 0 V250 Z" fill="#8d3a26" />
      <circle cx="230" cy="216" r="2.6" fill="#ffd66b" />
      <rect x="198" y="152" width="46" height="16" rx="4" fill="#fff4dc" stroke="#8d3a26" strokeWidth="3" />
    </svg>
  );
}

export function Hills({ className = '', color, seed = 1, amp = 40, base = 120, freq = 1 }) {
  const pts = [];
  for (let x = 0; x <= 1000; x += 20) {
    const y = base - amp * (0.55 * Math.sin((x / 1000) * Math.PI * 2 * freq + seed) + 0.3 * Math.sin((x / 1000) * Math.PI * 5 * freq + seed * 2.3) + 0.15 * Math.sin((x / 1000) * Math.PI * 11 * freq + seed * 4.1));
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return (
    <svg className={className} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 200 L${pts.join(' L')} L1000 200 Z`} fill={color} />
    </svg>
  );
}

export function Mountains({ className = '', color, seed = 0 }) {
  const peaks = [0, 140, 90, 190, 70, 170, 110, 200, 80, 150, 100, 180, 60];
  const pts = peaks.map((h, i) => `${(i / (peaks.length - 1)) * 1000} ${200 - h - ((i * seed) % 7)}`);
  return (
    <svg className={className} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 200 L${pts.join(' L')} L1000 200 Z`} fill={color} />
    </svg>
  );
}
