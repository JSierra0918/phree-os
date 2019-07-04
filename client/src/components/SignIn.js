import React, { Component } from 'react';
import { Input, FormBtn } from './Bootstrap/Form';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: ""
        }
    }

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    submitSignIn = (event) => {
        event.preventDefault();
        console.log(this.state.userName + this.state.password);
    }

    render() {
        return (
            <div>
                <Input name="userName" placeholder="First Name (required)" className="form-control" value={this.state.userName}  onChange={this.handleInputChange}/>
                <Input name="password" placeholder="Password (required)" className="form-control" value={this.state.password} onChange={this.handleInputChange}/>
                <FormBtn name="submitBtn" onClick={this.submitSignIn} >Sign In</FormBtn>
            </div>
        );
    }
}

export default SignIn;
