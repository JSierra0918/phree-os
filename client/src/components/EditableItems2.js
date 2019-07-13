import React from 'react';
import { Input } from './Bootstrap/Form';

function EditableItems2(props) {

    console.log(props.nameVal)

    const formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2
    })

    // console.log(props.item, this.props.value);
    return (
        <div>
            {props.editable !== true ?
                <div className="edit-items-li"><h6>
                    {props.itemname}
                </h6>
                    <div className="d-flex item-q-price">
                        <div className="d-flex item-quantity">
                            <span>Q:</span><p>{props.quantity} |</p>
                        </div>
                        <div className="d-flex item-price">
                            <span>$</span><p>{formatter.format(props.price)}</p>
                        </div>
                    </div>
                </div> :
                <div className="save-items-container">
                    <Input name="nameVal" placeholder={`name: ${props.itemname}`} className="form-control" value={props.nameVal} onChange={props.handleInputChange} />
                    <Input name="quantVal" type="number" placeholder={`quantity: ${props.quantity}`} className="form-control" value={props.quantVal} onChange={props.handleInputChange} />
                    <Input name="priceVal" type="number" placeholder={`price: $${props.priceVal}`} className="form-control" value={props.value} onChange={props.handleInputChange} />
                </div>
            }
        </div>
    )
}


export default EditableItems2;