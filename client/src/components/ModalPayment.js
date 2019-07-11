import React from "react";
import '../pages/styles/modal.css'

const ModalPayment = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          display: props.show ? "inline-block" : "none",
          opacity: props.show ? "1" : "0"
        }}
      >
        <div className="modal-header">
          <h3>Modal Header</h3>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>
            <form action="/charge" method="post" id="payment-form">
              <div class="form-row">
                <label for="card-element">Credit or debit card</label>
                <div id="card-element">
                  {/* <!-- A Stripe Element will be inserted here. --> */}
                </div>

                {/* <!-- Used to display form errors. --> */}
                <div id="card-errors" role="alert" />
              </div>

              <button>Submit Payment</button>
            </form>
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={props.close}>
            CLOSE
          </button>
          <button className="btn-continue">CONTINUE</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;

