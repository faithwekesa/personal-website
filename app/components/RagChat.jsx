'use client';

import { useRef, useState } from 'react';

const EXAMPLES = [
  'How does Self-RAG decide when to retrieve passages?',
  'How does Dense Passage Retrieval train its retriever?',
  "What does the 'lost in the middle' study find?",
  'What is the capital of Kenya?',
];

const CITE = /\[File:\s*([^,\]]+),\s*Chunk:\s*([^\]\s]+)\s*\]/g;

function tidy(text) {
  return text
    .replace(/\\\(\s*/g, '')
    .replace(/\s*\\\)/g, '')
    .replace(/\\\[\s*/g, '')
    .replace(/\s*\\\]/g, '')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\\(?:text|mathrm|mathbf)\{([^}]*)\}/g, '$1')
    .replace(/_\{([^}]*)\}/g, '$1')
    .replace(/\^\{([^}]*)\}/g, '$1');
}

function renderAnswer(text) {
  const clean = tidy(text);
  const nodes = [];
  let last = 0;
  let n = 0;
  const seen = {};
  for (const m of clean.matchAll(CITE)) {
    if (m.index > last) nodes.push(...bold(clean.slice(last, m.index), 'p' + n));
    const id = m[2];
    if (!seen[id]) seen[id] = Object.keys(seen).length + 1;
    nodes.push(
      <a className="ragchat-cite" key={'c' + n} href={'https://arxiv.org/abs/' + m[1].replace('.pdf', '')} target="_blank" rel="noreferrer" title={m[1]}>
        {seen[id]}
      </a>
    );
    last = m.index + m[0].length;
    n += 1;
  }
  if (last < clean.length) nodes.push(...bold(clean.slice(last), 'end'));
  return nodes;
}

function bold(str, key) {
  return str.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4
      ? <strong key={key + i}>{part.slice(2, -2)}</strong>
      : part
  );
}

export default function RagChat() {
  const [turns, setTurns] = useState([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  async function ask(q) {
    const query = q.trim();
    if (!query || busy) return;
    setText('');
    setBusy(true);
    setTurns((t) => [...t, { q: query, r: null }]);
    let r;
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      r = await res.json();
    } catch {
      r = { error: 'Could not reach the assistant. Please try again.' };
    }
    setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, r } : x)));
    setBusy(false);
    setTimeout(() => endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 50);
  }

  return (
    <div className="ragchat">
      <div className="ragchat-head">
        <span className="ragchat-logo">R</span>
        <div>
          <strong>Research Assistant</strong>
          <small>Answered from 43 arXiv papers on RAG, dense retrieval and embeddings</small>
        </div>
      </div>
      <div className="ragchat-log">
        {turns.length === 0 && (
          <div className="ragchat-empty">
            <p>Ask a question. Every answer cites its source, or says so when the papers do not cover it.</p>
            <div className="ragchat-chips">
              {EXAMPLES.map((e) => (
                <button type="button" key={e} onClick={() => ask(e)}>{e}</button>
              ))}
            </div>
          </div>
        )}
        {turns.map((t, i) => (
          <div key={i} className="ragchat-turn">
            <div className="ragchat-q">{t.q}</div>
            <div className={'ragchat-a' + (t.r?.abstained ? ' declined' : '')}>
              {!t.r && <span className="ragchat-dots"><i /><i /><i /></span>}
              {t.r?.error && t.r.error}
              {t.r?.answer && (
                <>
                  <p>{renderAnswer(t.r.answer)}</p>
                  <div className="ragchat-meta">
                    <span>Best match {t.r.top_score}</span>
                    {t.r.citations_valid === true && <span className="ok">Citations verified</span>}
                    {t.r.abstained && <span>Not in the papers</span>}
                  </div>
                  <details>
                    <summary>Sources ({t.r.sources.length})</summary>
                    {t.r.sources.map((s) => (
                      <div className="ragchat-src" key={s.chunk_id}>
                        <a href={s.url} target="_blank" rel="noreferrer">{s.file} p.{s.page}</a>
                        <small>Match {s.score} · {s.snippet}…</small>
                      </div>
                    ))}
                  </details>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="ragchat-form" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question about the papers…"
          maxLength={300}
          aria-label="Your question"
        />
        <button type="submit" disabled={busy}>Ask</button>
      </form>
      <p className="ragchat-note">Answers may be incomplete. Check the cited paper before relying on them.</p>
    </div>
  );
}
