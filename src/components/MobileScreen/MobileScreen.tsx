import React from 'react';
import LogoSvg from '../Logo/LogoSvg';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import ScrambleText from '../ScrambleText/ScrambleText';
import { useTranslation } from '../../contexts/LanguageContext';
import './mobile-screen.scss';

const CONTACTS = [
  { label: 'LINKEDIN', value: '/in/sandrine-mze', href: 'https://www.linkedin.com/in/sandrinemze/' },
  { label: 'GITHUB',   value: 'github.com/liaWrOte', href: 'https://github.com/liaWrOte' },
];

const MobileScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mobile-screen">
      <header className="ms-header">
        <LogoSvg className="ms-logo" />
        <div className="ms-identity">
          <p className="ms-name">SANDRINE M'ZE</p>
          <ScrambleText text={t('developer')} tag="p" className="ms-role" />
        </div>
        <LanguageSwitch />
      </header>

      <div className="ms-notice">
        <span className="ms-prompt">C:\PORTFOLIO&gt;</span>
        <ScrambleText text={t('mobile_notice')} tag="p" className="ms-message" />

        <div className="ms-divider" />

        <ul className="ms-contacts">
          {CONTACTS.map((c) => (
            <li key={c.label}>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="ms-contact-link">
                <span className="ms-contact-label">{c.label}</span>
                <span className="ms-contact-sep">›</span>
                <span className="ms-contact-value">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="ms-available">
          <span className="ms-pulse" />
          <ScrambleText text={t('contact_available')} />
        </p>
      </div>
    </div>
  );
};

export default MobileScreen;
