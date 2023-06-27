import React, { useEffect, useState } from 'react';
import MovieList from '../Movie/MovieList';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const Row = ({ movie, Genre }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(7);
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
    <div className=''>
      <div className='text-center  bg-gradient-to-r from-neutral-900 to-stone-800'>
        <h2>{Genre}</h2>
      </div>
      
      <div className='flex flex-row bg-gradient-to-r  from-indigo-950  via-blue-950  to-sky-950  '>
      <button className='scale-150 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ' onClick={handlePrevMovies}><FaArrowCircleLeft/> </button>
        <div className='flex overflow-x-auto justify-around  '>
          <MovieList movie={displayedMovies} className=''  />
        </div>
      <button className='scale-150 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ' onClick={handleNextMovies}><FaArrowCircleRight /></button>
        
      </div>
      
    </div>
  );
};

export default Row;

