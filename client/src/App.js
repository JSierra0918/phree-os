import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import StorePage from './pages/StorePage';
import ManagePage from './pages/ManagePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StripeInfoPage from './pages/StripeInfoPage'
import {Elements, StripeProvider} from 'react-stripe-elements';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/store" component={StorePage} />
          <Route exact path="/manage" component={ManagePage} />
          <Route exact path="/StripeInfo" component={StripeInfoPage} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;


