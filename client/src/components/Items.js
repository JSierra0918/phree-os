import React, { Component } from 'react';
import EditableItems from './EditableItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './Bootstrap/Form';


class Items extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            newCatName: "",
            editable: false,
            save: ""
        }
    }


    editItem = () => {

        //make content edidtable
        console.log(this);
        const stateEdit = this.state.editable;
        this.setState((state) => {
            return { editable: state.editable = !stateEdit }
        })
    }

    render() {
        // add decimals to the number
        const formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2
        })
        return (
            <div>
                {this.props.role === "1" ?
                    (
                        <ul>
                            {/* <div className="edit-items-container-component">
                               
                            </div> */}
                            {/* <EditableItems
                                    items={this.props.items}
                                    editItem={this.editItem}
                                    value={this.state.save}
                                    handleInputChange={this.handleInputChange} 
                                    editable={this.state.editable}
                                    /> */}

                            {this.props.items.map(item =>
                                <li dataid={item.id} key={item.id}
                                    className="items-li"  >
                                    <h6>
                                        {item.itemname}
                                    </h6>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex item-highlight">
                                            <span>Q:</span><p>{item.quantity}</p>
                                        </div>
                                        <div className="d-flex item-highligh">
                                            <span>$</span><p>{formatter.format(item.price)}</p>
                                        </div>
                                    </div>

                                    {this.props.editable !== true ?

                                        <div><span id="trash" onClick={() => this.props.delete(item.id)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> Delete</span>
                                            <span id="edit" onClick={() => this.props.editItem()}>Edit</span></div>
                                        :
                                        (
                                            <div>
                                                <Input name="save" placeholder={item.itemname} className="form-control" value={this.props.value} onChange={this.props.handleInputChange} />
                                                <div> <span id="save" onClick={() => this.saveEditCategory(item.id, this.save)}>Save</span>

                                                    <span id="edit" onClick={() => this.props.editItem()}>Cancel</span></div>
                                            </div>
                                        )
                                    }
                                </li>)
                            }
                        </ul>
                    ) : (
                        <ul>
                            {this.props.items.map(item =>
                                <li dataid={item.id} key={item.id}
                                    onClick={() => this.props.addItem(item)}
                                    className="items-li"  >
                                    <h6>
                                        {item.itemname}
                                    </h6>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex item-highlight">
                                            <span>Q:</span><p>{item.quantity}</p>
                                        </div>
                                        <div className="d-flex item-highligh">
                                            <span>$</span><p>{formatter.format(item.price)}</p>
                                        </div>
                                    </div>
                                </li>)
                            }
                        </ul>
                    )
                }

            </div >
        )

    }
}
export default Items;