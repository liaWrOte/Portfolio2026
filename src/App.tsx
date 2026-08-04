import React, { useEffect } from 'react';
import './App.scss';
import Main from './containers/main';
import MobileScreen from './components/MobileScreen/MobileScreen';
import { LanguageProvider } from './contexts/LanguageContext';
import { initRetroClickGlobal } from './utils/retroClick';

const App: React.FC = () => {
  useEffect(() => initRetroClickGlobal(), []);

  return (
    <LanguageProvider>
      <div className="App">
        <MobileScreen />
        <div className="desktop-only">
          <Main />
        </div>
      </div>
    </LanguageProvider>
  );
};
export default App;
