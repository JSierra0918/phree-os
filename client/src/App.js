import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import StorePage from './pages/StorePage';
import ManagePage from './pages/ManagePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddStore from './pages/AddStore';
import AddCategory from './pages/AddCategory';


function App() {
  return (
    <div className="App">
      
      <Router>
      <Link to="/addStore">Add Store</Link>
      <Link to="/addCategory">Add Category</Link>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/store" component={StorePage} />
          <Route exact path="/manage" component={ManagePage} />
          <Route exact path="/addStore" component={AddStore} />
          <Route exact path="/addCategory" component={AddCategory} />


        </Switch>
      </Router>

    </div>
  );
}

export default App;
