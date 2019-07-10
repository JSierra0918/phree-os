import React, { Component } from "react";
import API from "../utils/API";
import Category from "../components/Category";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class AddCategory extends React.Component {

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
      console.log(response);
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
      // this.grabItems(category.data.id);

      //Display an area for the user to update the category name

    });

  }

  updateCategoryName = (id, catName) => {

    API.putCategory(id, catName).then((response) => {
      console.log("Item updated");
    })
  }


  renderCategory() {
    return this.state.categories.map(item => <Category dataid={item.id} key={item.id} item={item.categoryName} className="category-li" onClick={this.selectCategory} />)
  }

  render() {

    return (
      <div>

        {/* <CatList>{this.state.categories}</CatList> */}
        {/* {this.state.categories.map(item => item.categoryName)} */}
        {/* <div><br/>{this.state.categories.map(item => item.categoryName)} </div> */}
        <div>
          <ul>
            {this.renderCategory()}
          </ul>
        </div>

        <div className="add-category-form type1">
          <form className="input-wrapper">
            <input id="catInput" type="text" name="addCategory" placeholder="Create Category" />
          </form>
        </div>

        <button onClick={this.addCat} > <FontAwesomeIcon icon="plus-square" className="add-cat-btn" /> Add Category</button>

      </div>
    )

  }
}

export default AddCategory;

