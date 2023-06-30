import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useGetMovie from '../../hooks/movies/useGetMovie';
import { base_url } from '../../utils/Config';
import useGetReviews from '../../hooks/reviews/useGetReviews';
import ReviewsContainer from '../Review/ReviewsContainer';
import CreateReview from '../Review/CreateReview';
import { ThemeContext } from '../../contexts/ThemeContext';
import AddToFavorites from './AddToFavorites';
import useAuthentication from '../../hooks/auth/useAuthentication ';

const Movie = () => {
  const { id } = useParams();
  const [ratePromedy, setRatePromedy] = useState(0);
  const [movie, isMovieLoading, isMovieLoadingError] = useGetMovie(id);
  const [reviews, isReviewsLoading, isReviewsError] = useGetReviews(id);
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData, isAuthenticated, isInRole, logout] = useAuthentication();

  useEffect(() => {
    //Obtener el promedio de las puntuaciones
    if (reviews !== null && reviews.length !== 0) {
      const rateSum = reviews.reduce((a, r) => {
        return a + r.rate;
      }, 0);
      setRatePromedy(rateSum / reviews.length);
    }
  }, [reviews]);

  return (
    <div className={` ${theme === 'dark' ? 'gray' : 'bg-rose-50'}`} style={{ boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)' }}>
      {isMovieLoading && <p>Cargando....</p>}
      {movie && (
        <div className={`text- ${theme === 'dark' ? 'white' : 'bg-rose-50' }container mx-auto px-4`}>

          <h1 className={`text-${theme === 'dark' ? 'white' : 'bg-rose-50'} font-extrabold text-2xl tracking-wide leading-none text-center py-5 `}>
            {movie.title}
          </h1>
          <div className={`flex items-center float-right ${theme === 'dark' ? 'gray' : ''} rounded-md`}>
            <img
              src={base_url + '/media/' + movie.imageUrl}
              alt='movie'
              className='mx-32 w-48 h-60 rounded-md'
            />

            <p className={`tracking-wide leading-loose ${theme === 'light' ? 'text-black' : 'text-white'} w-4/6`}>
              {movie.description}
            </p>
          </div>
          <div className={`mx-32 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            {isAuthenticated() && <AddToFavorites id={id}></AddToFavorites>}
            <p className={`tracking-wide leading-loose ${theme === 'light' ? 'text-black' : 'text-white'} `}>
              Fecha de estreno: {movie.releaseDate}
            </p>
            <p className={`tracking-wide leading-loose ${theme === 'light' ? 'text-black' : 'text-white'} `}>
              Director: {movie.director}
            </p>

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
