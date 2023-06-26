import React from 'react';
import Row from './Shared/Row';
import useGetMovies from '../hooks/movies/useGetMovies';
import MovieHome from './MovieHome';

const Main = () => {
  const movie = useGetMovies()
  const horrorMovie = movie.filter(movie => movie.categories.some(category => category.name === "Terror"))
  const suspenseMovie = movie.filter(movie => movie.categories.some(category => category.name === "Suspenso"))
  
  return (
    <div>
      {/* <MovieHome movie={movie}/> */}
      <Row movie={horrorMovie} Genre='Terror'/>
      <Row movie={suspenseMovie} Genre='Suspenso'/>
      
    </div>

  );
};

export default Main;