
import React, { useState } from 'react'
import { base_url } from '../../utils/Config';

const useDeleteMovie = () => {
  //TO DO: Falta implementar bien esto.
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMovie = async (id) => {
    setIsLoading(true);

    try{
        const response = await fetch(base_url + "/api/Movies/", {
            method: 'DELETE',
            body: id,
        });

        if(!response.ok){
            throw new Error("Ha ocurrido un problema al crear la pelicula");
        }
        
        const dataResult = await response.text();

        setData(dataResult);
        setIsLoading(false);
        setError(null);
    }
    catch(error){
        setError(error.message);
        setIsLoading(false);
    }
  };
  return [data, isLoading, error, deleteMovie];
}

export default useDeleteMovie;