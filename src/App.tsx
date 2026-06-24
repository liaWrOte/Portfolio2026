import React from 'react';
import './App.scss';
import Main from './containers/main';
import { LanguageProvider } from './contexts/LanguageContext';
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="App">
        <Main />
      </div>
    </LanguageProvider>
  );
};
export default App;
