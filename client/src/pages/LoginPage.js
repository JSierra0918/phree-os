import React, { Component } from 'react';
import LoginFormContainer from '../components/LoginFormContainer';
import './styles/login.css';
import BackgroundSlider from 'react-background-slider'
import image1 from '../assets/background1.jpg'
import image2 from '../assets/background2.jpg'
import image3 from '../assets/background3.jpg'
import image4 from '../assets/background4.jpg'
import image5 from '../assets/background5.jpg'
import image6 from '../assets/background6.jpg'


function LoginPage() {
    return (
        <>
          
         <BackgroundSlider images={[image1, image2, image3, image4, image5, image6]} duration={5} transition={2} />
          <LoginFormContainer/>     
        </>
    )
}
export default LoginPage;
