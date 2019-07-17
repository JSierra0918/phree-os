import React from "react";
import "../pages/styles/storepage.css";


function ModalPaymentWrapper(props) {


    return (
        <div
        className ="modal-container"
        style={{
            display: props.show ? "inline-block" : "none",
            opacity: props.show ? "1" : "0",
            // background: props.show? "white" : "black",
          }}
        >
         {props.children}

        </div>
    )

}

export default ModalPaymentWrapper
