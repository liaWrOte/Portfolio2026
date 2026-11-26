import React, { useEffect } from 'react';
import './App.scss';
import Main from './containers/main';
import MobileScreen from './components/MobileScreen/MobileScreen';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import { initRetroClickGlobal } from './utils/retroClick';

const LangSync: React.FC = () => {
  const { language } = useTranslation();
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return null;
};

const App: React.FC = () => {
  useEffect(() => initRetroClickGlobal(), []);

  return (
    <LanguageProvider>
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <LangSync />
      <div className="crt-overlay" aria-hidden="true" />
      <div className="App">
        <MobileScreen />
        <div id="main-content" className="desktop-only">
          <Main />
        </div>
      </div>
    </LanguageProvider>
  );
};
export default App;
