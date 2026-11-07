import { PROFILE } from '../data';
import Reveal from './Reveal';

export default function Contact() {
  const links = [];
  if (PROFILE.email) links.push({ label: 'Email', href: `mailto:${PROFILE.email}`, ext: false });
  if (PROFILE.linkedin) links.push({ label: 'LinkedIn', href: PROFILE.linkedin, ext: true });
  if (PROFILE.github) links.push({ label: 'GitHub', href: PROFILE.github, ext: true });

  return (
    <section className="contact" id="contact">
      <Reveal>
        <p className="eyebrow">03 &mdash; Contact</p>
        <h2>
          Let us build something <em>thoughtful.</em>
        </h2>
        <p className="contact-lead">I am looking for a junior software engineer role and I would love to hear from you.</p>
      </Reveal>
      <Reveal className="contact-links" delay={0.1}>
        {links.map((l) => (
          <a key={l.label} href={l.href} target={l.ext ? '_blank' : undefined} rel={l.ext ? 'noreferrer' : undefined}>
            <span>{l.label}</span>
            <i>{'↗'}</i>
          </a>
        ))}
      </Reveal>
      <footer className="foot">
        <span>Faith Wekesa</span>
        <span>Nairobi, Kenya</span>
      </footer>
    </section>
  );
}
