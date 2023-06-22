import React from 'react';
import { base_url } from '../../utils/Config';
const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div key={index}>
          <img src={base_url + '/media/' + movie.imageUrl} alt='movie' />
        </div>
      ))}
    </>
  );
};

export default MovieList;
