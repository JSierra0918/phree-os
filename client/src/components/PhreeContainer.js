import React, { Component } from 'react';
import API from '../utils/PassportAPI';
// import { userInfo } from 'os';
import { NavTab, NavItem } from './Bootstrap/NavTab';
import Container from './Bootstrap/Container';
import Col from './Bootstrap/Col';
import Row from './Bootstrap/Row';
import FlexRow from './Bootstrap/FlexRow';
import StorePage from '../pages/StorePage';
import ManagePage from '../pages/ManagePage';
import '../pages/styles/storepage.css';


class PhreeContainer extends Component {

    state = {
        currentPage: "Store"
    }

    componentDidMount() {
        // API.sendLogin(this.state.loginForm);
    }

    changePage(page) {

        this.setState({
            currentPage: page
        })
    }

    render() {

        function displayForm(page) {
            if (page === "Store") {
                return <StorePage />
            }
            else if (page === "Manage") {
                return <ManagePage />
            }
        }

        function changeAfertCss() {
            document.querySelector(".p-tabbed-item-store").style.backgroundColor ="red";
        }

        return (
            <>
                <Container extraClass=" phree-container">
                    <div className="row main-phree">
                        <Col size="sm-12">
                            
                                <Row>
                                    <Col size="sm-12" >
                                        <NavTab extraClass="p-tabbed-ul p-tabbed-ul-store">
                                            <NavItem>
                                                <div
                                                    onClick={() => { this.changePage("Store") }}
                                                    className={this.state.currentPage === "Store" ? "p-tabbed-item p-tabbed-item-store p-active-tab" : "p-tabbed-item p-tabbed-item-store"} >Store</div>
                                            </NavItem>
                                            <NavItem>
                                                <div
                                                    onClick={() => { this.changePage("Manage") }}
                                                    className={this.state.currentPage === "Manage" ? "p-tabbed-item p-tabbed-item-manage p-active-tab" : "p-tabbed-item p-tabbed-item-manage"} >Manage</div>
                                            </NavItem>
                                        </NavTab>

                                    </Col>
                                </Row>

                                {displayForm(this.state.currentPage)}
                            
                        </Col>
                    </div>
                </Container>
            </>
        )
    }
}

export default PhreeContainer;