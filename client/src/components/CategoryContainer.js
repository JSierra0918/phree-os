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
        //takes in array and checks to see if it has any items
        console.log(this.props.category);
       return  this.setState({categoryList: this.props.category})
    }

    renderCategory(){

        return  this.props.category.map(item => <Category  dataId={item.id} key={item.id} item={item.categoryName} style={this.state.style}  onClick={this.props.onClick} />)
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
