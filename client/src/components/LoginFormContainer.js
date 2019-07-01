import React, { Component } from 'react';
import API from '../utils/PassportAPI';
import { Input, FormBtn } from './Bootstrap/Form';
import { Link } from "react-router-dom";
import { NavTab, NavItem } from './Bootstrap/NavTab';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Container from './Bootstrap/Container';
import Row from './Bootstrap/Row';
import Col from './Bootstrap/Col';
import { unionTypeAnnotation } from '@babel/types';


class LoginFormContainer extends Component {

   state = {
      loginName: "Are you there?",
      email: "",
      currentPage: undefined
      
   }

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

   function displayForm (page){
      if (page === "signIn"){
         console.log("In Sign in!");
         return <SignIn />
      }
      else if (page === "signUp"){
         console.log("In Sign up");
         return <SignUp />
      }
   }

      return (

         <>
            <Container>
               <Row>
                  <Col size="md-8 md-7 g-5" className="mx-auto" >
                     <form className="p-loginForm">
                        {/* <NavTab className="nav nav-tabs">
                           <NavItem className="nav-item p-nav-item">
                              <Link to="/signin" className={window.location.pathname === "/signin" ? "nav-link active" : "nav-link"}>
                                 Sign In
                  </Link>
                           </NavItem>
                           <NavItem className="nav-item">
                              <Link
                                 to="/signup"
                                 className={window.location.pathname === "/signup" ? "nav-link active" : "nav-link"}
                              >
                                 Sign Up
                  </Link>
                           </NavItem>
                        </NavTab> */}

                           <p onClick={()=> {this.changePage("signIn")}} className="p-Link" > local- Login!</p>
                           <p onClick={()=> {this.changePage("signUp")}} className="p-Link"> local- Sign In!</p>

                           {displayForm(this.state.currentPage) }
                     

                     </form>
                  </Col>
               </Row>
            </Container>
         </>
      )
   }
}

export default LoginFormContainer;