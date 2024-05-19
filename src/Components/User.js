import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Friends from './Friends';

function User({ userId, token }) {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [originalUsername, setOriginalUsername] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [formVisible, setFormVisible] = useState(true); // State to manage form visibility

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
        setUsername(userData.username);
        setOriginalUsername(userData.username); // Store the original username
        setEmail(userData.email);
        setOriginalEmail(userData.email); 
        setPassword(userData.password); 
        // Store the original email
        // Assuming password cannot be fetched from API for security reasons
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId, token, snackbarOpen]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, email, password })
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      // Optionally, handle success
      console.log('User updated successfully');
      setOriginalUsername(username); // Update the original username
      setOriginalEmail(email); // Update the original email
      setSnackbarOpen(true);
      setFormVisible(false); // Hide the form fields
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    // Reset the form fields to their original values
    setUsername(originalUsername);
    setEmail(originalEmail);
    setPassword(''); // Optionally, reset the password field
    toggleForm(); // Close the form
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setFormVisible(false); // Show the form fields after closing the snackbar
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      
      <button onClick={toggleForm}>Edit Profile</button>
      {showForm && formVisible && (
        <div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={handleCancel}>Cancel</button> {/* Add Cancel button */}
        </div>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          User updated successfully
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default User;
