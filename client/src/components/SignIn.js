import React from 'react';
import { Input, FormBtn } from './Bootstrap/Form';


function SignIn() {
    return (
        <>
            <Input name="userName" placeholder="First Name (required)" />
            <Input name="password" placeholder="Password (required)" />
            <FormBtn name="submitBtn" >Sign In</FormBtn>
        </>
    );
}

export default SignIn;