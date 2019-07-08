import React, { Component } from 'react';
import API from '../utils/PassportAPI';
// import { userInfo } from 'os';
import { NavTab, NavItem } from './Bootstrap/NavTab';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Container from './Bootstrap/Container';
import Col from './Bootstrap/Col';
import Card from './Bootstrap/Card';
import FlexRow from './Bootstrap/FlexRow';

class LoginFormContainer extends Component {

   state = {
      loginName: "Are you there?",
      email: "",
      currentPage: "Sign In"
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
         if (page === "Sign In") {
            return <SignIn />
         }
         else if (page === "Sign Up") {
            return <SignUp />
         }
      }

      return (
         <>
            <Container className="h-100">
               <FlexRow className="row login-row">
                  <Col size="md-8 md-7 g-5" className="mx-auto" >
                     <Card className="card-signin my-5" heading={this.state.currentPage}>
                        <NavTab extraClass="p-tabbed-ul">
                           <NavItem>
                              <div 
                              onClick={() => { this.changePage("Sign In") }}
                              className={this.state.currentPage === "Sign In"?"p-tabbed-item p-active-tab": "p-tabbed-item"} >Login</div>
                           </NavItem>
                           <NavItem>
                              <div 
                              onClick={() => { this.changePage("Sign Up") }} 
                              className={this.state.currentPage === "Sign Up"?"p-tabbed-item p-active-tab": "p-tabbed-item"} >Sign Up</div>
                           </NavItem>
                        </NavTab>
                        <form className="p-loginForm form-signin">
                           {displayForm(this.state.currentPage)}
                        </form>
                     </Card>
                  </Col>
               </FlexRow>
            </Container>
         </>
      )
   }
}

export default LoginFormContainer;