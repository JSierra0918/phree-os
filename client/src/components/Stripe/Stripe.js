import React, { Component } from "react";
import InputKeyValue from "./InputKeyValue"

class Stripe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setupBegan: false,
      isLoading: true,
      error: null,
      account: null,
      fieldsNeededForm: {}
    };

    this.fetchAccount = this.fetchAccount.bind(this);
    this.onClickBeginSetup = this.onClickBeginSetup.bind(this);
    this.onStartAccountSetup = this.onStartAccountSetup.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this)
    this.fieldsNeededFormChange = this.fieldsNeededFormChange.bind(this)
    this.onClickSaveFieldsNeeded = this.onClickSaveFieldsNeeded.bind(this )
  }

  componentWillMount() {
    this.fetchAccount();
  }

  getFieldValue(key) {
    const {
      fieldsNeededForm,
    } = this.state

    if (fieldsNeededForm[key]) {
      return fieldsNeededForm[key]
    } else {
      return '';
    }
  }

  fieldsNeededFormChange(e, key) {
    const {
      fieldsNeededForm,
    } = this.state
   
    fieldsNeededForm[key] = e.target.value;

    this.setState({
      fieldsNeededForm,
    })


  }

  fetchAccount() {
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
        const { success, message, setupBegan, account,  } = json;

        if (success) {
          this.setState({
            setupBegan,
            isLoading: false,
            account,
          });
        } else {
          //Failed
          this.setState({
            error: message,
            isLoading: false
          }); 
        }
      });
  }

  onStartAccountSetup() {
    this.setState({
      isLoading: true
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
          this.fetchAccount();
          //get user information from the database
        } else {
          //failed
          this.setState({
            error: message,
            isLoading: false
          });
        }
      });
  }

  onClickBeginSetup() {
    console.log("onClickBeginSetup is happening");
    this.onStartAccountSetup();
  }

  onClickSaveFieldsNeeded() {
     console.log('onClickSaveFieldsNeeded')
     const {
       fieldsNeededForm, 
     } = this.state;

     this.setState({
      isLoading: true
    });
    fetch("/api/stripe/account/save", {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-type": "application/JSON"
      },
      body: JSON.stringify(fieldsNeededForm)
    })
      .then(res => res.json())
      .then(json => {
        const { success, message } = json;

        if (success) {
          this.fetchAccount();
          //get user information from the database
        } else {
          //failed
          this.setState({
            error: message,
            isLoading: false
          });
        }
      });

  }

  render() {
    const { 
        isLoading, 
        setupBegan, 
        error, 
        account,
      } = this.state;

    if (isLoading) {
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

    console.log('account:', account)

    const { verification } = account;
    const { fields_needed } = verification;
 
    return (
      <div>
           {
            (error) ? (<p>(error)</p> ) : (null) 
           }
           {
             (fields_needed.length === 0) ? (
               <p>All setup</p>
             ) : (
               <div>
                 {
                  fields_needed.map(fieldKey => {
                    const value = this.getFieldValue(fieldKey)
                    return (
                      <InputKeyValue
                       text={fieldKey}
                       id={fieldKey}
                       value={value}
                       key={Math.random()}
                       onTextboxChange={this.fieldsNeededFormChange}
                       />
                    )  
                  }) 
                 }
                 <div>
                   <button onClick={this.onClickSaveFieldsNeeded}>
                     Save
                     </button>
                 </div>
               </div>
             )
           }
      </div>
    );
  }
}

export default Stripe;
