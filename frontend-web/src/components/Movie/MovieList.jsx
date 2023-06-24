import React from 'react';
import { base_url } from '../../utils/Config';
import {Link} from 'react-router-dom'
const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className='flex mt-6'>
          <Link to={`/movies/${movie.id}`}>
            <img src={base_url + '/media/' + movie.imageUrl} alt='movie' className='mx-4 w-32 h-48' />
          </Link>
        </div>
      ))}
    </>
  );
};

export default MovieList;
