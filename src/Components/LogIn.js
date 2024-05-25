import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Paper, TextField, Typography, Button, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };

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
        console.log(data)
      } else {
        throw new Error('Failed to login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #0068bd, #aec9f7)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: '#0068bd' }}>
          Sign In
        </Typography>
        <br />
        <form style={formStyle} onSubmit={login}>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <FormControl variant="standard" required>
            <InputLabel>Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary">Sign In</Button>
          <Typography style={{ textAlign: 'center', fontWeight: 'bold', color: '#0068bd' }}>
            Don't Have an Account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default LogIn;