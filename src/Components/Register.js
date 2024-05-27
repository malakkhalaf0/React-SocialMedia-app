import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, Input, InputLabel, InputAdornment, IconButton, Typography } from '@mui/material';
import './re.css'; // Import the CSS file

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
        navigate('/');
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
    <div className="RegisterPage" style={{ backgroundSize: 'cover', backgroundImage: 'url(http://localhost/t.png)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="RegisterContainer">
        <h1 className="RegisterTitle"><bold>Sign Up</bold></h1>
        <form className="RegisterForm" onSubmit={save}>
          <div className="RegisterInputContainer">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="Username"
              className={usernameError ? 'error' : ''}
            />
            {usernameError && (
              <Typography variant="caption" color="error">
                {usernameHelperText}
              </Typography>
            )}
          </div>
          <div className="RegisterInputContainer">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Email"
              className={emailError ? 'error' : ''}
            />
            {emailError && (
              <Typography variant="caption" color="error">
                {emailHelperText}
              </Typography>
            )}
          </div>
          <div className="RegisterInputContainer">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Password"
              className={passwordError ? 'error' : ''}
            />
            <div className="RegisterInputAdornment" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
            {passwordError && (
              <Typography variant="caption" color="error">
                {passwordHelperText}
              </Typography>
            )}
          </div>
          <div className="RegisterInputContainer">
            <input
              id="confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
              placeholder="Confirm Password"
              className={passwordMismatchError ? 'error' : ''}
            />
            <div className="RegisterInputAdornment" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword}>
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </div>
            {passwordMismatchError && (
              <Typography variant="caption" color="error">
                The password confirmation doesn't match.
              </Typography>
            )}
          </div>
          <button type="submit" className="RegisterButton">Sign Up</button>
          <Typography className="RegisterLink">
            Already Have Account? <Link to="/" className="RegisterSignInLink">Sign In</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default Register;







// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Visibility, VisibilityOff, Google, GitHub } from '@mui/icons-material';
// import { Paper, TextField, Button, Typography, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@mui/material';

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const paperStyle = {
//     padding: '50px 20px',
//     width: 400,
//     minHeight: 450,
//     margin: '20px auto',
//     backgroundColor: 'rgba(255, 255, 255, 0)',
//     backdropFilter: 'blur(9px)',
//     boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
//   };
//   const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordMismatchError, setPasswordMismatchError] = useState(false);
//   const [passwordHelperText, setPasswordHelperText] = useState("");

//   const [usernameError, setUsernameError] = useState(false);
//   const [usernameHelperText, setUsernameHelperText] = useState("");
//   const [emailError, setEmailError] = useState(false);
//   const [emailHelperText, setEmailHelperText] = useState("");

//   const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   async function save(event) {
//     event.preventDefault();

//     setPasswordError(false);
//     setPasswordMismatchError(false);
//     setUsernameError(false);
//     setEmailError(false);
//     setUsernameHelperText("");
//     setEmailHelperText("");
//     setPasswordHelperText("");

//     if (password !== confirm) {
//       setPasswordMismatchError(true);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         alert("User Registration Successful");
//         navigate('/');
//       } else {
//         const data = await response.json();
//         if (data.message === "Error: Email is already in use!") {
//           setEmailError(true);
//           setEmailHelperText("Email already exists. Please use a different email.");
//         } else if (data.message === "Error: Username is already taken!") {
//           setUsernameError(true);
//           setUsernameHelperText("Username already exists. Please choose a different username.");
//         } else if (data.error.includes("Password")) {
//           setPasswordError(true);
//           setPasswordHelperText(data.error);
//         } else {
//           alert("Failed to register user. Please try again later.");
//         }
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   return (
//     <div className="Register" style={{backgroundSize: 'cover', backgroundImage: 'url(http://localhost/CuteBears.png)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <Paper elevation={3} style={paperStyle}>
//         <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: '#0068bd' }}>Sign Up</Typography>
//         <br/>
//         <form style={formStyle} onSubmit={save}>
//           <TextField
//             required
//             type="text"
//             id="username"
//             label="Username"
//             variant="standard"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             error={usernameError}
//             helperText={usernameHelperText}
//           />
//           <TextField
//             required
//             type="email"
//             id="email"
//             label="Email"
//             variant="standard"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             error={emailError}
//             helperText={emailHelperText}
//           />

//           <FormControl sx={{ m: 0 }} variant="standard">
//             <InputLabel>Password</InputLabel>
//             <Input
//               required
//               id="password"
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               error={passwordError}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//             {passwordError && (
//               <Typography variant="caption" color="error">
//                 {passwordHelperText}
//               </Typography>
//             )}
//           </FormControl>

//           <FormControl sx={{ m: 0 }} variant="standard">
//             <InputLabel>Confirm Password</InputLabel>
//             <Input
//               required
//               id="confirm"
//               type={showConfirmPassword ? 'text' : 'password'}
//               value={confirm}
//               onChange={(event) => setConfirm(event.target.value)}
//               error={passwordMismatchError}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle confirm password visibility"
//                     onClick={handleClickShowConfirmPassword}
//                     onMouseDown={handleMouseDownPassword}
//                   >
//                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//             {passwordMismatchError && (
//               <Typography variant="caption" color="error">
//                 The password confirmation doesn't match.
//               </Typography>
//             )}
//           </FormControl>

//           <Button type="submit" variant="contained">Sign Up</Button>
//           <label style={{ textAlign: 'center' }}>Already Have Account? <Link to="/" style={{ fontWeight: 'bold', color: '#0068bd' }}>Sign In</Link></label>
//           <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <Button variant="contained" startIcon={<Google /> }  href="/oauth2/authorization/google">
//             </Button>
//             <Button variant="contained" startIcon={<GitHub />} style={{ backgroundColor: '#333', color: '#fff' }} href="/oauth2/authorization/github">
//             </Button>
//           </div>
//         </form>
//       </Paper>
//     </div>
//   );
// }

// export default Register;
