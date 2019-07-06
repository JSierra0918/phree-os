import React from 'react';

function Items(props) {

    return (
        <div>
            <button {...props} >{props.item}</button>
        </div>
    )

}
export default Items;