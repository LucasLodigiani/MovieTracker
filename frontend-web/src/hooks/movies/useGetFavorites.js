import React, { useState, useEffect } from 'react';
import { base_url } from '../../utils/Config';

const useGetFavorites = (moviesIds) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const response = await fetch(`${base_url}/api/Movies/movies`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify(moviesIds)
          });

        if (!response.ok) {
          throw new Error('Error al obtener las peliculas favoritas');
        }

        const dataResult = await response.json();
        console.log(dataResult);
        setData(dataResult);
        setIsLoading(false);
        setError(null);

      }catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, setData,isLoading, error];
};

export default useGetFavorites;