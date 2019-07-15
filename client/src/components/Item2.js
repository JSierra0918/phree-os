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
            nameVal: "",
            quantVal: "",
            priceVal: "",
            itemname: "",
            price: 0,
            quantity: 0
        }
    }

    componentDidMount() {
        // const userId = sessionStorage.getItem("userId");
        // API.getCategoryData(userId).then((response) => {
        //     this.setState({
        //         categories: response.data
        //     })
        // })
    }

    componentDidUpdate() {
        // const userId = sessionStorage.getItem("userId");
    }

    selectCategory = (id) => {
        const catDom = document.getElementsByClassName("categoryName")
        catDom.focus();
        //set the state of the category based off of the name
        API.getOneCategory(id).then((category) => {
            console.log('category:', category.data)
            //find items and return the array possibly pass it as an argument for displayItem.
            this.grabItems(category.data.id);

            //Display an area for the user to update the category name

        });

    }

    updateCategoryName = (id, catName) => {

        API.putCategory(id, catName).then((response) => {
            console.log("Item updated");
        })
    }

    editItem = (e,id) => {
        e.stopPropagation();
        console.log(id);
        //make content edidtable
        const stateEdit = this.state.editable;

        this.setState((state) => {
            return { editable: state.editable = !stateEdit }
        })
    }

    saveItem = (e,id) => {
        e.stopPropagation();
        e.preventDefault();
        // event.preventDefault();
        let newItem = {
            itemname: this.state.nameVal,
            price: this.state.priceVal,
            quantity: this.state.quantVal,
            counter: 1,
            CategoryID: this.props.catID
        }

        const space = " ";
        const emptySpace = space.trim();

        // const update = {
        //     categoryName: value.trim()
        // }

        console.log(newItem);

        // if (update.categoryName === this.props.item) {
        //     alert("You already have that name!")
        // } else if (update.categoryName === emptySpace) {
        //     alert("You must have something in there")
        // } else {
        //     //save value to the Category DB
        API.putNewItem(id, newItem).then((response) => {
            console.log('response:', response)

            this.setState({
                editable: false
            })
            //grab and reload items
            this.props.grabItems(this.props.catID);

            //reload the db
            this.props.reload();
        })
        // }
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    emptyFunctionForTernaryOnClick = () => {
        // empty for ternary click
    }

    render() {
        // add decimals to the number
        const formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2
        })
        //remove addItem Method

        return (
            <div>
                <li 
                className={this.props.className}
                 dataid={this.props.dataid} 
                 key={this.props.dataid} 
                 onClick={this.props.role === "1"? this.emptyFunctionForTernaryOnClick : () => this.props.addItem(this.props.item)}
                  >
                    <div className="col manage-items" >
                        {this.props.role === "1" ? (
                            <div>
                                <EditableItems2
                                    itemname={this.props.item.itemname}
                                    quantity={this.props.quantity}
                                    price={this.props.price}
                                    editable={this.state.editable}
                                    nameVal={this.state.nameVal}
                                    quantVal={this.state.quantVal}
                                    priceVal={this.state.priceVal}
                                    handleInputChange={this.handleInputChange}

                                />

                                {/* check if editable is false, if it is show delete */}

                                {this.state.editable !== true ?

                                    <div><span id="trash" onClick={(e) => this.props.delete(e,this.props.dataid)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> Delete</span>
                                        <span id="edit" onClick={(e) => this.editItem(e,this.props.dataid)}>Edit</span></div>
                                    :
                                    <div> <span id="save" onClick={(e) => this.saveItem(e,this.props.dataid)}>Save</span>

                                        <span id="cancel" onClick={(e) => this.editItem(e,this.props.dataid)}>Cancel</span></div>
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
                                            <span>Q:</span><p>{this.props.quantity}</p>
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
