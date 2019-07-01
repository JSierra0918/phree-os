import React, { Component } from 'react';
import API from '../utils/PassportAPI';

class LoginFormContainer extends Component {

   constructor(){
      super();

      this.state = {
         loginForm: "Are you there?",
         confirmation: ""
      }
   }

   componentDidMount() {
      API.sendLogin(this.state.loginForm)
   }

   render() {
      
      return (
         //trying to get react to play nice with the response.
         // <h3>{API.sendLogin(this.state.loginForm)} </h3>
         <h3>Test</h3>
      )
   }
}

export default LoginFormContainer;