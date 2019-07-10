import React, { Component } from "react";
import API from "../utils/API";
import "./styles/addcategory.css";

export class AddCategory extends React.Component {

  constructor() {
    super();
    this.addCat = this.addCat.bind(this);
    this.state = { categories: ["jorge"] }

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
    var inp = document.getElementById("todoInput");
    var val = inp.value;

    // console.log(this);
    // this.addCat(val);

    let cat = {
      UserId: userId,
      categoryName: val
    }
    API.postCategory(userId, cat).then((response) => {
      console.log(response.data);
    })

    inp.value = '';
  }
  renderTableData() {
    return this.state.categories.map((val) => {
      let { categoryName } = val
      return (
        <table id="categoriesT">
          <tbody>
            <tr>
              <td>{categoryName}</td>
            </tr>
          </tbody>
        </table>
      )
    });
  }




  render() {

    return (
      <div>
        <div className="todo type1">
          <form className="input-wrapper">
            <input id="todoInput" type="text" className="add-todo" name="add-todo" placeholder="Category name" />
          </form>
        </div>
        <button onClick={this.addCat} >Add Category</button>
        {/* <div><br/>{this.state.categories.map(item => item.categoryName)} </div> */}
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  {this.renderTableData()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )

  }
}

export default AddCategory;

