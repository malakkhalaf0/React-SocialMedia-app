import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">
      Logout
    </Button>
  );
};

export default Logout;