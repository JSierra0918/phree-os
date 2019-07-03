import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import LoginFormContainer from './components/LoginFormContainer';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import NavTabs from './components/Bootstrap/NavTabs';
// import LoginPage from './pages/LoginPage';
// import StorePage from './pages/StorePage';
// import ManagePage from './pages/ManagePage';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
import NavBar from "./components/Navbar";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";




// function App() {
//   return (
    // <div className="App">
    //   <Router>
    //     <Switch>
    //       <Route exact path="/" component={LoginPage} />
    //       <Route exact path="/SignIn" component={SignIn} />
    //       <Route exact path="/SignUp" component={SignUp} />
    //       <Route exact path="/store" component={StorePage} />
    //       <Route exact path="/manage" component={ManagePage} />
    //     </Switch>
    //   </Router>

    function App() {
      return (
        <div className="App">
          <header>
            <NavBar />
          </header>
        </div>
      );
    }
    
    export default App;