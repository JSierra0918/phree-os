import React from 'react';
import { Input, FormBtn } from './Bootstrap/Form';

function SignUp() {
    return (
        <>
            <Input name="store" placeholder="store Name (required)" />
            <Input name="userName" placeholder="First Name (required)" />
            <Input name="password" placeholder="Password (required)" />
            <FormBtn name="submitBtn" >Sign Up</FormBtn>
        </>
    );
}

export default SignUp;