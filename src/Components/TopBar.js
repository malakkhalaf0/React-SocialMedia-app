import React, { useState } from 'react';
import './TopBar.css'; // Import your CSS file for styling
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import UserSearch from './UserSearch';
import { colors } from '@mui/material';
function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  //const token ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb3RheiIsImlhdCI6MTcxNjAyNzg4MiwiZXhwIjoxNzE2MTE0MjgyfQ.lSe66wEVfw07us5BNUTuDFcTFL54p8HKrM7IZAxYJjI';
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="app-bar">
      <div className="toolbar">
        <div className="title">
          <h1>Hello, {username }! </h1>
        </div>
        
        <div className="search">
        <UserSearch token={token}></UserSearch>
        </div>
     
        <div className="avatar">
        <h3 >{username} </h3>
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            onClick={handleClick}
          >
            <img
              src="\images\images.jpg"
              alt="User Avatar"
              className="avatar-image"
            />
          </IconButton>
          {/* Menu items */}
          {anchorEl && (
            <div className="menu">
              <div className="menu-item" onClick={handleClose}>Profile</div>
              <div className="menu-item" onClick={handleClose}>My account</div>
              <div className="menu-item" onClick={handleClose}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
