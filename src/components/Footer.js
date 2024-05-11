import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{bottom:0, py: 2, background: 'linear-gradient(150deg, #2b6585, #ce9f12b3);', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">LingoLab © {new Date().getFullYear()}</Typography>
      <Typography variant="body2">Version 1.0</Typography>
    </Box>
  );
}

export default Footer;
