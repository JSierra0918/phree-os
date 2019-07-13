import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './Bootstrap/Form';

function EditableItems(props) {
    // add decimals to the number
    const formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2
    })
    console.log("editableitems")
    console.log(props)

    return (
        <div>
            {props.items.map(item =>
                <li dataid={item.id} key={item.id}
                    // onClick={""}
                    className="edit-items-container"  >
                    <div className="edit-items-li"><h6>
                        {item.itemname}
                    </h6>
                        <div className="d-flex item-q-price">
                            <div className="d-flex item-quantity">
                                <span>Q:</span><p>{item.quantity} |</p>
                            </div>
                            <div className="d-flex item-price">
                                <span>$</span><p>{formatter.format(item.price)}</p>
                            </div>
                        </div>
                    </div>

                    {props.editable !== true ?

                        <div><span id="trash" onClick={() => this.props.delete(item.id)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> Delete</span>
                            <span id="edit" onClick={() => props.editItem()}>Edit</span></div>
                        :
                        (
                            <div>
                                <Input name="save" placeholder={props.item} className="form-control" value={props.value} onChange={props.handleInputChange} />
                                <div> <span id="save" onClick={() => this.saveEditCategory(item.id, props.save)}>Save</span>

                                    <span id="edit" onClick={() => props.editItem(item.id)}>Cancel</span></div>
                            </div>
                        )
                    }

                </li>)}
        </div>
    );
}

export default EditableItems;
