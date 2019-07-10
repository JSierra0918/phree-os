import React, { Component } from 'react';
import queryString from 'query-string';
import API from '../utils/API';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


class SetupComplete extends Component {

    state = {}

 
    componentDidMount() {
            // console.log(this.props.location.search)    
            const values = queryString.parse(this.props.location.search)
            let data = sessionStorage.getItem('userId')
            var code = {
                code : values.code,
                userId : data
            }
            
            API.postStripe(code)
            this.routeToStore()

        }
 
        routeToStore = () => {
            let path = `store`;
            this.props.history.push(path);
        }
   
    render() {
 
       return (
          <>
             <h1>Thanks for setting up a stripe account!</h1>
          </>
       )
    }
 }
 
 export default SetupComplete;