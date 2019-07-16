import React, { Component } from "react";
import "./styles/setupcomplete.css";
import { Container, Row, Col } from "../components/Bootstrap/Grid";
import queryString from "query-string";
import API from "../utils/API";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class SetupComplete extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.location.search)
    const values = queryString.parse(this.props.location.search)
    let data = sessionStorage.getItem('userId')
    var code = {
        code : values.code,
        userId : data
    }
    API.postStripe(code)
    setTimeout(() => {this.routeToStore()}, 10000)
  }

  routeToStore = () => {
    let path = `/store`;
    this.props.history.push(path);
  };

  render() {
    return (
      <>
        <div className="setupContainer">
          <div className="row">
            <Col size="md-12">
              <p className="p-logo">
                <span className="phree-logo">Phree-</span>
                <span className="o-logo">O</span>
                <span className="s-logo">S</span>
              </p>
            </Col>
          </div>
          <h1>Thanks for setting up a stripe account!</h1>
        </div>
      </>
    );
  }
}

export default SetupComplete;
