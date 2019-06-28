import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginFormContainer from './components/LoginFormContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginFormContainer />
      </header>
    </div>
  );
}

export default App;
