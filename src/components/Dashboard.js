import React, { useState } from 'react';
import { Typography, Container, Box, Card, CardContent, Button, Grid, CardActionArea, LinearProgress, Select, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([
        { id: 1, name: 'Spanish', progress: 70 },
        { id: 2, name: 'French', progress: 40 },
        { id: 3, name: 'German', progress: 20 }
    ]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const cardColor = '#3f51b5'; // A pleasant blue shade for all cards

    const availableLanguages = ['Italian', 'Japanese', 'Russian']; // Add other languages here

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleAddLanguage = () => {
        if (!selectedLanguage) return; // Prevent adding if no language is selected
        const newLanguage = { id: languages.length + 1, name: selectedLanguage, progress: 0 };
        setLanguages([...languages, newLanguage]);
        setSelectedLanguage(''); // Reset selection
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
                {languages.map((language) => (
                    <Grid item xs={12} sm={6} md={4} key={language.id}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3, bgcolor: cardColor, color: '#fff' }}>
                            <CardActionArea onClick={() => alert(`Progress in ${language.name}: ${language.progress}%`)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {language.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Progress: {language.progress}%
                                    </Typography>
                                    <LinearProgress variant="determinate" value={language.progress} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 4, width: 300 }}>
                <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="">
                        <em>Select a language</em>
                    </MenuItem>
                    {availableLanguages.map((lang) => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddLanguage}>Add Language</Button>
            </Box>
        </Container>
    );
}

export default Dashboard;
