import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URLSearchParams(location.search).get('code');
      if (code) {
        try {
          const response = await fetch('http://localhost:8080/login/oauth2/code/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
          });
          
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.id);
            navigate('/home');
          } else {
            throw new Error('Failed to authenticate with Google');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchToken();
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirect;
