import React, { Component } from "react";
import API from "../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditableComponent from "./EditableComponent";



class Category extends Component {
    constructor(props) {
        super(props);

        this.addCat = this.addCat.bind(this);

        this.state = {
            categories: [],
            newCatName: ""
        }

    }

    componentDidMount() {
        const userId = sessionStorage.getItem("userId");
        API.getCategoryData(userId).then((response) => {
            console.log("MOUNTED: ", response);
            this.setState({
                categories: response.data
            })
        })
    }

    componentDidUpdate() {
        // const userId = sessionStorage.getItem("userId");
    }

    addCat(e) {
        const userId = sessionStorage.getItem("userId");
        e.preventDefault();
        //grab value
        var inp = document.getElementById("catInput");
        var val = inp.value;

        if (val === "") {
            alert("Cannot add a blank space");
            return;
        }

        let cat = {
            UserId: userId,
            categoryName: val
        }

        API.postCategory(userId, cat).then((response) => {
            console.log(response.data);

            this.setState({
                categories: response.data
            })
        })

        //empty value
        inp.value = '';
    }

    selectCategory = (id) => {
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

    renderCategory() {
        return this.state.categories.map(item => <Category role={this.props.role} dataid={item.id} key={item.id} item={item.categoryName} className="category-li" onClick={this.selectCategory} />)
    }

    render() {
        return (
            <div>
                <li {...this.props} onClick={() => this.props.onClick(this.props.dataid)}>
                    <div className="col manage-category" >
                        <span className="categoryName">{this.props.item}</span>

                        {/* <EditableComponent item={this.props.item} editable={true}/> */}
                        {/* If it's the manage page show this */}
                        {this.props.role === "1" ? (
                            <div>
                                <EditableComponent item={this.props.item} editable={this.props.editable} />

                                <span id="trash" onClick={() => this.props.delete(this.props.dataid)}> <FontAwesomeIcon icon="trash-alt" className="delete-icon" /> delete</span>
                                <span id="edit" onClick={() => this.props.edit(this.props.dataid)}>edit</span>
                            </div>
                        ) :
                            (<p></p>)}
                    </div>
                </li>


            </div>
        );
    }
}


export default Category;
