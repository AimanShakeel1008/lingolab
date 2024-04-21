import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Card, CardContent, Button, Grid, CardActionArea, LinearProgress, Select, MenuItem, Tooltip, Snackbar, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function Dashboard() {
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([]);
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [languageToUnregister, setLanguageToUnregister] = useState(null);
    const cardColor = '#3f51b5';
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchLanguages();
        fetchAvailableLanguages();
    }, [username]);

    const fetchLanguages = () => {
        axios.get(`http://localhost:8080/api/user/languages/registrations?username=${username}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(response => {
            setLanguages(response.data.map(lang => ({
                id: lang.language.id,
                name: lang.language.name,
                registrationDate: lang.registrationDate,
                progress: lang.progress
            })));
        })
        .catch(error => console.error('Error fetching languages:', error));
    };

    const fetchAvailableLanguages = () => {
        axios.get('http://localhost:8081/api/languages')
        .then(response => {
            setAvailableLanguages(response.data);
        })
        .catch(error => console.error('Error fetching available languages:', error));
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleAddLanguage = () => {
        if (!selectedLanguage) return;
        const languageToAdd = availableLanguages.find(lang => lang.name === selectedLanguage);
        if (!languageToAdd) return;
        axios.post('http://localhost:8080/api/user/languages/register', {
            username,
            languageId: languageToAdd.id
        }, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(() => {
            fetchLanguages();
            setSelectedLanguage('');
        })
        .catch(error => {
            console.error('Error registering language:', error);
            setErrorMessage('User is already registered for this language');
            setOpenSnackbar(true);
        });
    };

    const handleDeleteLanguage = (id) => {
        setLanguageToUnregister(id);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8080/api/user/languages/unregister/${username}/${languageToUnregister}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(() => {
            const updatedLanguages = languages.filter(lang => lang.id !== languageToUnregister);
            setLanguages(updatedLanguages);
            setOpenDialog(false);
        })
        .catch(error => {
            console.error('Error unregistering language:', error);
            setErrorMessage('Failed to unregister language');
            setOpenSnackbar(true);
            setOpenDialog(false);
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
                <Typography variant="h4">Your Language Dashboard</Typography>
                <Box>
                    <Button startIcon={<AccountCircleIcon />} sx={{ mr: 2 }}>Profile</Button>
                    <Button startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {languages.length > 0 ? (
                    languages.map(language => (
                        <Grid item xs={12} sm={6} md={4} key={language.id}>
                            <Card sx={{ maxWidth: 345, boxShadow: 3, bgcolor: cardColor, color: '#fff', position: 'relative' }}>
                                <Tooltip title="Unregister">
                                    <IconButton onClick={() => handleDeleteLanguage(language.id)} sx={{ position: 'absolute', right: '8px', top: '8px', color: 'gray', zIndex: 1000 }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">{language.name}</Typography>
                                        <Tooltip title={`Registered on: ${format(new Date(language.registrationDate), 'PPP')}`}>
                                            <Typography variant="body2">Registration Date: {format(new Date(language.registrationDate), 'PPP')}</Typography>
                                        </Tooltip>
                                        <Typography variant="body2">Progress: {language.progress}%</Typography>
                                        <LinearProgress variant="determinate" value={language.progress} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ mt: 3, width: '100%', textAlign: 'center' }}>Currently no learning in progress. Select a language from the dropdown to start learning.</Typography>
                )}
            </Grid>
            <Box sx={{ mt: 4, width: 300 }}>
                <Select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value)}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value=""><em>Select a language</em></MenuItem>
                    {availableLanguages.map(lang => (
                        <MenuItem key={lang.id} value={lang.name}>{lang.name}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddLanguage}>Add Language</Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Unregistration"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to unregister? All your progress for this language will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Dashboard;

