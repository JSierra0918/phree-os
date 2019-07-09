import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import StorePage from './pages/StorePage';
import ManagePage from './pages/ManagePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { NavTab, NavItem } from './components/Bootstrap/NavTab';
import PhreeContainer from './components/PhreeContainer';


function App() {
    return (
        <div className="App">
            <Router>
                <div className="store-nav" style={{display: 'none' }}>

                    <h1>Hello Stripe</h1>
                    <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FN84Sv7TjpDUCWLlVrZk9kLd4K9fVfW7&scope=read_write">Connect With Stripe</a>
                    <div className="nav-link-container">
                        <Link to="/store" className="store-link">Store</Link>
                        <Link to="/manage" className="manage-link">Manage</Link>
                    </div>
                </div>

                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/SignIn" component={SignIn} />
                    <Route exact path="/SignUp" component={SignUp} />
                    <Route exact path="/store" component={PhreeContainer} />
                    <Route path="/store/:id" component={StorePage} />
                    <Route exact path="/manage" component={ManagePage} />
                </Switch>
            </Router>

        </div>
    );
}

export default App;


