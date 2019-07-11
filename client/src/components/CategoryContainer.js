import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Category from './Category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../utils/API';

class CategoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            isActive: false
        }
        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //takes in array and checks to see if it has any items
        console.log(this.props.category);
        return this.setState({ categoryList: this.props.category })
    }

    renderCategory() {
        return this.props.category.map(item => <Category
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

    addClass = () => {
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    // addCat = (e) => {
    //     const userId = sessionStorage.getItem("userId");
    //     e.preventDefault();
    //     //grab value
    //     var inp = document.getElementById("catInput");
    //     var val = inp.value.trim();
    //     const whiteSpace = " ";

    //     if (val === whiteSpace.trim()) {
    //         alert("Cannot add a name  to the category");
    //         return;
    //     }

    //     let newCategory = {
    //         UserId: userId,
    //         categoryName: val
    //     }

    //     API.postCategory(userId,newCategory).then((response) => {
    //         console.log(response.data);

    //        //reload page or add it to the the categories
    //        this.props.addCategory(response.data)
    //     })
    //     //empty value
    //     inp.value = '';
    // }

    render() {
        return (
            <div className="category text-center p-main-col mb20">
                <h5>Category</h5>
                <hr />
                <ul>
                    {this.renderCategory()}
                </ul>
                {this.props.role === "1" ? (
                    <div>
                        <div className="add-category-form type1">
                            <form className="input-wrapper">
                                <input id="catInput" type="text" name="addCategory" placeholder="Create Category" />
                            </form>
                        </div>

                        <button onClick={this.props.addCategory} > <FontAwesomeIcon icon="plus-square" className="add-cat-btn" /> Add Category</button>
                    </div>
                ) : (<p></p>)}
            </div>
        );
    }
}

export default CategoryContainer;
