import { ABOUT } from '../data';
import Reveal from './Reveal';

export default function About() {
  return (
    <section className="about" id="about">
      <Reveal>
        <p className="eyebrow">02 &mdash; About</p>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-lead">
          <h2>
            I enjoy the whole path from a rough idea to something a person can <em>actually use.</em>
          </h2>
          <p>
            I am a junior software engineer in Nairobi. I design in Figma and build with React and Next.js and I am
            comfortable on the backend with Python APIs and databases. I like quiet interfaces that make a task feel
            easy.
          </p>
        </Reveal>
        <div className="about-side">
          <Reveal className="about-list" delay={0.1} stagger>
          {ABOUT.map((a) => (
            <div key={a.label} className="row">
              <span className="dt">{a.label}</span>
              <span className="dd">{a.items.join(', ')}</span>
            </div>
          ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
