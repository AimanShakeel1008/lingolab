import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header({ onLogout }) {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LingoLab
        </Typography>
        <Button color="inherit" startIcon={<AccountCircleIcon />}>Profile</Button>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
