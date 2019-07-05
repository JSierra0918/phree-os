import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

//CardElement creates a "card" type element that mounts on the page when the component is rendered 
//The CardElement includes inputs for all of the major card fields: the card number, the expiration date, and the CVC

// The CheckoutForm class defines a component that displays a CardElement and a button for completing the purchase. 
// The button’s click event is wired to the submit method

//The injectStripe function wraps the component, creating a new component with an injected stripe prop, which contains
// a Stripe object. You must use the wrapped component in your application instead of the original CheckoutForm


class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
      }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
  
    if (response.ok) this.setState({complete: true});
}

render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
  
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);