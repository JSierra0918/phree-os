import React, { Component } from "react";
import API from "../utils/API";
import Category from "../components/Category";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class AddCategory extends React.Component {

  constructor() {
    super();
    this.addCat = this.addCat.bind(this);
    this.state = { categories: [] }

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

    // API.getCategoryData(userId).then((response)=>{
    //   this.setState({
    //     categories: response.data
    //   })
    // })
  }

  addCat(e) {
    const userId = sessionStorage.getItem("userId");
    e.preventDefault();
    //grab value
    var inp = document.getElementById("catInput");
    var val = inp.value;

    let cat = {
      UserId: userId,
      categoryName: val
    }
    API.postCategory(userId, cat).then((response) => {
      console.log(response.data);
    })

    //empty value
    inp.value = '';

  }

  render() {
    return (
      <div>
        <div className="add-category type1">
          <form className="input-wrapper">
            <input id="catInput" type="text" name="addCategory" placeholder="Create Category" />
          </form>
        </div>
        {/* <CatList>{this.state.categories}</CatList> */}
        {this.state.categories.map(item => item.categoryName)}
        <button onClick={this.addCat} > <FontAwesomeIcon icon="plus-square" className="add-cat-btn"/> Add Category</button>
      </div>
    )
  }
}

export default AddCategory;

