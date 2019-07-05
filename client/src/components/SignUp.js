import React, { Component } from 'react';
import { Input, FormBtn } from './Bootstrap/Form';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            storeName: "",
            email:"",
            password: ""
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    routeToStore = () => {
        let path = `store`;
        this.props.history.push(path);
    }

    submitSignUp = (event) => {
        event.preventDefault();
        const userForm = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            storeName: this.state.storeName,
            email: this.state.email,
            password: this.state.password,
        }
       
        
        //send information to the user API
        // Axios.post("/api/users", userForm, (userInfo) => {
        //     //possibly save user id in session so you can read it when you land on Store Page

        // }).then(() => {
        //     //======REROUTE USER
        // this.routeToStore();    

        // });
    }

    render() {
        return (
            <>
                <Input name="firstName" placeholder="First Name (required)" className="form-control" value={this.state.firstName} onChange={this.handleInputChange} />
                <Input name="lastName" placeholder="Last Name (required)" className="form-control" value={this.state.lastName} onChange={this.handleInputChange} />
                <Input name="email" placeholder="Email (required)" value={this.state.email} onChange={this.handleInputChange} />
                <Input name="storeName" placeholder="Store Name (required)" value={this.state.storeName} onChange={this.handleInputChange} />
                <Input name="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <FormBtn name="submitBtn" onClick={this.submitSignUp} >Sign Up</FormBtn>
            </>
        );
    }

}

export default withRouter(SignUp);