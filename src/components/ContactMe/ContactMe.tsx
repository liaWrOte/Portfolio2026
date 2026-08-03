import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './contact-me.scss';

const CONTACTS = [
  { num: '01', label: 'EMAIL', value: 'sandrine@example.com', href: 'mailto:sandrine@example.com' },
  { num: '02', label: 'LINKEDIN', value: '/in/sandrine-mze', href: 'https://linkedin.com/in/sandrine-mze' },
  { num: '03', label: 'GITHUB', value: 'github.com/sandrine', href: 'https://github.com/sandrine' }
];

const ContactMe: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const els = rootRef.current.querySelectorAll<HTMLElement>('.cm-in');
    gsap.fromTo(
      els,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out', delay: 0.05 }
    );
  }, []);

  return (
    <div ref={rootRef} className="contact-me">
      <div className="cm-scanlines" aria-hidden="true" />

      {/* Terminal prompt */}
      <div className="cm-prompt-line cm-in">
        <span className="cm-prompt-text">C:\PORTFOLIO\CONTACT.ME&gt;</span>
        <span className="cm-cursor">█</span>
      </div>

      {/* Welcome banner */}
      <div className="cm-banner cm-in" aria-hidden="true">
        <span className="cm-banner-top">╔{'═'.repeat(34)}╗</span>
        <span className="cm-banner-mid">║{'  '}CONTACT MODULE LOADED{' '.repeat(13)}║</span>
        <span className="cm-banner-bot">╚{'═'.repeat(34)}╝</span>
      </div>

      {/* Identity card */}
      <section className="cm-card cm-in">
        <div className="cm-card-inner">
          <h1 className="cm-name">SANDRINE M'ZE</h1>
          <p className="cm-role">DÉVELOPPEUSE WEB &amp; CRÉATRICE UI/UX</p>
          <div className="cm-traffic-lights">
            <span className="cm-light cm-red" />
            <span className="cm-light cm-yellow" />
            <span className="cm-light cm-green" />
          </div>
        </div>
      </section>

      {/* Contact links */}
      <ul className="cm-links">
        {CONTACTS.map((c) => (
          <li key={c.num} className="cm-link-row cm-in">
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="cm-link">
              <span className="cm-num">{c.num}</span>
              <span className="cm-sep">/</span>
              <span className="cm-label">{c.label}</span>
              <span className="cm-fill" />
              <span className="cm-value">{c.value}</span>
              <span className="cm-arrow">›</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Status footer */}
      <footer className="cm-footer cm-in">
        <div className="cm-available">
          <span className="cm-pulse" />
          <span>DISPONIBLE POUR MISSIONS FREELANCE</span>
          <span className="cm-pulse" />
        </div>
        <p className="cm-copyright">
          &copy; {new Date().getFullYear()} SANDRINE M'ZE — ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
};

export default ContactMe;
