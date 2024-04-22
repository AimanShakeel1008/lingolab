import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent, LinearProgress, Checkbox, CardActionArea, Grid, FormControlLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookIcon from '@mui/icons-material/Book';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Header from './Header'; // Ensure this is the correct path
import Footer from './Footer'; // Ensure this is the correct path
import axios from 'axios';

function LanguageDetails() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(50); // Mock data
  const [languageName, setLanguageName] = useState('');

  useEffect(() => {
    fetchLessons(languageId);
  }, [languageId]);

  const fetchLessons = async (languageId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/contents/language/${languageId}`);
      setLessons(response.data);
      setLanguageName(response.data[0]?.language?.name || ''); // Set the language name from the response
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const navigateToLessonDetails = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  const getIcon = (type) => {
    switch (type) {
      case "ARTICLE":
        return <BookIcon />;
      case "VIDEO":
        return <VideoLibraryIcon />;
      case "AUDIO":
        return <AudiotrackIcon />;
      case "QUIZ":
        return <AssignmentIcon />;
      default:
        return <BookIcon />;
    }
  };

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
          <Typography variant="h4">{languageName}</Typography>
          <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>Back to Dashboard</Button>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>{`Progress: ${progress.toFixed(0)}%`}</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 3 }} />
        <Grid container spacing={2}>
          {lessons.length > 0 ? (lessons.map((lesson, index) => (
            <Grid item xs={12} key={lesson.id}>
              <Card sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                bgcolor: index % 2 === 0 ? '#f7f7f7' : '#e0e0e0'
              }}>
                <CardActionArea onClick={() => navigateToLessonDetails(lesson.id)} sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                    {getIcon(lesson.contentType)}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{lesson.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{lesson.description}</Typography>
                  </Box>
                  <FormControlLabel
                    control={<Checkbox checked={lesson.completed} sx={{ color: lesson.completed ? 'green' : 'default', '&.Mui-checked': { color: 'green' } }} />}
                    label=""
                    sx={{ mr: 0 }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))):(
            <Typography variant="h6" sx={{ mt: 3, width: '100%', textAlign: 'center' }}>Lessons coming soon!</Typography>
          )}
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default LanguageDetails;
