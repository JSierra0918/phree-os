import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginFormContainer from './components/LoginFormContainer';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavTabs from './components/Bootstrap/NavTabs';
import LoginPage from './pages/LoginPage';
import StorePage from './pages/StorePage';

function App() {
  return (
    <div className="App">

      <img src={logo} className="App-logo" alt="logo" />
      <LoginFormContainer />
      <Router>
      <div>
        <NavTabs />
        
        <Route exact path="/signin" component={LoginPage} />
        <Route exact path="/signup" component={StorePage} />
      </div>
    </Router>

    </div>
  );
}

export default App;
