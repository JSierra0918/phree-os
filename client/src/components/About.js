import React from 'react';

const textStyle = {
    fontSize: '20px',
    width: '100%',
    letterSpacing: '1px',
    lineHeight: '1.2',
    wordSpacing: '0.8px',
    fontWeight: 'lighter'
  };

function About (props) {
    return (
        <div>
            <h6 style={textStyle}>Phree-OS aims to provide an easy, inexpensive point of sales solution for little businesses that can't afford the big, expensive point of sales systems. 
            Phree-OS is easy to use and manage, giving you more time to concentrate on the things that matter, like running your business!  </h6>
        </div>
    )
}
    

export default About