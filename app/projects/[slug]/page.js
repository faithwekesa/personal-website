import Link from 'next/link';
import { notFound } from 'next/navigation';
import LiveCover from '../../components/LiveCover';
import IntroDone from '../../components/IntroDone';
import { PROJECTS } from '../../data';
import { highlightPy } from '../../components/highlight';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.id === slug);
  return p ? { title: `${p.title} | Faith Wekesa`, description: p.text } : {};
}

export default async function Project({ params }) {
  const { slug } = await params;
  const i = PROJECTS.findIndex((x) => x.id === slug);
  if (i < 0) notFound();
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <main className="case">
      <IntroDone />
      <Link href="/#projects" className="back">← All projects</Link>
      <p className="eyebrow">Case study · {p.year}</p>
      <h1>{p.title}</h1>
      <p className="lead">{p.text}</p>

      <dl className="meta">
        <div><dt>Role</dt><dd>{p.role}</dd></div>
        <div><dt>Year</dt><dd>{p.year}</dd></div>
        <div><dt>Built with</dt><dd>{p.tags.slice(0, 3).join(', ')}</dd></div>
        <div><dt>Status</dt><dd>{p.status || 'Live'}</dd></div>
      </dl>

      {p.live && (
        <a className="bigcover" href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
          <div className="chrome"><i /><i /><i /><span>{p.host}</span></div>
          <LiveCover url={p.live} title={p.title} />
        </a>
      )}

      <section className="cs">
        <h2>The aim</h2>
        <p>{p.problem}</p>
      </section>
      <section className="cs">
        <h2>What I built</h2>
        <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
      </section>
      {p.shots && (
        <section className="cs">
          <h2>See it working</h2>
          <div className="shots">
            {p.shots.map((s) => (
              <figure key={s.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} loading="lazy" />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {p.results && (
        <section className="cs">
          <h2>Results</h2>
          <table className="restable">
            <tbody>
              {p.results.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
            </tbody>
          </table>
        </section>
      )}
      {p.snippets && (
        <section className="cs">
          <h2>Code I ran</h2>
          <div className="snips">
            {p.snippets.map((s) => (
              <figure key={s.title}>
                <figcaption>{s.title}</figcaption>
                <pre className="codeblock">{highlightPy(s.code)}</pre>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className="cs">
        <h2>Skills used</h2>
        <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      </section>

      <div className="case-links">
        {p.live && <a className="btn gold" href={p.live} target="_blank" rel="noreferrer">View live</a>}
        {p.repo && <a className="btn ghost" href={p.repo} target="_blank" rel="noreferrer">View code</a>}
      </div>

      <Link href={`/projects/${next.id}`} className="nextp">
        <span>Next project</span>
        <strong>{next.title} →</strong>
      </Link>
    </main>
  );
}
