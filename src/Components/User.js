import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TopBar from './TopBar';
import Side from './Side';
import './myfile.css'; // Import the CSS file

import {
  Paper,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
} from "@mui/material";

function User({ userId }) {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  const paperStyle = {
    padding: "20px",
    width: "400px", // Adjust the width as needed
    height: "500px", // Adjust the height as needed
    marginLeft: "300px", // Center the Paper component horizontally
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the content inside the Paper
    justifyContent: "center",
    borderRaduis:'25px' // Center the content inside the Paper
  };

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
        setOriginalUsername(userData.username); // Store the original username
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
        setUsernameError(true);
        setUsernameHelperText("Username already exists. Please choose a different username.");
        setEmailError(true);
        setEmailHelperText("Email already exists. Please choose a different email.");
      } else { 
        // Optionally, handle success
        console.log("User updated successfully");
        setOriginalUsername(username); // Update the original username
        setOriginalEmail(email); // Update the original email
        setSnackbarOpen(true);
        setOpenDialog(false); // Close the dialog
        setUsernameError(false); // Reset the username error state
        setUsernameHelperText("");
        setEmailError(false); // Reset the email error state
        setEmailHelperText("");
        setPasswordError(false); // Reset the password error state
        setPasswordHelperText("");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    // Reset the form fields to their original values
    setUsername(originalUsername);
    setEmail(originalEmail);
    setPassword(""); // Optionally, reset the password field
    setOpenDialog(false); // Close the dialog
    setUsernameError(false); // Reset the username error state
    setUsernameHelperText("");
    setEmailError(false); // Reset the email error state
    setEmailHelperText("");
    setPasswordError(false); // Reset the password error state
    setPasswordHelperText("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        minHeight: "100vh", // Cover the entire viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="top"><TopBar/></div>
      <div className="side"><Side></Side></div>

      <div className="mid">
      <Paper elevation={3} style={paperStyle}>
        <div
          style={{
            margin: "auto",
             // Center the Paper component horizontally
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center the content inside the Paper
            justifyContent: "center",
            
          }}
        >
          <img src="\images\images.jpg" alt="Profile" className="profile-pic" />
          <h1 style={{ color: "#490057", fontFamily: " Georgia, serif" }}>
            {username}
          </h1>
          <div>
          <Typography variant="body1" sx={{ color: "#490057" }}>
              <FormControl disabled variant="standard">
                <Input 
                  defaultValue={user.username}
                />
              </FormControl>
            </Typography>

            <Typography variant="body1" sx={{ color: "#490057" }}>
              <FormControl disabled variant="standard">
                <Input
                  defaultValue={user.email}
                />
              </FormControl>
            </Typography>

            <br></br>
            <button
              className="button"
              onClick={() => setOpenDialog(true)}
            >
              Edit Account
            </button>
          </div>
        </div>
      </Paper>
      </div>
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError} // Apply error state
            helperText={usernameHelperText} // Display error message as helper text
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError} // Apply error state
            helperText={emailHelperText} // Display error message as helper text
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError} // Apply error state
            helperText={passwordHelperText} // Display error message as helper text
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

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
