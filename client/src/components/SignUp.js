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
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            storename: this.state.storeName,
            email: this.state.email,
            password: this.state.password,
        }
       
        console.log(userForm);
        //send information to the user API
        Axios.post("/signup", userForm, (userInfo) => {
            
            console.log(userInfo);
            //possibly save user id in session so you can read it when you land on Store Page
            
        }).then((res) => {
            // console.log('in promise after /signup')
            // console.log(res.data)
            let data = sessionStorage.getItem('userId')
            
            if (data) {
            sessionStorage.clear()
            sessionStorage.setItem('userId', res.data.id)
            
            } else {
            sessionStorage.setItem('userId', res.data.id)

            }
            
            this.routeToStore();    

        });
    }

    render() {
        return (
            <>
                <Input name="firstName" placeholder="First Name (required)" className="form-control" value={this.state.firstName} onChange={this.handleInputChange} />
                <Input name="lastName" placeholder="Last Name (required)" className="form-control" value={this.state.lastName} onChange={this.handleInputChange} />
                <Input name="email" placeholder="Email (required)" value={this.state.email} onChange={this.handleInputChange} />
                <Input name="storeName" placeholder="Store Name (required)" value={this.state.storeName} onChange={this.handleInputChange} />
                <Input name="password" type="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <FormBtn name="submitBtn" onClick={this.submitSignUp} >Sign Up</FormBtn>
            </>
        );
    }

}

export default withRouter(SignUp);