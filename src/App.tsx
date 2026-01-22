import React from 'react';
import './App.scss';
import Main from './containers/main';
import { fetchProjects } from './actions/main';

const App: React.FC = () => {

  return (
    <div className="App">
      <Main />
    </div>
  );
};

export default App;
