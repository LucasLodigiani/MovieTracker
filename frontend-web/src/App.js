import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Movie from './components/Movie/Movie'
import { UserProvider } from './contexts/UserContext';

//Legacy code
/*<Route path="/Users" element={User.IsInRole("Admin") ? <Users/> : <Navigate to={"/Login"} replace />}/>*/

const App = () => {
  return (
    //TO DO: Agregar las rutas privadas.
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/Movie/:id?" element={<Movie />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};




export default App;
