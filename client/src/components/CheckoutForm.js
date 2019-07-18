import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import API from "../utils/API";

let IDsOfItemsSold = [];
let quantityOfEachItemSold = [];
let quantityOfEachItemInStock = [];

//CardElement creates a "card" type element that mounts on the page when the component is rendered
//The CardElement includes inputs for all of the major card fields: the card number, the expiration date, and the CVC

// The CheckoutForm class defines a component that displays a CardElement and a button for completing the purchase.
// The button's click event is wired to the submit method

//The injectStripe function wraps the component, creating a new component with an injected stripe prop, which contains
// a Stripe object. You must use the wrapped component in your application instead of the original CheckoutForm

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      complete: false,
      remainingStockIdsandItems : {},
    
    };

    this.submit = this.submit.bind(this);
    this.findRemainingQuantity = this.findRemainingQuantity.bind(this);

  }
  componentDidUpdate() {

  }
  async submit(ev) {
    await this.initialLoop(this.props.checkoutObj)
    const n = IDsOfItemsSold.length
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token.id,
        total: this.props.total,
        userId: this.props.userId,
        checkoutObj: this.state.remainingStockIdsandItems
      })
    });

    if (response.ok) {
      // console.log("Purchase Complete!");
      this.setState({
        complete: true
      });
      // setTimeout(() => window.location.reload(), n * 500);
      //make the call and adjust the quantities
    }
}

  initialLoop =(obj) =>{
    let itemsSold = obj;
    this.props.getPaymentSummary(obj)
    for (var i = 0; i < itemsSold.length; i++) {
      let id = itemsSold[i].id;
      IDsOfItemsSold.push(parseInt(id));
      let quantity = itemsSold[i].Quantity;
      quantityOfEachItemSold.push(parseInt(quantity));
      API.getSpecificItem(id).then(response => {
        let stockAmount = response.data.quantity;
        quantityOfEachItemInStock.push(stockAmount);
      }).then(() => {
        return this.findRemainingQuantity(
          quantityOfEachItemInStock,
          quantityOfEachItemSold,
          IDsOfItemsSold);
      }) 
    }
  } 
    
    findRemainingQuantity = (stockQuant, amountSold, Ids) =>{
    const stockUpdate = [];
    for (let i = 0; i < amountSold.length; i++) {
      // stockUpdate[Ids[i]] = parseInt(stockQuant[i] - amountSold[i]);
      stockUpdate.push({id:Ids[i], quantity:parseInt(stockQuant[i] - amountSold[i])})
    }
    this.setState({
      remainingStockIdsandItems : stockUpdate
    })
    console.log(this.state.remainingStockIdsandItems)
     
  };


  render() {

    // this.initialLoop(this.props.checkoutObj)

    return (
      <>
        {this.state.complete ? (
          <h1>Purchase Complete</h1>
        ) : (
          <div className="checkout">
            <p>Would you like to complete the purchase?</p>
            <CardElement />
            <button onClick={this.submit}>Send</button>
          </div>
        )}
      </>
    );
  }
}

export default injectStripe(CheckoutForm);