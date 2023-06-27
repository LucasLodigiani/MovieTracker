import React from 'react';
import Row from './Shared/Row';
import useGetMovies from '../hooks/movies/useGetMovies';
import MovieHome from './MovieHome';

const Main = () => {
  const movie = useGetMovies()
  const actionMovie = movie.filter(movie => movie.categories.some(category => category.name === "Acción"))
  const horrorMovie = movie.filter(movie => movie.categories.some(category => category.name === "Terror"))
  const warMovie = movie.filter(movie => movie.categories.some(category => category.name === "Guerra"))
  
  return (
    <div>
      {/* <MovieHome movie={movie}/> */}
      <Row movie={actionMovie} Genre='Acción'/>
      <Row movie={horrorMovie} Genre='Terror'/>
      <Row movie={warMovie} Genre='Guerra'/>
      
    </div>

  );
};

export default Main;