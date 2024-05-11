import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.username = user.username ? "" : "Username is required.";
        tempErrors.email = user.email ? "" : "Email is required.";
        tempErrors.password = validatePassword(user.password);
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required.";
        if (password.length < 8 || password.length > 16) return "Password must be 8-16 characters long.";
        if (!/\d/.test(password)) return "Password must include a number.";
        if (!/[a-zA-Z]/.test(password)) return "Password must include an alphabet.";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must include a special character.";
        return "";
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) {
            setMessage("Please correct the errors in the form.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', user);
            setMessage('Registration successful! You can now login.');
            setUser({ username: '', email: '', password: '' });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
            console.error('Registration error:', error.response || error);
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
                <Typography component="h1" variant="h5">Register</Typography>
                {message && <Alert severity={message.startsWith('Registration successful') ? 'success' : 'error'}>{message}</Alert>}
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
                        value={user.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
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
                        value={user.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: '#2b6585' }}
                    >
                        Register
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1, color: '#2b6585', borderColor: '#2b6585' }}
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </Button>
                    {message.startsWith('Registration successful') }
                </Box>
            </Box>
        </Container>
    );
}

export default Registration;
