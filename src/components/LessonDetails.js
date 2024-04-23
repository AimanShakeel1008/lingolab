import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function LessonDetails() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const username = localStorage.getItem('username');

  const [lesson, setLesson] = React.useState({
    title: '',
    description: '',
    completed: false,
  });

  React.useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/contents/${lessonId}`);
        setLesson({
          ...response.data,
          completed: response.data.completed || false 
        });
      } catch (error) {
        console.error('Error fetching lesson details:', error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCompletion = async () => {
    const newCompletedStatus = !lesson.completed;
    const progressPercent = newCompletedStatus ? 100 : 0;

    try {
      setLesson(prev => ({ ...prev, completed: newCompletedStatus }));

      await axios.post('http://localhost:8080/api/user/lessons/complete', {
        username: username,
        lessonId: parseInt(lessonId, 10),
        progressPercent: progressPercent
      },{
        headers: { Authorization: `Bearer ${jwt}` }
      });

    } catch (error) {
      console.error('Error updating lesson completion:', error);
      setLesson(prev => ({ ...prev, completed: !newCompletedStatus }));
    }
  };

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>Back to Language Details</Button>
          <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>{lesson.title}</Typography>
          <Typography variant="body1">{lesson.description}</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={lesson.completed} onChange={handleCompletion} />}
            label="Mark as Completed"
            sx={{ mt: 2 }}
          />
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default LessonDetails;
