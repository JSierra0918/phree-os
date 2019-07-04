import React, { Component } from 'react';
import { Input, FormBtn } from './Bootstrap/Form';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
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

    submitSignIn = (event) => {
        event.preventDefault();
        const userForm = {
            userName: this.state.userName,
            password: this.state.password
        }

        //send information to the user API
        // Axios.post("/api/users", userForm, (userInfo) => {
        //     //possibly save user id in session so you can read it when you land on Store Page

        // }).then(() => {
        //     //======REROUTE USER
        // this.routeToStore();    

        // });

        // this.routeToStore();    
        this.setState({
            userName: "",
            password: ""
        })
    }

    render() {
        return (
            <div>
                <Input name="userName" placeholder="First Name (required)" className="form-control" value={this.state.userName} onChange={this.handleInputChange} />
                <Input name="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <FormBtn name="submitBtn" onClick={this.submitSignIn} >Sign In</FormBtn>
            </div>
        );
    }
}

export default withRouter(SignIn);
