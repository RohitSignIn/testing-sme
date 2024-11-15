import React from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// Define a basic type for the response object
interface GoogleResponse {
  credential: string; // This is usually the JWT token
}

const OAuthGoogle: React.FC = () => {
    // Define the success handler type (based on the Google login response)
    const responseMessage = (response: GoogleResponse) => {

        const token = response.credential;
        console.log(token, "here is the token")
        const decoded = jwtDecode(token);

        console.log(decoded, 'decoded');
    };

    // Define the error handler type (error can be of any type)
    const errorMessage = (error: any) => {
        console.log(error, "From Error");
    };

    return <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
};

export default OAuthGoogle;
