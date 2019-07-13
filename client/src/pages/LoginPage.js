import React, { Component } from 'react';
import NavTabs from '../components/Bootstrap/NavTabs';
import LoginFormContainer from '../components/LoginFormContainer';
import "./styles/login.css";

import { Container, Row, Col } from "../components/Bootstrap/Grid";

import './styles/login.css';

function LoginPage() {
    return (
        <>
            {/* <div className="loginContainer">
            <Col size="md-12">
              <p className="p-logo">
                <span className="phree-logo">Phree-</span>
                <span className="o-logo">O</span>
                <span className="s-logo">S</span>
              </p>
            </Col>
          </div> */}
            <LoginFormContainer/>     
        </>
    )
}
export default LoginPage;
