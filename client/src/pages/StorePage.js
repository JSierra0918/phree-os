import React, { Component } from 'react';
import './styles/storepage.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NavTab, NavItem } from '../components/Bootstrap/NavTab';
import { Container, Row, Col } from '../components/Bootstrap/Grid';
import API from '../utils/API';
import CategoryContainer from '../components/CategoryContainer';
import ItemsContainer from '../components/ItemsContainer';
import Items from '../components/Items';
import PaymentSummary from '../components/PaymentSummary';

class StorePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calc: undefined,
            catID: undefined,
            category: [],
            items: [],
            paymentList: [],
            count: 0
        }
        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        //find the ID of the user and check to see if he has store.  If he has a store, load the items else make a store.
        this.getUserData();
    }

    getUserData() {
        let userId = sessionStorage.getItem('userId')
        console.log('userId:', userId)

        API.getUserData(userId).then((userResponse) => {
            console.log(userResponse.data.storename)
            if (!userResponse.data.storename) {
                // go to create store

            }
            else {
                API.getCategoryData(userId).then((categories) => {
                    // update the state with the categories, remember is an array
                    // it is going to render
                    // console.log(categories)
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
            this.grabItems(category.data.id);
        });
        return console.log(id);
    }

    grabItems = (catID) => {
        //when category is returned, then create a call based off 
        API.getItems(catID).then((returnedItems) => {
            this.setState({
                items: returnedItems.data
            })
        })
    }

    addItem = (selectedItem) => {
        console.log(selectedItem["id"]);

        let countIncrement = this.state.count;
        countIncrement++;

        const obj = this.state.paymentList;
        console.log(obj);

        for (const key in obj) {

            if (obj["id"] === selectedItem.id) {
                console.log(obj["id"])
            }

        }

        // this.findKey("id");
        // if (this.state.paymentList.includes(selectedItem.id)){
        //     console.log(selectedItem.id +" is already in there!");
        // }else {
        //     let addedItem = this.state.paymentList.concat(selectedItem);
        //     this.setState({
        //         paymentList: addedItem,
        //         count: countIncrement
        //     })
        // }
        let addedItem = this.state.paymentList.concat(selectedItem);
        this.setState({
            paymentList: addedItem,
            count: countIncrement
        })
    }

    findKey = (str) => {

        var obj = this.state.paymentList[0]

        for (var i = 0; i < str.length; i++) {
            if (obj[str[i]]) {
                // obj[str[i]]++;
                console.log("increase one")
                console.log(obj[str[i]])
            } else {
                // obj[str[i]] = 1;

                console.log("make one")
                console.log(obj[str[i]])
            }
        }
    }

    incrementItem = () => {
        let count = this.state.count;
        count++;
        this.setState({
            count: count
        })
    }

    deleteRow = (id) => {
        const index = this.state.paymentList.findIndex(paymentItem => {
            return paymentItem.id === id;
        })

        console.log(index);
    }

    render() {

        return (
            <div>
                <Container extraClass="h-100">
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
                            <PaymentSummary
                                paymentList={this.state.paymentList}
                                count={this.state.count}
                                deleteRow={this.deleteRow} />
                        </Col>
                        <Col size="sm-3">
                            <CategoryContainer
                                category={this.state.category}
                                id={this.state.catID}
                                onClick={this.selectCategory}
                            />
                        </Col>
                        <Col size="sm-3">
                            <ItemsContainer items={this.state.items} addItem={this.addItem} />
                        </Col>
                    </div>
                </Container>
            </div>
        );
    }
}

export default StorePage;
