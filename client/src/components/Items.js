import React, { Component } from 'react';
import EditableItems from './EditableItems';

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
                            <div className="edit-items-container-component">
                                <EditableItems
                                    items={this.props.items}
                                    editItem={this.editItem}
                                    value={this.state.save}
                                    handleInputChange={this.handleInputChange} 
                                    editable={this.state.editable}
                                    />
                            </div>
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