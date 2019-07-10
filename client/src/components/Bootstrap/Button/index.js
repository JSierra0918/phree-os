import React from "react";

function Button (props) {
    return (
        <div>
            <button type="button" class="btn btn-primary">{props.children}</button>
        </div>
    )
}


export default Button;