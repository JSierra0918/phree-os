import React, { Component } from "react";
import API from "../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditableCategory from "./EditableCategory";
import EditableItems2 from "./EditableItems2";
import { Input } from './Bootstrap/Form';

class Item2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            newCatName: "",
            editable: false,
            nameVal: this.props.item.itemname,
            quantVal: this.props.item.quantity,
            priceVal: this.props.item.price,
            itemname: "",
            price: 0,
            quantity: this.props.item.quantity
        }
    }

    componentDidMount() {
        // const userId = sessionStorage.getItem("userId");
        // API.getCategoryData(userId).then((response) => {
        //     this.setState({
        //         categories: response.data
        //     })
        // })
        // console.log("item mount")
     //   console.log(this.state)ç
    }

        componentDidUpdate() {
        
        }

    selectCategory = (id) => {
        const catDom = document.getElementsByClassName("categoryName")
        catDom.focus();
        //set the state of the category based off of the name
        API.getOneCategory(id).then((category) => {
            // console.log('category:', category.data)
            //find items and return the array possibly pass it as an argument for displayItem.
            this.grabItems(category.data.id);

            //Display an area for the user to update the category name

        });

    }

    updateCategoryName = (id, catName) => {

        API.putCategory(id, catName).then((response) => {
            // console.log("Item updated");
        })
    }

    editItem = (e, id) => {
        e.stopPropagation();
        // console.log(id);
        //make content edidtable
        const stateEdit = this.state.editable;

        ///when you click on edit/cancel - it turns editable true and resets the values to what they where before any changes.
        this.setState((state) => {
            return { 
                editable: state.editable = !stateEdit,
                nameVal: state.nameVal = this.props.item.itemname,
                priceVal: state.priceVal = this.props.item.price,
                quantVal: state.quantVal = this.props.item.quantity
             }
        })
    }

    saveItem = (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        let newItem = {
            itemname: this.state.nameVal,
            price: this.state.priceVal,
            quantity: this.state.quantVal,
            counter: 1,
            CategoryID: this.props.catID
        }

        //Check to see if all the item names are empty
        if (newItem.itemname === this.props.item.itemname && newItem.price === this.props.item.price && newItem.quantity === this.props.item.quantity) {
            alert("Please adjust one of the items values or cancel");
            return;
        }

        //save value to the Category DB
        API.putNewItem(id, newItem).then((response) => {
            // console.log('response:', response)
            this.setState({
                editable: false
            })
            //grab and reload items
            this.props.grabItems(this.props.catID);
            //reload the db data on to browser
            this.props.reload();
        })  
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    emptyFunctionForTernaryOnClick = () => {
        // empty for the ternary on Click Item
    }

    updateQ = () => {
        // console.log("updateQ");
        // console.log(this)

        this.props.addItem(this.props.item)
        this.props.updateItemQuantity(this.props.item.id,this.props.item.quantity -1);
        // this.setState({
        //     quantity : this.props.item.quantity -1
        // })

    }

    render() {
        // add decimals to the number
        const formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2
        })

        return (
            <div>
                <li
                    className={this.props.className}
                    dataid={this.props.dataid}
                    key={this.props.dataid}
                    // onClick={this.props.role === "1" ? this.emptyFunctionForTernaryOnClick : () => this.props.addItem(this.props.item)}
                    onClick={this.props.role === "1" ? this.emptyFunctionForTernaryOnClick : () => this.updateQ()}

                >
                    <div className="col manage-items" >
                        {this.props.role === "1" ? (
                            <div>
                                <EditableItems2
                                    itemname={this.props.item.itemname}
                                    quantity={this.props.item.quantity}
                                    price={this.props.price}
                                    editable={this.state.editable}
                                    nameVal={this.state.nameVal}
                                    quantVal={this.state.quantVal}
                                    priceVal={this.state.priceVal}
                                    handleInputChange={this.handleInputChange}

                                />

                                {/* check if editable is false, if it is show delete */}

                                {this.state.editable !== true ?

                                    <div><span id="trash" onClick={(e) => this.props.delete(e, this.props.dataid)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> Delete</span>
                                        <span id="edit" onClick={(e) => this.editItem(e, this.props.dataid)}><FontAwesomeIcon icon="edit" />Edit</span></div>
                                    :
                                    <div> <span id="save" onClick={(e) => this.saveItem(e, this.props.dataid)}>Save</span>

                                        <span id="cancel" onClick={(e) => this.editItem(e, this.props.dataid)}>Cancel</span></div>
                                }
                            </div>
                        ) :
                            (
                                <div>
                                    <h6>
                                        {this.props.itemname}
                                    </h6>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex item-highlight">
                                            <span>Q:</span><p>{this.props.item.quantity}</p>
                                        </div>
                                        <div className="d-flex item-highligh">
                                            <span>$</span><p>{formatter.format(this.props.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </li>
            </div>
        );
    }
}


export default Item2;
