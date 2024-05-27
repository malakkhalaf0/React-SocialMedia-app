import React, { useState } from 'react';
import './TopBar.css'; // Import your CSS file for styling
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import UserSearch from './UserSearch';
import { colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    navigate(`/users/${userId}/profiles/1`);
    handleClose();
  };

  const goToAccount = () => {
    navigate(`/users/${userId}`);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }


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
              <div className="menu-item" onClick={goToProfile}>Profile</div>
              <div className="menu-item" onClick={goToAccount}>My account</div>
              <div className="menu-item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
