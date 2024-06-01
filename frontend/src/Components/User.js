import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TopBar from './TopBar';
import Side from './Side';
import './UserStyle.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { Paper } from "@mui/material";
import './Chat.css';
import SideChat from './SideChat';

function User({ userId }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const token = localStorage.getItem("token");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        setUser(userData);
        setUsername(userData.username);
        setOriginalUsername(userData.username);
        setEmail(userData.email);
        setOriginalEmail(userData.email);
        setPassword(""); // Do not set password from API
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleUpdate = async () => {
    setUsernameError(false); // Reset the username error state
    setUsernameHelperText("");
    setEmailError(false); // Reset the email error state
    setEmailHelperText("");
    setPasswordError(false); // Reset the password error state
    setPasswordHelperText("");

    // Define the pattern for a strong password
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,40}$/;
    if (!password.match(passwordPattern)) {
      setPasswordError(true);
      setPasswordHelperText("Password must be strong. Include at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error.toLowerCase();

        if (errorMessage.includes("username")) {
          setUsernameError(true);
          setUsernameHelperText("Username is wrong");
        } else if (errorMessage.includes("email")) {
          setEmailError(true);
          setEmailHelperText("Email is wrong");
        }
      } else { 
        // Optionally, handle success
        console.log("User updated successfully");
        setOriginalUsername(username); // Update the original username
        setOriginalEmail(email); // Update the original email
        localStorage.setItem('username', username);
        setSnackbarOpen(true);
        localStorage.removeItem('token'); 
        // navigate('/login');
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container">
      <div className="top"><TopBar/></div>
      <div className="side"><Side /></div>
      <div className="sideee"><SideChat /></div>
      <div className="mid">
        <Paper className="paper" elevation={3}>
          <Typography variant="h4" gutterBottom sx={{ color: '#490057' }}>Edit Account Info</Typography>
          <TextField
            margin="normal"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            helperText={usernameHelperText}
            InputLabelProps={{
              className: 'input-label'
            }}
            className="input-field-focused"
          />
          <TextField
            margin="normal"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailHelperText}
            InputLabelProps={{
              className: 'input-label'
            }}
            className="input-field-focused"
          />
          <TextField
            margin="normal"
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordHelperText}
            InputLabelProps={{
              className: 'input-label'
            }}
            className="input-field-focused"
          />
          <Button
            variant="contained"
            onClick={handleUpdate}
            className="save-button"
          >
            Save Changes
          </Button>
        </Paper>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          User updated successfully
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default User;
