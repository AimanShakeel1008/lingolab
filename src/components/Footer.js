import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ mt: 4, py: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">LingoLab © {new Date().getFullYear()}</Typography>
      <Typography variant="body2">Version 1.0</Typography>
    </Box>
  );
}

export default Footer;
