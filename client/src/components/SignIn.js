import React, { Component } from 'react';
import { Input, FormBtn } from './Bootstrap/Form';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
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
            email: this.state.email,
            password: this.state.password
        }

        //send information to the user API
        Axios.post("/signin", userForm, (userInfo) => {
            //possibly save user id in session so you can read it when you land on Store Page

        }).then((res) => {
            console.log('in promise after /signin')
            console.log(res.data)
            let data = sessionStorage.getItem('userId')
            
            if (data) {
            sessionStorage.clear()
            sessionStorage.setItem('userId', res.data.id)

            } else {
            sessionStorage.setItem('userId', res.data.id)
            }
            this.routeToStore();    

        });

        // this.routeToStore();    
        this.setState({
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <div>
                <Input name="email" placeholder="Email (required)" className="form-control" value={this.state.email} onChange={this.handleInputChange} />
                <Input name="password" type="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                <FormBtn name="submitBtn" className="signIn" onClick={this.submitSignIn} >Sign In</FormBtn>
            </div>
        );
    }
}

export default withRouter(SignIn);
