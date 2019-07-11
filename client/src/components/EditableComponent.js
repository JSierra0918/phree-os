import React from 'react';

function EditableComponent(props) {

    console.log(props.editable)

    return (
        <div>
            {props.editable!==true ? <span>{props.item}</span> :   <input className="edit-input" placeholder={props.item}></input>
            }
        </div>
    )
}


export default EditableComponent;