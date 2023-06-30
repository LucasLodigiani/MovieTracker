import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useGetMovie from '../../hooks/movies/useGetMovie';
import { base_url } from '../../utils/Config';
import useGetReviews from '../../hooks/reviews/useGetReviews';
import ReviewsContainer from '../Review/ReviewsContainer';
import CreateReview from '../Review/CreateReview';
import { ThemeContext } from '../../contexts/ThemeContext';
import AddToFavorites from './AddToFavorites';

const Movie = () => {
  const { id } = useParams();
  const [ratePromedy, setRatePromedy] = useState(null);
  const [movie, isMovieLoading, isMovieLoadingError] = useGetMovie(id);
  const [reviews, isReviewsLoading, isReviewsError] = useGetReviews(id);
  const { theme } = useContext(ThemeContext);

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
    <div className={`bg-${theme === 'dark' ? 'gray' : 'white'}`} style={{ boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)' }}>
      {isMovieLoading && <p>Cargando....</p>}
      {movie && (
        <div className='container mx-auto px-4'>
          <AddToFavorites id={id}></AddToFavorites>
          <h1 className={`text-${theme === 'dark' ? 'white' : 'black'} font-extrabold text-2xl tracking-wide leading-none text-center`}>
            {movie.title}
          </h1>
          <div className={`flex items-center float-right bg-${theme === 'dark' ? 'gray' : 'white'} rounded-md`}>
            <img
              src={base_url + '/media/' + movie.imageUrl}
              alt='movie'
              className='mx-4 w-32 h-48 rounded-md'
            />
            <p className={`tracking-wide leading-loose ${theme === 'light' ? 'text-black' : 'text-white'} ps-8`}>
              {movie.description}
            </p>
          </div>
          <div className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <p>Géneros: [{movie.categories.map((c) => c.name).join(', ')}]</p>

            {ratePromedy && <p>Puntuacion: {ratePromedy}</p>}
          </div>
        </div>
      )}
      {isMovieLoadingError && <p>Ha ocurrido un error: {isMovieLoadingError}</p>}
      <div className='container mx-auto px-4 rounded-md py-24'>
        <div className='w-3/4 mx-96'>
          {movie && <CreateReview movieId={id}></CreateReview>}
          {reviews && <ReviewsContainer reviews={reviews}></ReviewsContainer>}
        </div>
      </div>

      {isReviewsLoading && <p>Cargando reviews...</p>}
      {isReviewsError && <p>Ha ocurrido un error al cargar las reviews: {isReviewsError}</p>}
    </div>
  );
};

export default Movie;
