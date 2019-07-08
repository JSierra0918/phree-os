import React from 'react';

class StripeInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {

        return (
            <>
                
            <h1>Hello Stripe</h1>
            <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FN84Sv7TjpDUCWLlVrZk9kLd4K9fVfW7&scope=read_write">Connect With Stripe</a>
        
            </>
        )
    }
}
export default StripeInfoPage