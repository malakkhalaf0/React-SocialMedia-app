import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' }; // Flexbox column layout
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function save(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert("User Registration Successful");
        navigate('/');
      } else {
        throw new Error('Failed to register user');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="Register" style={{ background: 'linear-gradient(to bottom, #0068bd, #aec9f7)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={paperStyle}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: '#0068bd' }}>Sign Up</Typography>
      <br/>
        <form style={formStyle}>
          <TextField
            type="text"
            id="username"
            label="Username"
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            variant="standard"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
    
          <FormControl sx={{ m: 0 }} variant="standard">
            <InputLabel >Password</InputLabel>
            <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
          </FormControl>

          <TextField
            type="password"
            id="confirm"
            label="Confirm Password"
            variant="standard"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />

          <Button type="submit" variant="contained" onClick={save}>Sign Up</Button>
         <label gutterBottom style={{ textAlign: 'center' }}  >Already Have Account ?<Link to="/" gutterBottom style={{ fontWeight: 'bold' , color: '#0068bd'}} > Sign In</Link></label> 
        </form>
      </Paper>
    </div>
  );
}

export default Register;