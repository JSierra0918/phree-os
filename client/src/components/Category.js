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

    // selectCategory = (id) => {
    //     const catDom = document.getElementsByClassName("categoryName")
    //     catDom.focus();
    //     //set the state of the category based off of the name
    //     API.getOneCategory(id).then((category) => {
    //         console.log('category:', category.data)
    //         //find items and return the array possibly pass it as an argument for displayItem.
    //         this.grabItems(category.data.id);

    //         //Display an area for the user to update the category name

    //     });

    // }

    updateCategoryName = (id, catName) => {

        API.putCategory(id, catName).then((response) => {
            console.log("Item updated");
        })
    }

    editCategory = (e) => {
        e.stopPropagation();
        //make content edidtable
        const stateEdit = this.state.editable;
      

        console.log(this)

        this.setState((state) => {
            return { editable: state.editable = !stateEdit }
        })
    }

    saveEditCategory = (e, id, value) => {
        console.log("ID VALUE:", id, value);
        e.stopPropagation();

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
        return (
            <div>
                <li key={this.props.dataid} style={this.props.style} dataid={this.props.dataid} className={this.props.className} onClick={(e) => this.props.onClick(this.props.dataid)}>
                    <div className="col manage-category" >

                        {/* <EditableComponent item={this.props.item} editable={true}/> */}
                        {/* If it's the manage page show this */}
                        {this.props.role === "1" ? (
                            <div>
                                <EditableCategory item={this.props.item} editable={this.state.editable} value={this.state.save} handleInputChange={this.handleInputChange} />

                                {/* check if editable is false, if it is show delete */}

                                {this.state.editable !== true ?

                                    <div className="d-flex justify-content-center"><span id="trash" onClick={(e) => this.props.delete(e, this.props.dataid)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> Delete</span>
                                        <span id="edit" onClick={(e) => this.editCategory(e, this.props.dataid)}>Edit</span></div>
                                    :
                                    <div className="d-flex justify-content-center"> <span id="save" onClick={(e) => this.saveEditCategory(e,this.props.dataid, this.state.save)}>Save</span>

                                        <span id="cancel" onClick={(e) => this.editCategory(e, this.props.dataid)}>Cancel</span></div>
                                }
                            </div>
                        ) :
                            (<span className="categoryName">{this.props.item}</span>
                            )}
                    </div>
                </li>


            </div>
        );
    }
}


export default Category;
