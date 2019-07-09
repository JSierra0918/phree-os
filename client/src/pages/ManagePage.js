import React from 'react';
import { Container, Row, Col } from '../components/Bootstrap/Grid';

const ManagePage = () => {
    return (
        <div>
       <Container extraClass="h-100">
                    <div className="row">
                        <Col size="lg-12">
                            <h1>Manage Page</h1>
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
                    <div className="row main-row">
                            <h1>Main Row</h1>
                    </div>
                </Container>      
                  </div>
    );
}

export default ManagePage;
