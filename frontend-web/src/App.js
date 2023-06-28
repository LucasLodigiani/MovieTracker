import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './components/Movie/Movie';
import Home from './components/Home';
import { UserProvider } from './contexts/UserContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Header from './components/Header/Header';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  
  return (
    <ThemeProvider>
      <Router>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/Movie/:id?" element={<Movie />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Movie" element={<Movie />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
