// src/components/HomePage.js
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" style={{ margin: "20px 0" }}>
                    Lingo Lab
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    component={Link}
                    to="/register"
                >
                    Register
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default HomePage;
