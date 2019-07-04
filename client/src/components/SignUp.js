import React, { Component } from 'react';
import { Input, FormBtn } from './Bootstrap/Form';
import Axios from 'axios';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            storeName: "",
            firstName: "",
            lastName: "",
            name: ""
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    submitSignUp = (event) => {
        event.preventDefault();
        //send information to the user API
        Axios.post("/api/users")
        //when you get the response, redirect the user to the store page
        console.log(this.state.userName + this.state.password + this.state.storeName);
    }

    render() {
        return (
            <>
                <Input name="storeName" placeholder="store Name (required)" value={this.state.storeName} onChange={this.handleInputChange} />
                <Input name="userName" placeholder="First Name (required)" className="form-control" value={this.state.userName} onChange={this.handleInputChange} />
                <Input name="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <FormBtn name="submitBtn" onClick={this.submitSignUp} >Sign Up</FormBtn>
            </>
        );
    }

}

export default SignUp;