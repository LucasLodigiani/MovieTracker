import React from 'react'
import { useParams } from 'react-router-dom'
import useGetMovie from '../../hooks/movies/useGetMovie';
import { base_url } from '../../utils/Config';

const Movie = () => {
  const { id } = useParams();
  const [movie, isMovieLoading, isMovieLoadingError] = useGetMovie(id);

  return (
    <div>
      {isMovieLoading && <p>Cargando....</p>}
      {movie &&
        <>
          <div className='items-center '>
            <h1 className='text-center scale-150 capitalize '>{movie.title}</h1>
            <div>
              <img src={base_url + '/media/' + movie.imageUrl} alt='movie' className='' />
            </div>
            <p>Géneros: [{movie.categories.map(c => c.name).join(', ')}]</p>
          </div>

        </>
      }
      {isMovieLoadingError && <p>Ha ocurrido un error: {isMovieLoadingError}</p>}

    </div>
  )
}

export default Movie