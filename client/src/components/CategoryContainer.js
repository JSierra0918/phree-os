import React, { Component } from 'react';
import '../pages/styles/storepage.css';
import Category from './Category';

class CategoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryList: []
        }
    }

    componentDidMount(){
        //don't know if I should make an axaj call here 
        console.log(this.props.category);
        //takes in array and checks to see if it has any items
       return this.props.category.length === 0 ? this.setState({categoryList: "Please add a category to your store!"}) : this.setState({categoryList: this.props.category})
    }

    renderCategory(){
        return  this.state.categoryList.map(itemName=> <Category item={itemName}/>)
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
