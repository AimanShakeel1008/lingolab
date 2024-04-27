import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Paper, Typography, Box, Grid, Link, Snackbar, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function ProfilePage() {
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt'); // JWT token for authentication
    const [userData, setUserData] = useState({
        username: '',
        fullName: '',
        email: '',
        dob: '',
        countryId: '',
        nativeLanguageId: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errorFields, setErrorFields] = useState({});
    const [countries, setCountries] = useState([]); // State for countries list
    const [languages, setLanguages] = useState([]); // State for languages list

    useEffect(() => {
        const username = localStorage.getItem('username');
        fetchUserDetails(username);
        fetchCountries();
        fetchLanguages();
    }, []);

    const fetchUserDetails = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/details/${username}`);
            const details = response.data;
            setUserData({
                username: details.user.username,
                fullName: details.fullName || '',
                email: details.user.email,
                dob: details.dateOfBirth ? new Date(details.dateOfBirth).toISOString().split('T')[0] : '',
                countryId: details.countryId || '',
                nativeLanguageId: details.nativeLanguageId || ''
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
            setSnackbarMessage('Failed to fetch user details');
            setSnackbarOpen(true);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/languages/countries');
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchLanguages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/languages');
            setLanguages(response.data);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        if (validate()) {
            const payload = {
                username: userData.username,
                fullName: userData.fullName,
                dateOfBirth: userData.dob,
                countryId: parseInt(userData.countryId),
                nativeLanguageId: parseInt(userData.nativeLanguageId)
            };
            try {
                await axios.post('http://localhost:8080/api/users/details', payload, {
                    headers: { Authorization: `Bearer ${jwt}` }
                });
                setEditMode(false);
                setSnackbarMessage('Profile updated successfully');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error saving user details:', error);
                setSnackbarMessage('Failed to save user details');
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarMessage('Validation errors. Please check your input.');
            setSnackbarOpen(true);
        }
    };

    const validate = () => {
        let errors = {};
        let isValid = true;
        if (editMode) {
            if (!userData.fullName.trim()) {
                errors.fullName = 'Full name cannot be empty';
                isValid = false;
            }
            if (userData.dob && new Date(userData.dob) > new Date()) {
                errors.dob = 'Date of birth cannot be in the future';
                isValid = false;
            }
            if (!countries.some(c => c.id === parseInt(userData.countryId))) {
                errors.country = 'Invalid country selected';
                isValid = false;
            }
            if (!languages.some(l => l.id === parseInt(userData.nativeLanguageId))) {
                errors.nativeLanguage = 'Invalid language selected';
                isValid = false;
            }
        }
        setErrorFields(errors);
        return isValid;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const goBack = () => {
        navigate('/dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <Container component="main" maxWidth="lg" sx={{ pt: 8, position: 'relative', display: 'flex', mb: 4 }}>
                <Box sx={{ width: 200, mr: 2, mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Navigation</Typography>
                    <Link href="#" onClick={() => navigate('/progress')} sx={{ display: 'block', marginBottom: 1 }}>View Progress</Link>
                    <Link href="#" onClick={() => navigate('/certificates')} sx={{ display: 'block', marginBottom : 1 }}>Certificates</Link>
                </Box>
                <Paper elevation={6} sx={{ p: 3, mt: 3, flexGrow: 1, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', right: 0, top: -48, display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={goBack} color="primary">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="button" onClick={goBack} sx={{ cursor: 'pointer', ml: 1 }}>
                            Back to Dashboard
                        </Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom>User Profile</Typography>
                    <TextField label="Username" value={userData.username} fullWidth margin="normal" InputProps={{ readOnly: true }} disabled />
                    <TextField label="Full Name" value={userData.fullName} onChange={handleChange} name="fullName" fullWidth margin="normal" disabled={!editMode} error={!!errorFields.fullName} helperText={errorFields.fullName} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" value={userData.email} fullWidth margin="normal" InputProps={{ readOnly: true }} disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Date of Birth" type="date" value={userData.dob} onChange={handleChange} name="dob" fullWidth margin="normal" disabled={!editMode} InputLabelProps={{ shrink: true }} error={!!errorFields.dob} helperText={errorFields.dob} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel>Country</InputLabel>
                                <Select value={userData.countryId} onChange={handleChange} name="countryId" label="Country" disabled={!editMode}>
                                    {countries.map(country => (
                                        <MenuItem key={country.id} value={country.id.toString()}>{country.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel>Native Language</InputLabel>
                                <Select value={userData.nativeLanguageId} onChange={handleChange} name="nativeLanguageId" label="Native Language" disabled={!editMode}>
                                    {languages.map(language => (
                                        <MenuItem key={language.id} value={language.id.toString()}>{language.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {editMode ? (
                        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
                    ) : (
                        <Button onClick={handleEdit} variant="contained" color="primary">Edit</Button>
                    )}
                </Paper>
            </Container>
            <Snackbar open={snackbarOpen} autoHideDuration={6000}
            onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>{snackbarMessage}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    );
}

export default ProfilePage;
