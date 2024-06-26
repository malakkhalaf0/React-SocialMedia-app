import React, { useState, useEffect, useRef } from 'react';
import './TopBar.css'; // Import your CSS file for styling
import IconButton from '@mui/material/IconButton';
import UserSearch from './UserSearch';
import { useNavigate } from 'react-router-dom';

function TopBar() {
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
    navigate('/login');
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
        <div className="title">
          <h3>Hello, {username}!</h3>
        </div>
        <div className="search">
          <UserSearch token={token} />
        </div>
        <div className="avatar">
          <h3 className='userName'>{username}</h3>
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            onClick={handleClick}
          >
            <img
              src="\images\360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
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

export default TopBar;