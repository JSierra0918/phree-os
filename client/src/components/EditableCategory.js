import React from 'react';
import { Input } from './Bootstrap/Form';

function EditableCategory(props) {

    // console.log(props.item, this.props.value);
    return (
        <div>
            {props.editable!==true ? 
            <span>{props.item}</span> 
            :                                  
            <Input name="save" placeholder={props.item} className="form-control" value={props.value} onChange={props.handleInputChange} />
            }
        </div>
    )
}


export default EditableCategory;