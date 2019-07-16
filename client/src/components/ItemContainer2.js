import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Item2 from '../components/Item2'
import { Input } from './Bootstrap/Form';

const isDisabled = {
    opacity: .5,
    pointerEvents: "none"
}

class ItemContainer2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            isActive: false,
            itemname: "",
            price: 0,
            quantity: 0,
            wantsToAddNewItem: false
        }
        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //takes in array and checks to see if it has any items
        // console.log(this.props.category);
        // return this.setState({ categoryList: this.props.category })
    }

    renderItems() {
        return this.props.items.map(item => <Item2
            role={this.props.role}
            dataid={item.id}
            key={item.id}
            item={item}
            itemname={item.itemname}
            quantity={item.quantity}
            price={item.price}
            className="items-li"
            addItem={this.props.addItem}
            delete={this.props.delete}
            edit={this.props.edit}
            reload={this.props.reload}
            catID={this.props.catID}
            grabItems={this.props.grabItems}
            updateItemQuantity={this.props.updateItemQuantity}
        />)
    }

    addClass = () => {
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    grabNewItemInfo = (e) => {

        const blank = " ";

        let newobjItem = {
            itemname: this.state.itemname,
            price: this.state.price,
            quantity: this.state.quantity,
            counter: 1,
            CategoryId: this.props.catID
        }

        //Check to see if all the item names are empty
        if (this.state.itemname === blank.trim() || this.state.price === 0 || this.state.quantity === 0) {
            alert("All values must be filled");
            return;
        }

        this.props.addNewItem(e, this.props.catID, newobjItem);
        //revert back to the add button
        this.userWantsToAddNewItem();
    }

    userWantsToAddNewItem = () => {
        this.setState(state => {
            return { wantsToAddNewItem: !state.wantsToAddNewItem }
        })
    }

    render() {
        return (
            <div className="items text-center p-main-col mb20">
                <div className="flex-top-section">
                    <h5>Items</h5> <hr />
                </div>

                {this.props.role === "1" ? (
                    <div className="item-container-manage">
                        < div className="scrollable-content">
                            <ul>
                                {this.renderItems()}
                            </ul>
                        </div>

                        <div className="flex-bottom-section">
                            {this.state.wantsToAddNewItem === true ? (
                                <li>
                                    <div className="add-item-form type1">
                                        <form className="input-wrapper">
                                            <Input id="itemInput" type="text" name="itemname" value={this.state.itemnameVal} onChange={this.handleInputChange} placeholder="Item name:" />
                                            <div className="row">
                                                <div className="col-6">
                                                    <Input id="itemInput" type="number" name="price" step={0.01} value={this.state.itemnameVal} onChange={this.handleInputChange} placeholder="Item price:" />
                                                </div>
                                                <div className="col-6">
                                                    <Input id="itemInput" type="number" name="quantity" value={this.state.itemnameVal} onChange={this.handleInputChange} placeholder="Item quantity:" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button onClick={(e) => this.grabNewItemInfo(e)} className="save-item-btn" > <FontAwesomeIcon icon="plus-square" /> Save</button>
                                        </div>
                                        <div className="col-6">
                                            <button onClick={this.userWantsToAddNewItem} className="cancel-item-btn" > <FontAwesomeIcon icon="times" /> Cancel</button>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                    <button className="add-item-btn" onClick={this.userWantsToAddNewItem}> Add New Item</button>
                                )
                            }
                        </div>
                    </div>
                ) :
                    < div className="scrollable-content">
                        <ul>
                            {this.renderItems()}
                        </ul>
                    </div>}
            </div>
        );
    }
}

export default ItemContainer2;
