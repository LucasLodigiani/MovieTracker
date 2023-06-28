import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { base_url } from '../../utils/Config';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MovieCarousel = ({ movies, title }) => {
  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numVisibleMovies, setNumVisibleMovies] = useState(8);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % movies.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1600) {
        setNumVisibleMovies(9);
      } else {
        const maxVisibleMovies = Math.min(8, movies.length);
        setNumVisibleMovies(maxVisibleMovies);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [movies.length]);

  const renderMovies = () => {
    const slicedMovies = [...movies, ...movies].slice(currentIndex, currentIndex + numVisibleMovies);
    return slicedMovies.map((movie, index) => (
      <div key={index} className='flex-grow'>
        <div className='relative w-32 h-48'>
          <Link to={`/movie/${movie.id}`}>
            <img
              src={base_url + '/media/' + movie.imageUrl}
              alt='movie'
              className={`w-full h-full object-cover rounded-md  ${theme === 'light' ? 'hover:outline outline-offset-2 outline-pink-700 transition-transform duration-300 hover:scale-105' : 'hover:outline outline-offset-2 outline-cyan-500 transition-transform duration-300 hover:scale-105'}`}
            />
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <p className='ml-6 mb-2 text-white text-xl font-mono'>{title}</p>
      <div className='flex items-center'>
        <button onClick={handlePrevious} className='px-2 py-1'>
          <FaArrowCircleLeft />
        </button>
        <div className='flex flex-grow'>{renderMovies()}</div>
        <button onClick={handleNext} className='px-2 py-1'>
          <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;