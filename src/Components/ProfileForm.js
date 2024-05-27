import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom'; 
import MuiAlert from '@mui/material/Alert';
import './myfile.css'; // Import the CSS file
import TopBar from './TopBar';
import Side from './Side';
function ProfileForm({  profile, onUpdate }) {
  const { userId } = useParams();
  const [errorsa, setErrorsa] = useState("");
  const [er, setEr] = useState("");
  const token = localStorage.getItem('token');
  // State to store error messages for each field
  const [formData, setFormData] = useState({
    bio: '',
    dob: '',
    city: '',
    gender: 'Male',
    age: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing again
    setErrorsa("");
    setEr("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let url = `http://localhost:8080/users/${userId}/profiles`;
      let method = 'POST';
      if (profile) {
        url = `http://localhost:8080/users/${userId}/profiles/1`;
        method = 'PUT';
      }
     
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
       
      });
      console.log(formData);
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          const errorMessage = errorData.error; // Extract the error message
          // console.log("Err" +errorMessage);


          const field = errorMessage.split(' ')[0];
          // console.log("field"+field)
           // Extract the first word from the error message
           if(field === "Bio"){
            
            setEr("bio");
           
          setErrorsa(errorMessage);}
        else if(field === "City"){
          setEr("city");
        setErrorsa(errorMessage)
      }   else if(field === "Date"){
        setEr("date");
      setErrorsa(errorMessage)
    }else if(field === "Age"){
      setEr("age");
    setErrorsa(errorMessage)
  }
  else if(field === "must"){
    setEr("must");
  setErrorsa(errorMessage)
}
 

      
          console.error('Validation error:', errorMessage);
        } else {
          throw new Error('Failed to update profile');
        }
      } else {
        setSuccessMessage('Profile updated successfully');
        setOpenSnackbar(true);
        setTimeout(() => {
          setSuccessMessage('');
          setOpenSnackbar(false);
          onUpdate(formData); 
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-input">
        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange}  style={{ border: er === 'bio' ? '2px solid red' : '1px solid #490057;' }}/>
      </div>
      <div className="form-input">
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={{ border: er === 'date' ? '2px solid red' : '1px solid #490057;' }}/>
       
      </div>
      <div className="form-input">
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ border: er === 'city' ? '2px solid red' : '1px solid #490057' }} />

      </div>
      <div className="form-input">
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      
      </div>
      <div className="form-input">
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange}   style={{
    border: er === 'age' || er==='must' ? '2px solid red' : '1px solid #490057;'
  }} />
         <div className="error-message">{errorsa}</div>
      </div>
 
      <button className='button' type="submit">Submit</button>
 
 
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} className="snackbar">
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
}

export default ProfileForm;