import React from 'react'
import { useParams } from 'react-router-dom'
import useGetMovie from '../../hooks/movies/useGetMovie';
import { base_url } from '../../utils/Config';

const Movie = () => {
  const {id} = useParams();
  const [movie, isMovieLoading, isMovieLoadingError] = useGetMovie(id);

  return (
    <div>
      {isMovieLoading && <p>Cargando....</p>}
      {movie && 
        <>
          <img src={base_url + '/media/' + movie.imageUrl} alt='movie' />
          <p>Título: {movie.title}</p>
          <p>Géneros: [{movie.categories.map(c => c.name).join(', ')}]</p>
        </>
      }
      {isMovieLoadingError && <p>Ha ocurrido un error: {isMovieLoadingError}</p>}
      
    </div>
  )
}

export default Movie