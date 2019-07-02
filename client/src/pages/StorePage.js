import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NavTab, NavItem } from '../components/Bootstrap/NavTab';
import { Container, Row, Col } from '../components/Bootstrap/Grid';


class StorePage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (

            <div>
                <Container>
                    <Row>
                        <Col size="lg-12">
                            <h1>Phree-OS</h1>
                        </Col>
                    </Row>

                    <Row>
                        <NavTab>
                            <NavItem>
                                <Link to="/store">Store</Link>
                                <Link to="/manage">Manage</Link>
                            </NavItem>
                        </NavTab>
                    </Row>
                    <Row>
                        
                    </Row>

                </Container>

            </div>
        );
    }
}

export default StorePage;
