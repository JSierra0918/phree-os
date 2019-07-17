import React from "react"

function ModalWelcomeWrapper(props) {


    return (
        <div
        className ="modal-container"
        style={{
            display: props.show ? "none" : "inline-block",
            opacity: props.show ? "0" : "1"
          }}
        >
         {props.children}

        </div>
    )

}

export default ModalWelcomeWrapper
