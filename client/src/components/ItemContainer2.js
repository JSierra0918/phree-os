import React, { Component } from 'react';
import Category from './Category';
import '../pages/styles/storepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Item2 from '../components/Item2'
import { Input } from './Bootstrap/Form';

class ItemContainer2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            isActive: false,
            itemname: "",
            price: 0,
            quantity: 0
        }
        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //takes in array and checks to see if it has any items
        // console.log(this.props.category);
        // return this.setState({ categoryList: this.props.category })
    }

    renderItems() {
        return this.props.items.map(item => <Item2
            role={this.props.role}
            dataid={item.id}
            key={item.id}
            item={item}
            itemname={item.itemname}
            quantity={item.quantity}
            price={item.price}
            className="category-li"
            addItem={this.props.addItem}
            delete={this.props.delete}
            edit={this.props.edit}
            reload={this.props.reload}
            catID={this.props.catID}
            grabItems={this.props.grabItems}
        />)
    }

    addClass = () => {
        this.setState(state => ({
            isActive: !state.isActive
        }));
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        console.log(name, value)

        this.setState({
            [name]: value
        });
    };

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
                    {this.renderItems()}
                </ul>
                {this.props.role === "1" ? (
                    <div>
                        <div className="add-item-form type1">
                            <form className="input-wrapper">
                                <Input id="itemInput" type="text" name="itemname" value={this.state.itemnameVal} onChange={this.handleInputChange} placeholder="Create an Item" />
                                <Input id="itemInput" type="text" name="price" value={this.state.itemnameVal} onChange={this.handleInputChange} placeholder="Create an Item" />
                                <Input id="itemInput" type="text" name="quantity" value={this.state.itemnameVal} onChange={this.handleInputChange} placeholder="Create an Item" />
                                
                            </form>
                        </div>

                        <button onClick={() => this.props.addNewItem(this.props.catID)} > <FontAwesomeIcon icon="plus-square" className="add-cat-btn" /> Add Category</button>
                    </div>
                ) : (<p></p>)}
            </div>
        );
    }
}

export default ItemContainer2;
