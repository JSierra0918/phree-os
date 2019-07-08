import React, {Component} from 'react';
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


import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './components/CheckoutForm';
import Stripe from './components/Stripe/Stripe'
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

// class App extends Component {
//   render() {
//     return (
    //   <StripeProvider apiKey="pk_test_CPmIKoox7WD3HAdqil1J9oEf00GKDwnkqp">
    //     <div className="example">
    //       <h1>React Stripe Elements Example</h1>
    //       <Elements>
    //         <CheckoutForm />
    //       </Elements>
    //     </div>
    //   </StripeProvider>
    // <>
    // {/* <Stripe></Stripe> */}
    // </>
//     );
//   }
// }

// export default App;
