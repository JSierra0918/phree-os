import React from 'react';
import { Container, Row, Col } from '../components/Bootstrap/Grid';
import Card from '../components/Bootstrap/Card';
import AddCategory from './AddCategory';
import './styles/manage.css';


const ManagePage = () => {
    return (
        <div>
            <Container extraClass="h-100">
                <div className="row">
                    <Col size="lg-12">
                        <h1>Manage Page</h1>
                    </Col>
                </div>
                <div className="row">
                    <Col size="sm-4">
                        <h4>Results</h4>
                    </Col>
                    <Col size="sm-4">
                        <Card heading="Add Category">
                            <AddCategory/>
                        </Card>

                    </Col>
                    <Col size="sm-4">
                        <h4>Add Items</h4>
                    </Col>
                </div>

            </Container>
        </div>
    );
}

export default ManagePage;
