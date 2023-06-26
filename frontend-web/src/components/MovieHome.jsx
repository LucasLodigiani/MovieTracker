import React from 'react'
import useGetMovies from '../hooks/movies/useGetMovie'
import { base_url } from '../utils/Config'

const MovieHome = ({ movie }) => {
    return (
        <div className=''>
            <div className='w-full h-full'>
                <div className='w-full h-[550px] text-white'>
                    <img src={base_url + '/media/' + movie.imageUrl} alt='movie'></img>
                </div>
            </div>
        </div>
    )
}

export default MovieHome