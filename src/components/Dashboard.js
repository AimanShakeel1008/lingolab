import React, { useState } from 'react';
import { Typography, Container, Box, CircularProgress, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Dashboard() {
    const [currentLanguage, setCurrentLanguage] = useState('Spanish');
    const [progress, setProgress] = useState(75); // Progress in percentage
    const [newLanguage, setNewLanguage] = useState('');

    const languages = ['Spanish', 'French', 'German', 'Japanese', 'Mandarin']; // Example languages

    const handleLanguageChange = (event) => {
        setNewLanguage(event.target.value);
    };

    const registerForNewLanguage = () => {
        // Here you would typically make an API call to register for the new language
        alert(`Registered for learning ${newLanguage}`);
        setCurrentLanguage(newLanguage);
        setProgress(0);
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4">Dashboard</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>Current Language: {currentLanguage}</Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
                    <CircularProgress variant="determinate" value={progress} size={100} />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="caption" component="div" color="text.secondary">
                            {`${Math.round(progress)}%`}
                        </Typography>
                    </Box>
                </Box>
                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="new-language-label">Select New Language</InputLabel>
                    <Select
                        labelId="new-language-label"
                        id="new-language"
                        value={newLanguage}
                        label="Select New Language"
                        onChange={handleLanguageChange}
                    >
                        {languages.map((language, index) => (
                            <MenuItem key={index} value={language}>{language}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ mt: 3 }} onClick={registerForNewLanguage} disabled={!newLanguage}>
                    Register for New Language
                </Button>
            </Box>
        </Container>
    );
}

export default Dashboard;
