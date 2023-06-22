import React, { useEffect, useState } from 'react';
import Row from './Shared/Row';
import { base_url } from '../utils/Config';

const Main = () => {
  const [movie, setMovie] = useState([]);
  const horrorMovie = movie.filter(movie => movie.categories.some(category => category.name === "Terror"))
  // const genreComedyMovies = movie.filter(movie => movie.Genre.includes('Comedy'));
  // const genreDramaMovies = movie.filter(movie => movie.Genre.includes('Drama'));
  // const genreCrimeMovies = movie.filter(movie => movie.Genre.includes('Crime'));
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(base_url + '/api/Movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
          const jsonData = await response.json();
          setMovie(jsonData);
          console.log(jsonData)
        }else{
          console.log('Error al obtener las peliculas')
        }
    } catch(error){
      console.log('error')
    }
  };
    fetchData()
  },[]);
 
  
  return (
    <div>
      
      <Row movie={horrorMovie} Genre='Terror'/>
      {/* <Row movie={genreComedyMovies} Genre='Comedia' /> */}
      {/* <Row movie={genreWarMovies} Genre='Belica' /> */}
      {/* <Row movie={genreDramaMovies} Genre='Drama'/> */}
      {/* <Row movie={genreCrimeMovies} Genre='Crime'/> */}

    </div>
  );
};

export default Main;
