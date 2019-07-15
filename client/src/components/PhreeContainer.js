import React, { Component } from 'react';
import API from '../utils/PassportAPI';
// import { userInfo } from 'os';
import { NavTab, NavItem } from './Bootstrap/NavTab';
import Container from './Bootstrap/Container';
import Col from './Bootstrap/Col';
import Row from './Bootstrap/Row';
import StorePage from '../pages/StorePage';
import ManagePage from '../pages/ManagePage';
import '../pages/styles/storepage.css';


class PhreeContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentPage: "Store",
            items: []
        
        }
    }

    componentDidMount() {
        // API.sendLogin(this.state.loginForm);
        console.log(this.state.items)

    }

    changePage = (page)=> {

        console.log("Change PAge")
        this.setState({
            currentPage: page,
            items: []
            
        })
        console.log('items:',this.state.items)
    }

    render() {

       let  displayForm = (page) => {

            if (page === "Store") {
                return <StorePage  items={this.state.items}/>
            }
            else if (page === "Manage") {
                return <StorePage role={"1"} items={this.state.items}/>
                // return <ManagePage />
            }
        }

        function changeAfertCss() {
            document.querySelector(".p-tabbed-item-store").style.backgroundColor = "red";
        }

        return (
            <>
                <Container extraClass=" phree-container">
                    <div className="row main-phree">
                        <Col size="md-12">
                            <Row>
                                <Col size="md-12" > 
                                    <NavTab extraClass="p-tabbed-ul p-tabbed-ul-store">
                                        <div className="tab-container">
                                            <div
                                                onClick={() => { this.changePage("Store") }}
                                                className={this.state.currentPage === "Store" ? "p-tabbed-item p-tabbed-item-store p-active-tab" : "p-tabbed-item p-tabbed-item-store"} 
                                                >Store</div>
                                            <div className={this.state.currentPage === "Manage" ? " angle tab-active" : "angle"}></div>

                                        </div>
                                        <div className="tab-container">
                                            <div
                                                onClick={() => { this.changePage("Manage") }}
                                                className={this.state.currentPage === "Manage" ? "p-tabbed-item p-tabbed-item-manage p-active-tab" : "p-tabbed-item p-tabbed-item-manage"} >Manage</div>

                                            <div className={this.state.currentPage === "Store" ? " angle tab-active" : "angle"}></div>

                                        </div>
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