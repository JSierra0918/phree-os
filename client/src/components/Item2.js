import React, { Component } from "react";
import API from "../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditableCategory from "./EditableCategory";

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            newCatName: "",
            editable: false,
            save: ""
        }
    }

    componentDidMount() {

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

    editCategory = () => {

        //make content edidtable
        const stateEdit = this.state.editable;

        console.log(this)

        this.setState((state) => {
            return { editable: state.editable = !stateEdit }
        })
    }

    saveEditCategory = (id, value) => {
        console.log("ID VALUE:", id, value);

        const space = " ";
        const emptySpace = space.trim();

        const update = {
            categoryName: value.trim()
        }

        if (update.categoryName === this.props.item) {
            alert("You already have that name!")
        } else if (update.categoryName === emptySpace) {
            alert("You must have something in there")
        } else {
            //save value to the Category DB
            API.putCategory(id, update).then((response) => {
                console.log('response:', response)

                this.setState({
                    editable: false
                })

                //reload the db
                this.props.reload();
            })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        console.log(name, value);

    };

    render() {
        // add decimals to the number
        const formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2
        })

        //remove addItem Method
        let addItemVault = {...this.props}
        console.log(addItemVault);
        return (
            <div>
                <li {...this.props} onClick={() => this.props.addItem(this.props.item)}>
                    <div className="col manage-category" >
                        {this.props.role === "1" ? (
                            <div>
                                <EditableCategory item={this.props.item.itemname} editable={this.state.editable} value={this.state.save} handleInputChange={this.handleInputChange} />

                                {/* check if editable is false, if it is show delete */}

                                {this.state.editable !== true ?

                                    <div><span id="trash" onClick={() => this.props.delete(this.props.dataid)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> Delete</span>
                                        <span id="edit" onClick={() => this.editCategory(this.props.dataid)}>Edit</span></div>
                                    :
                                    <div> <span id="save" onClick={() => this.saveEditCategory(this.props.dataid, this.state.save)}>Save</span>

                                        <span id="edit" onClick={() => this.editCategory(this.props.dataid)}>Cancel</span></div>
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


export default Category;
