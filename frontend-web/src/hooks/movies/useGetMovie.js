import React, { useState, useEffect } from 'react';
import { base_url } from '../../utils/Config';

const useGetMovie = (movieId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
        //Verificar si el id llego vacío
        if(movieId === null || movieId === undefined){
            throw new Error('No se ha especificado ninguna pelicula a obtener.');
        }
        
        const response = await fetch(base_url + '/api/Movies/id?Id=' + movieId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la pelicula');
        }
        
        const dataResult = await response.json();
        console.log(dataResult)
        setData(dataResult);
        setIsLoading(false);
        setError(null);

      }catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return [data, isLoading, error];
};

export default useGetMovie;