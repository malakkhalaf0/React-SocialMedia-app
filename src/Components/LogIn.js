import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import './LogIn.css'; // Import the CSS file

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
console.log(localStorage)
  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username); // Storing the username
        localStorage.setItem('userId', data.id); // Storing the user ID
        navigate('/home');
        console.log(data);
      } else {
        setError("Your Username or Password is wrong!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container" style={{ backgroundSize: 'cover', backgroundImage: 'url(http://localhost/t.png)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' , background: ' #f3f3f3'}}>
       <p className="header">Trek<strong style={{color:'#fbb03b'}}>Link</strong></p>
      <div className="login-paper">
        
        <h1 className="login-title">
          <strong>Sign In</strong> 
        </h1>
   
        <form className="login-form" onSubmit={login}>
          <div className="login-input-container">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="Username"
              error={error !== ""}
              helperText={error}
            />
          </div>
          
          <div className="login-input-container">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Password"
              error={error !== ""}
              helperText={error}
            />
            <div className="login-input-adornment" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff/>}
            </div>
          </div>

          {error && <div className="login-error-message">{error}</div>}

          <button className="login-button" type="submit">Sign In</button>
          <Typography className="login-footer">
            Don't Have an Account? <Link to="/signup" className="login-link">Sign Up</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
