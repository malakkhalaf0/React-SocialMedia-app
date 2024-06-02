import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google icon
import './LogIn.css'; // Import the CSS file
import l from '../assets/l.png';
import GoogleLoginComponent from "./GoogleLoginComponent";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State to control dialog
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickOpen = () => setOpen(true); // Function to open dialog
  const handleClose = () => setOpen(false); // Function to close dialog

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
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.id);
   
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
    <div className="login-container">
      <div className="login-left">
        <img src={l} alt="Login Illustration" className="login-image" />
      </div>
      <div className="login-right" style={{ flexDirection: 'column' }}>
        <h1 style={{ color: '#fbb03b', fontFamily: 'Poppins, sans-serif', fontSize: '40px' }}>Trek Link</h1>
        <div className="login-form-container">
          <h1 className="login-title" style={{ fontFamily: 'Poppins, sans-serif' }}>Sign In</h1>
          <form className="login-form" onSubmit={login}>
            <div className="login-input-container">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="UserName"
                className="login-input"
              />
            </div>
            <div className="login-input-container">
              <input
                id="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Create password"
                className="login-input"
              />
              <div className="login-input-adornment" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
            {error && <div className="login-error-message" style={{ color: 'red' }}>{error}</div>}
            <button className="login-button" type="submit" style={{ fontFamily: 'Poppins, sans-serif' }}>Sign In</button>
            <br />

            <div className="b" onClick={handleClickOpen} >
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
</svg>
  Continue with Google
</div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Sign in with Google</DialogTitle>
              <DialogContent>
                <GoogleLoginComponent />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
              </DialogActions>
            </Dialog>
            <Typography className="login-footer" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Don't Have an Account? <Link to="/signup" className="login-link">SignUp</Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
