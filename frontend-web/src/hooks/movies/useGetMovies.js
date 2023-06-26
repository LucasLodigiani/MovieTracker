import { useEffect, useState } from 'react';
import { base_url } from '../../utils/Config';

const useGetMovies = () => {
    const [movie, setMovie] = useState([]);
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
      return movie
}

export default useGetMovies