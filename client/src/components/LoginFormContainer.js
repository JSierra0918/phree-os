import React, { Component } from 'react';
import API from '../utils/PassportAPI';
// import { userInfo } from 'os';
import { Input, FormBtn } from './Bootstrap/Form';
import { Link } from "react-router-dom";
import { NavTab, NavItem } from './Bootstrap/NavTab';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Container from './Bootstrap/Container';
import Row from './Bootstrap/Row';
import Col from './Bootstrap/Col';
import Card from './Bootstrap/Card';

class LoginFormContainer extends Component {

   state = {
      loginName: "Are you there?",
      email: "",
      currentPage: undefined
   }
   //    this.state = {
   //       loginForm: {
   //          firstname: "James",
   //          lastname: "Jarvis, Jr.",
   //          storename: "Jimmy's Fish Shop 2",
   //          email: "qwerty@gmail.com",
   //          password: "abc123"
   //       }
   //    }
   // }

   // componentDidMount() {
   //    API.sendLogin(this.state.loginForm)
   //    .then(res => {
   //       console.log(res)
   //       })
   //    }

   


   componentDidMount() {
      // API.sendLogin(this.state.loginForm);
   }

   changePage(page) {

      this.setState({
         currentPage: page
      })
   }

   sendLoginInput(event) {
      event.preventDefault();
      console.log("SEND LOGIN!!");

      // API.sendLogin(loginInfo);
   }

   render() {

      function displayForm(page) {
         if (page === "signIn") {
            console.log("In Sign in!");
            return <SignIn />
         }
         else if (page === "signUp") {
            console.log("In Sign up");
            return <SignUp />
         }
      }

      return (

         <>
            <Container>
               <Row>
                  <Col size="md-8 md-7 g-5" className="mx-auto" >
                     <Card>
                        <form className="p-loginForm">
                           <NavTab className="nav nav-tabs">
                              <NavItem className="nav-item p-nav-item">

                                 <p onClick={() => { this.changePage("signIn") }} className="p-Link" > local- Login!</p>
                              </NavItem>
                              <NavItem className="nav-item">
                                 <p onClick={() => { this.changePage("signIn") }} className="p-Link" > local- Login!</p>

                              </NavItem>
                           </NavTab>
                           
                           {displayForm(this.state.currentPage)}
                     </form>
                     </Card>

                  </Col>
               </Row>
            </Container>
         </>
      )
   }
}

export default LoginFormContainer;