import React from 'react';
import { base_url } from '../../utils/Config';
import {Link} from 'react-router-dom'
const MovieList = ({ movie }) => {
  return (
    <>
      {movie.map((movie, index) => (
        <div key={index} className='flex mt-6 rounded-sm transition duration-300 transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none '>
          <Link to={`/movie/${movie.id}`}>
            <img src={base_url + '/media/' + movie.imageUrl} alt='movie' className='mx-4 w-32 h-48 rounded-sg '/>
            <p className='text-center'>{movie.title}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default MovieList;
