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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ManagePage extends Component {

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

    componentDidUpdate() {
        //once the item table has been updated, then update the site with the new info.
        //most likely do another this.getUserData()
    }

    getUserData() {
        const userId = sessionStorage.getItem('userId');
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
    }

    grabItems = (catID) => {
        //when category is returned, then create a call based off 
        API.getItems(catID).then((returnedItems) => {
            console.log("----items")
            console.log(returnedItems)

            this.setState({
                items: returnedItems.data
            })
        })
    }

    addItem = (selectedItem) => {
        const statePaymentList = this.state.paymentList;

        //Find index of specific object using findIndex method.    
        let objIndex = statePaymentList.findIndex((obj => obj.id === selectedItem.id));
        if (objIndex > -1) {
            //Log object to Console.
            console.log("Before update price: ", statePaymentList[objIndex].price);
            console.log("Before update quantity: ", statePaymentList[objIndex].counter);
            // make new object of updated object.   
            let updatedItem = { ...statePaymentList[objIndex], price: this.state.paymentList[objIndex].price + selectedItem.price, counter: statePaymentList[objIndex].counter + 1 };
            // //Add a count to the array
            updatedItem = { ...updatedItem, count: statePaymentList.count + 1 }

            let updatedItems = [
                ...statePaymentList.slice(0, objIndex),
                updatedItem,
                ...statePaymentList.slice(objIndex + 1),
            ];

            //Update object's name property.
            this.setState((state) => {
                return { paymentList: state.paymentList = updatedItems }
            })

            //Log object to console again.
            console.log("After update: ", this.state.paymentList[objIndex]);
            // reset objIndex
            objIndex = -1;
        } else {
            // //UPDATE STATE HERE 
            let addedItem = this.state.paymentList.concat(selectedItem);

            this.setState({
                paymentList: addedItem,
            })
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
        console.log("delete: ", id)

        // create a variable based off of statePaymentList, possibly not to grab the exact state
        const statePaymentList = this.state.paymentList;
        //create obj based off of what the state paymentList is

        let updatedItem = statePaymentList.filter((item) => {
            return item.id !== id
        });

        //Update object's name property.
        this.setState((state) => {
            return { paymentList: state.paymentList = updatedItem }
        })
    }

    clearSummary = (summaryArr) => {
        console.log('summaryArr:', summaryArr);
        //get an empty parameter that clears paymentList
        this.setState((state, props) => {
            return { paymentList: state.paymentList = summaryArr }
        })
    }

    render() {

        return (
            <div className="col-md-12 main-row">

                <div className="row">
                    <Col size="md-12">
                        <h1>Phree-OS</h1>
                    </Col>
                </div>
                {/* THIS IS WHERE THE NAV GOES */}
                {/* <div className="row">
                        <NavTab>
                            <NavItem>
                               <div className="nav-link-container">
                        <Link to="/store" className="store-link">Store</Link>
                        <Link to="/manage" className="manage-link">Manage</Link>
                    </div>

                                <h1>Hello Stripe</h1>
                                <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FN84Sv7TjpDUCWLlVrZk9kLd4K9fVfW7&scope=read_write">Connect With Stripe</a>

                            </NavItem>
                        </NavTab>
                    </div> */}
                <div className="row mid-section" >
                    <Col size="md-6">
                        <PaymentSummary
                            paymentList={this.state.paymentList}
                            count={this.state.count}
                            deleteRow={this.deleteRow}
                            clearSummary={this.clearSummary} />
                    </Col>
                    <Col size="md-3">
                        <CategoryContainer
                            category={this.state.category}
                            id={this.state.catID}
                            onClick={this.selectCategory}
                            role={"1"}
                        />
                        
                           
                          
                    </Col>
                    <Col size="md-3">
                        <ItemsContainer items={this.state.items} addItem={this.addItem} />
                    </Col>
                </div>
                {/* <div className="row last-section">
                    <button className="btn btn-danger" onClick={()=> this.clearSummary([])}> Final Button</button>
                </div> */}
            </div>
        );
    }
}

export default ManagePage;
