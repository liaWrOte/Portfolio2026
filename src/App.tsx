import React, { useEffect } from 'react';
import './App.scss';
import Main from './containers/main';
import { LanguageProvider } from './contexts/LanguageContext';
import { initRetroClickGlobal } from './utils/retroClick';

const App: React.FC = () => {
  useEffect(() => initRetroClickGlobal(), []);

  return (
    <LanguageProvider>
      <div className="App">
        <Main />
      </div>
    </LanguageProvider>
  );
};
export default App;
