import React from 'react';
import LogoSvg from '../Logo/LogoSvg';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import './mobile-screen.scss';

const MobileScreen: React.FC = () => (
  <div className="mobile-screen">
    <header className="ms-header">
      <LogoSvg className="ms-logo" />
      <div className="ms-identity">
        <p className="ms-name">SANDRINE M'ZE</p>
        <p className="ms-role">DÉVELOPPEUSE WEB & CREATIVE</p>
      </div>
      <LanguageSwitch />
    </header>

    <div className="ms-notice">
      <span className="ms-prompt">C:\PORTFOLIO&gt;</span>
      <p className="ms-message">
        L'expérience complète est conçue pour ordinateur.
      </p>
    </div>
  </div>
);

export default MobileScreen;
