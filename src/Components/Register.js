import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Typography } from '@mui/material';
import './re.css'; // Import the CSS file
import GoogleLoginComponent from "./GoogleLoginComponent";
import l from '../assets/l.png'; 

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  async function save(event) {
    event.preventDefault();

    setPasswordError(false);
    setPasswordMismatchError(false);
    setUsernameError(false);
    setEmailError(false);
    setUsernameHelperText("");
    setEmailHelperText("");
    setPasswordHelperText("");

    if (password !== confirm) {
      setPasswordMismatchError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("User Registration Successful");
        navigate('/login');
      } else {
        const data = await response.json();
        if (data.message === "Error: Email is already in use!") {
          setEmailError(true);
          setEmailHelperText("Email already exists. Please use a different email.");
        } else if (data.message === "Error: Username is already taken!") {
          setUsernameError(true);
          setUsernameHelperText("Username already exists. Please choose a different username.");
        } else if (data.error.includes("Password")) {
          setPasswordError(true);
          setPasswordHelperText(data.error);
        } else {
          alert("Failed to register user. Please try again later.");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={l} alt="Register Illustration" className="register-image" />
      </div>

      <div className="register-right">
        <h1 className="register-logo" style={{fontFamily: 'Poppins, sans-serif'}}>Trek Link</h1>
        <div className="register-form-container">
          <h1 className="register-title"style={{fontFamily: 'Poppins, sans-serif'}}>Sign Up</h1>
          <form className="register-form" onSubmit={save}>
            <div className="register-input-container">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="Username"
                className={`register-input ${usernameError ? 'error' : ''}`}
              />
              {usernameError && (
                <Typography variant="caption" color="error">
                  {usernameHelperText}
                </Typography>
              )}
            </div>
            <div className="register-input-container">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="Email"
                className={`register-input ${emailError ? 'error' : ''}`}
              />
              {emailError && (
                <Typography variant="caption" color="error">
                  {emailHelperText}
                </Typography>
              )}
            </div>
            <div className="register-input-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Password"
                className={`register-input ${passwordError ? 'error' : ''}`}
              />
              <div className="register-input-adornment" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
              {passwordError && (
                <Typography variant="caption" color="error">
                  {passwordHelperText}
                </Typography>
              )}
            </div>
            <div className="register-input-container">
              <input
                id="confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                required
                placeholder="Confirm Password"
                className={`register-input ${passwordMismatchError ? 'error' : ''}`}
              />
              <div className="register-input-adornment" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword}>
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </div>
              {passwordMismatchError && (
                <Typography variant="caption" color="error">
                  The password confirmation doesn't match.
                </Typography>
              )}
            </div>
            <button type="submit" className="register-button" style={{fontFamily: 'Poppins, sans-serif'}}>Create Account</button>
            <Typography className="register-footer" style={{fontFamily: 'Poppins, sans-serif'}}>
              Already Have Account? <Link to="/login" className="register-link">SignIn</Link>
            </Typography>
            {/* <Typography className="register-footer">
              <GoogleLoginComponent/>
            </Typography> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
