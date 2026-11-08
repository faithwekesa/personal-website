import Opening from './components/Opening';
import ProjectCard from './components/ProjectCard';
import HeroBuild from './components/HeroBuild';
import CvLink from './components/CvLink';
import { PROFILE, PROJECTS, ABOUT, DOING, WHATSAPP } from './data';

const STEP_COLORS = ['#6f86c4', '#3f8a80', '#bf8f4a'];

export default function Page() {
  return (
    <>
      <Opening />
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{PROFILE.role} · {PROFILE.base}</p>
            <h1>Hi, I&apos;m {PROFILE.name}</h1>
            <p className="lead">I build calm and useful web products. Clear to use and quick to load and made with care for the people who open them.</p>
            <div className="actions">
              <a className="btn gold" href="#contact">Contact me</a>
              <a className="btn ghost" href="#projects">See my projects</a>
            </div>
          </div>
          <HeroBuild />
        </section>

        <section id="about" className="block reveal">
          <h2>About</h2>
          <div className="about">
            <p>
              I&apos;m a software engineer based in Nairobi, Kenya. I take web products from the first sketch to the live site and I care about the details people feel. I have also studied product management and cyber security, which helps me think about who uses what I build and how to keep it safe.
            </p>
            <dl>
              {ABOUT.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.items.map((i) => <span className="tag" key={i}>{i}</span>)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="block reveal">
          <h2>What I do</h2>
          <div className="doing">
            {DOING.map((x, i) => (
              <div key={x.n} style={{ '--c': STEP_COLORS[i] }}>
                <span>{x.n}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="block reveal">
          <h2>Projects</h2>
          <div className="grid">
            {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>

        <section id="contact" className="block contact reveal">
          <h2>Contact</h2>
          <p className="lead">Have a role or a project in mind? Reach me through any of these.</p>
          <dl>
            <div><dt>Email</dt><dd><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${encodeURIComponent('Hello Faith, I saw your portfolio')}`} target="_blank" rel="noreferrer">Email me</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={PROFILE.github} target="_blank" rel="noreferrer">See my GitHub</a></dd></div>
            <div><dt>WhatsApp</dt><dd><a href={WHATSAPP} target="_blank" rel="noreferrer">Chat with me on WhatsApp</a></dd></div>
            <div><dt>CV</dt><dd><CvLink href={PROFILE.cv}>View my CV</CvLink></dd></div>
          </dl>
        </section>
      </main>
    </>
  );
}
