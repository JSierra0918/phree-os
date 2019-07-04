import React, { Component } from 'react';
import { Input, FormBtn } from './Bootstrap/Form';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

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

    routeToStore = () => {
        let path = `store`;
        this.props.history.push(path);
    }

    submitSignUp = (event) => {
        event.preventDefault();
        console.log(event)
        const userForm = {
            userName: this.state.userName,
            password: this.state.password,
            storeName: this.state.storeName
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
                <Input name="storeName" placeholder="store Name (required)" value={this.state.storeName} onChange={this.handleInputChange} />
                <Input name="userName" placeholder="First Name (required)" className="form-control" value={this.state.userName} onChange={this.handleInputChange} />
                <Input name="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <FormBtn name="submitBtn" onClick={this.submitSignUp} >Sign Up</FormBtn>
            </>
        );
    }

}

export default withRouter(SignUp);