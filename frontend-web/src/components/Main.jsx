import React, {useState} from 'react';
import Row from './Shared/Row';


const Main = () => {
  const [movie, setMovie] = useState();
  const genreWarMovies = movie.filter(movie => movie.Genre.includes('War'));
  const genreComedyMovies = movie.filter(movie => movie.Genre.includes('Comedy'));
  const genreDramaMovies = movie.filter(movie => movie.Genre.includes('Drama'));
  const genreCrimeMovies = movie.filter(movie => movie.Genre.includes('Crime'));
  return (
    
    <div>
      <Row movie={genreComedyMovies} Genre='Comedia' />
      {/* <Row movie={genreWarMovies} Genre='Belica' /> */}
      <Row movie={genreDramaMovies} Genre='Drama'/>
      <Row movie={genreCrimeMovies} Genre='Crime'/>
      
    </div>
  );
};

export default Main;
