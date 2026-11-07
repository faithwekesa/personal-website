'use client';

import Link from 'next/link';
import LiveCover from './LiveCover';

export default function ProjectCard({ project: p }) {
  return (
    <article className="pcard">
      <LiveCover url={p.live} title={p.title} />
      <Link className="cover" href={`/projects/${p.id}`} aria-label={`Read the ${p.title} case study`} />
      <div className="panel">
        <h3>{p.title}</h3>
        <p>{p.text}</p>
        <div className="tags">{p.tags.slice(0, 5).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <div className="card-links">
          <Link href={`/projects/${p.id}`}>Case study</Link>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">View live</a>}
        </div>
      </div>
    </article>
  );
}
