import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div key={index}>
          <img src={movie.Poster} alt='movie' />
        </div>
      ))}
    </>
  );
};

export default MovieList;
