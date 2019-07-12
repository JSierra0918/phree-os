import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Items from './Items';
import '../pages/styles/storepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ItemsContainer extends Component {

    constructor(props){
        super(props);

        this.state= {
            editable: false
        }
    }

    renderCategory() {
        return this.props.category.map(item => <Items
            role={this.props.role}
            dataid={item.id}
            key={item.id}
            item={item.categoryName}
            className="category-li"
            style={this.state.style}
            onClick={this.props.onClick}
            delete={this.props.delete}
            edit={this.props.edit}
            reload={this.props.reload}
        />)
    }

    itemID = (Item) => {
        console.log("THIS IS THE ITEM:", Item)
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

        return (
            <>
                <div className="items text-center p-main-col mb20">
                    <h5>Items</h5>
                    <hr />
                    <Items
                        items={this.props.items}
                        role={this.props.role}
                        addItem={this.props.addItem}
                        editable ={this.state.editable}
                        editItem ={this.editItem}
                        itemID ={this.itemID}
                    />

                    {this.props.role === "1" ? (
                        <div>
                            <div className="add-category-form type1">
                                <form className="input-wrapper">
                                    <input id="catInput" type="text" name="addCategory" placeholder="Create Category" />
                                </form>
                            </div>

                            <button onClick={this.props.addNewItem} > <FontAwesomeIcon icon="plus-square" className="add-item-btn" /> Add Item</button>
                        </div>

                        //include EditItems component
                    ) : (<p></p>)}
                </div>



            </>
        )
    }
}

export default ItemsContainer;