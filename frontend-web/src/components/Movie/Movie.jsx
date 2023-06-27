import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGetMovie from '../../hooks/movies/useGetMovie';
import { base_url } from '../../utils/Config';
import useGetReviews from '../../hooks/reviews/useGetReviews';
import ReviewsContainer from '../Review/ReviewsContainer';
import CreateReview from '../Review/CreateReview';

const Movie = () => {
  const { id } = useParams();
  const [ratePromedy, setRatePromedy] = useState(null);
  const [movie, isMovieLoading, isMovieLoadingError] = useGetMovie(id);
  const [reviews, isReviewsLoading, isReviewsError] = useGetReviews(id);

  useEffect(() => {
    //Obtener el promedio de las puntuaciones
    if (reviews !== null) {
      const rateSum = reviews.reduce((a, r) => {
        return a + r.rate;
      }, 0);
      setRatePromedy(rateSum / reviews.length);
    }
  }, [reviews]);

  return (
    <div>
      {isMovieLoading && <p>Cargando....</p>}
      {movie &&
        <>
          <div className='items-center '>
            <div className=''>
              <img src={base_url + '/media/' + movie.imageUrl} alt='movie' className='' />
              <h1>{movie.title}</h1>
              <h2>{movie.description}</h2>
              {ratePromedy && <p>Puntuacion: {ratePromedy}</p>}
              <p>Géneros: [{movie.categories.map(c => c.name).join(', ')}]</p>
            </div>
            
          </div>

        </>
      }
      {isMovieLoadingError && <p>Ha ocurrido un error: {isMovieLoadingError}</p>}
      {movie && <CreateReview movieId={id}></CreateReview>}
      {reviews && <ReviewsContainer reviews={reviews}></ReviewsContainer>}
      {isReviewsLoading && <p>Cargando reviews...</p>}
      {isReviewsError && <p>Ha ocurrido un error al cargar las reviews: {isReviewsError}</p>}
      
    </div>
  )
}

export default Movie