import React, { useState, useEffect } from 'react';
import { base_url } from '../../utils/Config';

const useGetCategories = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const response = await fetch(base_url + '/api/Categories/GetAllCategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las categorias');
        }

        const dataResult = await response.json();
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

  return [data, isLoading, error];
};

export default useGetCategories;