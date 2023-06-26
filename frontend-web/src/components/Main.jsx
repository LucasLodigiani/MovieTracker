import React, { useEffect, useState } from 'react';
import Row from './Shared/Row';
import { base_url } from '../utils/Config';
import Dropdown from './Shared/Dropdown';

const Main = () => {
  const [movie, setMovie] = useState([]);
  const horrorMovie = movie.filter(movie => movie.categories.some(category => category.name === "Terror"))
  const suspenseMovie = movie.filter(movie => movie.categories.some(category => category.name === "Suspenso"))
  
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
      <Row movie={suspenseMovie} Genre='Suspenso' />
    </div>
  );
};

export default Main;
