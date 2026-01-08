import React from 'react';
import './App.scss';
import Main from './containers/Main';
import { fetchProjects } from './actions/main';

function App() {

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
