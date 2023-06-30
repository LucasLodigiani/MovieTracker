import React from 'react';
import useGetMovies from '../hooks/movies/useGetMovies';
import MovieCarousel from './Movie/MovieCarousel';

const Main = () => {
  const movies = useGetMovies()
  const actionMovies = movies.filter(movie => movie.categories.some(category => category.name === "Acción"))
  const horrorMovies = movies.filter(movie => movie.categories.some(category => category.name === "Terror"))
  const thillerMovies = movies.filter(movie => movie.categories.some(category => category.name === "Thriller"))
  const comedyMovies = movies.filter(movie => movie.categories.some(category => category.name === "Comedia"))
  
  
  return (
    <div>

      <MovieCarousel movies={movies} title={"Últimas agregadas:"}></MovieCarousel>
      <MovieCarousel movies={actionMovies} title={"Acción:"}></MovieCarousel>
      <MovieCarousel movies={horrorMovies} title={"Terror:"}></MovieCarousel>
      <MovieCarousel movies={comedyMovies} title={"Comedia:"}></MovieCarousel>
      <MovieCarousel movies={thillerMovies} title={"Thriller:"}></MovieCarousel>
      
    </div>

  );
};

export default Main;