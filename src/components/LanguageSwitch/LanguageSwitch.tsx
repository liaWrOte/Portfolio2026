import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import './language-switch.scss';
const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };
  return (
    <button
      className="language-switch"
      onClick={toggleLanguage}
      title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <span className={`flag ${language === 'fr' ? 'active' : ''}`}>🇫🇷</span>
      <span className={`flag ${language === 'en' ? 'active' : ''}`}>🇬🇧</span>
    </button>
  );
};
export default LanguageSwitch;
