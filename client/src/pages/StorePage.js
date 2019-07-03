import React, { Component } from 'react';
import './styles/storepage.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NavTab, NavItem } from '../components/Bootstrap/NavTab';
import { Container,Row, Col } from '../components/Bootstrap/Grid';
import API from '../utils/API';
import CategoryContainer from '../components/CategoryContainer';


class StorePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calc: undefined,
            user: {
                category: ["produce", "taco", "chicken"]
            }
        }
    }

    componentDidMount() {
        //find the ID of the user and check to see if he has store.  If he has a store, load the items else make a store.

    }

    getUserData(){
        API.getUserData().then((userResponse) => {
            console.log(userResponse);
        })
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
                            <CategoryContainer category={this.state.user.category}/>
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
