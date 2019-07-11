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
import ManagePage from './ManagePage';
import ModalPayment from '../components/ModalPayment';

class StorePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calc: undefined,
            catID: undefined,
            category: [],
            items: [],
            paymentList: [],
            count: 0,
            total: 0,
            payment: false
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

    openModalHandler = (paid) => {
        this.setState({
            payment: true
        });
    }

    closeModalHandler = (paid) => {
        this.setState({
            payment: false
        });
    }
    makePayment = (paid) => {
        
        this.setState({
            payment: paid,
        })
        if(this.state.payment) {

            this.openModalHandler()
            // return  <ModalPayment/> 
        }
        console.log('paid', paid)

    }

    getUserData = () => {
        const userId = sessionStorage.getItem('userId');

        API.getUserData(userId).then((userResponse) => {
            if (!userResponse.data.storename) {
                    // go to create store

            }
            else {
                API.getCategoryData(userId).then((categories) => {
                    // update the state with the categories, remember is an array
                    // it is going to render
                    console.log(categories)
                    this.setState(state => {
                        return {category: state.category = categories.data}

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

            this.setState({
                items: returnedItems.data
            })
        })
    }
    totalPrice = () => {
        let total = this.state.paymentList.reduce((a, b) => {
        // console.log('a price', a.price) 
        // console.log('b price', b.price)  
        return {price: parseFloat(a.price) + parseFloat(b.price)}

        }, {price: 0}).price
        
        console.log('total', parseFloat(total).toFixed(2))

        this.setState({
            total: parseFloat(total).toFixed(2)
        })
    }

    addItem = (selectedItem) => {
        const statePaymentList = this.state.paymentList;

        //Find index of specific object using findIndex method.    
        let objIndex = statePaymentList.findIndex((obj => obj.id === selectedItem.id));
        if (objIndex > -1) {
            //Log object to Console.
            // console.log("Before update price: ", statePaymentList[objIndex].price);
            // console.log("Before update quantity: ", statePaymentList[objIndex].counter);
            // make new object of updated object.   
            
            let updatedItem = { ...statePaymentList[objIndex], price: (parseFloat(this.state.paymentList[objIndex].price) + parseFloat(selectedItem.price)).toFixed(2), counter: statePaymentList[objIndex].counter + 1 };
            // console.log('this.state.paymentList[objIndex].price:', this.state.paymentList[objIndex].price)
            
            // //Add a count to the array
            updatedItem = { ...updatedItem, count: statePaymentList.count + 1 }
            // console.log('-----updatedItem-----')
            // console.log(updatedItem)

            let updatedItems = [
                ...statePaymentList.slice(0, objIndex),
                updatedItem,
                ...statePaymentList.slice(objIndex + 1),
            ];

            //Update object's name property.
            this.setState((state) => {
                return { paymentList: state.paymentList = updatedItems }
            }, () => {
                this.totalPrice()
            })

            //Log object to console again.
            // console.log("After update: ", this.state.paymentList[objIndex]);
            // reset objIndex
            objIndex = -1;
        } else {
            // //UPDATE STATE HERE 
            // let addedItem = this.state.paymentList.concat(selectedItem);
            const newList = [...this.state.paymentList];
                  newList.push(selectedItem)

            this.setState({
                paymentList: newList
            }, () => {
                this.totalPrice()
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
        // console.log('summaryArr:', summaryArr);
        //get an empty parameter that clears paymentList
        this.setState((state, props) => {
            return { paymentList: state.paymentList = summaryArr, total:0 }
        })
    }

    deleteCategory = (id) => {

        console.log("delete: ", id);

        // create a variable based off of statePaymentList, possibly not to grab the exact state
        const stateCategory = this.state.category;
        //create obj based off of what the state paymentList is

        let updatedItem = stateCategory.filter((item) => {
            return item.id !== id
        });

        // //Update the category DB
        // API.deleteCategory(id, updatedItem).then((response) => {

        //     this.setState((state) => {
        //         return { category: state.category = response.data }
        //     })
        // })

        //Update object's name property.
        this.setState((state) => {
            return { category: state.category = updatedItem }
        })

    }

    render() {

        return (
            <div className="col-md-12 main-row">

                <div className="row">
                    <Col size="md-12">
                        <p className="p-logo"><span className="phree-logo">Phree-</span><span className="o-logo">O</span><span className="s-logo">S</span></p>
                    </Col>
                </div>
                <div className="row mid-section" >
                    <Col size="md-6">
                        <PaymentSummary
                            paymentList={this.state.paymentList}
                            count={this.state.count}
                            deleteRow={this.deleteRow}
                            clearSummary={this.clearSummary}
                            total={this.state.total} 
                            makePayment={this.makePayment}
                            reload={this.getUserData}
                            />
                            
                    </Col>
                    <Col size="md-3">
                        <CategoryContainer
                            category={this.state.category}
                            id={this.state.catID}
                            onClick={this.selectCategory}
                            role={this.props.role}
                            delete={this.deleteCategory}
                            edit={this.editCategory}
                            editable={this.state.editable}
                            reload={this.getUserData}
                        />
                    </Col>
                    <Col size="md-3">
                        <ItemsContainer 
                        items={this.state.items} 
                        addItem={this.addItem} 
                        reload={this.getUserData}
                        
                        />
                    </Col>

                    <ModalPayment
                    className="modal"
                    show={this.state.payment}
                    close={this.closeModalHandler}
                    open = {this.openModalHandler}
                    />
                    
                </div>
            </div>
        );
    }
}

export default StorePage;
