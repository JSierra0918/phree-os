import React from 'react';
import { Input, FormBtn } from './Bootstrap/Form';


function SignIn(props) {
    return (
        <>
                <Input name="userName" placeholder="First Name (required)" className="form-control" />
                <Input name="password" placeholder="Password (required)" className="form-control" />
            <FormBtn name="submitBtn" >Sign In</FormBtn>

        </>
    );
}

export default SignIn;