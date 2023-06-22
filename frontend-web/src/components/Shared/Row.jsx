import React from 'react'
import MovieList from '../Movie/MovieList'

const Row = ({movie, Genre }) => {
  return (
    
    <div className='grid grid-rows-1 grid-flow-col'>
      <h2>{Genre} </h2>
      
    <MovieList movies={movie} />
  </div> 
  )
}

export default Row