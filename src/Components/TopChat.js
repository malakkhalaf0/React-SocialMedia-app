import React, { useState, useEffect, useRef } from 'react';
import './TopBar.css'; // Import your CSS file for styling
import IconButton from '@mui/material/IconButton';
import UserSearch from './UserSearch';
import { useNavigate } from 'react-router-dom';

function TopChat() {
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (anchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <div className="app-bar">
      <div className="toolbar">
        <div >
          
        </div>
        <div className="search" style={{left:'20px'}}>
          <UserSearch token={token} />
        </div>
        <div className="avatar" style={{right:'20px'}}>
          <h3>{username}</h3>
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
            <div className="menu" ref={menuRef}>
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

export default TopChat;