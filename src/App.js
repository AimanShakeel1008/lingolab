import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LanguageDetails from './components/LanguageDetails';
import LessonDetails from './components/LessonDetails';
import ProfilePage from './components/ProfilePage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';


const theme = createTheme();

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('jwt');
  return auth ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                      <PrivateRoute><Dashboard />
                      </PrivateRoute>} 
                    />
                    <Route path="/language/:languageId" element={
                      <PrivateRoute><LanguageDetails />
                      </PrivateRoute>} 
                    />
                    <Route path="/lesson/:lessonId" element={
                      <PrivateRoute><LessonDetails />
                      </PrivateRoute>} 
                    />
                    <Route path="/profile" element={
                      <PrivateRoute><ProfilePage /></PrivateRoute>}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
