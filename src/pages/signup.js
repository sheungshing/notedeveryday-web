import React, {useEffect, useState} from "react";
import {useMutation, useApolloClient, gql} from '@apollo/client';

import UserForm from "../components/UserForm";


const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props =>{

    useEffect(()=>{
        // update the document title
        document.title = 'Sign up — Notedly';
    });

    const client = useApolloClient();
    // add the mutation hook
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER,{
        onCompleted: data =>{
            // store the JWT in localStorage
            localStorage.setItem('token', data.signUp);
            // ypdate the local cache
            client.writeData({data: {isLoggedIn: true} });
            // redirect the user to the homepage
            props.history.push('/');
        }
    });

    
    
    //   render our form
    return (
       <React.Fragment>
           <UserForm action={signUp} formType="signup"/>
           {loading && <p>Loading</p>}
           {error && <p>Error creating an account</p>}
       </React.Fragment>
    );
};
export default SignUp;

