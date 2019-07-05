import React, { Component } from 'react';
import './styles/storepage.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NavTab, NavItem } from '../components/Bootstrap/NavTab';
import { Container, Row, Col } from '../components/Bootstrap/Grid';
import API from '../utils/API';
import CategoryContainer from '../components/CategoryContainer';

class StorePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calc: undefined,
            catID: undefined,
            category: []
                }
        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        //find the ID of the user and check to see if he has store.  If he has a store, load the items else make a store.
        this.getUserData();
    }

    getUserData() {
        const userId = 1;
        
        API.getUserData(userId).then((userResponse) => {
            console.log(userResponse.data.storename)
            if (!userResponse.data.storename) {
                // go to create store
            }
            else {
                API.getCategoryData(userId).then((categories) => {
                    // update the state with the categories, remember is an array
                    // it is going to render
                    this.setState({
                        category: categories.data
                    })
                })
            }
        })
    }


    selectCategory = (id) => {
        //set the state of the category based off of the name
        API.getOneCategory(id).then((category) => {
            //find items and return the array possibly pass it as an argument for displayItem.
            console.log(category);
        });
        return console.log(id);
    }

    updateCategory = () => {
        API.getCategoryData(1).then((categories) => {
            console.log(categories.data);
            let updated = Object.assign([], this.state.category);

            const categoryNames = categories.data.map(item => item.categoryName);
            
            updated.push(categoryNames);
            console.log(updated);
            // update the state with the categories, remember is an array
            // it is going to render
            this.setState({
                category: categories.data
            })
        })
    }


    displayItem = (cat) => {
        //when category is returned, then create a call based off 
        //returnedCategoryDBItem.map((items)=> <Items title={items.title} price={items.price} quantity{items.quantity}/>)
        //don't know how to do that.
        //when the state category is changed, then make an api call based off of the item passed in?
    }

    render() {
        
        return (
            <div>
                <Container class="h-100">
                    <div className="row">
                        <Col size="lg-12">
                            <h1>Phree-OS</h1>
                        </Col>
                    </div>
                    <div className="row">
                        <NavTab>
                            <NavItem>
                                <Link to="/store">Store</Link>
                                <Link to="/manage">Manage</Link>
                            </NavItem>
                        </NavTab>
                    </div>
                    <div className="row main-row">
                        <Col size="sm-6">
                            <div className="summary text-center mb20">Summary</div>
                        </Col>
                        <Col size="sm-3">
                            <CategoryContainer category={this.state.category} id={this.state.catID} onClick={this.selectCategory} />
                        </Col>
                        <Col size="sm-3">
                            <div className="items text-center p-main-col mb20">ITEMS</div>
                        </Col>
                    </div>
                </Container>
            </div>
        );
    }
}

export default StorePage;
