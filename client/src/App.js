import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import StorePage from './pages/StorePage';
import ManagePage from './pages/ManagePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SetupComplete from './pages/SetupComplete';
import PhreeContainer from './components/PhreeContainer'
import AddStore from './pages/AddStore'
import AddCategory from './pages/AddCategory'
import {Elements, StripeProvider} from 'react-stripe-elements';
import { faTrashAlt, faPlusSquare, faTimes} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add( faTrashAlt, faPlusSquare, faTimes);

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/SignUp" component={SignUp} />
                <Route exact path="/store" component={PhreeContainer} />
                <Route exact path="/store/:id" component={StorePage} />
                <Route exact path="/manage" component={ManagePage} />
                <Route exact path="/SetupComplete" component={SetupComplete} />
                <Route exact path="/addStore" component={AddStore} />
                <Route exact path="/addCategory" component={AddCategory} />
            </Switch>
        </Router>
        </div>
    );
}
export default App;


