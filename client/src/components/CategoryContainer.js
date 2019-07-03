import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Category from './Category';

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

    componentDidMount(){
        //don't know if I should make an axaj call here 
        console.log(this.props.category.length);
        //takes in array and checks to see if it has any items
       return this.props.category.length === 0 ? this.setState({categoryList: "Please add a category to your store!"}) : this.setState({categoryList: this.props.category})
    }

    renderCategory(){
        return  this.state.categoryList.map(itemName=> <Category  dataId={itemName} key={itemName} item={itemName} style={this.state.style}  onClick={this.props.onClick} />)
    }

    addClass = () =>{

        this.setState(state => ({
            isActive: !state.isActive
          }));
    }

    render() {
        return (
           <div className="category text-center p-main-col mb20">
                    <h5>Category</h5>
                    {/* //render a category button */}
                    {this.renderCategory()}
                    
            </div>
        );
    }
}

export default CategoryContainer;
