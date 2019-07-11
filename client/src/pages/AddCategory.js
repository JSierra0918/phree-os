import React, { Component } from "react";
import API from "../utils/API";
import "./styles/addcategory.css";
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
    })

    //empty value
    inp.value = '';
  }

  renderTableData() {
    return this.state.categories.map((val) => {
      let { categoryName } = val


      return (
        <li>
          <td>{categoryName}</td>
        </li>
      )
    });
  }

  render() {

    return (
      <div>
   
        {/* <CatList>{this.state.categories}</CatList> */}
        {/* {this.state.categories.map(item => item.categoryName)} */}
        {/* <div><br/>{this.state.categories.map(item => item.categoryName)} </div> */}
        <div>
          <ul>
            {this.renderTableData()}
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

