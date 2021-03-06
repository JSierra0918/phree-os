import React from "react";
import "../pages/styles/modal.css";
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const ModalPayment = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        // style={{
        //   display: props.show ? "inline-block" : "none",
        //   opacity: props.show ? "1" : "0",
        //   // background: props.show? "white" : "black",
        // }}
      >
        <div className="modal-header">
          <h3>Total: ${props.total}</h3>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          
              <div className="form-row">
                <div id="card-element">
                  <StripeProvider apiKey="pk_live_H7lWIlVZCkxddZJ3esYsK9Y000gb8ktp2h">
                    <div className="example">
                      <h1>Complete Checkout</h1>
                      <Elements>
                        <CheckoutForm 
                        total={props.total} 
                        userId={props.userId}
                        checkoutObj={props.checkoutObj}
                        reload={props.reload}
                        getPaymentSummary={props.getPaymentSummary}
                        />
                      </Elements>
                    </div>
                  </StripeProvider>{" "}
                </div>
                <div id="card-errors" role="alert" />
              </div>
          
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={props.close}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;
