import React, { useEffect, useState } from 'react';
import MovieList from '../Movie/MovieList';

const Row = ({ movie, Genre }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(6);
  const totalMovies = movie.length;

  const handleNextMovies = () => {
    const increment = totalMovies >= 7 ? 2 : 1;
    setStartIdx((startIdx + increment) % totalMovies);
    setEndIdx((endIdx + increment) % totalMovies);
  };

  const handlePrevMovies = () => {
    const increment = totalMovies >= 7 ? 2 : 1;
    setStartIdx((startIdx - increment + totalMovies) % totalMovies);
    setEndIdx((endIdx - increment + totalMovies) % totalMovies);
  };

  const displayedMovies = endIdx < startIdx ? [...movie.slice(startIdx), ...movie.slice(0, endIdx + 1)] : movie.slice(startIdx, endIdx + 1);

  return (
    <div>
      <div>
        <h2>{Genre}</h2>
      </div>
      <div className='flex flex-row bg-slate-800'>
        <div className='flex overflow-x-auto '>
          <button onClick={handlePrevMovies}>&#8656;</button>
          <MovieList movies={displayedMovies} />
          <button onClick={handleNextMovies}>&#8658;</button>
        </div>
      </div>
    </div>
  );
};

export default Row;

