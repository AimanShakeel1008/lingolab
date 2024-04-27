import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Paper, Typography, Box, Grid, Link, Snackbar, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: 'john_doe',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        dob: '1990-01-01',
        country: 'USA',
        nativeLanguage: 'English'
    });
    const [editMode, setEditMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errorFields, setErrorFields] = useState({});

    const countries = [
        { code: 'USA', name: 'United States' },
        { code: 'CAN', name: 'Canada' },
        { code: 'AUS', name: 'Australia' },
    ];

    const languages = [
        { code: 'EN', name: 'English' },
        { code: 'FR', name: 'French' },
        { code: 'SP', name: 'Spanish' }
    ];

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        if (validate()) {
            console.log('Saved:', userData);
            setEditMode(false);
            setSnackbarMessage('Profile updated successfully');
            setSnackbarOpen(true);
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
            if (new Date(userData.dob) > new Date()) {
                errors.dob = 'Date of birth cannot be in the future';
                isValid = false;
            }
            if (!countries.some(c => c.name === userData.country)) {
                errors.country = 'Invalid country selected';
                isValid = false;
            }
            if (!languages.some(l => l.name === userData.nativeLanguage)) {
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

    return (
        <>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ pt: 8, position: 'relative', display: 'flex', mb: 4 }}>
                <Box sx={{ width: 200, mr: 2, mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Navigation</Typography>
                    <Link href="#" onClick={() => navigate('/progress')} sx={{ display: 'block', marginBottom: 1 }}>View Progress</Link>
                    <Link href="#" onClick={() => navigate('/certificates')} sx={{ display: 'block', marginBottom: 1 }}>Certificates</Link>
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
                    <TextField label="Username" value={userData.username} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                    <TextField label="Full Name" value={userData.fullName} onChange={handleChange} name="fullName" fullWidth margin="normal" disabled={!editMode} error={!!errorFields.fullName} helperText={errorFields.fullName} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" value={userData.email} fullWidth margin="normal" InputProps={{ readOnly: true }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Date of Birth" type="date" value={userData.dob} onChange={handleChange} name="dob" fullWidth margin="normal" disabled={!editMode} InputLabelProps={{ shrink: true }} error={!!errorFields.dob} helperText={errorFields.dob} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth margin="normal" error={!!errorFields.country}>
                                <InputLabel>Country</InputLabel>
                                <Select value={userData.country} onChange={handleChange} name="country" label="Country" disabled={!editMode}>
                                    {countries.map(country => (<MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth margin="normal" error={!!errorFields.nativeLanguage}>
                                <InputLabel>Native Language</InputLabel>
                                <Select value={userData.nativeLanguage} onChange={handleChange} name="nativeLanguage" label="Native Language" disabled={!editMode}>
                                    {languages.map(language => (<MenuItem key={language.code} value={language.name}>{language.name}</MenuItem>))}
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
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    );
}

export default ProfilePage;
