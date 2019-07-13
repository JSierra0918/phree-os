import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import API from '../utils/API';

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
        // this.cardInfo()
        // console.log(ev)
        let {token} = await this.props.stripe.createToken({name: "Name"});
         let response = 
          await fetch("/charge", {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify({ token: token.id, total: this.props.total, userId: this.props.userId })
          });

         if (response.ok) {
           console.log("Purchase Complete!")
           this.setState({
             complete : true
           })
         }
      }

        cardInfo= ()=> {
        let cardInput = document.querySelector(".__PrivateStripeElement-input")
        console.log(cardInput)
        console.log(cardInput.value)
        if (cardInput.value === "") {
          alert("Please enter your card number.")
        }else{
          alert("you got numbers")
          // this.submit()
        }
      }
      render() {

        
        return (
        <>
          {this.state.complete ? 
    
          (<h1>Purchase Complete</h1>)
          
          :
          (<div className="checkout">
              <p>Would you like to complete the purchase?</p>
              <CardElement/>
              <button onClick={this.cardInfo}>Send</button>
            </div>)
          }
        </>
        )
  }
}

export default injectStripe(CheckoutForm);