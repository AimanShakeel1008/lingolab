import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');  // State to store error message
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // Check if username or password is empty
        if (!credentials.username || !credentials.password) {
            setError('Both username and password are required');
            return;  // Prevent the form from being submitted
        }
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', credentials);
            localStorage.setItem('jwt', response.data.jwt);
            alert('Login successful');
            navigate('/dashboard');  // Navigate to dashboard or another page
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };

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
                <Typography component="h1" variant="h5">Login</Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/register')}
                    >
                        Need an account? Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
