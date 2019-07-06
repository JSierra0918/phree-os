import React, { Component } from "react";

class Stripe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setupBegan: false,
      isLoadingFieldsNeeded: true,
      error: null
    };

    this.fetchFieldsNeeded = this.fetchFieldsNeeded.bind(this);
    this.onClickBeginSetup = this.onClickBeginSetup.bind(this);
    this.onStartAccountSetup = this.onStartAccountSetup.bind(this);
  }

  componentWillMount() {
    this.fetchFieldsNeeded();
  }
  fetchFieldsNeeded() {
    fetch("/api/stripe/account/get", {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-type": "application/JSON"
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(json => {
        const { success, message, setupBegan } = json;

        if (success) {
          this.setState({
            setupBegan,
            isLoadingFieldsNeeded: false
          });
        } else {
          //Failed
          this.setState({
            error: message,
            isLoadingFieldsNeeded: false
          });
        }
      });
  }

  onStartAccountSetup() {
    this.setState({
      isLoadingFieldsNeeded: true
    });
    fetch("/api/stripe/account/setup", {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-type": "application/JSON"
      },
      body: JSON.stringify({
        countryCode: "US"
        //could put a select box or something here to give the client options
      })
    })
      .then(res => res.json())
      .then(json => {
        const { success, message } = json;

        if (success) {
          this.fetchFieldsNeeded();
          //get user information from the database
        } else {
          //failed
          this.setState({
            error: message,
            isLoadingFieldsNeeded: false
          });
        }
      });
  }

  onClickBeginSetup() {
    console.log("onClickBeginSetup is happening");
    this.onStartAccountSetup();
  }

  render() {
    const { 
        isLoadingFieldsNeeded, 
        setupBegan, 
        error } = this.state;

    if (isLoadingFieldsNeeded) {
      return ( 
      <p>Loading...</p> 
      )
    }

    if (!setupBegan) {
      return (
        <div>
          {
            (error) ? (<p>{error}</p>) : (null) 
          }
          <button onClick={this.onClickBeginSetup}>Begin Setup</button>
          <p>
            By clicking setup you agree to the terms of service for Stripe and
            us.
          </p>
        </div>
      );
    }
    return (
      <div>
           {
            (error) ? (<p>(error)</p> ) : (null) 
           }
        <p>Start Adding Stripe elements </p>
      </div>
    );
  }
}

export default Stripe;
