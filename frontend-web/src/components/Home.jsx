import React from 'react';
import useGetMovies from '../hooks/movies/useGetMovies';
import MovieCarousel from './Movie/MovieCarousel';

const Main = () => {
  const movies = useGetMovies()
  const actionMovie = movies.filter(movie => movie.categories.some(category => category.name === "Acción"))
  const horrorMovie = movies.filter(movie => movie.categories.some(category => category.name === "Terror"))
  const warMovie = movies.filter(movie => movie.categories.some(category => category.name === "Guerra"))
  
  return (
    <div>
      {/* <MovieHome movie={movie}/> */}
      {/* && <>
        <Row movies={actionMovie} Genre='Acción'/>
        <Row movies={horrorMovie} Genre='Terror'/>
        <Row movies={warMovie} Genre='Guerra'/>
      </>*/}
      <MovieCarousel movies={movies} title={"Últimas agregadas:"}></MovieCarousel>
      <MovieCarousel movies={actionMovie} title={"Acción:"}></MovieCarousel>
      
    </div>

  );
};

export default Main;