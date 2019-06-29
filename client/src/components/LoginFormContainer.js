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
            email: "qwer@gmail.com",
            password: "abc123"
         }
         // confirmation: ""
      }
   }

   componentDidMount() {
      API.sendLogin(this.state.loginForm)
      .then(userInfo => console.log(userInfo))
   }

   render() {
      return (
         <>
            {/* //trying to get react to play nice with the response. */}
            <h3>Test</h3>
         </>
      )
   }
}

export default LoginFormContainer;