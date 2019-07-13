import React, { Component } from "react";
import "../pages/styles/storepage.css";
import Category from "./Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//dynamic css
const hoverStyle = {
  backgroundColor : "#EEB500",
  color: "white"
}
class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryList: [],
      isActive: false,
      currentStyle : {},
    };
    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //takes in array and checks to see if it has any items
    console.log(this.props.category);
    return this.setState({ categoryList: this.props.category });
  }

  setColor (index) {

    const newCategories = this.props.category.map((category, categoryIndex)=>{
      if (categoryIndex === index) {
        return {...category, currentStyle:hoverStyle}
      }
      return {...category, currentStyle:{}}
    })
    this.props.setCategories(newCategories)

  }

  renderCategory() {
    return this.props.category.map((item, index) => (
      <Category
        role={this.props.role}
        dataid={item.id}
        key={item.id}
        item={item.categoryName}
        className="category-li"
        style={item.currentStyle}
        onClick={(e) => {this.props.onClick(e); this.setColor(index);}}
        delete={this.props.delete}
        edit={this.props.edit}
        reload={this.props.reload}
      />
    ));
  }

  addClass = () => {
    this.setState(state => ({
      isActive: !state.isActive
    }));
  };

  render() {
    return (
      <div className="category text-center p-main-col mb20">
        <h5>Category</h5>
        <hr />
        <ul>{this.renderCategory()}</ul>
        {this.props.role === "1" ? (
          <div>
            <div className="add-category-form type1">
              <form className="input-wrapper">
                <input
                  id="catInput"
                  type="text"
                  name="addCategory"
                  placeholder="Create Category"
                />
              </form>
            </div>

            <button onClick={(e)=>this.props.addCategory(e)}>
              {" "}
              <FontAwesomeIcon icon="plus-square" className="add-cat-btn" /> Add Category
            </button>
          </div>
        ) : (
          <p />
        )}

        {/* //render a category button */}
        {/* {this.renderCategory()}       */}
      </div>
    );
  }
}

export default CategoryContainer;
