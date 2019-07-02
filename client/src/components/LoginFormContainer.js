import React, { Component } from 'react';
import API from '../utils/PassportAPI';
// import { userInfo } from 'os';

class LoginFormContainer extends Component {

   constructor(){
      super();

      this.state = {
         loginForm: {
            firstname: "James",
            lastname: "Jarvis, Jr.",
            storename: "Jimmy's Fish Shop 2",
            email: "qwerty@gmail.com",
            password: "abc123"
         }
      }
   }

   componentDidMount() {
      API.sendLogin(this.state.loginForm)
      .then(res => {
         console.log(res)
         })
      }

   


   render() {
         return (
            <>
            <h3>Test</h3>
         </>
      )
   }
}

export default LoginFormContainer;