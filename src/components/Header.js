import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 , background: 'linear-gradient(150deg, #ce9f12b3, #2b6585 70%)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 45, fontWeight: 'bold' }}>
          LingoLab
        </Typography>
        <Button color="inherit" startIcon={<AccountCircleIcon />} onClick={handleProfileClick}>
          Profile
        </Button>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
