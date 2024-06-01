
import React from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    
  console.log(response);
    try {
      const result = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        const { accessToken, id, username, email } = data;
        console.log('JWT:', accessToken);
        console.log('User ID:', id);
        console.log('Username:', username);
        console.log('Email:', email);
        // Store JWT and user info as needed, e.g., in localStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId',  parseInt(id) );
        localStorage.setItem('username', username);
        
        console.log(localStorage);
        navigate('/home');
      } else {
        const errorData = await result.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed:', response);
  };

  return (

    <GoogleOAuthProvider clientId="169168993775-67kerntqaovvc61b802ke1380iaid29e.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onFailure={handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;