import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './components/Movie/Movie'
import Home from './components/Home'
import { UserProvider } from './contexts/UserContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Header from './components/Header/Header';

//Legacy code
/*<Route path="/Users" element={User.IsInRole("Admin") ? <Users/> : <Navigate to={"/Login"} replace />}/>*/

const App = () => {
  return (
    //TO DO: Agregar las rutas privadas.
    <div>
      <Router>
        <UserProvider>
          <Header/>
          <Routes>
            <Route path="/Movie/:id?" element={<Movie />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Movie" element={<Movie/>}/>
            <Route path="/" element={<Home />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
    
  );
};




export default App;
