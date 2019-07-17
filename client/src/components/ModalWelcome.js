import React from "react";
import "../pages/styles/modal.css";
import Button from "../assets/light-on-dark.png";

const ModalWelcome = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        // style={{
        //   display: props.show ? "none" : "inline-block",
        //   opacity: props.show ? "0" : "1"
        // }}
      >
        <div className="modal-header">
          <h3>Phree-OS</h3>
          {/* <span className="close-modal-btn" onClick={props.close}>
            ×
          </span> */}
        </div>
        <div className="modal-body">

            <p>Hello, and thank you for choosing Phree-OS. </p>

            <p>We aim to provide an easy, inexpensive point of sales solution for little businesses that can't afford the big, expensive point of sales systems. 
            Phree-OS is easy to use and manage, and charges nothing (at the moment*), giving you more time to concentrate on the things that matter, like running your business.</p>

            <p>Phree-OS utilizes Stripe to process securely all of your credit card transactions. After signing up for <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FN84BX4d5t3AWVetDulOzof3z7ADKrM8&scope=read_write" onClick={props.close}>Stripe</a>, you'll be one of millions of business owners, 
            in more than 100 countries, who get to take advantage of their system.  For just 2.9% of each transaction total plus an additional $0.30, Stripe gives you access to your own personal dashboard, 
            where you can track your sales and watch your business grow.</p>

            <p>Sign up for Stripe, set up your store, and enjoy Phree-OS.</p> 

            <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FN84BX4d5t3AWVetDulOzof3z7ADKrM8&scope=read_write"><img src={Button} onClick={props.close}></img></a>
            <p></p>
            <p className="finePrint">*if we reach our server's data cap, or need to expand in anyway we may need to charge, sorry :_(</p>

        </div>
        <div className="modal-footer">
          {/* <button className="btn-cancel" onClick={props.close}>
            CLOSE
          </button> */}
          {/* <button className="btn-continue">CONTINUE</button> */}
        </div>
      </div>
    </div>
  );
};

export default ModalWelcome;
